import env from "@/lib/env";
import type { IGetImgResponseType } from "@/types";
import { GET_IMG_BASE_URL, HEADSHOT_GEN_OPTIONS } from "@/lib/constants";

interface HeadshotGenerationParams {
  imageUrl: string;
  style: {
    promptTemplate: string;
    negativePrompt?: string;
  };
  aspectRatio: {
    ratio: string;
    resolution: string;
  };
  quality: 'standard' | 'high' | 'ultra';
  batchSize: number;
}

export async function generateHeadshot(params: HeadshotGenerationParams) {
  const url = `${GET_IMG_BASE_URL}/stable-diffusion-xl/image-to-image`;
  
  const [width, height] = params.aspectRatio.resolution.split('x').map(Number);
  
  // Build comprehensive prompt for headshot
  const basePrompt = buildHeadshotPrompt(params.style.promptTemplate, params.quality);
  const negativePrompt = buildNegativePrompt(params.style.negativePrompt);
  
  try {
    // Convert image URL to base64 if needed
    const imageBase64 = await convertImageToBase64(params.imageUrl);
    
    const results: string[] = [];
    let totalCost = 0;

    // Generate multiple variations if batch size > 1
    for (let i = 0; i < params.batchSize; i++) {
      // Add variation to prompt for batch generation
      const prompt = params.batchSize > 1 
        ? `${basePrompt}, variation ${i + 1}, unique pose and expression`
        : basePrompt;

      const requestBody = {
        ...HEADSHOT_GEN_OPTIONS,
        prompt,
        negative_prompt: negativePrompt,
        image: imageBase64,
        width,
        height,
        steps: getStepsForQuality(params.quality),
        // Add some randomness for variations
        seed: params.batchSize > 1 ? Math.floor(Math.random() * 1000000) : undefined
      };

      const options = {
        method: 'POST',
        headers: { 
          accept: 'application/json', 
          'content-type': 'application/json', 
          Authorization: `Bearer ${env.GETIMAGE_AI_TOKEN}` 
        },
        body: JSON.stringify(requestBody)
      };

      const response = await fetch(url, options);
      const data = await response.json();
      
      if (data?.error) {
        console.error(`Headshot generation API error (batch ${i + 1}):`, data.error);
        // If first generation fails, return error
        if (i === 0) {
          return {
            error: data.error,
            urls: []
          };
        }
        // For subsequent failures, continue with what we have
        break;
      }
      
      if (data.url) {
        results.push(data.url);
        totalCost += data.cost || 0;
      }

      // Add small delay between batch requests to avoid rate limiting
      if (i < params.batchSize - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return {
      urls: results,
      cost: totalCost,
      batchSize: results.length,
      requestedBatchSize: params.batchSize
    } as IGetImgResponseType & { 
      urls: string[]; 
      cost: number; 
      batchSize: number; 
      requestedBatchSize: number; 
    };
    
  } catch (error) {
    console.error("Headshot generation error:", error);
    return {
      error: {
        type: 'network_error',
        code: 'request_failed',
        message: error instanceof Error ? error.message : 'Network request failed'
      },
      urls: []
    };
  }
}

function buildHeadshotPrompt(styleTemplate: string, quality: string): string {
  const qualityModifiers: Record<string, string> = {
    standard: "professional photography, photorealistic, real photograph",
    high: "high-quality professional photography, photorealistic, real photograph, DSLR quality, sharp focus, natural lighting",
    ultra: "ultra high-quality professional photography, photorealistic, real photograph taken with professional DSLR camera, sharp focus, studio lighting, commercial grade, natural skin texture, authentic photography"
  };
  
  // Add strong photorealism keywords
  return `${styleTemplate}, ${qualityModifiers[quality] || qualityModifiers.high}, professional headshot portrait, real photograph, authentic photography, natural skin pores and texture, photorealistic human, centered composition`;
}

function buildNegativePrompt(styleNegative?: string): string {
  const baseNegative = HEADSHOT_GEN_OPTIONS.negative_prompt;
  return styleNegative ? `${baseNegative}, ${styleNegative}` : baseNegative;
}

function getStepsForQuality(quality: string): number {
  const steps = {
    standard: 30,
    high: 40, 
    ultra: 50
  };
  return steps[quality as keyof typeof steps] || 40;
}

// Helper function to validate headshot image URL or base64
export function isValidImageUrl(imageString: string): boolean {
  // Check if it's a base64 string
  if (imageString.startsWith('data:image/')) {
    return true;
  }
  
  // Check if it's a valid URL
  try {
    const urlObj = new URL(imageString);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

// Helper function to estimate processing time
export function estimateProcessingTime(quality: string, batchSize: number): number {
  const baseTime = {
    standard: 30,
    high: 45,
    ultra: 60
  };
  
  const base = baseTime[quality as keyof typeof baseTime] || 45;
  return base + (batchSize - 1) * 15; // Additional 15 seconds per extra image
}

// Helper function to convert image URL to base64
async function convertImageToBase64(imageInput: string): Promise<string> {
  // If already base64, return as-is
  if (imageInput.startsWith('data:image/')) {
    return imageInput.split(',')[1]; // Remove data:image/xxx;base64, prefix
  }
  
  // If it's a URL, fetch and convert to base64
  try {
    const response = await fetch(imageInput);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer.toString('base64');
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw new Error('Failed to process image. Please ensure the image URL is accessible.');
  }
}
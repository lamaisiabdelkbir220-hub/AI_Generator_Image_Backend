import { 
  HEADSHOT_STYLES, 
  HEADSHOT_COSTS, 
  HEADSHOT_ASPECT_RATIOS, 
  HEADSHOT_CATEGORIES,
  getHeadshotStylesByCategory,
  getPremiumHeadshotStyles,
  getBasicHeadshotStyles
} from "@/lib/constants";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get('category');
    const premium = url.searchParams.get('premium');

    // Filter styles based on query parameters
    let filteredStyles = [...HEADSHOT_STYLES]; // Create mutable copy
    
    if (category) {
      filteredStyles = getHeadshotStylesByCategory(category);
    }
    
    if (premium === 'true') {
      filteredStyles = filteredStyles.filter(style => style.isPremium);
    } else if (premium === 'false') {
      filteredStyles = filteredStyles.filter(style => !style.isPremium);
    }

    // Transform styles for public API
    const publicStyles = filteredStyles.map(style => ({
      id: style.id,
      name: style.name,
      description: style.description,
      category: style.category,
      creditCost: style.creditCost,
      isPremium: style.isPremium
    }));

    const responseData = {
      styles: publicStyles,
      categories: HEADSHOT_CATEGORIES,
      aspectRatios: HEADSHOT_ASPECT_RATIOS,
      qualityOptions: [
        { 
          level: 'high', 
          credits: HEADSHOT_COSTS.base_cost, 
          description: 'High quality professional headshots',
          estimatedTime: '45-60 seconds'
        }
      ],
      costs: {
        headshotGeneration: HEADSHOT_COSTS.base_cost
      },
      limits: {
        batchSize: 1, // Always single generation
        supportedFormats: ['JPEG', 'PNG', 'WEBP'],
        maxFileSize: '10MB',
        minResolution: '512x512'
      },
      features: {
        batchGeneration: false, // Single generation only
        favoriteSystem: true,
        historyTracking: true,
        progressTracking: true,
        premiumStyles: false // All styles same cost
      },
      styleCategories: {
        business: getHeadshotStylesByCategory('business').length,
        creative: getHeadshotStylesByCategory('creative').length,
        entertainment: getHeadshotStylesByCategory('entertainment').length,
        lifestyle: getHeadshotStylesByCategory('lifestyle').length,
        specialized: getHeadshotStylesByCategory('specialized').length,
        premium: getHeadshotStylesByCategory('premium').length
      },
      statistics: {
        totalStyles: HEADSHOT_STYLES.length,
        premiumStyles: getPremiumHeadshotStyles().length,
        basicStyles: getBasicHeadshotStyles().length
      }
    };

    return Response.json({
      message: 'Headshot configuration retrieved',
      data: responseData,
      statusCode: 200
    }, { status: 200 });

  } catch (error) {
    console.error("Error retrieving headshot config:", error);
    return Response.json({
      message: "Unable to retrieve configuration",
      data: null,
      statusCode: 500
    }, { status: 500 });
  }
}

// POST endpoint to calculate cost estimate
export async function POST(req: Request) {
  try {
    const rawData = await req.json();
    const { style, quality = 'high', batchSize = 1 } = rawData;

    if (!style) {
      return Response.json({
        message: 'Style is required for cost calculation',
        data: null,
        statusCode: 400
      }, { status: 400 });
    }

    const headshotStyle = HEADSHOT_STYLES.find(s => s.id === style);
    if (!headshotStyle) {
      return Response.json({
        message: 'Invalid headshot style',
        data: null,
        statusCode: 400
      }, { status: 400 });
    }

    // Calculate costs - simplified to single base cost
    const baseCost = HEADSHOT_COSTS.base_cost;
    const styleCost = HEADSHOT_COSTS.premium_style_surcharge; // Always 0 now
    const batchCost = Math.max(0, batchSize - 1) * HEADSHOT_COSTS.batch_generation_per_extra; // Always 0 now
    const totalCost = baseCost; // Simplified to just base cost

    // Estimate processing time
    const baseTime = quality === 'ultra' ? 60 : quality === 'high' ? 45 : 30;
    const estimatedTime = baseTime + (batchSize - 1) * 15;

    const costBreakdown = {
      baseCost: {
        amount: baseCost,
        description: `${quality} quality generation`
      },
      styleCost: {
        amount: styleCost,
        description: headshotStyle.isPremium ? 'Premium style surcharge' : 'No premium surcharge'
      },
      batchCost: {
        amount: batchCost,
        description: batchSize > 1 ? `${batchSize - 1} additional variations` : 'Single generation'
      },
      totalCost,
      estimatedTime: `${estimatedTime} seconds`,
      style: {
        name: headshotStyle.name,
        isPremium: headshotStyle.isPremium,
        category: headshotStyle.category
      },
      quality,
      batchSize
    };

    return Response.json({
      message: 'Cost estimate calculated',
      data: costBreakdown,
      statusCode: 200
    }, { status: 200 });

  } catch (error) {
    console.error("Error calculating cost:", error);
    return Response.json({
      message: "Unable to calculate cost estimate",
      data: null,
      statusCode: 500
    }, { status: 500 });
  }
}
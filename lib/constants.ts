export const IMAGE_STYLES = [
  "None",
  "Cartoon",
  "Anime",
  "Realistic",
  "Cyberpunk",
  "Pixel Art",
  "Watercolor",
  "3D Render",
  "Line Art",
  "Low Poly",
  "Oil Painting",
] as const;

export const IMAGE_STYLE_PROMPTS = [
  {
    "style": "Ghibli",
    "prompt": "Studio Ghibli art with light colors and warmth. Focus on soft brushstrokes and a cozy atmosphere, featuring enchanting characters and a serene background that evokes a sense of comfort and magic"
  },
  {
    "style": "Anime",
    "prompt": "Create an image in the vibrant and dynamic style of Japanese anime. Emphasize bold outlines, expressive eyes, and potentially stylized proportions. The color palette can range from bright and energetic to more muted depending on the desired mood. Aim for a visual aesthetic similar to popular anime series. Apply this style to the provided input photo."
  },
  {
    "style": "Realistic",
    "prompt": "Generate an image with a high degree of photorealism. The image should accurately depict details, textures, lighting, and shadows to appear as if it were captured by a camera. Strive for a natural and believable representation of the subject matter. Apply this style to the provided input photo, aiming for a highly realistic interpretation."
  },
  {
    "style": "Cyberpunk",
    "prompt": "Create an image in the futuristic and dystopian aesthetic of cyberpunk. Incorporate elements like neon lights, advanced technology, sprawling urban landscapes, and potentially gritty or high-contrast lighting. Use a color palette often dominated by neons, dark blues, and purples. Apply this style to the provided input photo, transforming it into a cyberpunk scene."
  },
  {
    "style": "Pixel Art",
    "prompt": "Generate an image composed of visible pixels, characteristic of pixel art. Keep the resolution relatively low to emphasize the pixelated look. The style can vary from retro video game aesthetics to more modern interpretations of pixel art. Apply this style to the provided input photo, simplifying it into a pixel grid."
  },
  {
    "style": "Watercolor",
    "prompt": "Create an image that emulates the look of a watercolor painting. Focus on soft, translucent washes of color, visible brushstrokes, and potentially bleeding or blending effects. The overall impression should be fluid and somewhat impressionistic. Apply this style to the provided input photo, giving it a watercolor effect."
  },
  {
    "style": "3D Render",
    "prompt": "Generate an image that appears to be a realistic or stylized 3D render. The image should have defined forms, calculated lighting and shadows, and potentially textures applied to surfaces. The level of detail and realism can vary depending on the desired effect. Apply this style to the provided input photo, interpreting it as a 3D model."
  },
  {
    "style": "Line Art",
    "prompt": "Create an image primarily using lines, without significant shading or color fills (unless specifically requested as line art with color). Emphasize clean, crisp lines to define shapes and forms. The style can range from simple sketches to more detailed illustrations. Apply this style to the provided input photo, converting it into a line drawing."
  },
  {
    "style": "Low Poly",
    "prompt": "Generate an image composed of simple geometric shapes (polygons), with visible facets and sharp edges. This style minimizes the number of polygons used, resulting in a stylized, often abstract appearance. Use flat shading or simple gradients. Apply this style to the provided input photo, simplifying its forms into a low-polygon representation."
  },
  {
    "style": "Oil Painting",
    "prompt": "Create an image that mimics the texture and appearance of an oil painting. Emphasize visible brushstrokes, rich colors, and potentially impasto effects (thick application of paint). The lighting and blending of colors should resemble traditional oil painting techniques. Apply this style to the provided input photo, giving it the look of an oil painting."
  }
] as const;

export const ASPECT_RATIOS = [
  { ratio: "1:1", resolution: "1024x1024" },
  { ratio: "3:4", resolution: "768x1024" },
  { ratio: "4:3", resolution: "1024x768" },
  { ratio: "16:9", resolution: "1280x720" },
  { ratio: "9:16", resolution: "720x1280" },
] as const;

export const NO_OF_ADS_ALLOWED_TO_WATCH_IN_DAY = 20;

export const TEXT_TO_IMAGE_COST = 3;

export const IMAGE_TO_IMAGE_COST = 5;

export const IMAGE_GEN_OPTIONS = {
  model: "stable-diffusion-xl-v1-0",
  negative_prompt: "Disfigured, cartoon, blurry, nude, exaggerated features, unnatural expressions",
  steps: 40,
  guidance: 7.5,
  output_format: 'jpeg',
  scheduler: 'euler',
  response_format: 'url'
} as const;

export const GET_IMG_BASE_URL = 'https://api.getimg.ai/v1' as const;

export const CREDIT_HISTORY_TYPE = ['ADS_REWARD', 'CREDIT_PURCHASE', 'IMAGE_GEN'] as const;

export const ANDROID_PRICING_PLANS = [
  { name: '10 Credits', productId: 'credits_10', credits: 10 },
  { name: '50 Credits', productId: 'credits_50', credits: 50 },
  { name: '100 Credits', productId: 'credits_100', credits: 100 },
  { name: '1000 Credits', productId: 'credits_1000', credits: 1000 },
] as const;

export const IOS_PRICING_PLANS = [
  { name: '10 Credits', productId: 'ios_credits_10', credits: 10 },
  { name: '50 Credits', productId: 'ios_credits_50', credits: 50 },
  { name: '100 Credits', productId: 'ios_credits_100', credits: 100 },
  { name: '1000 Credits', productId: 'ios_credits_1000', credits: 1000 },
] as const;

export const ALL_PRICING_PLANS = [
  ...ANDROID_PRICING_PLANS,
  ...IOS_PRICING_PLANS
] as const;
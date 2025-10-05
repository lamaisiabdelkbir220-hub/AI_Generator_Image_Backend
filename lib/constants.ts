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

export const HEADSHOT_GENERATION_COST = 5;

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

export const CREDIT_HISTORY_TYPE = ['ADS_REWARD', 'CREDIT_PURCHASE', 'IMAGE_GEN', 'HEADSHOT_GEN'] as const;

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

// Headshot generation constants
export const HEADSHOT_STYLES = [
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional business headshots with formal attire",
    previewUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    promptTemplate: "PHOTOREALISTIC professional corporate headshot photograph, DSLR camera quality, real photograph. Person: preserve exact facial identity, face shape, natural hair texture, eye color, and skin tone from original photo - NO modifications to facial features. Clothing: high-quality professional business attire - tailored dark blazer or suit jacket, crisp collared shirt, natural fabric texture and fit. Background: clean neutral professional backdrop (soft gray, white, or subtle gradient), studio photography setup. Lighting: professional studio lighting, soft even illumination, natural skin tones, authentic photography lighting setup. Expression: confident, approachable, natural. Technical: shot on professional DSLR camera, 85mm portrait lens, f/2.8, sharp focus on eyes, natural depth of field, authentic photograph quality, real skin pores and texture visible, completely photorealistic, looks exactly like a real professional headshot taken by a photographer, NOT digital art, NOT illustration, NOT AI-generated look.",
    negativePrompt: "illustration, painting, drawing, digital art, sketch, rendered, CG, 3d render, cartoon, anime, stylized, artistic, fake, plastic skin, smooth skin, airbrushed, oversaturated colors, unnatural, AI-generated look, casual clothes, poor lighting",
    creditCost: 5,
    isPremium: false,
    category: "business",
    tags: ["business", "professional", "formal", "linkedin"]
  },
  {
    id: "actor",
    name: "Actor", 
    description: "Entertainment industry headshots for auditions",
    previewUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    promptTemplate: "Generate a realistic actor headshot of the uploaded person. Preserve identity exactly: maintain the same face shape, hair style, eye color, and skin tone from the original photo with no changes to facial features. Clothing: replace with simple, neutral wardrobe — plain fitted T-shirt or casual shirt in solid colors (black, white, or gray). Avoid logos, patterns, or accessories. Background: plain and clean (light gray, white, or soft gradient). Casting directors should focus entirely on the person. Lighting: natural or studio-quality soft light that shows true skin tone and detail. Balanced, with no heavy shadows or filters. Expression: neutral to slight smile, authentic, approachable, and versatile. No exaggerated posing. Style: high-resolution, sharp detail, realistic skin texture. Must look like a natural professional photo for auditions, not overly edited or stylized.",
    negativePrompt: "business attire, corporate background, stiff pose, poor lighting, logos, patterns, accessories, heavy shadows, filters, exaggerated posing, overly edited, stylized",
    creditCost: 5,
    isPremium: false,
    category: "entertainment",
    tags: ["acting", "audition", "casting", "entertainment"]
  },
  {
    id: "model",
    name: "Model",
    description: "Fashion and commercial modeling portraits",
    previewUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    promptTemplate: "Generate a realistic modeling headshot of the uploaded person. Identity preservation is critical: keep the exact same face shape, hair style, eye color, and skin tone as the original photo. No changes to facial features. Clothing: replace with fashionable, well-fitted attire suitable for a modeling portfolio — stylish top, blazer, or casual-chic outfit depending on the composition. Keep colors neutral or trendy, avoid logos or busy patterns. Background: simple or minimalistic studio backdrop (white, gray, or soft gradient) to emphasize the subject. Lighting: soft, professional studio lighting with subtle highlights and shadows to accentuate facial features naturally. Expression: confident, engaging, with subtle attitude or personality; a slight smile or intense gaze is acceptable. Style: high-resolution, sharp focus, realistic skin texture, magazine-quality finish. Must look like a professional model portfolio photo, not AI-stylized or cartoonish.",
    negativePrompt: "logos, busy patterns, distracting background, harsh lighting, amateur quality, AI-stylized, cartoonish, unrealistic",
    creditCost: 5,
    isPremium: false,
    category: "entertainment",
    tags: ["modeling", "fashion", "portfolio", "commercial"]
  },
  {
    id: "executive",
    name: "Executive",
    description: "High-level executive portraits with commanding presence",
    previewUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    promptTemplate: "Create a realistic executive portrait of the uploaded person. Identity preservation is critical: keep the exact same face shape, hair style, eye color, and skin tone as the original photo. No modifications to facial features. Clothing: replace with high-level executive attire — a dark tailored suit jacket, crisp white collared shirt, and optional tie. Outfit should look refined, fitted, and natural. Background: professional yet sophisticated — clean neutral tone (light gray, deep blue, or gradient) or a subtle blurred office setting. Must not distract from the subject. Lighting: dramatic but professional — soft directional light that highlights the face and conveys authority. Expression: confident, composed, approachable but strong (slight smile or serious executive expression). Style: high-resolution, sharp detail, realistic skin texture, professional magazine-quality look. The result should convey leadership, credibility, and authority.",
    negativePrompt: "casual attire, amateur photography, poor composition, distracting background, harsh lighting, unprofessional quality",
    creditCost: 5,
    isPremium: false,
    category: "premium",
    tags: ["executive", "leadership", "ceo", "corporate"]
  },
  {
    id: "creative",
    name: "Creative",
    description: "Artistic and expressive creative professional portraits",
    previewUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    promptTemplate: "Generate a realistic creative headshot of the uploaded person. Preserve identity exactly: maintain the same face shape, natural hair, eye color, and skin tone as in the original photo. No modifications to facial features. Clothing: replace with stylish, modern, and slightly artistic attire — such as a trendy jacket, colorful shirt, or casual-chic outfit. Ensure the clothes look fitted, natural, and realistic. Background: vibrant, modern, or abstract — soft pastel tones, blurred street art, or light geometric patterns. Should feel innovative but not overpowering. Lighting: artistic yet professional — natural daylight or softly diffused colored light with creative accents. Avoid harsh shadows. Expression: expressive, approachable, confident, with a spark of personality. Final result: high-resolution, sharp detail, realistic skin texture, creative and modern look while remaining authentic.",
    negativePrompt: "conservative business attire, plain background, boring composition, harsh shadows, overpowering background, unrealistic",
    creditCost: 5,
    isPremium: false,
    category: "creative",
    tags: ["creative", "artistic", "designer", "modern"]
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    description: "Natural and relatable lifestyle portraits",
    previewUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
    promptTemplate: "Generate a realistic lifestyle headshot of the uploaded person. Preserve identity exactly: keep the same facial structure, hairstyle, eye color, and skin tone as in the original photo. No changes to features. Clothing: casual yet polished — well-fitted shirt, light sweater, or relaxed blazer. Neutral or warm tones, avoiding logos and heavy patterns. Background: natural and relatable — outdoor café, park, modern city street, or softly blurred home interior. Must look authentic. Lighting: natural daylight or warm golden-hour style. Balanced and flattering, no artificial-looking effects. Expression: relaxed, approachable, authentic smile or natural candid look. Final result: high-resolution, realistic, lifestyle-inspired photo suitable for social media, personal branding, or casual professional use.",
    negativePrompt: "logos, heavy patterns, artificial lighting, stiff posing, overly formal attire, unrealistic background",
    creditCost: 5,
    isPremium: false,
    category: "lifestyle",
    tags: ["lifestyle", "casual", "natural", "social"]
  },
  {
    id: "editorial",
    name: "Editorial",
    description: "Magazine-quality editorial portraits",
    previewUrl: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&h=400&fit=crop",
    promptTemplate: "Generate a realistic editorial-style headshot of the uploaded person. Preserve identity exactly: keep the same face shape, hairstyle, eye color, and skin tone as in the original photo. No alterations to facial features. Clothing: high-fashion or striking editorial wardrobe — stylish blazer, bold top, or modern tailored piece. Clean lines and statement looks preferred. Background: studio or minimalist backdrop with bold contrasts (white, black, deep tones, or textured gradient). Should feel magazine-like. Lighting: dramatic editorial lighting — directional, with subtle shadows and highlights to sculpt the face. Expression: strong, confident, with subtle intensity or character. No exaggerated smiles. Final result: sharp detail, high-resolution, magazine-quality aesthetic, sophisticated and professional.",
    negativePrompt: "amateur photography, poor composition, basic lighting, unprofessional styling, exaggerated smiles, low quality",
    creditCost: 5,
    isPremium: false,
    category: "premium",
    tags: ["editorial", "magazine", "fashion", "high-end"]
  },
  {
    id: "cinematic",
    name: "Cinematic",
    description: "Dramatic cinematic lighting and composition",
    previewUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
    promptTemplate: "Generate a realistic cinematic-style headshot of the uploaded person. Preserve identity exactly: maintain the original face shape, hair, eye color, and skin tone without altering features. Clothing: simple but stylish — fitted jacket, dark-toned shirt, or neutral wardrobe that fits cinematic drama. Background: cinematic setting with depth — blurred city lights at night, softly lit indoors, or natural outdoor with atmospheric tones. Lighting: dramatic and moody — directional light with cinematic color grading (warm tones, teal & orange, or soft shadows). Expression: natural but powerful — thoughtful, confident, with cinematic presence. Final result: high-resolution, film-quality image with depth, texture, and authentic cinematic feel.",
    negativePrompt: "flat lighting, amateur composition, poor contrast, unprofessional quality, bright harsh lighting, unrealistic colors",
    creditCost: 5,
    isPremium: false,
    category: "premium",
    tags: ["cinematic", "dramatic", "film", "moody"]
  },
  {
    id: "environmental",
    name: "Environmental",
    description: "Real-world contextual professional portraits",
    previewUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    promptTemplate: "Generate a realistic environmental headshot of the uploaded person. Preserve identity exactly: keep the same face shape, natural hair, eye color, and skin tone from the original photo. No modifications to facial features. Clothing: professional or casual attire that fits the chosen environment — office wear for workplace, casual smart for outdoor, or field-appropriate clothing. Background: real-world contextual environment — blurred office interior, university hallway, outdoor urban street, or natural green landscape. Must support but not distract. Lighting: natural or soft professional lighting to match the environment — daylight for outdoors, balanced studio light for indoors. Expression: approachable, authentic, naturally engaged. Final result: high-resolution, sharp detail, realistic environmental context while keeping focus on the subject.",
    negativePrompt: "distracting background, inappropriate clothing for environment, harsh artificial lighting, poor focus on subject, unrealistic setting",
    creditCost: 5,
    isPremium: false,
    category: "specialized",
    tags: ["environmental", "contextual", "workplace", "natural"]
  },
  {
    id: "academic",
    name: "Academic",
    description: "Professional university and research profile headshots",
    previewUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    promptTemplate: "Generate a realistic academic headshot of the uploaded person. Preserve identity exactly: keep the same face shape, hair style, eye color, and skin tone as in the original photo. No modifications to facial features. Clothing: replace with professional academic attire — smart collared shirt or blouse, optional blazer, or a subtle sweater. Keep colors neutral (navy, gray, or beige). Background: clean and intellectual — softly blurred university interior, library shelves, or plain neutral backdrop. Lighting: soft, balanced lighting with gentle highlights, similar to natural daylight. Expression: thoughtful, confident, approachable, with a subtle smile or neutral scholarly look. Final result: sharp focus, realistic texture, high-resolution. Should look like a professional university staff photo or research profile image.",
    negativePrompt: "illustration, painting, drawing, casual attire, unprofessional background, harsh lighting, exaggerated expression, low quality",
    creditCost: 5,
    isPremium: false,
    category: "specialized",
    tags: ["academic", "university", "professor", "research"]
  },
  {
    id: "startup",
    name: "Startup",
    description: "Modern tech founder and entrepreneur portraits",
    previewUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    promptTemplate: "Generate a realistic startup founder headshot of the uploaded person. Preserve identity exactly: maintain the same facial structure, natural hair, eye color, and skin tone. No facial alterations. Clothing: replace with modern casual business attire — fitted T-shirt, hoodie with blazer, or smart casual shirt. Keep colors trendy yet minimal (black, navy, gray, white). Background: modern office space, coworking area, or softly blurred tech environment. Lighting: bright, modern lighting with clean contrast; natural daylight or soft studio light. Expression: energetic, confident, and approachable. Slight smile or candid leadership expression. Final result: sharp, natural, and high-resolution — should look like a LinkedIn or tech founder press photo.",
    negativePrompt: "illustration, painting, formal suit, old-fashioned background, poor lighting, stiff pose, low quality, unrealistic",
    creditCost: 5,
    isPremium: false,
    category: "business",
    tags: ["startup", "founder", "entrepreneur", "tech"]
  },
  {
    id: "engineer",
    name: "Engineer",
    description: "Technical professional and engineering portraits",
    previewUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
    promptTemplate: "Generate a realistic engineer headshot of the uploaded person. Preserve identity exactly: keep the same face shape, hairstyle, eye color, and skin tone from the original photo. Clothing: replace with smart-casual technical attire — collared shirt, polo, or workwear jacket. Optionally, safety vest or lab coat for field engineers. Background: professional technical setting — blurred workshop, office with equipment, or clean neutral background. Lighting: clear, bright, and professional — balanced studio or daylight lighting. Expression: focused yet friendly, practical and confident. Final result: high-resolution, sharp focus, realistic professional look suited for engineers or technical professionals.",
    negativePrompt: "illustration, painting, unprofessional attire, cluttered background, poor lighting, casual expression, low quality",
    creditCost: 5,
    isPremium: false,
    category: "specialized",
    tags: ["engineer", "technical", "professional", "industry"]
  },
  {
    id: "artist",
    name: "Artist",
    description: "Creative and expressive artist portraits",
    previewUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    promptTemplate: "Generate a realistic artist headshot of the uploaded person. Preserve identity exactly: maintain the same face, hair, eye color, and skin tone as the original photo. Clothing: artistic and expressive — casual creative wear such as a denim jacket, paint-splattered shirt, or stylish scarf. Natural and authentic. Background: artistic environment — softly blurred art studio, gallery, or textured neutral background. Lighting: warm and creative — natural daylight or slightly moody studio lighting with artistic depth. Expression: expressive, creative, confident, with natural emotion or slight smile. Final result: realistic, high-resolution, magazine-quality image that conveys creativity and authenticity.",
    negativePrompt: "illustration, painting, corporate attire, plain background, harsh lighting, stiff pose, low quality, unrealistic",
    creditCost: 5,
    isPremium: false,
    category: "creative",
    tags: ["artist", "creative", "painter", "sculptor"]
  },
  {
    id: "medical",
    name: "Medical",
    description: "Healthcare professional and clinical portraits",
    previewUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    promptTemplate: "Generate a realistic medical professional headshot of the uploaded person. Preserve identity exactly: keep the same face shape, hairstyle, eye color, and skin tone from the original image. Clothing: replace with clean medical attire — white lab coat over professional shirt or scrubs. Add stethoscope if contextually suitable. Background: hospital, clinic, or softly blurred neutral background with subtle blue or white tones. Lighting: bright, clean, professional lighting emphasizing clarity and trustworthiness. Expression: calm, confident, caring, and approachable. Final result: sharp, realistic, and high-resolution — should look like a hospital or clinic staff portrait.",
    negativePrompt: "illustration, painting, casual attire, unprofessional background, poor lighting, unfriendly expression, low quality",
    creditCost: 5,
    isPremium: false,
    category: "specialized",
    tags: ["medical", "doctor", "healthcare", "clinical"]
  },
  {
    id: "legal",
    name: "Legal",
    description: "Professional attorney and law firm portraits",
    previewUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop",
    promptTemplate: "Generate a realistic legal professional headshot of the uploaded person. Preserve identity exactly: maintain the same face structure, natural hair, eye color, and skin tone. Clothing: replace with formal attire — tailored suit jacket, crisp shirt or blouse, optional tie. Dark, professional colors like navy, black, or gray. Background: neutral or blurred law office interior, courtroom tone, or professional gray backdrop. Lighting: professional studio-quality light with soft highlights and subtle contrast. Expression: confident, composed, trustworthy, with neutral or slight smile. Final result: sharp focus, realistic, polished, high-resolution. Ideal for law firm or legal profile photo.",
    negativePrompt: "illustration, painting, casual attire, bright colors, unprofessional background, harsh lighting, overly friendly expression, low quality",
    creditCost: 5,
    isPremium: false,
    category: "business",
    tags: ["legal", "attorney", "lawyer", "law"]
  },
  {
    id: "student",
    name: "Student",
    description: "Youthful academic and campus portraits",
    previewUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    promptTemplate: "Generate a realistic student headshot of the uploaded person. Preserve identity exactly: keep the same facial structure, hair, eye color, and skin tone as the original photo. Clothing: casual youthful attire — hoodie, T-shirt, or light jacket. Clean and simple, avoiding logos. Background: campus outdoor, classroom, or softly blurred neutral setting. Lighting: natural daylight or bright, soft lighting. Expression: cheerful, confident, natural smile. Final result: realistic, high-resolution, and friendly — suitable for school or university profile.",
    negativePrompt: "illustration, painting, formal attire, professional background, harsh lighting, serious expression, logos, low quality",
    creditCost: 5,
    isPremium: false,
    category: "lifestyle",
    tags: ["student", "campus", "university", "youth"]
  },
  {
    id: "athlete",
    name: "Athlete",
    description: "Sports and athletic professional portraits",
    previewUrl: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&h=400&fit=crop",
    promptTemplate: "Generate a realistic athlete headshot of the uploaded person. Preserve identity exactly: maintain the same facial features, hair, eye color, and skin tone. Clothing: replace with athletic wear — team jersey, sports top, or performance gear depending on sport type. Background: stadium, training field, gym, or softly blurred sports environment. Lighting: dynamic and natural — outdoor daylight or bright studio sports light. Expression: confident, focused, energetic. Final result: sharp, high-resolution, and realistic — should look like a professional sports profile or media photo.",
    negativePrompt: "illustration, painting, casual attire, unprofessional background, poor lighting, weak expression, low quality",
    creditCost: 5,
    isPremium: false,
    category: "specialized",
    tags: ["athlete", "sports", "player", "fitness"]
  }
] as const;

export const HEADSHOT_COSTS = {
  base_cost: HEADSHOT_GENERATION_COST, // Single cost for all headshot generation
  premium_style_surcharge: 0, // Remove premium surcharge - all styles same cost
  batch_generation_per_extra: 0 // Remove batch cost - single generation only
} as const;

export const HEADSHOT_ASPECT_RATIOS = [
  { ratio: "1:1", resolution: "1024x1024", description: "Square" },
  { ratio: "3:4", resolution: "768x1024", description: "Classic" },
  { ratio: "4:5", resolution: "819x1024", description: "Portrait" },
  { ratio: "9:16", resolution: "720x1280", description: "Vertical" },
  { ratio: "16:9", resolution: "1280x720", description: "Wide" }
] as const;

export const HEADSHOT_GEN_OPTIONS = {
  model: "stable-diffusion-xl-v1-0",  // GetImg.ai's stable diffusion XL model
  negative_prompt: "illustration, painting, drawing, art, sketch, cartoon, anime, manga, render, CG, 3d, digital art, concept art, blurry, low quality, distorted face, multiple people, full body, landscape, cluttered background, amateur photography, poor lighting, noise, artifacts, watermark, text, logo, oversaturated, plastic skin, airbrushed, fake, unrealistic, different person, wrong face, altered features",
  guidance: 7.5,
  strength: 0.85, // CRITICAL: Higher strength to preserve facial identity - only change clothing/background
  output_format: 'jpeg',
  scheduler: 'euler',
  response_format: 'url'
} as const;

// Headshot style categories
export const HEADSHOT_CATEGORIES = [
  { id: "business", name: "Business", description: "Professional business and corporate headshots" },
  { id: "creative", name: "Creative", description: "Artistic and creative professional portraits" },
  { id: "entertainment", name: "Entertainment", description: "Actor, model, and entertainment industry headshots" },
  { id: "lifestyle", name: "Lifestyle", description: "Natural and relatable lifestyle portraits" },
  { id: "specialized", name: "Specialized", description: "Industry-specific professional portraits" },
  { id: "premium", name: "Premium", description: "High-end luxury and editorial portraits" }
] as const;

// Helper functions for headshot styles
export const getHeadshotStylesByCategory = (category: string) => {
  return HEADSHOT_STYLES.filter(style => style.category === category);
};

export const getPremiumHeadshotStyles = () => {
  return HEADSHOT_STYLES.filter(style => style.isPremium);
};

export const getBasicHeadshotStyles = () => {
  return HEADSHOT_STYLES.filter(style => !style.isPremium);
};
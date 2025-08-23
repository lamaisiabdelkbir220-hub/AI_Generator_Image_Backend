import db from "@/db";
import * as schema from '@/db/schema';
import { auth } from "@/lib/auth";
import { ASPECT_RATIOS, IMAGE_STYLE_PROMPTS, IMAGE_STYLES, IMAGE_TO_IMAGE_COST, TEXT_TO_IMAGE_COST } from "@/lib/constants";
import { imageToImage, textToImage } from "@/lib/generate-image";
import { generateImageSchema } from "@/lib/validator";
import type { IGetImgResponseType, IImageModel } from "@/types";
import { eq, sql } from "drizzle-orm";
import { addCreditHistory } from "@/backend/credit-histories";

export async function POST(req: Request) {
  const authUser = await auth(req);

  if (!authUser)
    return Response.json({ message: 'Authentication required', data: null, statusCode: 401 }, { status: 401 });

  const rawData = await req.json();
  const { success, data, error } = generateImageSchema.safeParse(rawData);

  if (!success)
    return Response.json({ message: 'Validation failed', data: null, statusCode: 422 }, { status: 422 });

  if (data.style === 'None') data.style = undefined;

  let model: IImageModel = 'text-to-image';

  if (data.image)
    model = 'image-to-image';

  const cost = model === 'image-to-image' ? IMAGE_TO_IMAGE_COST : TEXT_TO_IMAGE_COST;

  const [user] = await db.select().from(schema.users).where(eq(schema.users.id, authUser.id));

  if (user.credits < cost)
    return Response.json({ message: 'Insufficient balance', data: null, statusCode: 400 }, { status: 400 });

  if (data.style && !IMAGE_STYLES.find(it => it === data.style))
    return Response.json({ message: 'Please provide valid supported styles', data: null, statusCode: 400 }, { status: 400 });

  if (model === 'image-to-image' && data.style) {
    const stylePrompt = IMAGE_STYLE_PROMPTS.find(it => it.style === data.style);

    data.prompt = `SYSTEM: ${stylePrompt}\nUSER: ${data.prompt}`;
  }

  const ratio = ASPECT_RATIOS.find(it => it.ratio === data.aspectRatio);

  if (!ratio?.ratio)
    return Response.json({ message: 'Please provide valid supported aspect ration', data: null, statusCode: 400 }, { status: 400 });

  const [height, width] = ratio.resolution.split('x').map(Number);

  if (!data.prompt)
    return Response.json({ message: 'Please provide valid prompt or select style to generate image', data: null, statusCode: 400 }, { status: 400 });

  try {
    let imageResponse: IGetImgResponseType | null = null;

    if (model === 'text-to-image')
      imageResponse = await textToImage(data.prompt, height, width);
    else if (model === 'image-to-image' && data.image)
      imageResponse = await imageToImage(data.prompt, data.image);
    else
      throw new Error("No model selected");

    console.log({ imageResponse });

    if (imageResponse === null)
      throw new Error("image response null");

    if (imageResponse?.error) {
      switch (imageResponse?.error?.code) {
        case 'parameter_invalid_image':
          return Response.json({ message: "Invalid image format or dimensions was provided.", data: null, statusCode: 400 }, { status: 400 });
        default:
          return Response.json({ message: "Image generation failed.", data: null, statusCode: 400 }, { status: 400 });
      }
    }

    await addCreditHistory(user.id, -cost, 'IMAGE_GEN');

    console.log(`new image generated. it costed us ${imageResponse.cost}`);

    await db.update(schema.users).set({ credits: sql<number>`${schema.users.credits}-${cost}` }).where(eq(schema.users.id, authUser.id));

    return Response.json({ message: 'Image generated', data: imageResponse.url, statusCode: 200 }, { status: 200 });
  } catch (error) {
    console.error("Error generating image:", error);
    return Response.json({ message: "Unable to process request at the moment.", data: null, statusCode: 400 }, { status: 400 });
  }
}
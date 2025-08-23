import { ASPECT_RATIOS, IMAGE_STYLES, IMAGE_TO_IMAGE_COST, NO_OF_ADS_ALLOWED_TO_WATCH_IN_DAY, TEXT_TO_IMAGE_COST } from "@/lib/constants";

export async function GET(_: Request) {
    try {
        const config = {
            imageStyles: IMAGE_STYLES,
            aspectRatios: ASPECT_RATIOS,
            allowed_ads: NO_OF_ADS_ALLOWED_TO_WATCH_IN_DAY,
            cost: {
                textToImage: TEXT_TO_IMAGE_COST,
                imageToImage: IMAGE_TO_IMAGE_COST
            }
        };

        return Response.json(
            { data: config, message: 'Config data', statusCode: 200 },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching configuration:", error);
        return Response.json(
            { message: "Unable to process request at the moment.", data: null, statusCode: 400 },
            { status: 400 }
        );
    }
}

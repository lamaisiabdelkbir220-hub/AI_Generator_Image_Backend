export type IImageModel = 'text-to-image' | 'image-to-image';

export type IGetImgResponseType = {
  url: string;
  seed: number;
  cost: number;
  error?: {
    message: string;
    type: string;
    param: string;
    code: string;
  }
}

export type ICreditHistoryType = "ADS_REWARD" | "CREDIT_PURCHASE" | "IMAGE_GEN";
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

export type ICreditHistoryType = "ADS_REWARD" | "CREDIT_PURCHASE" | "IMAGE_GEN" | "HEADSHOT_GEN";

// IAP Verification Types
export type Platform = "ios" | "android";

export interface IAPVerificationRequest {
  transactionId: string;
  productId: string;
  receipt: string;
  platform: Platform;
  isTestMode?: boolean;
}

export interface IAPVerificationResponse {
  success: boolean;
  credits?: number;
  newBalance?: number;
  isTestPurchase?: boolean;
  message?: string;
  error?: string;
  details?: string;
}

export interface AppleVerificationResult {
  isValid: boolean;
  transactionId?: string;
  productId?: string;
  purchaseDate?: string;
  isTestPurchase?: boolean;
}

export interface GoogleVerificationResult {
  isValid: boolean;
  transactionId?: string;
  productId?: string;
  purchaseDate?: string;
  isTestPurchase?: boolean;
}
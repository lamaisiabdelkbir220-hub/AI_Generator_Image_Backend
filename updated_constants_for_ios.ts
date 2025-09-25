// Updated constants.ts for both Android and iOS App Store support

export const ANDROID_PRICING_PLANS = [
  { name: '10 Credits', productId: 'credits_10', credits: 10 },
  { name: '50 Credits', productId: 'credits_50', credits: 50 },
  { name: '100 Credits', productId: 'credits_100', credits: 100 },
  { name: '1000 Credits', productId: 'credits_1000', credits: 1000 },
] as const;

// NEW: iOS App Store pricing plans
export const IOS_PRICING_PLANS = [
  { name: '10 Credits', productId: 'ios_credits_10', credits: 10 },
  { name: '50 Credits', productId: 'ios_credits_50', credits: 50 },
  { name: '100 Credits', productId: 'ios_credits_100', credits: 100 },
  { name: '1000 Credits', productId: 'ios_credits_1000', credits: 1000 },
] as const;

// Combined pricing plans for universal use
export const ALL_PRICING_PLANS = [
  ...ANDROID_PRICING_PLANS,
  ...IOS_PRICING_PLANS
] as const;
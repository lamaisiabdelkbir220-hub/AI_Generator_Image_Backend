import z from "zod";

export const userSchema = z.object({
    email: z.email(),
    socialId: z.string().min(1),
    loginType: z.enum(["Google", "Apple"]),
    deviceType: z.string().min(1),
    deviceId: z.string().min(1),
    fcmToken: z.string().optional(),
});

export const IdSchema = z.object({
    deviceId: z.string(),
});

export const generateImageSchema = z.object({
    userId: z.number().optional(),
    prompt: z.string().trim().optional(),
    style: z.string().trim().optional(),
    aspectRatio: z.string(),
    image: z.string().optional(),
});

export const authRefreshSchema = z.object({
    token: z.string(),
});

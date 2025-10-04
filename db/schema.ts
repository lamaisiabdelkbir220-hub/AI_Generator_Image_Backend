import {
    boolean,
    integer,
    jsonb,
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

const timestamps = {
    updatedAt: timestamp("updated_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
};

export const loginTypeEnum = pgEnum("login_type_enum", ["Google", "Apple"]);

export const users = pgTable("users", {
    id: serial().primaryKey().notNull(),
    email: varchar({ length: 255 }).unique(),
    socialId: varchar("social_id", { length: 255 }),
    loginType: loginTypeEnum("login_type"),
    deviceType: varchar("device_type", { length: 50 }),
    deviceId: varchar("device_id", { length: 255 }),
    fcmToken: varchar("fcm_token", { length: 255 }),
    credits: integer().default(5).notNull(),
    noOfAdsWatch: integer("no_of_ads_watch").default(0).notNull(),
    isDeleted: boolean("is_deleted").default(false),
    token: text("token"),
    ...timestamps,
});

export const creditHistories = pgTable("credit_histories", {
    id: serial().primaryKey().notNull(),
    userId: integer().notNull(),
    amount: integer().notNull(),
    type: varchar("type", { length: 100 }).notNull(),
    ...timestamps,
});

// Headshot generation status enum
export const headshotStatusEnum = pgEnum("headshot_status_enum", ["queued", "processing", "completed", "failed"]);

// Headshot quality enum
export const headshotQualityEnum = pgEnum("headshot_quality_enum", ["standard", "high", "ultra"]);

// Headshot generations table
export const headshotGenerations = pgTable("headshot_generations", {
    id: serial().primaryKey().notNull(),
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    originalImageUrl: varchar("original_image_url", { length: 500 }),
    style: varchar("style", { length: 50 }).notNull(),
    aspectRatio: varchar("aspect_ratio", { length: 10 }).notNull(),
    quality: headshotQualityEnum("quality").default("high"),
    batchSize: integer("batch_size").default(1),
    status: headshotStatusEnum("status").default("queued"),
    creditsUsed: integer("credits_used").notNull(),
    progress: integer("progress").default(0),
    resultUrls: jsonb("result_urls"), // Store array of generated image URLs
    processingTime: integer("processing_time"), // Seconds taken to process
    errorMessage: text("error_message"),
    metadata: jsonb("metadata"),
    isFavorite: boolean("is_favorite").default(false),
    ...timestamps,
});

// Note: Headshot styles are managed in lib/constants.ts (HEADSHOT_STYLES)
// No database table needed - styles are hardcoded for better performance
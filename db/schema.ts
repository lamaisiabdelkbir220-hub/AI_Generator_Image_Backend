import {
    boolean,
    integer,
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
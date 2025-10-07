-- Chitra AI Database Setup - SAFE VERSION
-- This handles existing enums and tables gracefully

-- Create login type enum (only if it doesn't exist)
DO $$ BEGIN
    CREATE TYPE login_type_enum AS ENUM ('Google', 'Apple');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(255) UNIQUE,
    social_id VARCHAR(255),
    login_type login_type_enum,
    device_type VARCHAR(50),
    device_id VARCHAR(255),
    fcm_token VARCHAR(255),
    credits INTEGER DEFAULT 5 NOT NULL,
    no_of_ads_watch INTEGER DEFAULT 0 NOT NULL,
    is_deleted BOOLEAN DEFAULT false,
    token TEXT,
    updated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP
);

-- Create credit histories table - FIXED: userId instead of user_id
CREATE TABLE IF NOT EXISTS credit_histories (
    id SERIAL PRIMARY KEY NOT NULL,
    "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    type VARCHAR(100) NOT NULL,
    updated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_device_id ON users(device_id);
CREATE INDEX IF NOT EXISTS idx_users_social_id ON users(social_id);
CREATE INDEX IF NOT EXISTS idx_credit_histories_userId ON credit_histories("userId");

-- Verify tables were created
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;


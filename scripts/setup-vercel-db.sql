-- Chitra AI Database Setup for Vercel Postgres
-- Run this in Vercel Postgres Query tool or locally

-- Create login type enum
CREATE TYPE login_type_enum AS ENUM ('Google', 'Apple');

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

-- Create credit histories table
CREATE TABLE IF NOT EXISTS credit_histories (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL,
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
CREATE INDEX IF NOT EXISTS idx_credit_histories_user_id ON credit_histories(user_id);

-- Verify tables were created
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
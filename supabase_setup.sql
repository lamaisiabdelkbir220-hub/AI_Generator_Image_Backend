-- Chitra AI Database Setup for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Create login type enum
CREATE TYPE login_type_enum AS ENUM ('Google', 'Apple');

-- Create users table
CREATE TABLE users (
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
CREATE TABLE credit_histories (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    type VARCHAR(100) NOT NULL,
    updated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_device_id ON users(device_id);
CREATE INDEX idx_users_social_id ON users(social_id);
CREATE INDEX idx_credit_histories_user_id ON credit_histories(user_id);

-- Insert some sample data (optional)
-- INSERT INTO users (email, social_id, login_type, device_type, device_id, credits) 
-- VALUES ('test@example.com', 'google_123', 'Google', 'iPhone', 'device_123', 10);

-- Verify tables were created
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
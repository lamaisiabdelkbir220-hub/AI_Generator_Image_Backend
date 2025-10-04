-- Chitra AI Headshot Database Setup Script
-- This script creates the necessary tables and indexes for headshot generation

-- Create enums for headshot system
CREATE TYPE headshot_status_enum AS ENUM ('queued', 'processing', 'completed', 'failed');
CREATE TYPE headshot_quality_enum AS ENUM ('standard', 'high', 'ultra');

-- Create headshot_generations table
CREATE TABLE IF NOT EXISTS headshot_generations (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    original_image_url VARCHAR(500),
    style VARCHAR(50) NOT NULL,
    aspect_ratio VARCHAR(10) NOT NULL,
    quality headshot_quality_enum DEFAULT 'high',
    batch_size INTEGER DEFAULT 1,
    status headshot_status_enum DEFAULT 'queued',
    credits_used INTEGER NOT NULL,
    progress INTEGER DEFAULT 0,
    result_urls JSONB, -- Store array of generated image URLs
    processing_time INTEGER, -- Seconds taken to process
    error_message TEXT,
    metadata JSONB,
    is_favorite BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_headshot_generations_user_id ON headshot_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_headshot_generations_status ON headshot_generations(status);
CREATE INDEX IF NOT EXISTS idx_headshot_generations_created_at ON headshot_generations(created_at);

-- Update credit_histories type enum to include headshot generation
-- Note: This requires manual intervention as PostgreSQL doesn't allow direct enum modification
-- You may need to run this separately or use a different approach

-- Add comment to track schema version
COMMENT ON TABLE headshot_generations IS 'Headshot generation tracking - Styles managed in lib/constants.ts';

-- Display success message
SELECT 'Headshot database setup completed successfully!' as status;
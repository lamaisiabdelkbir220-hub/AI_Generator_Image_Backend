-- ============================================
-- IAP (In-App Purchase) Database Setup Script
-- For Vercel Postgres / Supabase
-- ============================================

-- Create platform enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE platform_enum AS ENUM ('ios', 'android');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    transaction_id VARCHAR(255) NOT NULL UNIQUE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id VARCHAR(255) NOT NULL,
    credits INTEGER NOT NULL,
    platform platform_enum NOT NULL,
    is_test BOOLEAN DEFAULT false,
    receipt TEXT,
    verified_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_transaction_id ON transactions(transaction_id);
CREATE INDEX IF NOT EXISTS idx_transactions_verified_at ON transactions(verified_at);
CREATE INDEX IF NOT EXISTS idx_transactions_platform ON transactions(platform);

-- Add comment
COMMENT ON TABLE transactions IS 'Stores verified in-app purchase transactions from Apple App Store and Google Play Store';
COMMENT ON COLUMN transactions.transaction_id IS 'Unique transaction ID from store (used to prevent duplicate purchases)';
COMMENT ON COLUMN transactions.is_test IS 'True if this was a test purchase (StoreKit simulator or test mode)';
COMMENT ON COLUMN transactions.receipt IS 'Truncated receipt data for audit purposes';

-- ============================================
-- Verification Queries
-- ============================================

-- Check if setup was successful
SELECT 
    'Setup Complete!' as status,
    COUNT(*) as transaction_count,
    COUNT(DISTINCT user_id) as unique_users
FROM transactions;

-- View recent transactions
SELECT 
    t.id,
    t.transaction_id,
    u.email,
    t.product_id,
    t.credits,
    t.platform,
    t.is_test,
    t.verified_at
FROM transactions t
JOIN users u ON u.id = t.user_id
ORDER BY t.verified_at DESC
LIMIT 10;

-- Migration script to add user_id to shops table
-- Run this in phpMyAdmin SQL tab

USE digimart;

-- Add user_id column to shops table if it doesn't exist
ALTER TABLE shops 
ADD COLUMN IF NOT EXISTS user_id INT AFTER id;

-- Add foreign key constraint
ALTER TABLE shops 
ADD CONSTRAINT fk_shops_user_id 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Optional: Update existing shops to link to users (if you have test data)
-- You'll need to manually assign shops to users based on your test scenario
-- Example: UPDATE shops SET user_id = 1 WHERE id = 1;

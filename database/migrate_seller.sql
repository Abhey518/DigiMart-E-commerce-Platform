-- Add is_seller to users table
ALTER TABLE users ADD COLUMN is_seller TINYINT(1) DEFAULT 0;

-- Add user_id to shops table and link it to users
ALTER TABLE shops ADD COLUMN user_id INT;
ALTER TABLE shops ADD CONSTRAINT fk_shop_owner FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

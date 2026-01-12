-- Database Schema for DigiMart (MySQL / XAMPP)
-- Import this into phpMyAdmin

CREATE DATABASE IF NOT EXISTS digimart;
USE digimart;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Shops Table
CREATE TABLE IF NOT EXISTS shops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    contact_phone VARCHAR(20),
    contact_email VARCHAR(150),
    image_url VARCHAR(255),
    rating DECIMAL(3, 2) DEFAULT 0.00,
    review_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shop_id INT,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    image_url VARCHAR(255),
    short_description VARCHAR(255),
    long_description TEXT,
    sold_count INT DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    reviews_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending', -- Pending, Processing, Shipped, Delivered
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 5. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price_at_time DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Seed Data

INSERT INTO shops (name, description, contact_phone, contact_email, rating, review_count, image_url) VALUES
('TechHub Colombo', 'Your one-stop shop for electronics.', '+94 77 123 4567', 'info@techhub.lk', 4.7, 156, 'images/shop-tech.jpg'),
('Campus Fashion', 'Trendy clothing for students.', '+94 71 234 5678', 'hello@campusfashion.lk', 4.5, 203, 'images/shop-fashion.jpg'),
('Engineering Supplies Co.', 'Components and kits.', '+94 76 345 6789', 'sales@engsupplies.lk', 4.8, 89, 'images/shop-eng.jpg'),
('HomeStyle Boutique', 'Artisan home goods.', '+94 75 456 7890', 'contact@homestyleboutique.lk', 4.6, 134, 'images/shop-home.jpg');

INSERT INTO products (shop_id, name, category, price, original_price, image_url, short_description, long_description) VALUES
(2, 'Navy Hoodie', 'Clothing', 1800.00, NULL, 'images/hoodie.jpg', 'Comfortable uni hoodie with pocket.', 'Soft cotton-blend hoodie...'),
(1, 'USB-C Fast Charger 30W', 'Electronics', 1500.00, 1700.00, 'images/charger.jpg', 'Compact fast charger.', 'Portable 30W USB-C charger...'),
(1, 'Power Bank 10000mAh', 'Electronics', 1400.00, 1800.00, 'images/powerbank.jpg', 'Slim power bank.', 'Reliable 10000mAh battery...'),
(3, 'Arduino Uno R3 Kit', 'Academic', 980.00, 1100.00, 'images/arduino.jpg', 'Starter kit for projects.', 'Includes board and components...'),
(3, 'Breadboard + Jumper Set', 'Academic', 700.00, NULL, 'images/breadboard.jpg', 'Breadboard and jumpers.', 'Standard breadboard...'),
(1, 'Smart Pen (Digital)', 'Electronics', 1300.00, 1500.00, 'images/smartpen.jpg', 'Digitize notes easily.', 'Records strokes...'),
(2, 'Classic Cotton T-Shirt', 'Clothing', 1200.00, NULL, 'images/blue-t-shirt.jpg', 'Everyday tee.', 'Soft 100% cotton...'),
(1, 'Wireless Earbuds', 'Electronics', 2500.00, NULL, 'images/earbuds.jpg', 'Affordable wireless audio.', 'Bluetooth earbuds...'),
(4, 'Ceramic Mug', 'Home', 800.00, NULL, 'images/mug.jpg', 'Unique hand-crafted mug.', 'Locally made...'),
(4, 'Organic Scented Candle', 'Home', 950.00, NULL, 'images/candle.jpg', 'Soy wax candle.', 'Hand-poured...');

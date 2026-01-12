# DigiMart - Backend Implementation Guide (PHP + MySQL)

## 📋 Table of Contents

1. [Database Schema](#database-schema)
2. [API Endpoints](#api-endpoints)
3. [Authentication System](#authentication-system)
4. [User Management](#user-management)
5. [Seller Management](#seller-management)
6. [Product Management](#product-management)
7. [Cart & Orders](#cart--orders)
8. [Wishlist System](#wishlist-system)
9. [File Upload](#file-upload)
10. [Security Considerations](#security-considerations)

---

## 🗄️ Database Schema

### 1. Users Table

```sql
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    payment_method VARCHAR(100),
    is_seller BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_is_seller (is_seller)
);
```

### 2. Seller Applications Table

```sql
CREATE TABLE seller_applications (
    application_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    shop_name VARCHAR(255) NOT NULL,
    shop_category VARCHAR(100) NOT NULL,
    shop_description TEXT,
    business_type ENUM('individual', 'registered_business', 'partnership', 'corporation') NOT NULL,
    business_registration_number VARCHAR(100),
    tax_id VARCHAR(100),
    business_email VARCHAR(255),
    business_phone VARCHAR(20),
    business_address TEXT,
    business_city VARCHAR(100),
    business_state VARCHAR(100),
    business_zip VARCHAR(20),
    business_country VARCHAR(100),
    account_holder_name VARCHAR(255),
    bank_name VARCHAR(255),
    account_number VARCHAR(100),
    routing_number VARCHAR(100),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    rejection_reason TEXT,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_user_id (user_id)
);
```

### 3. Products Table

```sql
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    seller_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    sku VARCHAR(100),
    image_url VARCHAR(500),
    sold_count INT DEFAULT 0,
    average_rating DECIMAL(3, 2) DEFAULT 0,
    review_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_seller (seller_id),
    INDEX idx_category (category),
    INDEX idx_active (is_active),
    INDEX idx_created (created_at)
);
```

### 4. Product Images Table (for multiple images)

```sql
CREATE TABLE product_images (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    INDEX idx_product (product_id)
);
```

### 5. Orders Table

```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    delivery_address TEXT NOT NULL,
    delivery_city VARCHAR(100),
    delivery_state VARCHAR(100),
    delivery_zip VARCHAR(20),
    delivery_country VARCHAR(100),
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    payment_method VARCHAR(100),
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    order_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_order_number (order_number)
);
```

### 6. Order Items Table

```sql
CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    seller_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (seller_id) REFERENCES users(user_id),
    INDEX idx_order (order_id),
    INDEX idx_seller (seller_id)
);
```

### 7. Reviews Table

```sql
CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    order_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    images TEXT, -- JSON array of image URLs
    is_verified_purchase BOOLEAN DEFAULT TRUE,
    helpful_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    INDEX idx_product (product_id),
    INDEX idx_user (user_id),
    UNIQUE KEY unique_review (product_id, user_id, order_id)
);
```

### 8. Wishlist Table

```sql
CREATE TABLE wishlist (
    wishlist_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    UNIQUE KEY unique_wishlist (user_id, product_id),
    INDEX idx_user (user_id)
);
```

### 9. Cart Table

```sql
CREATE TABLE cart (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    UNIQUE KEY unique_cart_item (user_id, product_id),
    INDEX idx_user (user_id)
);
```

### 10. Shop Messages Table (Contact Shop Feature)

```sql
CREATE TABLE shop_messages (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    seller_id INT NOT NULL,
    sender_name VARCHAR(255) NOT NULL,
    sender_email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_seller (seller_id),
    INDEX idx_read (is_read)
);
```

### 11. Shop Settings Table

```sql
CREATE TABLE shop_settings (
    setting_id INT PRIMARY KEY AUTO_INCREMENT,
    seller_id INT NOT NULL UNIQUE,
    shop_name VARCHAR(255),
    shop_category VARCHAR(100),
    shop_description TEXT,
    shop_logo_url VARCHAR(500),
    shop_banner_url VARCHAR(500),
    business_email VARCHAR(255),
    business_phone VARCHAR(20),
    business_address TEXT,
    business_city VARCHAR(100),
    business_state VARCHAR(100),
    business_zip VARCHAR(20),
    business_country VARCHAR(100),
    account_holder_name VARCHAR(255),
    bank_name VARCHAR(255),
    account_number VARCHAR(100),
    routing_number VARCHAR(100),
    swift_code VARCHAR(50),
    email_notifications BOOLEAN DEFAULT TRUE,
    order_notifications BOOLEAN DEFAULT TRUE,
    low_stock_alerts BOOLEAN DEFAULT TRUE,
    marketing_emails BOOLEAN DEFAULT FALSE,
    shop_is_active BOOLEAN DEFAULT TRUE,
    vacation_mode BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_seller (seller_id),
    INDEX idx_active (shop_is_active)
);
```

---

## 🔌 API Endpoints

### Base URL Structure

```
/api/v1/{endpoint}
```

### Authentication Endpoints

#### 1. Register User

```
POST /api/v1/auth/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (201 Created):
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "is_seller": false
  }
}

Error (400 Bad Request):
{
  "success": false,
  "message": "Email already exists"
}
```

#### 2. Login User

```
POST /api/v1/auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (200 OK):
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "user_id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "is_seller": false
    },
    "token": "jwt_token_here"
  }
}

Error (401 Unauthorized):
{
  "success": false,
  "message": "Invalid email or password"
}
```

#### 3. Logout User

```
POST /api/v1/auth/logout
Authorization: Bearer {token}

Response (200 OK):
{
  "success": true,
  "message": "Logged out successfully"
}
```

### User Management Endpoints

#### 4. Get User Profile

```
GET /api/v1/users/profile
Authorization: Bearer {token}

Response (200 OK):
{
  "success": true,
  "data": {
    "user_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St",
    "payment_method": "Credit Card",
    "is_seller": false,
    "created_at": "2025-12-18T10:00:00Z"
  }
}
```

#### 5. Update User Profile

```
PUT /api/v1/users/profile
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "name": "John Doe Updated",
  "phone": "+1234567890",
  "address": "456 New St",
  "payment_method": "PayPal"
}

Response (200 OK):
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user_id": 1,
    "name": "John Doe Updated",
    ...
  }
}
```

### Seller Management Endpoints

#### 6. Submit Seller Application

```
POST /api/v1/sellers/apply
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "shop_name": "My Awesome Shop",
  "shop_category": "Electronics",
  "shop_description": "We sell electronics",
  "business_type": "registered_business",
  "business_registration_number": "123456",
  "tax_id": "TAX123",
  "business_email": "shop@example.com",
  "business_phone": "+1234567890",
  "business_address": "123 Business St",
  "business_city": "New York",
  "business_state": "NY",
  "business_zip": "10001",
  "business_country": "USA",
  "account_holder_name": "John Doe",
  "bank_name": "Bank of America",
  "account_number": "1234567890",
  "routing_number": "987654321"
}

Response (201 Created):
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "application_id": 1,
    "status": "pending"
  }
}
```

#### 7. Get Seller Application Status

```
GET /api/v1/sellers/application
Authorization: Bearer {token}

Response (200 OK):
{
  "success": true,
  "data": {
    "application_id": 1,
    "shop_name": "My Awesome Shop",
    "status": "approved",
    "applied_at": "2025-12-18T10:00:00Z",
    "reviewed_at": "2025-12-19T10:00:00Z"
  }
}
```

#### 8. Admin: Approve/Reject Seller Application

```
PUT /api/v1/admin/sellers/applications/{application_id}
Authorization: Bearer {admin_token}
Content-Type: application/json

Request Body:
{
  "status": "approved", // or "rejected"
  "rejection_reason": "Optional reason if rejected"
}

Response (200 OK):
{
  "success": true,
  "message": "Application approved successfully"
}
```

### Product Management Endpoints

#### 9. Create Product (Seller Only)

```
POST /api/v1/products
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "name": "Smartphone X",
  "category": "Electronics",
  "description": "Latest smartphone with amazing features",
  "price": 599.99,
  "stock_quantity": 100,
  "sku": "PHONE-001",
  "image_url": "https://example.com/image.jpg"
}

Response (201 Created):
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "product_id": 1,
    "seller_id": 1,
    "name": "Smartphone X",
    "price": 599.99,
    "created_at": "2025-12-18T10:00:00Z"
  }
}
```

#### 10. Get All Products (Public)

```
GET /api/v1/products?page=1&limit=20&category=Electronics&search=phone

Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 20, max: 100)
- category: Filter by category (optional)
- search: Search term (optional)
- min_price: Minimum price (optional)
- max_price: Maximum price (optional)
- seller_id: Filter by seller (optional)

Response (200 OK):
{
  "success": true,
  "data": {
    "products": [
      {
        "product_id": 1,
        "seller_id": 1,
        "seller_name": "My Awesome Shop",
        "name": "Smartphone X",
        "category": "Electronics",
        "price": 599.99,
        "stock_quantity": 100,
        "image_url": "https://example.com/image.jpg",
        "average_rating": 4.5,
        "review_count": 10,
        "sold_count": 25
      },
      ...
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 5,
      "total_items": 100,
      "items_per_page": 20
    }
  }
}
```

#### 11. Get Single Product

```
GET /api/v1/products/{product_id}

Response (200 OK):
{
  "success": true,
  "data": {
    "product_id": 1,
    "seller_id": 1,
    "seller_name": "My Awesome Shop",
    "name": "Smartphone X",
    "category": "Electronics",
    "description": "Full description...",
    "price": 599.99,
    "stock_quantity": 100,
    "sku": "PHONE-001",
    "image_url": "https://example.com/image.jpg",
    "additional_images": [
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    "average_rating": 4.5,
    "review_count": 10,
    "sold_count": 25,
    "created_at": "2025-12-18T10:00:00Z"
  }
}
```

#### 12. Update Product (Seller Only - Own Products)

```
PUT /api/v1/products/{product_id}
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "name": "Updated Smartphone X",
  "price": 549.99,
  "stock_quantity": 150
}

Response (200 OK):
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "product_id": 1,
    "name": "Updated Smartphone X",
    "price": 549.99
  }
}
```

#### 13. Delete Product (Seller Only - Own Products)

```
DELETE /api/v1/products/{product_id}
Authorization: Bearer {token}

Response (200 OK):
{
  "success": true,
  "message": "Product deleted successfully"
}
```

#### 14. Get Seller's Products

```
GET /api/v1/sellers/products
Authorization: Bearer {token}

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "product_id": 1,
      "name": "Smartphone X",
      "price": 599.99,
      "stock_quantity": 100,
      "sold_count": 25,
      "average_rating": 4.5,
      "review_count": 10,
      "is_active": true
    },
    ...
  ]
}
```

### Cart Endpoints

#### 15. Get User's Cart

```
GET /api/v1/cart
Authorization: Bearer {token}

Response (200 OK):
{
  "success": true,
  "data": {
    "items": [
      {
        "cart_id": 1,
        "product_id": 1,
        "product_name": "Smartphone X",
        "price": 599.99,
        "quantity": 2,
        "image_url": "https://example.com/image.jpg",
        "stock_available": 100,
        "subtotal": 1199.98
      },
      ...
    ],
    "total_amount": 1199.98,
    "total_items": 2
  }
}
```

#### 16. Add to Cart

```
POST /api/v1/cart
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "product_id": 1,
  "quantity": 2
}

Response (201 Created):
{
  "success": true,
  "message": "Product added to cart",
  "data": {
    "cart_id": 1,
    "product_id": 1,
    "quantity": 2
  }
}
```

#### 17. Update Cart Item

```
PUT /api/v1/cart/{cart_id}
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "quantity": 3
}

Response (200 OK):
{
  "success": true,
  "message": "Cart updated successfully"
}
```

#### 18. Remove from Cart

```
DELETE /api/v1/cart/{cart_id}
Authorization: Bearer {token}

Response (200 OK):
{
  "success": true,
  "message": "Item removed from cart"
}
```

#### 19. Clear Cart

```
DELETE /api/v1/cart
Authorization: Bearer {token}

Response (200 OK):
{
  "success": true,
  "message": "Cart cleared successfully"
}
```

### Order Endpoints

#### 20. Create Order (Checkout)

```
POST /api/v1/orders
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "delivery_address": "123 Main St",
  "delivery_city": "New York",
  "delivery_state": "NY",
  "delivery_zip": "10001",
  "delivery_country": "USA",
  "payment_method": "Credit Card",
  "order_notes": "Please deliver between 9-5"
}

Response (201 Created):
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "order_id": 1,
    "order_number": "ORD-20251218-001",
    "total_amount": 1199.98,
    "status": "pending",
    "created_at": "2025-12-18T10:00:00Z"
  }
}
```

#### 21. Get User's Orders

```
GET /api/v1/orders?page=1&limit=10&status=pending
Authorization: Bearer {token}

Response (200 OK):
{
  "success": true,
  "data": {
    "orders": [
      {
        "order_id": 1,
        "order_number": "ORD-20251218-001",
        "total_amount": 1199.98,
        "status": "processing",
        "items_count": 2,
        "created_at": "2025-12-18T10:00:00Z"
      },
      ...
    ],
    "pagination": {...}
  }
}
```

#### 22. Get Order Details

```
GET /api/v1/orders/{order_id}
Authorization: Bearer {token}

Response (200 OK):
{
  "success": true,
  "data": {
    "order_id": 1,
    "order_number": "ORD-20251218-001",
    "total_amount": 1199.98,
    "delivery_address": "123 Main St, New York, NY 10001, USA",
    "status": "processing",
    "payment_method": "Credit Card",
    "payment_status": "paid",
    "items": [
      {
        "product_id": 1,
        "product_name": "Smartphone X",
        "seller_name": "My Awesome Shop",
        "quantity": 2,
        "unit_price": 599.99,
        "subtotal": 1199.98,
        "image_url": "https://example.com/image.jpg"
      }
    ],
    "created_at": "2025-12-18T10:00:00Z",
    "updated_at": "2025-12-18T11:00:00Z"
  }
}
```

#### 23. Get Seller's Orders (Seller Only)

```
GET /api/v1/sellers/orders?status=pending
Authorization: Bearer {token}

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "order_item_id": 1,
      "order_number": "ORD-20251218-001",
      "customer_name": "John Doe",
      "product_name": "Smartphone X",
      "quantity": 2,
      "subtotal": 1199.98,
      "order_status": "processing",
      "order_date": "2025-12-18T10:00:00Z"
    },
    ...
  ]
}
```

#### 24. Update Order Status (Seller Only)

```
PUT /api/v1/sellers/orders/{order_id}/status
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "status": "shipped"
}

Response (200 OK):
{
  "success": true,
  "message": "Order status updated successfully"
}
```

### Wishlist Endpoints

#### 25. Get Wishlist

```
GET /api/v1/wishlist
Authorization: Bearer {token}

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "wishlist_id": 1,
      "product_id": 1,
      "product_name": "Smartphone X",
      "price": 599.99,
      "image_url": "https://example.com/image.jpg",
      "stock_available": 100,
      "added_at": "2025-12-18T10:00:00Z"
    },
    ...
  ]
}
```

#### 26. Add to Wishlist

```
POST /api/v1/wishlist
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "product_id": 1
}

Response (201 Created):
{
  "success": true,
  "message": "Product added to wishlist"
}
```

#### 27. Remove from Wishlist

```
DELETE /api/v1/wishlist/{wishlist_id}
Authorization: Bearer {token}

Response (200 OK):
{
  "success": true,
  "message": "Product removed from wishlist"
}
```

### Review Endpoints

#### 28. Create Review (After Purchase)

```
POST /api/v1/reviews
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "product_id": 1,
  "order_id": 1,
  "rating": 5,
  "review_text": "Excellent product!",
  "images": ["https://example.com/review1.jpg"]
}

Response (201 Created):
{
  "success": true,
  "message": "Review submitted successfully",
  "data": {
    "review_id": 1,
    "product_id": 1,
    "rating": 5
  }
}
```

#### 29. Get Product Reviews

```
GET /api/v1/products/{product_id}/reviews?page=1&limit=10

Response (200 OK):
{
  "success": true,
  "data": {
    "reviews": [
      {
        "review_id": 1,
        "user_name": "John D.",
        "rating": 5,
        "review_text": "Excellent product!",
        "images": ["https://example.com/review1.jpg"],
        "is_verified_purchase": true,
        "helpful_count": 10,
        "created_at": "2025-12-18T10:00:00Z"
      },
      ...
    ],
    "summary": {
      "average_rating": 4.5,
      "total_reviews": 100,
      "rating_breakdown": {
        "5": 60,
        "4": 25,
        "3": 10,
        "2": 3,
        "1": 2
      }
    },
    "pagination": {...}
  }
}
```

### Shop Settings Endpoints

#### 30. Get Shop Settings (Seller Only)

```
GET /api/v1/sellers/shop-settings
Authorization: Bearer {token}

Response (200 OK):
{
  "success": true,
  "data": {
    "shop_info": {
      "name": "My Awesome Shop",
      "category": "Electronics",
      "description": "We sell electronics",
      "logo_url": "https://example.com/logo.jpg",
      "banner_url": "https://example.com/banner.jpg"
    },
    "business_details": {
      "email": "business@example.com",
      "phone": "+1234567890",
      "address": "123 Business St",
      "city": "New York",
      "state": "NY",
      "zip": "10001",
      "country": "USA"
    },
    "payment_settings": {
      "account_holder": "John Doe",
      "bank_name": "Bank of America",
      "account_number": "••••••1234",
      "routing_number": "987654321",
      "swift_code": "BOFAUS3N"
    },
    "notifications": {
      "email_enabled": true,
      "order_notifications": true,
      "low_stock_alerts": true,
      "marketing_emails": false
    },
    "shop_status": {
      "is_active": true,
      "vacation_mode": false
    }
  }
}
```

#### 31. Update Shop Information (Seller Only)

```
PUT /api/v1/sellers/shop-settings/info
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "name": "My Updated Shop",
  "category": "Electronics",
  "description": "Updated description",
  "logo_url": "https://example.com/new-logo.jpg",
  "banner_url": "https://example.com/new-banner.jpg"
}

Response (200 OK):
{
  "success": true,
  "message": "Shop information updated successfully"
}
```

#### 32. Update Business Details (Seller Only)

```
PUT /api/v1/sellers/shop-settings/business
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "email": "business@example.com",
  "phone": "+1234567890",
  "address": "123 Business St",
  "city": "New York",
  "state": "NY",
  "zip": "10001",
  "country": "USA"
}

Response (200 OK):
{
  "success": true,
  "message": "Business details updated successfully"
}
```

#### 33. Update Payment Settings (Seller Only)

```
PUT /api/v1/sellers/shop-settings/payment
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "account_holder": "John Doe",
  "bank_name": "Bank of America",
  "account_number": "1234567890",
  "routing_number": "987654321",
  "swift_code": "BOFAUS3N"
}

Response (200 OK):
{
  "success": true,
  "message": "Payment settings updated successfully"
}
```

#### 34. Update Notification Preferences (Seller Only)

```
PUT /api/v1/sellers/shop-settings/notifications
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "email_enabled": true,
  "order_notifications": true,
  "low_stock_alerts": true,
  "marketing_emails": false
}

Response (200 OK):
{
  "success": true,
  "message": "Notification preferences updated successfully"
}
```

#### 35. Update Shop Status (Seller Only)

```
PUT /api/v1/sellers/shop-settings/status
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "is_active": true,
  "vacation_mode": false
}

Response (200 OK):
{
  "success": true,
  "message": "Shop status updated successfully"
}
```

### Shop Message Endpoints

#### 36. Send Message to Shop

```
POST /api/v1/shops/{seller_id}/messages
Content-Type: application/json

Request Body:
{
  "sender_name": "John Doe",
  "sender_email": "john@example.com",
  "message": "I have a question about your product..."
}

Response (201 Created):
{
  "success": true,
  "message": "Message sent successfully"
}
```

#### 37. Get Shop Messages (Seller Only)

```
GET /api/v1/sellers/messages?is_read=false
Authorization: Bearer {token}

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "message_id": 1,
      "sender_name": "John Doe",
      "sender_email": "john@example.com",
      "message": "I have a question...",
      "is_read": false,
      "created_at": "2025-12-18T10:00:00Z"
    },
    ...
  ]
}
```

---

## 🔐 Authentication System

### JWT Implementation

#### Token Structure

```php
// config/jwt.php
define('JWT_SECRET', 'your-secret-key-here'); // Store in environment variable
define('JWT_ALGORITHM', 'HS256');
define('JWT_EXPIRATION', 86400); // 24 hours

// Generate Token
function generateToken($userId, $email, $isSeller) {
    $issuedAt = time();
    $expirationTime = $issuedAt + JWT_EXPIRATION;

    $payload = [
        'iat' => $issuedAt,
        'exp' => $expirationTime,
        'user_id' => $userId,
        'email' => $email,
        'is_seller' => $isSeller
    ];

    // Use Firebase JWT library or similar
    return JWT::encode($payload, JWT_SECRET, JWT_ALGORITHM);
}

// Verify Token
function verifyToken($token) {
    try {
        $decoded = JWT::decode($token, JWT_SECRET, [JWT_ALGORITHM]);
        return (array) $decoded;
    } catch (Exception $e) {
        return false;
    }
}
```

#### Middleware for Protected Routes

```php
// middleware/auth.php
function requireAuth() {
    $headers = getallheaders();
    $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';

    if (empty($authHeader)) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'No token provided']);
        exit;
    }

    // Extract token from "Bearer {token}"
    $token = str_replace('Bearer ', '', $authHeader);

    $decoded = verifyToken($token);
    if (!$decoded) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid or expired token']);
        exit;
    }

    return $decoded;
}

// Middleware for seller-only routes
function requireSeller() {
    $user = requireAuth();

    if (!$user['is_seller']) {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Seller access required']);
        exit;
    }

    return $user;
}
```

### Password Hashing

```php
// Hash password on registration
$hashedPassword = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

// Verify password on login
if (password_verify($inputPassword, $storedHashedPassword)) {
    // Password is correct
}
```

---

## 🛠️ PHP Implementation Examples

### Database Connection

```php
// config/database.php
class Database {
    private $host = 'localhost';
    private $db_name = 'digimart';
    private $username = 'root';
    private $password = '';
    private $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch(PDOException $e) {
            echo "Connection Error: " . $e->getMessage();
        }

        return $this->conn;
    }
}
```

### User Registration Example

```php
// api/v1/auth/register.php
require_once '../config/database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

// Validate input
if (empty($data['name']) || empty($data['email']) || empty($data['password'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

// Validate email format
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Validate password strength
if (strlen($data['password']) < 6) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters']);
    exit;
}

try {
    $database = new Database();
    $db = $database->getConnection();

    // Check if email already exists
    $checkQuery = "SELECT user_id FROM users WHERE email = :email";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':email', $data['email']);
    $checkStmt->execute();

    if ($checkStmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Email already exists']);
        exit;
    }

    // Hash password
    $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT, ['cost' => 12]);

    // Insert user
    $query = "INSERT INTO users (name, email, password_hash) VALUES (:name, :email, :password)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':name', $data['name']);
    $stmt->bindParam(':email', $data['email']);
    $stmt->bindParam(':password', $hashedPassword);

    if ($stmt->execute()) {
        $userId = $db->lastInsertId();

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'User registered successfully',
            'data' => [
                'user_id' => $userId,
                'name' => $data['name'],
                'email' => $data['email'],
                'is_seller' => false
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Registration failed']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
```

### Product Creation Example

```php
// api/v1/products/create.php
require_once '../../config/database.php';
require_once '../../middleware/auth.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Verify seller authentication
$user = requireSeller();

$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$requiredFields = ['name', 'category', 'description', 'price', 'stock_quantity'];
foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => ucfirst($field) . ' is required']);
        exit;
    }
}

// Validate price and stock
if ($data['price'] <= 0 || $data['stock_quantity'] < 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid price or stock quantity']);
    exit;
}

try {
    $database = new Database();
    $db = $database->getConnection();

    $query = "INSERT INTO products
              (seller_id, name, category, description, price, stock_quantity, sku, image_url)
              VALUES
              (:seller_id, :name, :category, :description, :price, :stock, :sku, :image)";

    $stmt = $db->prepare($query);
    $stmt->bindParam(':seller_id', $user['user_id']);
    $stmt->bindParam(':name', $data['name']);
    $stmt->bindParam(':category', $data['category']);
    $stmt->bindParam(':description', $data['description']);
    $stmt->bindParam(':price', $data['price']);
    $stmt->bindParam(':stock', $data['stock_quantity']);
    $stmt->bindParam(':sku', $data['sku']);
    $stmt->bindParam(':image', $data['image_url']);

    if ($stmt->execute()) {
        $productId = $db->lastInsertId();

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Product created successfully',
            'data' => [
                'product_id' => $productId,
                'seller_id' => $user['user_id'],
                'name' => $data['name'],
                'price' => $data['price'],
                'created_at' => date('Y-m-d H:i:s')
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to create product']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
```

---

## 📤 File Upload Implementation

### Image Upload for Products

```php
// api/v1/upload/image.php
require_once '../../middleware/auth.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Verify authentication
$user = requireAuth();

if (!isset($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'No file uploaded']);
    exit;
}

$file = $_FILES['image'];

// Validate file
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
$maxSize = 5 * 1024 * 1024; // 5MB

if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid file type. Only JPEG, PNG, GIF, WEBP allowed']);
    exit;
}

if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'File too large. Maximum size is 5MB']);
    exit;
}

// Generate unique filename
$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = uniqid('product_') . '_' . time() . '.' . $extension;

// Upload directory
$uploadDir = '../../uploads/products/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$uploadPath = $uploadDir . $filename;

if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
    $imageUrl = '/uploads/products/' . $filename;

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Image uploaded successfully',
        'data' => [
            'image_url' => $imageUrl
        ]
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to upload image']);
}
```

---

## 🔒 Security Considerations

### 1. SQL Injection Prevention

- **Always use prepared statements** with parameterized queries
- Never concatenate user input directly into SQL queries

### 2. XSS Prevention

- Sanitize all user input before displaying
- Use `htmlspecialchars()` for output
- Implement Content Security Policy (CSP) headers

### 3. CSRF Protection

```php
// Generate CSRF token
session_start();
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Verify CSRF token
function verifyCsrfToken($token) {
    return hash_equals($_SESSION['csrf_token'], $token);
}
```

### 4. Rate Limiting

```php
// Simple rate limiting example
function checkRateLimit($identifier, $maxRequests = 100, $timeWindow = 3600) {
    $cacheFile = sys_get_temp_dir() . '/rate_limit_' . md5($identifier);

    if (file_exists($cacheFile)) {
        $data = json_decode(file_get_contents($cacheFile), true);

        if (time() - $data['start_time'] < $timeWindow) {
            if ($data['count'] >= $maxRequests) {
                http_response_code(429);
                echo json_encode(['success' => false, 'message' => 'Too many requests']);
                exit;
            }
            $data['count']++;
        } else {
            $data = ['start_time' => time(), 'count' => 1];
        }
    } else {
        $data = ['start_time' => time(), 'count' => 1];
    }

    file_put_contents($cacheFile, json_encode($data));
}
```

### 5. Environment Variables

```php
// .env file (never commit to git)
DB_HOST=localhost
DB_NAME=digimart
DB_USER=your_user
DB_PASS=your_password
JWT_SECRET=your_secret_key
```

### 6. HTTPS Only

- Enforce HTTPS in production
- Set secure cookie flags
- Use HSTS headers

### 7. Input Validation

```php
// Validate and sanitize input
function validateInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
```

---

## 📊 Analytics & Reporting Queries

### Seller Dashboard Statistics

```sql
-- Total revenue for seller
SELECT SUM(oi.subtotal) as total_revenue
FROM order_items oi
JOIN orders o ON oi.order_id = o.order_id
WHERE oi.seller_id = ?
AND o.payment_status = 'paid';

-- Total products sold
SELECT SUM(quantity) as total_sold
FROM order_items
WHERE seller_id = ?;

-- Products low in stock (< 10 items)
SELECT product_id, name, stock_quantity
FROM products
WHERE seller_id = ?
AND stock_quantity < 10
AND is_active = TRUE;

-- Recent orders for seller
SELECT o.order_number, o.total_amount, o.status, o.created_at,
       COUNT(oi.order_item_id) as items_count
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
WHERE oi.seller_id = ?
GROUP BY o.order_id
ORDER BY o.created_at DESC
LIMIT 10;
```

---

## 🚀 Deployment Checklist

### Production Setup

1. ✅ Set up SSL certificate (HTTPS)
2. ✅ Configure environment variables
3. ✅ Enable error logging (disable error display)
4. ✅ Set up database backups
5. ✅ Configure CORS properly
6. ✅ Set up CDN for static assets
7. ✅ Enable gzip compression
8. ✅ Implement caching (Redis/Memcached)
9. ✅ Set up monitoring and alerts
10. ✅ Configure rate limiting

### Database Optimization

1. Add proper indexes on frequently queried columns
2. Use connection pooling
3. Implement query caching
4. Regular database maintenance (OPTIMIZE TABLE)
5. Monitor slow query log

---

## 📞 Support & Questions

For any questions or clarifications about the backend implementation, refer to the System Functions documentation or contact the project lead.

**Happy Coding! 🚀**

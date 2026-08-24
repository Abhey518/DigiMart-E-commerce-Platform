# DigiMart — E-Commerce Marketplace Platform

<div align="center">
  
  ![DigiMart](images/logo.png)
</div>
**DigiMart** is a comprehensive e-commerce marketplace platform designed to bridge the gap between local businesses and customers. It empowers small and medium enterprises to establish their digital presence while providing customers with a curated marketplace of quality products and services.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [User Roles](#user-roles)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

DigiMart is a full-stack e-commerce solution that connects local businesses with customers through a modern, seamless online platform. The platform supports multiple user roles (customers and sellers) and provides comprehensive features for product management, order processing, and shop administration.

### Key Highlights

- 🏪 **Multi-Vendor Marketplace** - Multiple sellers can register and manage their own shops
- 🛒 **Complete Shopping Experience** - Browse, search, cart, wishlist, and checkout functionality
- 📊 **Seller Dashboard** - Comprehensive dashboard for sellers to manage products, orders, and shop settings
- 📱 **Fully Responsive** - Mobile-first design that works seamlessly across all devices
- 🔒 **Secure Authentication** - User registration, login, and session management
- 💳 **Order Management** - Complete order tracking from placement to delivery

---

## ✨ Features

### For Customers

- **Product Browsing**

  - Browse thousands of products across multiple categories
  - Advanced search and filtering capabilities
  - Product detail pages with reviews and ratings
  - Category-based navigation

- **Shopping Cart**

  - Add/remove products
  - Update quantities
  - Real-time price calculations
  - Persistent cart storage

- **Wishlist**

  - Save products for later
  - Quick add to cart from wishlist
  - Heart icon toggle for easy management

- **Order Management**

  - Order history and tracking
  - Order status updates (Pending → Processing → Shipped → Delivered)
  - Detailed order information

- **User Account**
  - Profile management
  - Address and payment method settings
  - Order history
  - Option to become a seller

### For Sellers

- **Seller Application**

  - Multi-step application form
  - Business information collection
  - Bank account details for payments
  - Auto-approval (demo mode)

- **Seller Dashboard**

  - **Overview**: Sales statistics and quick metrics
  - **Product Management**: Add, edit, delete products with modal-based interface
  - **Order Management**: View and process customer orders
  - **Analytics**: Performance metrics and sales reports
  - **Shop Settings**: Comprehensive shop configuration

- **Shop Settings**
  - Shop information (name, category, description)
  - Shop branding (logo and banner)
  - Business details and contact information
  - Payment settings (bank account details)
  - Notification preferences
  - Shop status controls (active/inactive, vacation mode)

### General Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Real-time Statistics**: Platform overview with user, shop, and product counts
- **Shop Browsing**: Discover and explore different shops
- **Contact Functionality**: Customers can contact shops directly

---

## 🛠️ Technology Stack

### Frontend

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with modern design patterns
- **JavaScript (ES6+)** - Vanilla JavaScript for interactivity
- **Google Fonts** - Inter font family for typography

### Backend

- **PHP 7.4+** - Server-side scripting
- **MySQL** - Relational database management
- **RESTful API** - JSON-based API endpoints

### Storage

- **LocalStorage** - Client-side data persistence (demo mode)
- **SessionStorage** - User session management
- **MySQL Database** - Production data storage

### Development Tools

- **XAMPP** - Local development environment
- **phpMyAdmin** - Database management
- **Git** - Version control

---

## 📁 Project Structure

```
DigiMart/
│
├── api/                          # Backend API endpoints
│   ├── auth/                     # Authentication (login, register, logout)
│   ├── users/                    # User management
│   ├── seller/                   # Seller operations
│   ├── products/                 # Product CRUD operations
│   ├── orders/                   # Order management
│   ├── shops/                    # Shop information
│   └── stats/                    # Platform statistics
│
├── css/                          # Stylesheets
│   └── style.css                 # Main stylesheet
│
├── database/                     # Database files
│   ├── schema.sql                # Database schema
│   ├── withseller.sql            # Schema with seller features
│   └── migrate_*.php             # Migration scripts
│
├── documentation/                # Project documentation
│   ├── BACKEND_IMPLEMENTATION.md # Backend guide
│   ├── DIRECTORY_STRUCTURE.md    # Project structure
│   ├── SYSTEM_FUNCTIONS.md       # System functionality
│   └── USER_INTERFACES.md        # UI documentation
│
├── images/                       # Static images and assets
│   ├── logo.png                  # Site logo
│   └── *.jpg                     # Product and banner images
│
├── includes/                     # PHP includes
│   ├── db_connect.php            # Database connection
│   └── functions.php             # Helper functions
│
├── js/                           # JavaScript files
│   ├── main.js                   # Core functionality
│   ├── products.js               # Product management
│   ├── cart.js                   # Shopping cart
│   ├── user-data.js              # User data management
│   └── user-menu.js              # User menu dropdown
│
├── seller/                       # Seller pages
│   ├── seller-application.html   # Seller application form
│   ├── seller-dashboard.html     # Seller dashboard
│   └── shop-preview.html         # Shop preview
│
├── user/                         # User pages
│   ├── account-settings.html     # User profile settings
│   ├── my-orders.html            # Order history
│   └── wishlist.html             # User wishlist
│
├── index.html                    # Landing page
├── about.html                    # About page
├── contact.html                  # Contact page
├── login.html                    # Login page
├── register.html                 # Registration page
├── products.html                 # Product listing
├── product-detail.html           # Product details
├── shops.html                    # Shop listing
├── shop.html                     # Individual shop page
├── cart.html                     # Shopping cart
└── README.md                     # This file
```

---

## 🚀 Installation

### Prerequisites

- **XAMPP** (or similar LAMP/WAMP stack)
  - PHP 7.4 or higher
  - MySQL 5.7 or higher
  - Apache Web Server
- **Git** (for cloning the repository)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Abhey518/DigiMart-E-commerce-Platform.git
cd DigiMart-E-commerce-Platform
```

### Step 2: Move to XAMPP Directory

Move the project folder to your XAMPP `htdocs` directory:

```bash
# Windows
move DigiMart-E-commerce-Platform C:\xampp\htdocs\digimart

# Linux/Mac
mv DigiMart-E-commerce-Platform /opt/lampp/htdocs/digimart
```

### Step 3: Start XAMPP

1. Open XAMPP Control Panel
2. Start **Apache** server
3. Start **MySQL** server

### Step 4: Configure Database Connection

Edit `includes/db_connect.php` with your database credentials:

```php
<?php
$host = 'localhost';
$dbname = 'digimart';
$username = 'root';
$password = ''; // Your MySQL password

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);
?>
```

---

## 🗄️ Database Setup

### Option 1: Using phpMyAdmin (Recommended)

1. Open phpMyAdmin: `http://localhost/phpmyadmin`
2. Click **New** to create a new database
3. Name it `digimart`
4. Click **Import** tab
5. Choose file: `database/schema.sql` or `database/withseller.sql`
6. Click **Go** to import

### Option 2: Using MySQL Command Line

```bash
mysql -u root -p
```

```sql
CREATE DATABASE digimart;
USE digimart;
SOURCE /path/to/digimart/database/schema.sql;
```

### Database Tables

The database includes the following tables:

- `users` - User accounts (customers and sellers)
- `shops` - Shop information
- `products` - Product catalog
- `orders` - Customer orders
- `order_items` - Order line items
- `reviews` - Product reviews
- `wishlist` - User wishlists
- `cart` - Shopping cart items

---

## 💻 Usage

### Accessing the Application

1. Open your web browser
2. Navigate to: `http://localhost/digimart`
3. You'll see the DigiMart landing page

### Demo Mode (Without Backend)

The application can run in demo mode using LocalStorage:

- User registration and login work with LocalStorage
- Products, cart, and wishlist are stored locally
- Perfect for testing the frontend

### Production Mode (With Backend)

When the backend is set up:

- All data is stored in MySQL database
- API endpoints handle all operations
- Session management via PHP sessions or JWT
- File uploads for product images

### Creating Your First Account

1. Click **Register** in the header
2. Fill in your details (Name, Email, Password)
3. Click **Create Account**
4. Login with your credentials

### Becoming a Seller

1. Login to your account
2. Go to **Account Settings**
3. Click **Become a Seller**
4. Fill out the seller application form
5. Submit (auto-approved in demo mode)
6. Access your **Seller Dashboard**

### Adding Products (Sellers)

1. Go to **Seller Dashboard**
2. Click **Products** tab
3. Click **Add New Product**
4. Fill in product details
5. Click **Add Product**

---

## 👥 User Roles

### Customer

- Browse and search products
- Add products to cart and wishlist
- Place orders
- Track order status
- Manage account settings
- Leave product reviews

### Seller

- All customer features
- Create and manage shop
- Add/edit/delete products
- View and process orders
- Access sales analytics
- Configure shop settings
- Manage inventory

### Admin (Future Feature)

- Approve/reject seller applications
- Manage users and shops
- Platform analytics
- Content moderation

---

## 📡 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/session` - Check session status

### Product Endpoints

- `GET /api/products/list.php` - Get all products
- `GET /api/products/detail.php?id={id}` - Get product details
- `POST /api/products/create.php` - Create product (seller)
- `PUT /api/products/update.php` - Update product (seller)
- `DELETE /api/products/delete.php` - Delete product (seller)

### Order Endpoints

- `GET /api/orders/list.php` - Get user orders
- `POST /api/orders/create.php` - Create new order
- `PUT /api/orders/update.php` - Update order status
- `POST /api/orders/cancel.php` - Cancel order

### Shop Endpoints

- `GET /api/shops/list.php` - Get all shops
- `GET /api/shops/detail.php?id={id}` - Get shop details
- `GET /api/shops/get_shop_details.php` - Get seller's shop

### Statistics

- `GET /api/stats/summary.php` - Platform statistics

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## � Contributors

This project was developed by:

- **Navanjana Y.H.K.**
- **Harshana M.A.J.**
- **Wickramathilaka N.D.K.D.**
- **Pahalawaththa P.A.P.R.**
- **Afreen A.A.F.**
- **Abeywardhana H.H.A.P.**
- **Yalini V.B.**
- **Rathnayake R.M.I.V.B.**
- **Divyaloshini M.**

---

## �📄 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

This is a collaborative academic project for web development.

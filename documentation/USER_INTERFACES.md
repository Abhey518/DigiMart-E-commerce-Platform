# DigiMart - User Interfaces (Screens)

## Overview

This document lists all user interface screens/pages in the DigiMart e-commerce marketplace platform.

---

## User Interfaces

### 1. Public Pages (Guest Access)

#### 1.1 Landing & Information Pages

- **Home Page** (`index.html`)

  - Main landing page with platform overview
  - Platform statistics
  - Key features showcase
  - User testimonials

- **About Page** (`about.html`)

  - About the marketplace information

- **Contact Page** (`contact.html`)

  - Contact form
  - Support information

#### 1.2 Authentication Pages

- **Login Page** (`login.html`)

  - User/Seller authentication
  - Email and password login

- **Registration Page** (`register.html`)
  - New user account creation
  - Basic user information collection

### 2. Product & Shop Browsing Pages

#### 2.1 Product Pages

- **Products Listing Page** (`products.html`)

  - Browse all products (5 per row grid layout)
  - Category filtering
  - Search functionality
  - Product cards with image, name, price, rating

- **Product Detail Page** (`product-detail.html`)
  - Single product detailed view
  - Product description
  - Price and availability
  - Add to cart functionality
  - Product reviews

#### 2.2 Shop Pages

- **Shops Listing Page** (`shops.html`)

  - Browse all registered shops
  - Shop cards with information
  - Search and filter shops

- **Shop Detail Page** (`shop.html`)
  - Individual shop profile
  - Shop information and branding
  - Products from specific shop
  - Shop statistics

### 3. User Account Pages (Customer)

**Location:** `/user/` directory

- **Shopping Cart** (`cart.html`)

  - Cart items display
  - Quantity adjustment
  - Price calculations
  - Checkout functionality
  - Clear cart option

- **My Orders** (`user/my-orders.html`)

  - Order history
  - Order tracking
  - Order status updates
  - Order details

- **Wishlist** (`user/wishlist.html`)

  - Saved products
  - Add to cart from wishlist
  - Remove from wishlist

- **Account Settings** (`user/account-settings.html`)
  - User profile management
  - Personal information (name, address, phone)
  - Payment method settings
  - Become a seller option
  - Account preferences

### 4. Seller Pages

**Location:** `/seller/` directory

- **Seller Application** (`seller/seller-application.html`)

  - Multi-step application form
  - Shop Information section
  - Business Details section
  - Contact Information section
  - Bank Account Details section
  - Application submission

- **Seller Dashboard** (`seller/seller-dashboard.html`)

  - **Overview Tab**

    - Sales statistics
    - Quick metrics
    - Recent activity

  - **Products Tab**

    - Product management (horizontal list layout)
    - Add new product (modal)
    - Edit product (modal)
    - Delete product
    - Product inventory display
    - Product statistics (sold, stock)

  - **Orders Tab**

    - Order management interface
    - Order processing
    - Order history

  - **Analytics Tab**

    - Performance metrics
    - Sales charts
    - Revenue reports

  - **Shop Settings Tab**
    - Shop information management
    - Business details
    - Payment settings
    - Notification preferences
    - Shop status controls

---

## User Interface Categories Summary

| Category                | Number of Screens | Description                                                  |
| ----------------------- | ----------------- | ------------------------------------------------------------ |
| Public Pages            | 4                 | Landing, About, Contact, Authentication                      |
| Product & Shop Browsing | 4                 | Products listing, Product detail, Shops listing, Shop detail |
| User Account Pages      | 4                 | Cart, Orders, Wishlist, Account Settings                     |
| Seller Pages            | 2                 | Application, Dashboard (with 5 tabs)                         |
| **Total**               | **14**            | **Main screens/pages**                                       |

---

## Navigation Structure

### Primary Navigation (Header)

- Home / Logo
- Products
- Shops
- About
- Contact
- Login / Register (or User Menu when logged in)

### User Menu (Authenticated Users)

- Account Settings
- My Orders
- Wishlist
- Shopping Cart
- Seller Dashboard (if seller)
- Logout

### Seller Dashboard Navigation

- Overview
- Products
- Orders
- Analytics
- Shop Settings

### Footer Navigation

- Left: DigiMart Branding + Tagline
- Center: Products | Shops
- Right: Contact Information
- Bottom: Copyright

---

## Responsive Design

All interfaces are fully responsive with support for:

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

---

## Key UI Components

### Common Elements

- Navigation Header (consistent across all pages)
- Footer (compact 3-section horizontal layout, ~64px height)
- User Menu Dropdown
- Product Cards
- Modal Dialogs (for product add/edit)

### Specialized Components

- Product Grid (5 columns on desktop, 1400px container)
- Seller Product List (horizontal compact layout)
- Seller Dashboard Sidebar
- Shop Cards
- Order Cards
- Statistics Cards

---

_Last Updated: 2025-12-18_

# DigiMart - System Functions Documentation

## Overview

DigiMart is an e-commerce marketplace platform where users can browse products, sellers can manage their shops, and transactions can occur between buyers and sellers.

---

## 1. User Management System

### 1.1 User Registration

**File:** `register.html`
**Storage:** `localStorage` (key: `digimartUsers`)

**Function:** Users register with basic information

- **Fields:** Name, Email, Password
- **Default Role:** User (customer)
- **Process:**
  1. User fills registration form
  2. System validates email uniqueness
  3. User data stored in localStorage array
  4. User redirected to login page

**Data Structure:**

```javascript
{
  name: string,
  email: string,
  password: string,
  isSeller: boolean (default: false),
  address: string,
  phone: string,
  paymentMethod: string
}
```

### 1.2 User Login

**File:** `login.html`
**Storage:** `sessionStorage` (keys: `digimartLoggedIn`, `digimartUserEmail`)

**Function:** Authenticate users and maintain session

- Validates email and password
- Creates session storage entries
- Redirects to homepage on success

### 1.3 User Profile Management

**File:** `user/account-settings.html`
**JS:** `js/user-data.js`

**Functions:**

- **View Profile:** Display user information
- **Edit Profile:** Update name, address, phone, payment method
- **Become a Seller:** Apply for seller account
- **Seller Dashboard Access:** If user is approved seller

---

## 2. Seller Management System

### 2.1 Seller Application

**File:** `seller/seller-application.html`
**Storage:** `localStorage` (key: `sellerApplication_[email]`)

**Function:** Users apply to become sellers
**Application Sections:**

1. **Shop Information**
   - Shop Name
   - Shop Category
   - Shop Description
2. **Business Details**
   - Business Type
   - Business Registration Number
   - Tax ID
3. **Contact Information**
   - Business Email
   - Phone Number
   - Business Address (Street, City, State, ZIP, Country)
4. **Bank Account Details**
   - Account Holder Name
   - Bank Name
   - Account Number
   - Routing Number

**Process:**

1. User submits application form
2. Auto-approved (demo mode - backend will handle approval workflow)
3. User's `isSeller` flag set to `true`
4. Redirected to seller dashboard

### 2.2 Seller Dashboard

**File:** `seller/seller-dashboard.html`
**Access:** Restricted to users with `isSeller: true`

**Sections:**

1. **Overview** - Dashboard statistics and quick actions
2. **Products** - Product management interface with modal-based CRUD operations
3. **Orders** - Order management (placeholder for backend)
4. **Shop Settings** - Comprehensive shop configuration and preferences
5. **Analytics** - Performance metrics (placeholder for backend)

**Shop Settings Features:**

- **Shop Information**
  - Shop Name, Category, Description
  - Shop Logo and Banner URLs
  - Storage: `localStorage` (key: `shopSettings_[email]`)
- **Business Details**
  - Business Email, Phone
  - Complete Business Address (Street, City, State, ZIP, Country)
- **Payment Settings**
  - Account Holder Name
  - Bank Name and Account Number
  - Routing Number and Swift/BIC Code
- **Notification Preferences**
  - Email Notifications toggle
  - Order Notifications toggle
  - Low Stock Alerts toggle
  - Marketing Emails toggle
- **Shop Status**
  - Shop Active/Inactive toggle
  - Vacation Mode toggle

**Mobile Responsive:** All sections are fully responsive for mobile, tablet, and desktop devices

---

## 3. Product Management System

### 3.1 Add/Edit Products

**File:** `seller/seller-dashboard.html` (Products section)
**Storage:** `localStorage` (key: `sellerProducts_[email]`)

**Function:** Sellers manage their product catalog

**Product Fields:**

- Product Name (required)
- Category (required) - Electronics, Fashion, Home & Living, Books, Sports, Toys, Other
- Price (required)
- Stock Quantity (required)
- Image URL (optional)
- SKU (optional)
- Description (required)

**Auto-Generated Fields:**

- Product ID (unique)
- Created Date
- Sold Count (tracks sales - default: 0)
- Rating (customer reviews - default: 0)
- Review Count (number of reviews - default: 0)

**Data Structure:**

```javascript
{
  id: string,
  name: string,
  category: string,
  price: number,
  stock: number,
  image: string,
  sku: string,
  description: string,
  sold: number,
  rating: number,
  reviewCount: number,
  createdAt: ISO date string
}
```

### 3.2 Product Display

**Files:**

- `products.html` - All products listing (shows 5 products per row)
- `product-detail.html` - Single product view
- `shops.html` - All shops listing
- `shop.html` - Individual shop with products
- `seller/seller-dashboard.html` - Seller's product management (horizontal list layout)

**Features:**

- Grid view of products (5 per row with 1400px container width)
- Filtering by category
- Search functionality
- Product cards show: image, name, category, price, rating, stock status
- Seller dashboard shows products in compact horizontal list format
- Footer design consistent across all pages

### 3.3 Delete Products

**Function:** Remove products from seller's catalog

- Confirms deletion with user
- Removes from localStorage
- Updates product count

---

## 4. Shopping Cart System

### 4.1 Add to Cart

**File:** `js/cart.js`
**Storage:** `localStorage` (key: `digimartCart`)

**Function:** Users add products to shopping cart
**Data Structure:**

```javascript
{
  productId: string,
  name: string,
  price: number,
  quantity: number,
  image: string
}
```

### 4.2 Cart Management

**File:** `cart.html`

**Functions:**

- View cart items
- Update quantities
- Remove items
- Calculate subtotal
- Proceed to checkout

---

## 5. Wishlist System

### 5.1 Add to Wishlist

**File:** `user/wishlist.html`
**JS:** `js/user-data.js`
**Storage:** `localStorage` (key: `wishlist_[email]`)

**Function:** Users save products for later

- Heart icon toggle (❤️/🤍)
- Silent operation (no alert messages)
- Persists across sessions

**Data Structure:**

```javascript
{
  productId: string,
  name: string,
  price: number,
  image: string,
  addedDate: ISO date string
}
```

---

## 6. Order Management System

### 6.1 Order Creation

**File:** `js/main.js` (checkout process)
**Storage:** `localStorage` (key: `orders_[email]`)

**Function:** Create orders from cart items

**Order Statuses:**

1. **Pending** - Order placed, awaiting processing
2. **Processing** - Order being prepared
3. **Shipped** - Order dispatched
4. **Delivered** - Order completed

**Data Structure:**

```javascript
{
  orderId: string,
  items: array of cart items,
  totalAmount: number,
  status: string,
  orderDate: ISO date string,
  deliveryAddress: string
}
```

### 6.2 Order History

**File:** `user/my-orders.html`

**Function:** Display user's past and current orders

- Shows all orders with status
- Visual progress indicators
- Order details view

---

## 7. Shop/Seller Listing

### 7.1 Browse Shops

**File:** `shops.html`

**Function:** Display list of registered sellers/shops

- Shop cards with name and description
- Link to individual shop pages

### 7.2 Individual Shop Page

**File:** `shop.html`

**Function:** Display seller's products and shop info

- Shop header with details
- Products from specific seller
- Contact shop functionality

### 7.3 Contact Shop

**File:** `shop.html` (modal)

**Function:** Customers can contact sellers

- Contact form modal
- Fields: Name, Email, Message
- Form submission (currently demo - needs backend)

---

## 8. Navigation & Menu System

### 8.1 User Menu

**File:** `js/user-menu.js`

**Function:** Dynamic user account dropdown

- Shows user email
- Conditional menu items:
  - Account Settings
  - My Orders
  - Wishlist
  - Seller Dashboard (if user is seller)
  - Logout

### 8.2 Product Navigation

**File:** `js/products.js`

**Function:** Display products dynamically

- Product data management
- Category filtering
- Search functionality

---

## 9. Authentication & Session Management

### 9.1 Session Check

**Location:** All protected pages

**Function:** Verify user is logged in

```javascript
const isLoggedIn = sessionStorage.getItem("digimartLoggedIn");
const userEmail = sessionStorage.getItem("digimartUserEmail");
```

### 9.2 Logout

**Function:** Clear session and redirect

- Removes sessionStorage entries
- Redirects to homepage

### 9.3 Protected Routes

**Pages requiring authentication:**

- `user/account-settings.html`
- `user/my-orders.html`
- `user/wishlist.html`
- `seller/seller-application.html`
- `seller/seller-dashboard.html` (also requires `isSeller: true`)

---

## 10. Data Storage Structure

### LocalStorage Keys:

- `digimartUsers` - Array of all registered users
- `digimartCart` - Current user's shopping cart
- `wishlist_[email]` - User-specific wishlist
- `orders_[email]` - User-specific order history
- `sellerApplication_[email]` - Seller application data
- `sellerProducts_[email]` - Seller-specific products
- `shopSettings_[email]` - Seller shop settings and preferences
  - Contains: shopInfo, businessDetails, paymentSettings, notifications, shopStatus

### SessionStorage Keys:

- `digimartLoggedIn` - Boolean session flag
- `digimartUserEmail` - Current logged-in user email
- `currentUser` - Complete user object for current session

---

## 11. UI/UX Features

### 11.1 Responsive Design

**Mobile Responsive:** The entire platform is now fully mobile responsive with breakpoints at:

- Desktop: 1024px and above
- Tablet: 768px - 1023px
- Mobile: 320px - 767px

**Responsive Features:**

- Collapsible sidebar on mobile
- Stacked form layouts on mobile
- Responsive grid layouts for products
- Touch-friendly buttons and controls
- Optimized font sizes and spacing
- Responsive modal dialogs

- Mobile-first approach
- Flexbox and Grid layouts
- Responsive navigation

### 11.2 Interactive Elements

- Modal windows (product form, contact form)
- Dropdown menus
- Hover effects
- Form validation

### 11.3 Visual Feedback

- Success/error alerts
- Loading states
- Empty state messages
- Confirmation dialogs

---

## Notes for Backend Integration

All localStorage data structures are designed to be easily migrated to database tables. Each function that currently uses localStorage should be replaced with API calls to the backend server.

Session management should be migrated to server-side sessions or JWT tokens for production security.

File upload functionality needs to be added for product images instead of URL inputs.

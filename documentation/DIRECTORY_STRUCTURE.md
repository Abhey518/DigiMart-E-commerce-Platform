# DigiMart - Directory Structure

## 📁 Project Structure

```
DigiMart/
│
├── documentation/                      # Project documentation
│   ├── SYSTEM_FUNCTIONS.md            # Complete system functionality reference
│   ├── BACKEND_IMPLEMENTATION.md      # PHP + MySQL backend guide
│   └── DIRECTORY_STRUCTURE.md         # This file
│
├── user/                               # User-facing pages
│   ├── account-settings.html          # User profile settings
│   ├── my-orders.html                 # Order history and tracking
│   └── wishlist.html                  # User wishlist
│
├── seller/                             # Seller-specific pages
│   ├── seller-application.html        # Seller application form
│   └── seller-dashboard.html          # Seller dashboard with product management
│
├── css/                                # Stylesheets
│   └── style.css                      # Main stylesheet for entire application
│
├── js/                                 # JavaScript files
│   ├── main.js                        # Main JS (navigation, auth)
│   ├── products.js                    # Product listing and filtering
│   ├── cart.js                        # Cart functionality
│   └── user-data.js                   # User data management
│
├── images/                             # Static images and assets
│   ├── logo.png                       # Site logo
│   ├── products/                      # Product images
│   └── banners/                       # Banner images
│
├── uploads/                            # User-uploaded files (backend)
│   └── products/                      # Uploaded product images
│
├── about.html                          # About page
├── cart.html                           # Shopping cart
├── contact.html                        # Contact page
├── index.html                          # Main landing page
├── login.html                          # Login page
├── product-detail.html                 # Single product detail page
├── products.html                       # Browse all products
├── register.html                       # Registration page
├── shop.html                           # Individual shop page
└── shops.html                          # Browse all shops

```

## 📂 Directory Descriptions

### `/documentation/`

Contains all project documentation including:

- System functionality reference
- Backend implementation guide
- API documentation
- Directory structure (this file)

### `/user/`

User-facing pages organized separately from seller pages:

- **account-settings.html**: User account settings and profile management
- **my-orders.html**: Order history and tracking
- **wishlist.html**: User's saved products

### `/seller/`

Seller-specific pages:

- **seller-application.html**: Multi-step seller application form
- **seller-dashboard.html**: Complete seller dashboard with:
  - Dashboard overview (sales, products, orders)
  - Product management (add, edit, delete)
  - Order management
  - Analytics
  - Shop settings

### `/css/`

Stylesheets for the application:

- **style.css**: Main stylesheet containing all styles for user and seller pages

### `/js/`

JavaScript files:

- **main.js**: Core functionality including:
  - Navigation handling
  - Authentication and session management
  - User dropdown menu
  - Common utilities
- **products.js**: Product-related functionality:
  - Product listing and display
  - Filtering and search
  - Product card rendering
- **cart.js**: Shopping cart functionality:
  - Add/update/remove cart items
  - Cart calculations
  - Checkout process

### `/images/`

Static images and media files:

- Site logos and branding
- Product images (static)
- Banner images
- Icons and graphics

### `/uploads/` _(Backend Only)_

User-uploaded files (created by backend):

- **products/**: Product images uploaded by sellers

### Root Directory Files

- **index.html**: Main landing/home page
- **about.html**: About the marketplace
- **cart.html**: Shopping cart with checkout
- **contact.html**: Contact form
- **login.html**: User/seller login
- **product-detail.html**: Single product detailed view
- **products.html**: Browse all products with filters and search
- **register.html**: New user registration
- **shop.html**: Individual shop page
- **shops.html**: Browse all shops

## 🔄 File Organization Strategy

### Current Structure

The project is organized into two main user flows:

1. **User Flow**: `/user/` directory contains customer-facing pages
2. **Seller Flow**: `/seller/` directory contains seller management pages

### Shared Resources

- All pages share the same `css/style.css` stylesheet
- JavaScript files are organized by functionality
- Common footer design with consistent layout:
  - Left: DigiMart branding with tagline
  - Center: Navigation links (Products, Shops)
  - Right: Contact information
  - Bottom: Copyright notice
- Footer is optimized for compact display (~64px height)
- All elements are duplicated across pages (can be componentized with backend)

### Backend Integration (Future)

When implementing the backend, the structure will expand to:

```
DigiMart/
│
├── api/                                # Backend API
│   └── v1/                            # API version 1
│       ├── auth/                      # Authentication endpoints
│       ├── users/                     # User management
│       ├── sellers/                   # Seller management
│       ├── products/                  # Product CRUD
│       ├── cart/                      # Cart operations
│       ├── orders/                    # Order management
│       ├── wishlist/                  # Wishlist operations
│       └── upload/                    # File uploads
│
├── config/                             # Configuration files
│   ├── database.php                   # Database connection
│   ├── jwt.php                        # JWT configuration
│   └── cors.php                       # CORS settings
│
├── middleware/                         # Middleware functions
│   ├── auth.php                       # Authentication middleware
│   └── cors.php                       # CORS middleware
│
└── vendor/                             # Composer dependencies (PHP)
```

## 📊 File Relationships

### Authentication Flow

```
login.html → main.js (handleLogin) → Backend API → Session Storage
register.html → main.js (handleRegister) → Backend API → Session Storage
```

### User Product Browsing

```
index.html → products.html → products.js (loadProducts) → product-detail.html
```

### Shopping Flow

```
product-detail.html → cart.js (addToCart) → cart.html → cart.js (checkout)
```

### Shop Browsing

```
shops.html → shop.html (individual shop) → products from shop
```

### Seller Product Management

```
seller/seller-dashboard.html →
  - Manage Products (modal-based CRUD)
  - View Orders
  - Analytics Dashboard
```

## 🎯 Naming Conventions

### HTML Files

- Lowercase with hyphens: `seller-dashboard.html`, `product-detail.html`
- Descriptive names indicating purpose

### JavaScript Files

- Lowercase with camelCase functions: `main.js`, `products.js`
- Named by feature/module

### CSS Classes

- Kebab-case: `.product-card`, `.seller-dashboard`
- BEM methodology recommended for complex components

### Storage Keys (localStorage/sessionStorage)

- Descriptive with prefixes:
  - User data: `currentUser`, `userSession`
  - Cart: `cart_[userId]`
  - Products: `sellerProducts_[email]`
  - Wishlist: `wishlist_[userId]`
  - Shop Settings: `shopSettings_[email]`

## 📱 Mobile Responsiveness

### Responsive Design Implementation

The DigiMart platform is fully mobile responsive with the following breakpoints:

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

### Responsive Features

1. **Seller Dashboard**

   - Collapsible sidebar on tablets and mobile
   - Stacked navigation on mobile devices
   - Single-column layouts for forms and product grids
   - Touch-friendly buttons and controls
   - Responsive modal dialogs

2. **Product Management**

   - Responsive product grid (1 column on mobile, 2-3 on tablet, 3-4 on desktop)
   - Touch-optimized add/edit/delete buttons
   - Mobile-friendly form inputs

3. **Shop Settings**

   - Two-column layouts become single-column on mobile
   - Full-width form fields on small screens
   - Touch-friendly toggle switches
   - Optimized spacing and padding

4. **General UI**
   - Flexible font sizes
   - Responsive spacing and padding
   - Touch-friendly tap targets (minimum 44x44px)
   - Optimized images and assets
   - Horizontal scrolling prevention

## 🚀 Future Enhancements

### Planned Structure Additions

1. **Component System**: Break down common UI elements into reusable components
2. **API Directory**: RESTful API endpoints for backend integration
3. **Admin Dashboard**: Separate admin interface for platform management
4. **Mobile App Structure**: Separate directory for mobile app files (iOS/Android)
5. **Testing Directory**: Unit and integration tests
6. **Progressive Web App (PWA)**: Add service workers and manifest for offline capabilities

### Recommendations

- Consider using a build tool (Webpack/Vite) for asset bundling
- Implement a component-based framework (React/Vue) for better maintainability
- Use environment-based configuration files
- Implement proper routing for SPA (Single Page Application) architecture
- Add CSS preprocessor (SASS/LESS) for better style management
- Implement lazy loading for images and components

---

## 📌 Notes

- **Current Status**: Frontend-only implementation using vanilla HTML, CSS, and JavaScript
- **Storage**: Using localStorage and sessionStorage for data persistence
- **Backend**: Not yet implemented - see BACKEND_IMPLEMENTATION.md for guide
- **Dependencies**: No external JavaScript libraries currently used
- **Mobile Ready**: Fully responsive design for all screen sizes
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

For backend implementation details and API structure, refer to `BACKEND_IMPLEMENTATION.md`.

---

_Last Updated: 2025-12-18_

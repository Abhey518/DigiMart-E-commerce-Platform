<<<<<<< HEAD
// js/user-data.js
// Logic moved to backend.
// This file can be removed or kept empty to avoid 404s if referenced.
=======
// User data management for DigiMart
// Handles user profile, orders, and wishlist

// ========== USER PROFILE ==========

function getUserData() {
  const userEmail = sessionStorage.getItem('digimartUserEmail');
  if (!userEmail) return {};
  
  const key = `digimartUser_${userEmail}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : {};
}

function saveUserData(userData) {
  const userEmail = sessionStorage.getItem('digimartUserEmail');
  if (!userEmail) return;
  
  const key = `digimartUser_${userEmail}`;
  localStorage.setItem(key, JSON.stringify(userData));
}

// ========== ORDERS ==========

function getUserOrders() {
  const userEmail = sessionStorage.getItem('digimartUserEmail');
  if (!userEmail) return [];
  
  const key = `digimartOrders_${userEmail}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function saveUserOrders(orders) {
  const userEmail = sessionStorage.getItem('digimartUserEmail');
  if (!userEmail) return;
  
  const key = `digimartOrders_${userEmail}`;
  localStorage.setItem(key, JSON.stringify(orders));
}

function createOrder(items, total) {
  const orders = getUserOrders();
  const newOrder = {
    id: 'ORD' + Date.now(),
    date: new Date().toISOString(),
    items: items,
    total: total,
    status: 'Pending'
  };
  
  orders.unshift(newOrder); // Add to beginning
  saveUserOrders(orders);
  return newOrder;
}

function updateOrderStatus(orderId, newStatus) {
  const orders = getUserOrders();
  const order = orders.find(o => o.id === orderId);
  
  if (order) {
    order.status = newStatus;
    saveUserOrders(orders);
  }
}

function getOrderById(orderId) {
  const orders = getUserOrders();
  return orders.find(o => o.id === orderId);
}

// ========== WISHLIST ==========

function getWishlist() {
  const userEmail = sessionStorage.getItem('digimartUserEmail');
  if (!userEmail) return [];
  
  const key = `digimartWishlist_${userEmail}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function saveWishlist(wishlist) {
  const userEmail = sessionStorage.getItem('digimartUserEmail');
  if (!userEmail) return;
  
  const key = `digimartWishlist_${userEmail}`;
  localStorage.setItem(key, JSON.stringify(wishlist));
}

function addToWishlist(productId) {
  const wishlist = getWishlist();
  
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    saveWishlist(wishlist);
    return true;
  }
  return false;
}

function removeFromWishlist(productId) {
  const wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  
  if (index > -1) {
    wishlist.splice(index, 1);
    saveWishlist(wishlist);
    return true;
  }
  return false;
}

function isInWishlist(productId) {
  const wishlist = getWishlist();
  return wishlist.includes(productId);
}

function toggleWishlistItem(productId) {
  if (isInWishlist(productId)) {
    removeFromWishlist(productId);
    return false;
  } else {
    addToWishlist(productId);
    return true;
  }
}

// ========== SAMPLE DATA GENERATION ==========

// Generate sample orders for demo purposes
function generateSampleOrders() {
  const userEmail = sessionStorage.getItem('digimartUserEmail');
  if (!userEmail) return;
  
  const orders = getUserOrders();
  
  // Only generate if no orders exist
  if (orders.length === 0) {
    const sampleOrders = [
      {
        id: 'ORD1703001234',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        items: [
          { productId: 'laptop-1', quantity: 1 }
        ],
        total: 125000,
        status: 'Delivered'
      },
      {
        id: 'ORD1703001235',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        items: [
          { productId: 'backpack-1', quantity: 1 },
          { productId: 'notebook-1', quantity: 3 }
        ],
        total: 3250,
        status: 'Shipped'
      },
      {
        id: 'ORD1703001236',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
        items: [
          { productId: 'calculator-1', quantity: 2 }
        ],
        total: 4000,
        status: 'Processing'
      }
    ];
    
    saveUserOrders(sampleOrders);
  }
}

// Auto-generate sample data on first load (for demo purposes)
if (sessionStorage.getItem('digimartLoggedIn') === 'true') {
  setTimeout(function() {
    const orders = getUserOrders();
    if (orders.length === 0) {
      // Uncomment the line below to auto-generate sample orders
      // generateSampleOrders();
    }
  }, 100);
}

// ========== SELLER MANAGEMENT ==========

function saveSellerApplication(applicationData) {
  const userEmail = sessionStorage.getItem('digimartUserEmail');
  if (!userEmail) return;
  
  const key = `digimartSellerApp_${userEmail}`;
  localStorage.setItem(key, JSON.stringify(applicationData));
}

function getSellerApplication() {
  const userEmail = sessionStorage.getItem('digimartUserEmail');
  if (!userEmail) return null;
  
  const key = `digimartSellerApp_${userEmail}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function approveSellerApplication() {
  const userEmail = sessionStorage.getItem('digimartUserEmail');
  if (!userEmail) return;
  
  // Update user data to mark as seller
  const userData = getUserData();
  userData.isSeller = true;
  userData.sellerApprovedAt = new Date().toISOString();
  saveUserData(userData);
  
  // Update seller application status
  const application = getSellerApplication();
  if (application) {
    application.status = 'approved';
    saveSellerApplication(application);
  }
}

function isUserSeller() {
  const userData = getUserData();
  return userData.isSeller || false;
}

function getSellerShopInfo() {
  const application = getSellerApplication();
  if (!application) return null;
  
  return {
    shopName: application.shopName,
    shopDescription: application.shopDescription,
    category: application.shopCategory,
    contactPhone: application.contactPhone,
    contactEmail: application.contactEmail
  };
}

>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d

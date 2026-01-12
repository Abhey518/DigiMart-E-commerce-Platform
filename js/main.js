// js/main.js - common UI functions (navbar, product listing helpers)

<<<<<<< HEAD
// js/main.js - Client-Side Logic

// Fetch products from PHP API
async function loadProducts(containerSelector, category = '', search = '') {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = '<div style="text-align:center; padding:40px;">Loading products...</div>';

  try {
    let url = 'api/products/list.php?';
    if (category) url += `category=${encodeURIComponent(category)}&`;
    if (search) url += `search=${encodeURIComponent(search)}`;

    const res = await fetch(url);
    const products = await res.json();

    if (products.length === 0) {
      container.innerHTML = '<div style="text-align:center; padding:40px;">No products found.</div>';
      return;
    }

    renderProductsGrid(containerSelector, products);
  } catch (e) {
    console.error(e);
    container.innerHTML = '<div style="text-align:center; padding:40px; color:red">Failed to load products.</div>';
  }
}

function renderProductsGrid(containerSelector, products) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
=======
function renderProductsGrid(containerSelector, products){
  const container = document.querySelector(containerSelector);
  if(!container) return;
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d
  container.innerHTML = "";
  const grid = document.createElement("div");
  grid.className = "grid";
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product card";
    card.style.position = "relative";
<<<<<<< HEAD
    card.style.display = "flex";
    card.style.flexDirection = "column";

    const ratingValue = p.rating ? parseFloat(p.rating) : 0;
    const reviewCount = p.reviews_count || 0;
    const soldCount = p.sold_count || 0;

    // Check if in wishlist (Frontend wishlist not implemented in DB yet, keeping local check if exists, or hiding)
    const inWishlist = false;
    const heartIcon = inWishlist ? '❤️' : '🤍';

    card.innerHTML = `
      <img src="${p.image_url}" alt="${p.name}">
      <div class="pname">${p.name}</div>
      <div class="pmeta">${p.short_description}</div>
=======
    
    // Render per requested order:
    // Image -> Name -> Short Description -> Ratings -> buying count -> Price -> Details -> Add to Cart
    const ratingValue = (p.rating !== undefined) ? p.rating : 4.3; // default rating
    const reviewCount = (p.reviews !== undefined) ? p.reviews : 12;
    const boughtText = (p.sold !== undefined) ? `${p.sold} bought in past month` : '40+ bought in past month';

    // Check if in wishlist
    const inWishlist = typeof isInWishlist !== 'undefined' ? isInWishlist(p.id) : false;
    const heartIcon = inWishlist ? '❤️' : '🤍';

    card.innerHTML = `
      <button 
        class="wishlist-btn ${inWishlist ? 'active' : ''}" 
        onclick="toggleProductWishlist('${p.id}'); event.stopPropagation();"
        style="position:absolute; top:12px; right:12px; background:white; border:none; width:36px; height:36px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,0,0,0.1); z-index:10; font-size:1.2rem; transition: transform 0.2s;"
        onmouseover="this.style.transform='scale(1.1)'"
        onmouseout="this.style.transform='scale(1)'"
        title="${inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}"
      >
        ${heartIcon}
      </button>
      
      <img src="${p.image}" alt="${p.name}">
      <div class="pname">${p.name}</div>
      <div class="pmeta">${p.short}</div>
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d

      <div class="rating-row" style="margin-top:6px;">
        <div class="rating-block">
          <div class="rating" aria-label="${ratingValue} out of 5 stars">
            ${renderStarsInline(ratingValue)} <span class="small">(${reviewCount})</span>
          </div>
<<<<<<< HEAD
          <div class="bought small">${soldCount} bought</div>
=======
          <div class="bought small">${boughtText}</div>
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d
        </div>
      </div>

      ${renderPriceHTML(p)}
<<<<<<< HEAD
      <div class="actions" style="margin-top:auto; padding-top:12px;">
        <button class="btn details" onclick="window.location.href='product-detail.html?id=${p.id}'">Details</button>
        <button class="btn add" onclick="CartAPI.addToCart(${p.id}, 1); alert('Added to Cart')">Add to Cart</button>
=======
      <div class="actions" style="margin-top:8px;">
        <button class="btn details" onclick="window.location.href='product-detail.html?id=${p.id}'">Details</button>
        <button class="btn add" onclick="CartAPI.addToCart('${p.id}',1); alert('Added to Cart')">Add to Cart</button>
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d
      </div>
    `;
    grid.appendChild(card);
  });
  container.appendChild(grid);
}

<<<<<<< HEAD

=======
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d
// Toggle wishlist for a product and refresh the display
function toggleProductWishlist(productId) {
  if (typeof toggleWishlistItem === 'undefined') {
    alert('Please log in to add items to your wishlist');
    return;
  }
<<<<<<< HEAD

  const added = toggleWishlistItem(productId);

=======
  
  const added = toggleWishlistItem(productId);
  
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d
  // Refresh the grid to update the heart icon
  if (typeof currentDisplayedProducts !== 'undefined' && currentDisplayedProducts.length > 0) {
    renderProductsGrid("#products-grid", currentDisplayedProducts);
  } else {
    // Just update the button
    location.reload();
  }
}

// small helper to render star icons inline (simple text-based stars)
<<<<<<< HEAD
function renderStarsInline(value) {
  const fullStars = Math.floor(value);
  const half = (value - fullStars) >= 0.5;
  let s = '';
  for (let i = 0; i < fullStars; i++) s += '★';
  if (half) s += '☆';
  const remaining = 5 - fullStars - (half ? 1 : 0);
  for (let i = 0; i < remaining; i++) s += '☆';
=======
function renderStarsInline(value){
  const fullStars = Math.floor(value);
  const half = (value - fullStars) >= 0.5;
  let s = '';
  for(let i=0;i<fullStars;i++) s += '★';
  if(half) s += '☆';
  const remaining = 5 - fullStars - (half ? 1 : 0);
  for(let i=0;i<remaining;i++) s += '☆';
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d
  return `<span style="color:#f59e0b;">${s}</span>`;
}

// render price with optional original price/discount
<<<<<<< HEAD
// render price with optional original price/discount
function renderPriceHTML(p) {
  if (p.original_price && p.original_price > p.price) {
    const saved = p.original_price - p.price;
    const pct = Math.round((saved / p.original_price) * 100);
    return `
      <div class="price-row" style="margin-top:8px; display:flex; justify-content:space-between; align-items:flex-end;">
        <div class="price"><span class="currency">Rs.</span><span class="amount">${formatAmount(p.price)}</span></div>
        <div class="price-right" style="display:flex; flex-direction:column; align-items:flex-end;">
          <div class="discount-badge" style="margin-bottom:2px;">-${pct}%</div>
          <div class="price-old"><span class="currency">Rs.</span><span class="amount">${formatAmount(p.original_price)}</span></div>
=======
function renderPriceHTML(p){
    if(p.originalPrice && p.originalPrice > p.price){
    const saved = p.originalPrice - p.price;
    const pct = Math.round((saved / p.originalPrice) * 100);
    return `
      <div class="price-row" style="margin-top:8px; display:flex; justify-content:space-between; align-items:center;">
        <div class="price"><span class="currency">Rs.</span><span class="amount">${formatAmount(p.price)}</span></div>
        <div class="price-right">
          <div class="price-old"><span class="currency">Rs.</span><span class="amount">${formatAmount(p.originalPrice)}</span></div>
          <div class="discount-badge">-${pct}%</div>
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d
        </div>
      </div>
      <div class="savings small">You save <span class="currency">Rs.</span><span class="amount">${formatAmount(saved)}</span></div>
    `;
  } else {
    return `<div class="price" style="margin-top:8px;"><span class="currency">Rs.</span><span class="amount">${formatAmount(p.price)}</span></div>`;
  }
}

// format numeric amount without currency symbol (localized)
<<<<<<< HEAD
function formatAmount(amount) {
  return Number(amount).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatPriceLKR(amount) {
  return 'Rs. ' + formatAmount(amount);
}

// product detail render
async function loadProductDetail(id, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  try {
    const res = await fetch(`api/products/detail.php?id=${id}`);
    if (!res.ok) throw new Error('Product not found');
    const product = await res.json();

    // Render
    const shopHTML = product.shop_name ? `
    <div class="shop-info" style="padding:16px; background:#f8fafc; border-radius:10px; margin-bottom:16px;">
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
        <strong style="font-size:1.1rem;">Sold by: <a href="shop.html?id=${product.shop_id}" style="color:var(--primary); text-decoration:none;">${product.shop_name}</a></strong>
        <div class="rating" style="color:#f59e0b;">★ ${product.shop_rating} (${product.shop_reviews} reviews)</div>
      </div>
      <div class="small" style="color:var(--muted);">${product.shop_description ? product.shop_description.substring(0, 100) + '...' : ''}</div>
      <a href="shop.html?id=${product.shop_id}" class="small" style="color:var(--primary); font-weight:600; margin-top:8px; display:inline-block;">Visit Shop →</a>
    </div>
    ` : '';

    container.innerHTML = `
    <div class="product-detail card">
      <div>
        <img src="${product.image_url}" alt="${product.name}">
=======
function formatAmount(amount){
  return Number(amount).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// product detail render
function renderProductDetail(product, containerSelector){
  const container = document.querySelector(containerSelector);
  if(!container) return;
  
  // Get shop information
  const shop = getShopById(product.shopId);
  const shopHTML = shop ? `
    <div class="shop-info" style="padding:16px; background:#f8fafc; border-radius:10px; margin-bottom:16px;">
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
        <strong style="font-size:1.1rem;">Sold by: <a href="shop.html?id=${shop.id}" style="color:var(--primary); text-decoration:none;">${shop.name}</a></strong>
        <div class="rating" style="color:#f59e0b;">★ ${shop.rating} (${shop.reviewCount} reviews)</div>
      </div>
      <div class="small" style="color:var(--muted);">${shop.description.substring(0, 100)}...</div>
      <a href="shop.html?id=${shop.id}" class="small" style="color:var(--primary); font-weight:600; margin-top:8px; display:inline-block;">Visit Shop →</a>
    </div>
  ` : '';
  
  container.innerHTML = `
    <div class="product-detail card">
      <div>
        <img src="${product.image}" alt="${product.name}">
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d
      </div>
      <div>
        <h2 class="pname">${product.name}</h2>
        <div class="small">${product.category}</div>
        <div style="margin:10px 0;" class="price">${formatPriceLKR(product.price)}</div>
<<<<<<< HEAD
        <p class="small">${product.long_description}</p>
=======
        <p class="small">${product.long}</p>
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d
        ${shopHTML}
        <div style="margin-top:16px; display:flex; gap:8px; align-items:center">
          <input id="qty-input" type="number" min="1" value="1" style="width:84px" class="input">
          <button class="btn" onclick="addFromDetail('${product.id}')">Add to Cart</button>
          <a class="small" href="cart.html">Go to Cart</a>
        </div>
      </div>
    </div>
<<<<<<< HEAD
    `;
  } catch (e) {
    container.innerHTML = '<div class="card">Product not found.</div>';
  }
}

function addFromDetail(id) {
=======
  `;
}

function addFromDetail(id){
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d
  const qty = parseInt(document.getElementById("qty-input").value) || 1;
  CartAPI.addToCart(id, qty);
  alert("Added to cart");
}

// on cart page, render table
<<<<<<< HEAD
async function renderCartTableAsync(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const cartItems = CartAPI.getCartItems(); // Array of {id, qty} (id is int or string)

  if (cartItems.length === 0) {
    container.innerHTML = `<div class="card small">Your cart is empty. <a href="products.html">Shop now</a></div>`;
    return;
  }

  container.innerHTML = '<div style="text-align:center; padding:20px;">Updating cart...</div>';

  try {
    // Fetch details for all items
    // Since we don't have a bulk API, we fetch individually (Optimization: create bulk API later)
    const promises = cartItems.map(item => fetch(`api/products/detail.php?id=${item.id}`).then(r => r.json()));
    const products = await Promise.all(promises);

    // Merge product data with qty
    const items = products.map(p => {
      if (p.error) return null;
      const cItem = cartItems.find(i => i.id == p.id);
      return { product: p, qty: cItem ? cItem.qty : 1 };
    }).filter(i => i !== null);

    // Re-expose for checkout
    CartAPI.getCartDetailed = () => items.map(i => ({ id: i.product.id, qty: i.qty, price: i.product.price }));

    let total = 0;

    let html = `<div class="card"><table class="cart-table" width="100%"><thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th><th></th></tr></thead><tbody>`;

    items.forEach(it => {
      const sub = it.product.price * it.qty;
      total += sub;
      html += `<tr class="cart-row">
        <td style="width:40%"><div style="display:flex; gap:10px; align-items:center"><img src="${it.product.image_url}" style="width:64px; height:64px; object-fit:cover; border-radius:8px"><div><div class="pname">${it.product.name}</div><div class="small">${it.product.category}</div></div></div></td>
        <td>${formatPriceLKR(it.product.price)}</td>
        <td><input type="number" min="1" value="${it.qty}" style="width:64px" onchange="CartAPI.updateQty(${it.product.id}, this.value); renderCartTableAsync('${containerSelector}');"></td>
        <td>${formatPriceLKR(sub)}</td>
        <td><button class="btn" onclick="CartAPI.removeFromCart(${it.product.id}); renderCartTableAsync('${containerSelector}');">Remove</button></td>
      </tr>`;
    });

    html += `</tbody></table>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">
        <div class="small">Delivery: Calculated at checkout</div>
        <div><strong>Total: ${formatPriceLKR(total)}</strong> 
        <button class="btn" onclick="processCheckout()">Checkout</button></div>
      </div>
    </div>`;

    container.innerHTML = html;

  } catch (e) {
    console.error(e);
    container.innerHTML = 'Error loading cart.';
  }
}

// Keeping a dummy renderCartTable to avoid breaking if called elsewhere, but redirecting
function renderCartTable(sel) { renderCartTableAsync(sel); }


async function processCheckout() {
=======
function renderCartTable(containerSelector){
  const container = document.querySelector(containerSelector);
  if(!container) return;
  const items = CartAPI.getCartDetailed();
  if(items.length === 0){
    container.innerHTML = `<div class="card small">Your cart is empty. <a href="products.html">Shop now</a></div>`;
    return;
  }
  let html = `<div class="card"><table class="cart-table" width="100%"><thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th><th></th></tr></thead><tbody>`;
  items.forEach(it => {
    html += `<tr class="cart-row">
      <td style="width:40%"><div style="display:flex; gap:10px; align-items:center"><img src="${it.product.image}" style="width:64px; height:64px; object-fit:cover; border-radius:8px"><div><div class="pname">${it.product.name}</div><div class="small">${it.product.category}</div></div></div></td>
      <td>${formatPriceLKR(it.product.price)}</td>
      <td><input type="number" min="1" value="${it.qty}" style="width:64px" onchange="CartAPI.updateQty('${it.product.id}', this.value); renderCartTable('${containerSelector}');"></td>
      <td>${formatPriceLKR(it.product.price * it.qty)}</td>
      <td><button class="btn" onclick="CartAPI.removeFromCart('${it.product.id}'); renderCartTable('${containerSelector}');">Remove</button></td>
    </tr>`;
  });
  html += `</tbody></table>
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">
      <div class="small">Delivery: Calculated at checkout</div>
      <div><strong>Total: ${formatPriceLKR(CartAPI.getCartTotal())}</strong> 
      <button class="btn" onclick="processCheckout()">Checkout</button></div>
    </div>
  </div>`;
  container.innerHTML = html;
}

function processCheckout() {
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d
  const items = CartAPI.getCartDetailed();
  if (items.length === 0) {
    alert('Your cart is empty!');
    return;
  }
<<<<<<< HEAD

  // Check auth via API
  try {
    const authRes = await fetch('api/auth/session.php');
    const auth = await authRes.json();

    if (!auth.loggedIn) {
      alert('Please log in to place an order');
      window.location.href = 'login.html';
      return;
    }

    // Create order payload
    const payload = {
      items: items.map(it => ({
        productId: it.id, // Cart item stored ID
        quantity: it.qty
      }))
    };

    const orderRes = await fetch('api/orders/create.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await orderRes.json();

    if (orderRes.ok) {
      CartAPI.clearCart();
      alert('Order placed successfully! Order ID: ' + result.orderId);
      window.location.href = 'user/my-orders.html'; // Redirect to my-orders
    } else {
      if (result.profile_incomplete) {
        if (confirm(result.error + "\n\nGo to Account Settings now?")) {
          window.location.href = 'user/account-settings.html';
        }
      } else {
        alert('Order failed: ' + (result.error || 'Unknown error'));
      }
    }
  } catch (e) {
    alert('System error: ' + e.message);
=======
  
  // Check if user is logged in
  if (!sessionStorage.getItem('digimartLoggedIn')) {
    alert('Please log in to place an order');
    window.location.href = 'login.html';
    return;
  }
  
  // Create order items array
  const orderItems = items.map(it => ({
    productId: it.product.id,
    quantity: it.qty
  }));
  
  const total = CartAPI.getCartTotal();
  
  // Create order using user-data.js
  if (typeof createOrder !== 'undefined') {
    createOrder(orderItems, total);
    CartAPI.clearCart();
    alert('Order placed successfully!');
    window.location.href = 'user/my-orders.html';
  } else {
    alert('Order system not available. Please try again later.');
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d
  }
}

// small helper to load common nav cart count (called in each page)
<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function () {
  // wire up simple mobile menu if exists (not implemented heavily)
  const menuBtn = document.querySelector(".mobile-menu-btn");
  if (menuBtn) {
=======
document.addEventListener("DOMContentLoaded", function(){
  // wire up simple mobile menu if exists (not implemented heavily)
  const menuBtn = document.querySelector(".mobile-menu-btn");
  if(menuBtn){
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d
    menuBtn.addEventListener("click", () => {
      document.querySelector(".nav").classList.toggle("open");
    });
  }
});

// js/main.js - common UI functions (navbar, product listing helpers)

function renderProductsGrid(containerSelector, products){
  const container = document.querySelector(containerSelector);
  if(!container) return;
  container.innerHTML = "";
  const grid = document.createElement("div");
  grid.className = "grid";
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product card";
    card.style.position = "relative";
    
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

      <div class="rating-row" style="margin-top:6px;">
        <div class="rating-block">
          <div class="rating" aria-label="${ratingValue} out of 5 stars">
            ${renderStarsInline(ratingValue)} <span class="small">(${reviewCount})</span>
          </div>
          <div class="bought small">${boughtText}</div>
        </div>
      </div>

      ${renderPriceHTML(p)}
      <div class="actions" style="margin-top:8px;">
        <button class="btn details" onclick="window.location.href='product-detail.html?id=${p.id}'">Details</button>
        <button class="btn add" onclick="CartAPI.addToCart('${p.id}',1); alert('Added to Cart')">Add to Cart</button>
      </div>
    `;
    grid.appendChild(card);
  });
  container.appendChild(grid);
}

// Toggle wishlist for a product and refresh the display
function toggleProductWishlist(productId) {
  if (typeof toggleWishlistItem === 'undefined') {
    alert('Please log in to add items to your wishlist');
    return;
  }
  
  const added = toggleWishlistItem(productId);
  
  // Refresh the grid to update the heart icon
  if (typeof currentDisplayedProducts !== 'undefined' && currentDisplayedProducts.length > 0) {
    renderProductsGrid("#products-grid", currentDisplayedProducts);
  } else {
    // Just update the button
    location.reload();
  }
}

// small helper to render star icons inline (simple text-based stars)
function renderStarsInline(value){
  const fullStars = Math.floor(value);
  const half = (value - fullStars) >= 0.5;
  let s = '';
  for(let i=0;i<fullStars;i++) s += '★';
  if(half) s += '☆';
  const remaining = 5 - fullStars - (half ? 1 : 0);
  for(let i=0;i<remaining;i++) s += '☆';
  return `<span style="color:#f59e0b;">${s}</span>`;
}

// render price with optional original price/discount
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
        </div>
      </div>
      <div class="savings small">You save <span class="currency">Rs.</span><span class="amount">${formatAmount(saved)}</span></div>
    `;
  } else {
    return `<div class="price" style="margin-top:8px;"><span class="currency">Rs.</span><span class="amount">${formatAmount(p.price)}</span></div>`;
  }
}

// format numeric amount without currency symbol (localized)
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
      </div>
      <div>
        <h2 class="pname">${product.name}</h2>
        <div class="small">${product.category}</div>
        <div style="margin:10px 0;" class="price">${formatPriceLKR(product.price)}</div>
        <p class="small">${product.long}</p>
        ${shopHTML}
        <div style="margin-top:16px; display:flex; gap:8px; align-items:center">
          <input id="qty-input" type="number" min="1" value="1" style="width:84px" class="input">
          <button class="btn" onclick="addFromDetail('${product.id}')">Add to Cart</button>
          <a class="small" href="cart.html">Go to Cart</a>
        </div>
      </div>
    </div>
  `;
}

function addFromDetail(id){
  const qty = parseInt(document.getElementById("qty-input").value) || 1;
  CartAPI.addToCart(id, qty);
  alert("Added to cart");
}

// on cart page, render table
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
  const items = CartAPI.getCartDetailed();
  if (items.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
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
  }
}

// small helper to load common nav cart count (called in each page)
document.addEventListener("DOMContentLoaded", function(){
  // wire up simple mobile menu if exists (not implemented heavily)
  const menuBtn = document.querySelector(".mobile-menu-btn");
  if(menuBtn){
    menuBtn.addEventListener("click", () => {
      document.querySelector(".nav").classList.toggle("open");
    });
  }
});

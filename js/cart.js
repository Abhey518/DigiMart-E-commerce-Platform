// js/cart.js - temporary JS cart using localStorage

const CART_KEY = "unimate_cart_v1";

function readCart(){
  const raw = localStorage.getItem(CART_KEY);
  try{
    return raw ? JSON.parse(raw) : [];
  } catch(e){ return []; }
}

function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, qty = 1){
  const cart = readCart();
  const found = cart.find(i => i.id === productId);
  if(found){
    found.qty += qty;
  } else {
    cart.push({ id: productId, qty: qty });
  }
  saveCart(cart);
}

function removeFromCart(productId){
  let cart = readCart();
  cart = cart.filter(i => i.id !== productId);
  saveCart(cart);
}

function updateQty(productId, qty){
  const cart = readCart();
  const item = cart.find(i => i.id === productId);
  if(item){
    item.qty = Math.max(1, parseInt(qty) || 1);
    saveCart(cart);
  }
}

function clearCart(){
  localStorage.removeItem(CART_KEY);
  updateCartCount();
}

function getCartDetailed(){
  const cart = readCart();
  // returns array of {product, qty}
  return cart.map(i => {
    const product = getProductById(i.id);
    return { product, qty: i.qty };
  }).filter(x => x.product);
}

function getCartTotal(){
  const det = getCartDetailed();
  return det.reduce((s, it) => s + (it.product.price * it.qty), 0);
}

function updateCartCount(){
  const cart = readCart();
  const count = cart.reduce((s,i) => s + i.qty, 0);
  const el = document.querySelectorAll(".cart-count");
  el.forEach(node => node.textContent = count);
}

// Expose functions to window for simple usage in HTML
window.CartAPI = {
  addToCart, removeFromCart, updateQty, readCart, getCartDetailed,
  getCartTotal, clearCart, updateCartCount
};

// init
document.addEventListener("DOMContentLoaded", updateCartCount);

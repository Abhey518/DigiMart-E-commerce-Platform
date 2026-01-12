// js/cart.js - temporary JS cart using localStorage

const CART_KEY = "unimate_cart_v1";

<<<<<<< HEAD
function readCart() {
  const raw = localStorage.getItem(CART_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function saveCart(cart) {
=======
function readCart(){
  const raw = localStorage.getItem(CART_KEY);
  try{
    return raw ? JSON.parse(raw) : [];
  } catch(e){ return []; }
}

function saveCart(cart){
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

<<<<<<< HEAD
function addToCart(productId, qty = 1) {
  const cart = readCart();
  const found = cart.find(i => i.id === productId);
  if (found) {
=======
function addToCart(productId, qty = 1){
  const cart = readCart();
  const found = cart.find(i => i.id === productId);
  if(found){
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d
    found.qty += qty;
  } else {
    cart.push({ id: productId, qty: qty });
  }
  saveCart(cart);
}

<<<<<<< HEAD
function removeFromCart(productId) {
=======
function removeFromCart(productId){
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d
  let cart = readCart();
  cart = cart.filter(i => i.id !== productId);
  saveCart(cart);
}

<<<<<<< HEAD
function updateQty(productId, qty) {
  const cart = readCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
=======
function updateQty(productId, qty){
  const cart = readCart();
  const item = cart.find(i => i.id === productId);
  if(item){
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d
    item.qty = Math.max(1, parseInt(qty) || 1);
    saveCart(cart);
  }
}

<<<<<<< HEAD
function clearCart() {
=======
function clearCart(){
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d
  localStorage.removeItem(CART_KEY);
  updateCartCount();
}

<<<<<<< HEAD
function getCartItems() {
  return readCart();
}

// getCartTotal removed - calculate on server or after async fetch

function updateCartCount() {
  const cart = readCart();
  const count = cart.reduce((s, i) => s + i.qty, 0);
=======
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
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d
  const el = document.querySelectorAll(".cart-count");
  el.forEach(node => node.textContent = count);
}

// Expose functions to window for simple usage in HTML
window.CartAPI = {
<<<<<<< HEAD
  addToCart, removeFromCart, updateQty, readCart, getCartItems,
  clearCart, updateCartCount
=======
  addToCart, removeFromCart, updateQty, readCart, getCartDetailed,
  getCartTotal, clearCart, updateCartCount
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d
};

// init
document.addEventListener("DOMContentLoaded", updateCartCount);

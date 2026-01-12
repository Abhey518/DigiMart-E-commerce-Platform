<<<<<<< HEAD
// Product listing functionality
// This is a stub file. Logic is handled by specific page scripts or products.js if needed.
=======
// js/products.js
// Sample product database for front-end (no backend yet).
// Each product has: id, name, category, price, image, short, long, shopId.

// Shop database
const SHOPS = [
  {
    id: "shop001",
    name: "TechHub Colombo",
    description: "Your one-stop shop for electronics, gadgets, and tech accessories. We pride ourselves on quality products and excellent customer service.",
    rating: 4.7,
    reviewCount: 156,
    productCount: 0, // will be calculated
    contact: "+94 77 123 4567",
    email: "info@techhub.lk",
    services: ["Fast Delivery", "1-Year Warranty", "24/7 Support"],
    image: "images/shop-tech.jpg"
  },
  {
    id: "shop002",
    name: "Campus Fashion",
    description: "Trendy clothing and apparel for students and young professionals. Quality fabrics, affordable prices, and the latest styles.",
    rating: 4.5,
    reviewCount: 203,
    productCount: 0,
    contact: "+94 71 234 5678",
    email: "hello@campusfashion.lk",
    services: ["Free Alterations", "Exchange Policy", "Student Discounts"],
    image: "images/shop-fashion.jpg"
  },
  {
    id: "shop003",
    name: "Engineering Supplies Co.",
    description: "Complete range of engineering components, Arduino kits, and lab equipment for students and professionals.",
    rating: 4.8,
    reviewCount: 89,
    productCount: 0,
    contact: "+94 76 345 6789",
    email: "sales@engsupplies.lk",
    services: ["Technical Support", "Bulk Discounts", "Same-Day Delivery"],
    image: "images/shop-eng.jpg"
  },
  {
    id: "shop004",
    name: "HomeStyle Boutique",
    description: "Artisan home goods, handcrafted items, and unique gifts. Supporting local artisans and sustainable living.",
    rating: 4.6,
    reviewCount: 134,
    productCount: 0,
    contact: "+94 75 456 7890",
    email: "contact@homestyleboutique.lk",
    services: ["Gift Wrapping", "Custom Orders", "Local Delivery"],
    image: "images/shop-home.jpg"
  }
];

const PRODUCTS = [
  {
    id: "p001",
    name: "Navy Hoodie",
    category: "Clothing",
    price: 1800.00,
    image: "images/hoodie.jpg",
    short: "Comfortable uni hoodie with pocket.",
    long: "Soft cotton-blend hoodie with University branding — warm and durable for campus life.",
    shopId: "shop002"
  },
  {
    id: "p002",
    name: "USB-C Fast Charger 30W",
    category: "Electronics",
    price: 1500.00,
     originalPrice: 1700.00,
    image: "images/charger.jpg",
    short: "Compact fast charger for phones & tablets.",
    long: "Portable 30W USB-C charger with over-current protection — ideal for students on the go.",
    shopId: "shop001"
  },
  {
    id: "p003",
    name: "Power Bank 10000mAh",
    category: "Electronics",
    price: 1400.00,
     originalPrice: 1800.00,
    image: "images/powerbank.jpg",
    short: "Slim power bank to keep devices alive.",
    long: "Reliable 10000mAh battery, dual output, perfect for long library sessions.",
    shopId: "shop001"
  },
  {
    id: "p004",
    name: "Arduino Uno R3 Kit",
    category: "Academic",
    price: 980.00,
     originalPrice: 1100.00,
    image: "images/arduino.jpg",
    short: "Starter kit for practical projects.",
    long: "Includes Arduino Uno-compatible board, breadboard, jumper wires and components for lab exercises.",
    shopId: "shop003"
  },
  {
    id: "p005",
    name: "Breadboard + Jumper Set",
    category: "Academic",
    price: 700.00,
    image: "images/breadboard.jpg",
    short: "Breadboard and jumper cables.",
    long: "Standard breadboard with pack of male/female jumper wires — useful for prototyping circuits.",
    shopId: "shop003"
  },
  {
    id: "p006",
    name: "Smart Pen (Digital)",
    category: "Electronics",
    price: 1300.00,
     originalPrice: 1500.00,
    image: "images/smartpen.jpg",
    short: "Digitize lecture notes easily.",
    long: "Smart pen records strokes and syncs to apps — perfect for lectures and revision.",
    shopId: "shop001"
  },
  {
    id: "p007",
    name: "Classic Cotton T-Shirt",
    category: "Clothing",
    price: 1200.00,
    image: "images/blue-t-shirt.jpg",
    short: "Comfortable everyday tee - multiple sizes.",
    long: "Soft 100% cotton t-shirt available in various sizes and colors. Ideal for casual wear and local apparel shops.",
    shopId: "shop002"
  },
  {
    id: "p009",
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 2500.00,
    image: "images/earbuds.jpg",
    short: "Affordable wireless earbuds with charging case.",
    long: "Bluetooth earbuds with decent battery life and compact charging case — a popular item in local gadget stores.",
    shopId: "shop001"
  },
  {
    id: "p010",
    name: "Ceramic Mug",
    category: "Home",
    price: 800.00,
    image: "images/mug.jpg",
    short: "Unique hand-crafted mug for hot beverages.",
    long: "Locally made ceramic mug with a hand-glazed finish. Great for gift shops and artisans selling home goods.",
    shopId: "shop004"
  },
  {
    id: "p011",
    name: "Organic Scented Candle",
    category: "Home",
    price: 950.00,
    image: "images/candle.jpg",
    short: "Soy wax candle with natural fragrance.",
    long: "Hand-poured candle with long burn time and natural scents—popular for boutique and lifestyle shops.",
    shopId: "shop004"
  },
];

// helper to find by id
function getProductById(id){
  return PRODUCTS.find(p => p.id === id);
}

// helper to find shop by id
function getShopById(id){
  return SHOPS.find(s => s.id === id);
}

// get products by shop
function getProductsByShop(shopId){
  return PRODUCTS.filter(p => p.shopId === shopId);
}

// Calculate product counts for shops
function updateShopProductCounts(){
  SHOPS.forEach(shop => {
    shop.productCount = PRODUCTS.filter(p => p.shopId === shop.id).length;
  });
}

// Call on load
updateShopProductCounts();

// Format price in Sri Lankan Rupees (LKR)
function formatPriceLKR(amount) {
  // return HTML markup so calling code can render currency and amount separately for styling
  const amt = Number(amount).toLocaleString('en-LK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return `<span class="currency">Rs.</span><span class="amount">${amt}</span>`;
}
>>>>>>> 6c6360353629ad3f13cdce8ac66d268bf0e3e88d

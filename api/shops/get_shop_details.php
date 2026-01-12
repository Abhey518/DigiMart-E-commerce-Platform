<?php
// api/shops/get_shop_details.php
require_once '../../includes/db_connect.php';
require_once '../../includes/functions.php';

session_start();

$sellerEmail = $_GET['seller'] ?? null;

if (!$sellerEmail || $sellerEmail === 'undefined') {
    // Fallback: if user is logged in and viewing their own shop
    if (isset($_SESSION['user_email'])) {
        $sellerEmail = $_SESSION['user_email'];
    } else {
        jsonResponse(['error' => 'Seller not specified'], 400);
    }
}

try {
    // 1. Get Shop Info by User Email
    $sql = "SELECT s.*, u.full_name as owner_name 
            FROM shops s 
            JOIN users u ON s.user_id = u.id 
            WHERE u.email = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$sellerEmail]);
    $shop = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$shop) {
        jsonResponse(['error' => 'Shop not found'], 404);
    }

    $shopId = $shop['id'];

    // 2. Get Products
    $prodStmt = $pdo->prepare("SELECT * FROM products WHERE shop_id = ? ORDER BY created_at DESC");
    $prodStmt->execute([$shopId]);
    $products = $prodStmt->fetchAll(PDO::FETCH_ASSOC);

    // Format products
    $formattedProducts = array_map(function($p) {
        return [
            'id' => $p['id'],
            'name' => $p['name'],
            'category' => $p['category'],
            'price' => (float)$p['price'],
            'stock' => 10, // Default stock until schema update
            'image' => $p['image_url'],
            'description' => $p['long_description'],
            'sold' => (int)$p['sold_count'],
            'rating' => (float)$p['rating'],
            'reviewCount' => (int)$p['reviews_count']
        ];
    }, $products);

    // 3. Calculate Stats
    $totalSales = 0; // Need order items table logic ideally, usage of sold_count column
    $ratingSum = 0;
    foreach ($products as $p) {
        $totalSales += (int)$p['sold_count'];
        $ratingSum += (float)$p['rating'];
    }
    $avgRating = count($products) > 0 ? $ratingSum / count($products) : 0;

    jsonResponse([
        'shop' => [
            'id' => $shop['id'],
            'name' => $shop['name'],
            'description' => $shop['description'],
            'category' => 'General', // Shops table doesn't have category yet, using default
            'logo' => $shop['image_url'],
            'banner' => null, // Not in schema yet
            'rating' => (float)$shop['rating'],
            'owner' => $shop['owner_name'],
            'email' => $sellerEmail
        ],
        'products' => $formattedProducts,
        'stats' => [
            'productCount' => count($formattedProducts),
            'totalSales' => $totalSales,
            'rating' => number_format($avgRating, 1)
        ]
    ]);

} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error'], 500);
}
?>

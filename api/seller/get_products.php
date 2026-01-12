<?php
// api/seller/get_products.php
require_once '../../includes/db_connect.php';
require_once '../../includes/functions.php';

session_start();
requireLogin();

try {
    // Get Shop ID
    $shopStmt = $pdo->prepare("SELECT id FROM shops WHERE user_id = ?");
    $shopStmt->execute([$_SESSION['user_id']]);
    $shop = $shopStmt->fetch();

    if (!$shop) {
        jsonResponse([]);
    }

    $stmt = $pdo->prepare("SELECT * FROM products WHERE shop_id = ? ORDER BY created_at DESC");
    $stmt->execute([$shop['id']]);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Format for frontend
    $formatted = array_map(function($p) {
        return [
            'id' => $p['id'],
            'name' => $p['name'],
            'category' => $p['category'],
            'price' => (float)$p['price'],
            'stock' => 10, // Default since no column yet
            'image' => $p['image_url'],
            'description' => $p['long_description'],
            'sold' => (int)$p['sold_count'],
            'rating' => (float)$p['rating'],
            'reviewCount' => (int)$p['reviews_count'],
            'createdAt' => $p['created_at']
        ];
    }, $products);

    jsonResponse($formatted);

} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error'], 500);
}
?>

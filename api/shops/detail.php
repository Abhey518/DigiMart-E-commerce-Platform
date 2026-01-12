<?php
// api/shops/detail.php
require_once '../../includes/db_connect.php';
require_once '../../includes/functions.php';

$id = $_GET['id'] ?? null;

if (!$id) {
    jsonResponse(['error' => 'No shop ID specified'], 400);
}

try {
    $stmt = $pdo->prepare("SELECT * FROM shops WHERE id = ?");
    $stmt->execute([$id]);
    $shop = $stmt->fetch();

    if (!$shop) {
        jsonResponse(['error' => 'Shop not found'], 404);
    }

    // Get product count
    $stmtCount = $pdo->prepare("SELECT COUNT(*) FROM products WHERE shop_id = ?");
    $stmtCount->execute([$id]);
    $shop['productCount'] = $stmtCount->fetchColumn();
    
    // Ensure numeric types
    $shop['rating'] = (float)$shop['rating'];
    $shop['reviewCount'] = (int)$shop['review_count']; 
    
    // Mock services
    $shop['services'] = ["Fast Delivery", "Quality Support"]; 

    jsonResponse($shop);
} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error'], 500);
}
?>

<?php
// api/stats/summary.php
require_once '../../includes/db_connect.php';
require_once '../../includes/functions.php';

// Public endpoint, no login required

try {
    // 1. Count Users
    $stmt = $pdo->query("SELECT COUNT(*) FROM users");
    $userCount = $stmt->fetchColumn();

    // 2. Count Shops
    $stmt = $pdo->query("SELECT COUNT(*) FROM shops");
    $shopCount = $stmt->fetchColumn();

    // 3. Count Products
    $stmt = $pdo->query("SELECT COUNT(*) FROM products");
    $productCount = $stmt->fetchColumn();

    jsonResponse([
        'users' => (int)$userCount,
        'shops' => (int)$shopCount,
        'products' => (int)$productCount
    ]);

} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error'], 500);
}
?>

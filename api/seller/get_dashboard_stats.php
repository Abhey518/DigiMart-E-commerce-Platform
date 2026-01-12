<?php
// api/seller/get_dashboard_stats.php
require_once '../../includes/db_connect.php';
require_once '../../includes/functions.php';

session_start();
requireLogin();

// Check seller status
if (!isset($_SESSION['is_seller']) || $_SESSION['is_seller'] != 1) {
    jsonResponse(['error' => 'Unauthorized'], 403);
}

try {
    $userId = $_SESSION['user_id'];
    
    // Get Shop ID
    $shopStmt = $pdo->prepare("SELECT id FROM shops WHERE user_id = ?");
    $shopStmt->execute([$userId]);
    $shop = $shopStmt->fetch();

    if (!$shop) {
        jsonResponse([
            'revenue' => 0,
            'products' => 0,
            'orders' => 0,
            'pending_orders' => 0
        ]);
    }

    $shopId = $shop['id'];

    // 1. Total Products
    $prodStmt = $pdo->prepare("SELECT COUNT(*) FROM products WHERE shop_id = ?");
    $prodStmt->execute([$shopId]);
    $totalProducts = $prodStmt->fetchColumn();

    // 2. Orders (Mocked for now as we don't have orders table linked to shops directly yet, or it's complex)
    // The schema has `order_items` -> `products` -> `shops`.
    // So we can count unique orders containing products from this shop.
    
    $orderStmt = $pdo->prepare("
        SELECT COUNT(DISTINCT o.id) 
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON oi.product_id = p.id
        WHERE p.shop_id = ?
    ");
    $orderStmt->execute([$shopId]);
    $totalOrders = $orderStmt->fetchColumn();

    // 3. Pending Orders
    $pendingStmt = $pdo->prepare("
        SELECT COUNT(DISTINCT o.id) 
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON oi.product_id = p.id
        WHERE p.shop_id = ? AND o.status = 'Pending'
    ");
    $pendingStmt->execute([$shopId]);
    $pendingOrders = $pendingStmt->fetchColumn();

    // 4. Revenue (Sum of price_at_time * quantity for items from this shop)
    $revStmt = $pdo->prepare("
        SELECT SUM(oi.price_at_time * oi.quantity) 
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE p.shop_id = ?
    ");
    $revStmt->execute([$shopId]);
    $revenue = $revStmt->fetchColumn() ?: 0;

    jsonResponse([
        'revenue' => (float)$revenue,
        'products' => (int)$totalProducts,
        'orders' => (int)$totalOrders,
        'pending_orders' => (int)$pendingOrders
    ]);

} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error'], 500);
}
?>

<?php
// api/seller/get_orders.php
require_once '../../includes/db_connect.php';
require_once '../../includes/functions.php';

session_start();
requireLogin();

// Check if user is seller
if (!isset($_SESSION['is_seller']) || $_SESSION['is_seller'] != 1) {
    jsonResponse(['error' => 'Unauthorized - Not a seller'], 403);
}

try {
    $userId = $_SESSION['user_id'];

    // Get Shop ID
    $shopStmt = $pdo->prepare("SELECT id FROM shops WHERE user_id = ?");
    $shopStmt->execute([$userId]);
    $shop = $shopStmt->fetch();

    if (!$shop) {
        // Return empty array with a message
        error_log("No shop found for user_id: " . $userId);
        jsonResponse(['message' => 'No shop found for this user', 'orders' => []]);
        exit;
    }

    $shopId = $shop['id'];
    error_log("Found shop_id: " . $shopId . " for user_id: " . $userId);

    // Fetch confirmed orders that contain products from this shop
    $stmt = $pdo->prepare("
        SELECT DISTINCT o.id, o.user_id, o.total_amount, o.status, o.created_at, u.full_name as customer_name
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON oi.product_id = p.id
        JOIN users u ON o.user_id = u.id
        WHERE p.shop_id = ?
        ORDER BY o.created_at DESC
    ");
    $stmt->execute([$shopId]);
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    error_log("Found " . count($orders) . " orders for shop_id: " . $shopId);

    // For each order, get the specific items for this shop
    foreach ($orders as &$order) {
        // Fix types
        $order['id'] = (int)$order['id'];
        $order['total_amount'] = (float)$order['total_amount'];
        
        // Get items for this shop only
        $itemStmt = $pdo->prepare("
            SELECT oi.id, oi.quantity, oi.price_at_time, p.name, p.image_url
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = ? AND p.shop_id = ?
        ");
        $itemStmt->execute([$order['id'], $shopId]);
        $items = $itemStmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Calculate total for this shop specifically
        $shopTotal = 0;
        foreach ($items as &$item) {
            $item['quantity'] = (int)$item['quantity'];
            $item['price_at_time'] = (float)$item['price_at_time'];
            $shopTotal += $item['price_at_time'] * $item['quantity'];
        }
        
        $order['items'] = $items;
        $order['shop_total'] = $shopTotal;
    }

    jsonResponse($orders);

} catch (PDOException $e) {
    error_log("Database error in get_orders.php: " . $e->getMessage());
    jsonResponse(['error' => 'Database error: ' . $e->getMessage()], 500);
} catch (Exception $e) {
    error_log("General error in get_orders.php: " . $e->getMessage());
    jsonResponse(['error' => 'Error: ' . $e->getMessage()], 500);
}
?>

<?php
// api/orders/list.php
require_once '../../includes/db_connect.php';
require_once '../../includes/functions.php';

session_start();
requireLogin();

$userId = $_SESSION['user_id'];

try {
    // Fetch orders
    $stmt = $pdo->prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$userId]);
    $orders = $stmt->fetchAll();

    // Fetch items for each order
    // Optimization: Could use a single JOIN query and group in PHP, but simple loop is readable for now.
    foreach ($orders as &$order) {
        $stmtItems = $pdo->prepare("
            SELECT oi.*, p.name, p.image_url 
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = ?
        ");
        $stmtItems->execute([$order['id']]);
        $order['items'] = $stmtItems->fetchAll();
        
        // Ensure numeric types for JS
        $order['total_amount'] = (float)$order['total_amount'];
        $order['id'] = (int)$order['id'];
        
        // Map fields to match frontend expectation (optional, or update frontend)
        // Frontend expects: id, total, date, status, items[{ productId, quantity, price_at_time }]
        $order['total'] = $order['total_amount'];
        $order['date'] = $order['created_at'];
        
        // Items map
        foreach ($order['items'] as &$item) {
            $item['quantity'] = (int)$item['quantity'];
            $item['price'] = (float)$item['price_at_time'];
            $item['productId'] = $item['product_id'];
            $item['image'] = $item['image_url']; // map image_url to image for frontend
        }
    }

    jsonResponse($orders);

} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error: ' . $e->getMessage()], 500);
}
?>

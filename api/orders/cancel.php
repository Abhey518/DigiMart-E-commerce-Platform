<?php
// api/orders/cancel.php
require_once '../../includes/db_connect.php';
require_once '../../includes/functions.php';

session_start();
requireLogin();

$userId = $_SESSION['user_id'];
$data = json_decode(file_get_contents('php://input'), true);
$orderId = $data['orderId'] ?? null;

if (!$orderId) {
    jsonResponse(['error' => 'Order ID required'], 400);
}

try {
    // Check if order belongs to user and is Pending
    $stmt = $pdo->prepare("SELECT status FROM orders WHERE id = ? AND user_id = ?");
    $stmt->execute([$orderId, $userId]);
    $order = $stmt->fetch();

    if (!$order) {
        jsonResponse(['error' => 'Order not found'], 404);
    }

    if ($order['status'] !== 'Pending') {
        jsonResponse(['error' => 'Only pending orders can be cancelled'], 400);
    }

    // Cancel order
    $updateStmt = $pdo->prepare("UPDATE orders SET status = 'Cancelled' WHERE id = ?");
    $updateStmt->execute([$orderId]);

    jsonResponse(['success' => true, 'message' => 'Order cancelled successfully']);

} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error'], 500);
}
?>

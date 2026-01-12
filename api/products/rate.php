<?php
// api/products/rate.php
require_once '../../includes/db_connect.php';
require_once '../../includes/functions.php';

session_start();
requireLogin();

$userId = $_SESSION['user_id'];
$data = json_decode(file_get_contents('php://input'), true);

$productId = $data['productId'] ?? null;
$orderId = $data['orderId'] ?? null;
$rating = $data['rating'] ?? null; // 1-5
$comment = $data['comment'] ?? '';

if (!$productId || !$orderId || !$rating) {
    jsonResponse(['error' => 'Missing required fields'], 400);
}

if ($rating < 1 || $rating > 5) {
    jsonResponse(['error' => 'Rating must be between 1 and 5'], 400);
}

try {
    // 1. Verify user bought this product in this order AND order is Delivered
    $verifyStmt = $pdo->prepare("
        SELECT o.status 
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        WHERE o.id = ? AND o.user_id = ? AND oi.product_id = ?
    ");
    $verifyStmt->execute([$orderId, $userId, $productId]);
    $order = $verifyStmt->fetch();

    if (!$order) {
        jsonResponse(['error' => 'Order verification failed'], 403);
    }

    if ($order['status'] !== 'Delivered') {
        jsonResponse(['error' => 'You can only rate delivered products'], 400);
    }

    // 2. Check if already reviewed
    $checkStmt = $pdo->prepare("SELECT id FROM reviews WHERE user_id = ? AND product_id = ? AND order_id = ?");
    $checkStmt->execute([$userId, $productId, $orderId]);
    if ($checkStmt->fetch()) {
        jsonResponse(['error' => 'You have already reviewed this item for this order'], 400);
    }

    // 3. Insert Review
    $insertStmt = $pdo->prepare("INSERT INTO reviews (user_id, product_id, order_id, rating, comment) VALUES (?, ?, ?, ?, ?)");
    $insertStmt->execute([$userId, $productId, $orderId, $rating, $comment]);

    // 4. Update Product Rating Stats
    // Calculate new average and count
    $statsStmt = $pdo->prepare("
        SELECT AVG(rating) as avg_rating, COUNT(*) as count 
        FROM reviews 
        WHERE product_id = ?
    ");
    $statsStmt->execute([$productId]);
    $stats = $statsStmt->fetch();

    $newRating = number_format((float)$stats['avg_rating'], 2);
    $newCount = (int)$stats['count'];

    $updateProduct = $pdo->prepare("UPDATE products SET rating = ?, reviews_count = ? WHERE id = ?");
    $updateProduct->execute([$newRating, $newCount, $productId]);

    jsonResponse(['success' => true, 'message' => 'Review submitted successfully', 'newRating' => $newRating]);

} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error: ' . $e->getMessage()], 500);
}
?>

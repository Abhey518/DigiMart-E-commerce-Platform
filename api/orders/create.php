<?php
// api/orders/create.php
require_once '../../includes/db_connect.php';
require_once '../../includes/functions.php';

session_start();
requireLogin(); // Ensure user is logged in

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['items']) || empty($data['items'])) {
    jsonResponse(['error' => 'No items in order'], 400);
}

$userId = $_SESSION['user_id'];
$items = $data['items']; // Array of {productId, quantity}
$totalAmount = 0;

// Validate User Profile
try {
    $stmtUser = $pdo->prepare("SELECT phone, address, city FROM users WHERE id = ?");
    $stmtUser->execute([$userId]);
    $user = $stmtUser->fetch();

    if (!$user || empty($user['phone']) || empty($user['address']) || empty($user['city'])) {
        jsonResponse([
            'error' => 'Profile incomplete. Please add your Phone and Address in Account Settings before purchasing.',
            'profile_incomplete' => true
        ], 400);
    }
} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error validating profile'], 500);
}

try {
    $pdo->beginTransaction();

    // 1. Calculate Total & Verify Stock (Simplified: just get price)
    $orderItems = [];
    foreach ($items as $item) {
        $stmt = $pdo->prepare("SELECT price FROM products WHERE id = ?");
        $stmt->execute([$item['productId']]);
        $product = $stmt->fetch();
        
        if (!$product) {
            throw new Exception("Product ID {$item['productId']} not found");
        }
        
        $price = (float)$product['price'];
        $qty = (int)$item['quantity'];
        $subtotal = $price * $qty;
        $totalAmount += $subtotal;
        
        $orderItems[] = [
            'product_id' => $item['productId'],
            'quantity' => $qty,
            'price' => $price
        ];
    }

    // 2. Create Order (MySQL style: No RETURNING clause)
    $stmt = $pdo->prepare("INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, 'Pending')");
    $stmt->execute([$userId, $totalAmount]);
    $orderId = $pdo->lastInsertId();

    // 3. Create Order Items & Update Sold Count
    $stmt = $pdo->prepare("INSERT INTO order_items (order_id, product_id, quantity, price_at_time) VALUES (?, ?, ?, ?)");
    $stmtUpdate = $pdo->prepare("UPDATE products SET sold_count = sold_count + ? WHERE id = ?");
    
    foreach ($orderItems as $item) {
        $stmt->execute([$orderId, $item['product_id'], $item['quantity'], $item['price']]);
        $stmtUpdate->execute([$item['quantity'], $item['product_id']]);
    }

    $pdo->commit();
    
    jsonResponse(['message' => 'Order placed successfully', 'orderId' => $orderId]);

} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    jsonResponse(['error' => $e->getMessage()], 500);
}
?>

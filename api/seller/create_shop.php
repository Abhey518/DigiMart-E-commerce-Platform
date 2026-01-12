<?php
// api/seller/create_shop.php
require_once '../../includes/db_connect.php';
require_once '../../includes/functions.php';

session_start();

// Ensure user is logged in
requireLogin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    jsonResponse(['error' => 'Invalid data'], 400);
}

// Basic Validation
$requiredFields = ['shopName', 'shopDescription', 'contactPhone', 'contactEmail', 'businessAddress'];
foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        jsonResponse(['error' => "Missing required field: $field"], 400);
    }
}

$userId = $_SESSION['user_id'];
$shopName = htmlspecialchars(strip_tags($data['shopName']));
$shopDescription = htmlspecialchars(strip_tags($data['shopDescription']));
$contactPhone = htmlspecialchars(strip_tags($data['contactPhone']));
$contactEmail = htmlspecialchars(strip_tags($data['contactEmail']));

// Check if user is already a seller
try {
    $stmt = $pdo->prepare("SELECT is_seller FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    $user = $stmt->fetch();

    if ($user && $user['is_seller'] == 1) {
        // Check if shop exists
        $shopStmt = $pdo->prepare("SELECT id FROM shops WHERE user_id = ?");
        $shopStmt->execute([$userId]);
        if ($shopStmt->fetch()) {
             jsonResponse(['error' => 'You are already a seller and have a shop.'], 400);
        }
        // If is_seller is 1 but no shop, we proceed to create shop
    }

    $pdo->beginTransaction();

    // 1. Create Shop
    $sql = "INSERT INTO shops (user_id, name, description, contact_phone, contact_email) 
            VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$userId, $shopName, $shopDescription, $contactPhone, $contactEmail]);
    
    // 2. Update User to be seller
    $updateUser = $pdo->prepare("UPDATE users SET is_seller = 1 WHERE id = ?");
    $updateUser->execute([$userId]);

    $pdo->commit();
    
    // Update session
    $_SESSION['is_seller'] = 1; // Though session.php fetches from DB, this helps immediate session access if needed elsewhere

    jsonResponse(['message' => 'Shop created successfully', 'success' => true]);

} catch (PDOException $e) {
    $pdo->rollBack();
    // Log error in real app
    jsonResponse(['error' => 'Database error: ' . $e->getMessage()], 500);
}
?>

<?php
// api/users/update.php
require_once '../../includes/db_connect.php';
require_once '../../includes/functions.php';

session_start();
requireLogin();

$userId = $_SESSION['user_id'];
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    jsonResponse(['error' => 'Invalid data'], 400);
}

try {
    $sql = "UPDATE users SET 
            full_name = ?, 
            email = ?, 
            phone = ?, 
            address = ?, 
            city = ?, 
            province = ?, 
            postal_code = ?, 
            payment_method = ?,
            card_number = ?,
            card_expiry = ?,
            card_cvv = ?
            WHERE id = ?";
            
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $data['fullName'] ?? '',
        $data['email'] ?? '',
        $data['phone'] ?? '',
        $data['address'] ?? '',
        $data['city'] ?? '',
        $data['province'] ?? '',
        $data['postalCode'] ?? '',
        $data['paymentMethod'] ?? '',
        $data['cardNumber'] ?? '',
        $data['cardExpiry'] ?? '',
        $data['cardCVV'] ?? '',
        $userId
    ]);

    // Update Session Data
    if (!empty($data['email'])) {
        $_SESSION['user_email'] = $data['email'];
    }
    if (!empty($data['fullName'])) {
        $_SESSION['user_name'] = $data['fullName'];
    }

    jsonResponse(['success' => true, 'message' => 'Profile updated successfully']);

} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error: ' . $e->getMessage()], 500);
}
?>

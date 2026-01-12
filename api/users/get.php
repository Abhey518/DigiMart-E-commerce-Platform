<?php
// api/users/get.php
require_once '../../includes/db_connect.php';
require_once '../../includes/functions.php';

session_start();
requireLogin();

$userId = $_SESSION['user_id'];

try {
    $stmt = $pdo->prepare("SELECT full_name, email, phone, address, city, province, postal_code, payment_method, card_number, card_expiry, card_cvv, is_seller FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    $user = $stmt->fetch();

    if (!$user) {
        jsonResponse(['error' => 'User not found'], 404);
    }

    // Don't expose sensitive card info fully in real app, but for this basic app we send it back so form populates.
    // In production, never send CVV back.
    
    jsonResponse($user);

} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error'], 500);
}
?>

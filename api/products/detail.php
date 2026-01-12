<?php
// api/products/detail.php
require_once '../../includes/db_connect.php';
require_once '../../includes/functions.php';

if (!isset($_GET['id'])) {
    jsonResponse(['error' => 'Product ID required'], 400);
}

$id = $_GET['id'];

try {
    $stmt = $pdo->prepare("SELECT p.*, s.name as shop_name, s.rating as shop_rating, s.review_count as shop_reviews, s.description as shop_description 
                           FROM products p 
                           JOIN shops s ON p.shop_id = s.id 
                           WHERE p.id = ?");
    $stmt->execute([$id]);
    $product = $stmt->fetch();

    if ($product) {
        $product['price'] = (float)$product['price'];
        $product['original_price'] = $product['original_price'] ? (float)$product['original_price'] : null;
        jsonResponse($product);
    } else {
        jsonResponse(['error' => 'Product not found'], 404);
    }
} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error'], 500);
}
?>

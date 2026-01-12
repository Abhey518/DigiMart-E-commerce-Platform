<?php
// api/products/list.php
require_once '../../includes/db_connect.php';
require_once '../../includes/functions.php';

$category = $_GET['category'] ?? null;
$search   = $_GET['search'] ?? null;
$shop_id  = $_GET['shop_id'] ?? null; // Add shop_id support

$sql = "SELECT p.*, s.name as shop_name 
        FROM products p 
        LEFT JOIN shops s ON p.shop_id = s.id 
        WHERE 1=1";
$params = [];

if ($category) {
    $sql .= " AND p.category = ?";
    $params[] = $category;
}

if ($search) {
    $sql .= " AND (p.name LIKE ? OR p.short_description LIKE ?)";
    $term = "%$search%";
    $params[] = $term;
    $params[] = $term;
}

if ($shop_id) {
    $sql .= " AND p.shop_id = ?";
    $params[] = $shop_id;
}

$sql .= " ORDER BY p.created_at DESC";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $products = $stmt->fetchAll();
    
    // Format numeric types
    foreach ($products as &$p) {
        $p['price'] = (float)$p['price'];
        $p['original_price'] = $p['original_price'] ? (float)$p['original_price'] : null;
        $p['rating'] = (float)$p['rating'];
    }
    
    jsonResponse($products);
} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error'], 500);
}
?>

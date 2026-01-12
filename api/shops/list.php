<?php
// api/shops/list.php
require_once '../../includes/db_connect.php';
require_once '../../includes/functions.php';

try {
    // Get all shops
    $stmt = $pdo->query("SELECT * FROM shops ORDER BY rating DESC");
    $shops = $stmt->fetchAll();

    // Calculate product counts for each shop
    // In a real app, this could be a JOIN or subquery, but fetching separate is fine for MVP small data
    foreach ($shops as &$shop) {
        $stmtCount = $pdo->prepare("SELECT COUNT(*) FROM products WHERE shop_id = ?");
        $stmtCount->execute([$shop['id']]);
        $shop['productCount'] = $stmtCount->fetchColumn();
        
        // Ensure numeric types
        $shop['rating'] = (float)$shop['rating'];
        $shop['reviewCount'] = (int)$shop['review_count']; // Map DB column to frontend expected camelCase if needed, or update frontend
        // Frontend expects: name, rating, reviewCount, description, productCount, services (mock), id
        
        // Mock services since we don't have a services table yet
        $shop['services'] = ["Fast Delivery", "Quality Support"]; 
    }

    jsonResponse($shops);
} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error'], 500);
}
?>

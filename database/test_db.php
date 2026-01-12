<?php
// Test script to check database structure and data
// Access via: http://localhost/digimart/database/test_db.php

require_once '../includes/db_connect.php';

header('Content-Type: text/html; charset=utf-8');
echo "<h1>DigiMart Database Test</h1>";

try {
    // Check if shops table has user_id column
    echo "<h2>1. Checking shops table structure:</h2>";
    $stmt = $pdo->query("DESCRIBE shops");
    $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "<pre>";
    print_r($columns);
    echo "</pre>";
    
    $hasUserId = false;
    foreach ($columns as $col) {
        if ($col['Field'] === 'user_id') {
            $hasUserId = true;
            break;
        }
    }
    
    if ($hasUserId) {
        echo "<p style='color:green;'>✓ user_id column EXISTS in shops table</p>";
    } else {
        echo "<p style='color:red;'>✗ user_id column MISSING in shops table</p>";
        echo "<p>Run this SQL to fix:</p>";
        echo "<pre>ALTER TABLE shops ADD COLUMN user_id INT AFTER id;</pre>";
    }
    
    // Check shops data
    echo "<h2>2. Shops in database:</h2>";
    $stmt = $pdo->query("SELECT * FROM shops");
    $shops = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "<pre>";
    print_r($shops);
    echo "</pre>";
    
    // Check users
    echo "<h2>3. Users in database:</h2>";
    $stmt = $pdo->query("SELECT id, email, full_name FROM users");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "<pre>";
    print_r($users);
    echo "</pre>";
    
    // Check orders
    echo "<h2>4. Orders in database:</h2>";
    $stmt = $pdo->query("SELECT * FROM orders");
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "<pre>";
    print_r($orders);
    echo "</pre>";
    
    // Check order_items
    echo "<h2>5. Order items in database:</h2>";
    $stmt = $pdo->query("SELECT * FROM order_items");
    $orderItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "<pre>";
    print_r($orderItems);
    echo "</pre>";
    
    // Check products
    echo "<h2>6. Products in database:</h2>";
    $stmt = $pdo->query("SELECT id, name, shop_id, price FROM products LIMIT 10");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "<pre>";
    print_r($products);
    echo "</pre>";
    
} catch (PDOException $e) {
    echo "<p style='color:red;'>Database Error: " . $e->getMessage() . "</p>";
}
?>

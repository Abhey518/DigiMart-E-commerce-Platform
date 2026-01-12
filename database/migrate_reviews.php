<?php
// database/migrate_reviews.php
require_once __DIR__ . '/../includes/db_connect.php';

try {
    $sql = file_get_contents(__DIR__ . '/add_reviews.sql');
    $pdo->exec($sql);
    echo "Reviews table created successfully.";
} catch (PDOException $e) {
    echo "Error creating table: " . $e->getMessage();
}
?>

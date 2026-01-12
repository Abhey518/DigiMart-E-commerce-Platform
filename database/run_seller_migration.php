<?php
// database/run_seller_migration.php
require_once __DIR__ . '/../includes/db_connect.php';

try {
    $sql = file_get_contents(__DIR__ . '/migrate_seller.sql');
    $pdo->exec($sql);
    echo "Seller columns added successfully.";
} catch (PDOException $e) {
    echo "Error updating table: " . $e->getMessage();
}
?>

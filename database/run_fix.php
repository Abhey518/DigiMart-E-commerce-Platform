<?php
// database/run_fix.php
require_once __DIR__ . '/../includes/db_connect.php';

try {
    $sql = file_get_contents(__DIR__ . '/fix_shops_table.sql');
    $pdo->exec($sql);
    echo "Shops table updated successfully.";
} catch (PDOException $e) {
    echo "Error updating table: " . $e->getMessage();
}
?>

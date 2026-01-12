<?php
// database/migrate_profile.php
require_once __DIR__ . '/../includes/db_connect.php';

try {
    $sql = file_get_contents(__DIR__ . '/add_profile_fields.sql');
    $pdo->exec($sql);
    echo "User profile fields added successfully.";
} catch (PDOException $e) {
    // If column already exists, it might fail, which is fine for idempotency if we handled it, 
    // but for now let's just show error.
    echo "Error updating table: " . $e->getMessage();
}
?>

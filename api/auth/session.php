<?php
// api/auth/session.php
require_once '../../includes/db_connect.php';
require_once '../../includes/functions.php';

session_start();
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

if (isset($_SESSION['user_id'])) {
    try {
        // Fetch fresh data from DB to ensure sync
        $stmt = $pdo->prepare("SELECT full_name, email, is_seller FROM users WHERE id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        $user = $stmt->fetch();

        if ($user) {
            // Update session cache just in case
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_name'] = $user['full_name'];

            jsonResponse([
                'loggedIn' => true,
                'user' => [
                    'id' => $_SESSION['user_id'],
                    'email' => $user['email'],
                    'name' => $user['full_name'],
                    'isSeller' => $user['is_seller'] == 1
                ]
            ]);
        } else {
            // User deleted?
            session_destroy();
            jsonResponse(['loggedIn' => false]);
        }
    } catch (PDOException $e) {
        jsonResponse(['error' => 'Database error'], 500);
    }
} else {
    jsonResponse(['loggedIn' => false]);
}
?>

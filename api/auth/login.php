<?php
// api/auth/login.php
require_once '../../includes/db_connect.php';
require_once '../../includes/functions.php';

session_start();
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['email']) || !isset($data['password'])) {
    jsonResponse(['error' => 'Missing credentials'], 400);
}

$email = $data['email'];
$password = $data['password'];

try {
    $stmt = $pdo->prepare("SELECT id, full_name, email, password_hash FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['user_name'] = $user['full_name'];
        
        jsonResponse(['message' => 'Login successful', 'user' => ['email' => $user['email'], 'name' => $user['full_name']]]);
    } else {
        jsonResponse(['error' => 'Invalid email or password'], 401);
    }
} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error'], 500);
}
?>

<?php
// api/auth/register.php
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

if (!$data || !isset($data['email']) || !isset($data['password']) || !isset($data['fullName'])) {
    jsonResponse(['error' => 'Missing required fields'], 400);
}

$email = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
$password = $data['password'];
$fullName = trim($data['fullName']);

if (!$email) {
    jsonResponse(['error' => 'Invalid email format'], 400);
}

// Check if user exists
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->fetch()) {
    jsonResponse(['error' => 'Email already registered'], 409);
}

// Hash password
$hash = password_hash($password, PASSWORD_DEFAULT);

// Insert user
try {
    $stmt = $pdo->prepare("INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)");
    $stmt->execute([$fullName, $email, $hash]);
    
    // Auto login
    $_SESSION['user_id'] = $pdo->lastInsertId();
    $_SESSION['user_email'] = $email;
    $_SESSION['user_name'] = $fullName;
    
    jsonResponse(['message' => 'Registration successful', 'user' => ['email' => $email, 'name' => $fullName]]);
} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error'], 500);
}
?>

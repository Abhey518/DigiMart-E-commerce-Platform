<?php
// api/auth/logout.php
require_once '../../includes/functions.php';

session_start();
session_destroy();
jsonResponse(['message' => 'Logged out successfully']);
?>

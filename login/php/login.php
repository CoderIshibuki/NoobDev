<?php
session_start();
require_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    
    try {
        $stmt = $pdo->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['password'])) {
            // Login successful
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_email'] = $user['email'];
            
            echo "Login successful! Welcome " . $user['name'];
            // Hoặc redirect đến trang chính
            // header("Location: dashboard.php");
        } else {
            echo "Invalid email or password";
        }
        
    } catch(PDOException $e) {
        die("Error: " . $e->getMessage());
    }
}
?>
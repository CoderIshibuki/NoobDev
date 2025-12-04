<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
require_once 'db_connection.php'; // Cùng cấp

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    
    try {
        $stmt = $pdo->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_email'] = $user['email'];
            
            // SỬA: Ra khỏi thư mục php (../), ra khỏi login (../) -> Vào root
            header("Location: ../../dashboard.php");
            exit();
            
        } else {
            // Có thể thêm redirect về login kèm thông báo lỗi nếu muốn
            echo "<script>alert('Invalid email or password'); window.location.href='../login.html';</script>";
        }
        
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
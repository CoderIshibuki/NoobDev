<?php
session_start();
require_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email']);
    
    try {
        // Kiểm tra email có tồn tại không
        $stmt = $pdo->prepare("SELECT id, name FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if ($user) {
            // Tạo mã token ngẫu nhiên
            $token = bin2hex(random_bytes(50));
            
            // Thời gian hết hạn: 1 giờ sau
            $expires = date("Y-m-d H:i:s", strtotime('+1 hour'));
            
            // Lưu token vào database
            $stmt = $pdo->prepare("UPDATE users SET reset_token = ?, reset_expires = ? WHERE email = ?");
            $stmt->execute([$token, $expires, $email]);
            
            // Tạo link reset password
            $reset_link = "http://localhost/user_auth/LOGIN/php/reset_password.php?token=$token";
            
            // Hiển thị thông báo (tạm thời chưa gửi email)
            echo "<div style='text-align: center; padding: 20px;'>";
            echo "<h2>Reset Link Created!</h2>";
            echo "<p>We found your account: <strong>{$user['name']}</strong></p>";
            echo "<p>Your reset link (copy and paste in browser):</p>";
            echo "<div style='background: #f0f0f0; padding: 10px; margin: 10px; word-break: break-all;'>";
            echo "<a href='$reset_link'>$reset_link</a>";
            echo "</div>";
            echo "<p>This link expires in 1 hour.</p>";
            echo "<a href='../index.html' style='color: #FF4B2B;'>← Back to Login</a>";
            echo "</div>";
            
        } else {
            echo "<div style='text-align: center; padding: 20px; color: red;'>";
            echo "<h2>Email Not Found</h2>";
            echo "<p>No account found with that email address.</p>";
            echo "<a href='../index.html'>← Back to Login</a>";
            echo "</div>";
        }
        
    } catch(PDOException $e) {
        echo "<div style='text-align: center; padding: 20px; color: red;'>";
        echo "<h2>Error</h2>";
        echo "<p>Something went wrong: " . $e->getMessage() . "</p>";
        echo "<a href='../index.html'>← Back to Login</a>";
        echo "</div>";
    }
} else {
    // Nếu không phải POST request, redirect về trang chủ
    header("Location: ../index.html");
    exit();
}
?>
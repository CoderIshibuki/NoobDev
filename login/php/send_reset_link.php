<?php
session_start();
require_once 'db_connection.php';

// ĐƯỜNG DẪN CHÍNH XÁC CHO BẠN
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

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
            $reset_link = "http://localhost:8000/php/reset_password.php?token=$token";
            
            // Gửi email
            $mail = new PHPMailer(true);
            
            try {
                // Server settings
                $mail->isSMTP();
                $mail->Host       = 'smtp.gmail.com';
                $mail->SMTPAuth   = true;
                $mail->Username   = 'tranvuhoaphat@gmail.com'; // THAY EMAIL CỦA BẠN
                $mail->Password   = 'bbst fdem tzfx dfgu';    // THAY APP PASSWORD
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port       = 587;
                
                // Recipients
                $mail->setFrom('tranvuhoaphat@gmail.com', 'NoobDev');
                $mail->addAddress($email, $user['name']);
                
                // Content
                $mail->isHTML(true);
                $mail->Subject = 'Reset Your Password - NoobDev';
                $mail->Body    = "
                    <h2>Password Reset Request</h2>
                    <p>Hello {$user['name']},</p>
                    <p>You requested a password reset. Click the link below to reset your password:</p>
                    <p><a href='$reset_link' style='background: #4a8dbf; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;'>Reset Password</a></p>
                    <p>Or copy this link: $reset_link</p>
                    <p><strong>This link expires in 1 hour.</strong></p>
                    <p>If you didn't request this, please ignore this email.</p>
                    <br>
                    <p>Best regards,<br>NoobDev Team</p>
                ";
                
                $mail->AltBody = "Reset your password: $reset_link (Expires in 1 hour)";
                
                $mail->send();
                
                echo "<div style='text-align: center; padding: 40px; max-width: 500px; margin: 50px auto; background: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);'>";
                echo "<h2 style='color: #4CAF50; margin-bottom: 20px;'>✓ Email Sent!</h2>";
                echo "<p style='margin-bottom: 20px;'>We've sent a password reset link to:</p>";
                echo "<p style='font-weight: bold; background: #f8f9fa; padding: 10px; border-radius: 5px;'>$email</p>";
                echo "<p style='margin-top: 20px; color: #666;'>Please check your email and click the reset link.</p>";
                echo "<a href='../login.html' style='display: inline-block; margin-top: 20px; padding: 10px 20px; background: #4a8dbf; color: white; text-decoration: none; border-radius: 5px;'>← Back to Login</a>";
                echo "</div>";
                
            } catch (Exception $e) {
                echo "<div style='text-align: center; padding: 40px; color: red;'>";
                echo "<h2>Email Error</h2>";
                echo "<p>Could not send email. Error: {$mail->ErrorInfo}</p>";
                echo "<a href='../login.html'>← Back to Login</a>";
                echo "</div>";
            }
            
        } else {
            echo "<div style='text-align: center; padding: 40px; color: red;'>";
            echo "<h2>Email Not Found</h2>";
            echo "<p>No account found with that email address.</p>";
            echo "<a href='../login.html'>← Back to Login</a>";
            echo "</div>";
        }
        
    } catch(PDOException $e) {
        echo "<div style='text-align: center; padding: 40px; color: red;'>";
        echo "<h2>Error</h2>";
        echo "<p>Something went wrong: " . $e->getMessage() . "</p>";
        echo "<a href='../login.html'>← Back to Login</a>";
        echo "</div>";
    }
} else {
    header("Location: ../login.html");
    exit();
}
?>
<?php
session_start();
// Đảm bảo đường dẫn này đúng với vị trí file db_connection.php
require_once 'db_connection.php'; 

// --- KIỂM TRA ĐƯỜNG DẪN COMPOSER ---
// Thử load vendor từ thư mục cha (login/vendor)
if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
    require_once __DIR__ . '/../vendor/autoload.php';
} else {
    // Nếu không thấy, báo lỗi rõ ràng để bạn biết
    die("Lỗi: Không tìm thấy thư viện PHPMailer. Hãy chạy 'composer require phpmailer/phpmailer' trong thư mục login.");
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$message_html = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email']);
    
    try {
        $stmt = $pdo->prepare("SELECT id, name FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if ($user) {
            $token = bin2hex(random_bytes(50));
            $expires = date("Y-m-d H:i:s", strtotime('+1 hour'));
            
            $stmt = $pdo->prepare("UPDATE users SET reset_token = ?, reset_expires = ? WHERE email = ?");
            $stmt->execute([$token, $expires, $email]);
            
            // Link reset: Sửa port nếu cần (ví dụ localhost:8080)
            $reset_link = "http://localhost/noobdev/login/php/reset_password.php?token=$token";
            
            $mail = new PHPMailer(true);
            
            try {
                // Cấu hình Server gửi mail
                $mail->isSMTP();
                $mail->Host       = 'smtp.gmail.com';
                $mail->SMTPAuth   = true;
                $mail->Username   = 'tranvuhoaphat@gmail.com'; // <--- EMAIL CỦA BẠN
                $mail->Password   = 'bbst fdem tzfx dfgu';    // <--- APP PASSWORD (16 ký tự)
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port       = 587;
                
                // Người gửi & Người nhận
                $mail->setFrom('tranvuhoaphat@gmail.com', 'NoobDev Support');
                $mail->addAddress($email, $user['name']);
                
                // Nội dung
                $mail->isHTML(true);
                $mail->Subject = 'Reset Your Password - NoobDev';
                $mail->Body    = "
                    <div style='font-family: sans-serif; padding: 20px; color: #333;'>
                        <h2 style='color: #4a8dbf;'>Password Reset Request</h2>
                        <p>Hi {$user['name']},</p>
                        <p>Click nút bên dưới để đặt lại mật khẩu:</p>
                        <a href='$reset_link' style='background: #4a8dbf; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;'>Reset Password</a>
                        <p>Link hết hạn sau 1 giờ.</p>
                    </div>
                ";
                
                $mail->send();
                
                $message_html = "
                    <h2 class='message-title success'>✓ Email Sent!</h2>
                    <p>Chúng tôi đã gửi link đặt lại mật khẩu tới:</p>
                    <p class='email-display'>$email</p>
                    <a href='../login.html' class='btn-back'>Back to Login</a>
                ";
                
            } catch (Exception $e) {
                $message_html = "
                    <h2 class='message-title error'>Gửi Email Thất bại</h2>
                    <p>Lỗi: {$mail->ErrorInfo}</p>
                    <p>Hãy kiểm tra lại App Password trong code.</p>
                    <a href='../login.html' class='btn-back'>Thử lại</a>
                ";
            }
            
        } else {
            $message_html = "
                <h2 class='message-title error'>Email Không Tồn Tại</h2>
                <p>Chúng tôi không tìm thấy tài khoản nào với email này.</p>
                <a href='../login.html' class='btn-back'>Thử lại</a>
            ";
        }
        
    } catch(PDOException $e) {
        $message_html = "<h2>Database Error</h2><p>" . $e->getMessage() . "</p>";
    }
} else {
    header("Location: ../login.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <link rel="stylesheet" href="../style.css">
    <style>
        body {
            display: flex; justify-content: center; align-items: center; min-height: 100vh;
            background: linear-gradient(135deg, #0a2647 0%, #1a4d7a 100%); font-family: 'Montserrat', sans-serif;
        }
        .message-container {
            background: rgba(255, 255, 255, 0.95); padding: 40px; border-radius: 10px;
            text-align: center; max-width: 500px; width: 90%; box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .success { color: #28a745; }
        .error { color: #dc3545; }
        .email-display { font-weight: bold; margin: 15px 0; color: #0a2647; }
        .btn-back {
            display: inline-block; margin-top: 20px; padding: 10px 25px;
            background: #4a8dbf; color: white; text-decoration: none; border-radius: 25px;
        }
    </style>
</head>
<body>
    <div class="message-container">
        <?php echo $message_html; ?>
    </div>
</body>
</html>
<?php
session_start();
// ĐƯỜNG DẪN ĐÃ CHỈNH SỬA: db_connection.php nằm cùng thư mục
require_once 'db_connection.php'; 

// ĐƯỜNG DẪN CHÍNH XÁC CHO BẠN
// Đảm bảo đường dẫn này chính xác (thoát khỏi php/ và login/ để đến vendor)
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$message_html = ""; // Biến để lưu trữ nội dung HTML sẽ hiển thị

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
            // CHÚ Ý: Đường dẫn cần tương đối so với vị trí file PHP này (nếu reset_password.php ở cùng thư mục)
            $reset_link = "http://localhost:8000/login/php/reset_password.php?token=$token";
            
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
                
                // --- THÔNG BÁO THÀNH CÔNG VỚI GIAO DIỆN MỚI ---
                $message_html = "
                    <h2 class='message-title success'>✓ Email Đặt lại đã được Gửi!</h2>
                    <p style='margin-bottom: 20px;'>Chúng tôi đã gửi một liên kết đặt lại mật khẩu đến:</p>
                    <p class='email-display'>$email</p>
                    <p style='margin-top: 20px;'>Vui lòng kiểm tra email của bạn và nhấp vào liên kết đặt lại.</p>
                    <p style='font-size: 0.9em; opacity: 0.8;'>Lưu ý: Liên kết sẽ hết hạn sau 1 giờ.</p>
                    <a href='../login.html' class='btn-back'>← Trở lại Đăng nhập</a>
                ";
                
            } catch (Exception $e) {
                // --- THÔNG BÁO LỖI GỬI EMAIL VỚI GIAO DIỆN MỚI ---
                $message_html = "
                    <h2 class='message-title error'>Lỗi Gửi Email</h2>
                    <p>Không thể gửi email. Lỗi: {$mail->ErrorInfo}</p>
                    <a href='../login.html' class='btn-back'>← Trở lại Đăng nhập</a>
                ";
            }
            
        } else {
            // --- THÔNG BÁO LỖI EMAIL KHÔNG TỒN TẠI VỚI GIAO DIỆN MỚI ---
            $message_html = "
                <h2 class='message-title error'>Email Không Tìm Thấy</h2>
                <p>Không tìm thấy tài khoản với địa chỉ email này.</p>
                <a href='../login.html' class='btn-back'>← Trở lại Đăng nhập</a>
            ";
        }
        
    } catch(PDOException $e) {
        // --- THÔNG BÁO LỖI CSDL VỚI GIAO DIỆN MỚI ---
        $message_html = "
            <h2 class='message-title error'>Lỗi Cơ sở Dữ liệu</h2>
            <p>Đã xảy ra lỗi: " . $e->getMessage() . "</p>
            <a href='../login.html' class='btn-back'>← Trở lại Đăng nhập</a>
        ";
    }
} else {
    // Nếu truy cập trực tiếp bằng GET, chuyển hướng về trang đăng nhập
    header("Location: ../login.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Status - NoobDev</title>
    <link rel="stylesheet" href="../../style.css"> 
    
    <style>
        /* NỀN XANH DƯƠNG CHỦ ĐẠO */
        body {
            background: linear-gradient(135deg, #0a2647 0%, #1a4d7a 100%);
            min-height: 100vh;
            color: white;
            font-family: 'Montserrat', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            text-align: center;
        }

        /* CONTAINER THÔNG BÁO */
        .message-container {
            position: relative;
            z-index: 10;
            background: rgba(255, 255, 255, 0.15); 
            backdrop-filter: blur(10px);
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            width: 100%;
            max-width: 500px;
            text-align: center;
        }

        .message-title {
            font-size: 28px;
            margin-bottom: 25px;
            text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
        }

        .message-container p {
            margin-bottom: 15px;
            font-size: 16px;
        }

        .success {
            color: #4CAF50; /* Xanh lá cây cho thành công */
        }
        .error {
            color: #f44336; /* Đỏ cho lỗi */
        }

        .email-display {
            font-weight: bold;
            background: rgba(255, 255, 255, 0.1);
            padding: 10px;
            border-radius: 5px;
            margin: 20px auto;
            color: #d1e7ff;
            max-width: 80%;
        }

        .btn-back {
            display: inline-block;
            margin-top: 30px;
            padding: 12px 25px;
            background: #4a8dbf;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            transition: all 0.3s ease;
        }

        .btn-back:hover {
            background: #3a7daf;
            transform: translateY(-2px);
        }
        
        /* Đảm bảo các thành phần nền được định vị đúng */
        .stars, .moon, .clouds {
            pointer-events: none;
        }
    </style>
</head>
<body>
    <div class="stars" id="starsContainer"></div>
    <div class="moon">
        <div class="moon-crater crater1"></div>
        <div class="moon-crater crater2"></div>
        <div class="moon-crater crater3"></div>
    </div>
    <div class="clouds">
        <div class="cloud cloud1"></div>
        <div class="cloud cloud2"></div>
        <div class="cloud cloud3"></div>
    </div>
    
    <div class="message-container">
        <?php echo $message_html; ?>
    </div>

    <script src="../../script.js"></script> 
</body>
</html>
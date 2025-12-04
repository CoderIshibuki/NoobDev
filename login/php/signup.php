<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once 'db_connection.php';

$registration_message = "";
$error_message = "";
$registration_success = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    
    // ... (Giữ nguyên logic PHP xử lý đăng ký) ...
    // Để ngắn gọn tôi ẩn phần logic PHP không đổi, chỉ tập trung vào HTML bên dưới
    if (empty($name) || empty($email) || empty($password)) {
        $error_message = "Vui lòng điền đầy đủ tất cả các trường.";
    } else {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        try {
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            if ($stmt->rowCount() > 0) {
                $error_message = "Email đã tồn tại. Vui lòng thử Đăng nhập.";
            } else {
                $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
                $stmt->execute([$name, $email, $hashed_password]);
                $registration_success = true;
                $registration_message = "Đã đăng ký thành công! Vui lòng đăng nhập trong 15 giây.";
            }
        } catch(PDOException $e) {
            $error_message = "Lỗi: " . $e->getMessage();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - NoobDev</title>
    <link rel="stylesheet" href="../style.css"> 
    
    <style>
        /* Giữ nguyên CSS nội bộ của file này */
        body {
            background: linear-gradient(135deg, #0a2647 0%, #1a4d7a 100%);
            min-height: 100vh;
            color: white;
            font-family: 'Montserrat', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        /* ... Các class CSS khác giữ nguyên ... */
        .register-container {
            position: relative; z-index: 10; background: rgba(255, 255, 255, 0.15); 
            backdrop-filter: blur(10px); padding: 40px; border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); width: 100%; max-width: 400px; text-align: center;
        }
        .form-group { margin-bottom: 20px; text-align: left; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: bold; color: #d1e7ff; }
        .form-group input { width: 100%; padding: 12px; border: none; border-radius: 8px; background: rgba(255, 255, 255, 0.2); color: white; }
        .register-btn { width: 100%; padding: 12px; background: #4a8dbf; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 10px; }
        .stars, .moon, .clouds { pointer-events: none; }
    </style>
</head>
<body>
    <div class="stars" id="starsContainer"></div>
    <div class="register-container">
        <?php if ($registration_success): ?>
            <h2>🎉 Đăng ký thành công!</h2>
            <div class="message success"><?php echo $registration_message; ?></div>
            <p class="link-text">
                Nếu không muốn chờ, <a href="../login.html">đăng nhập ngay</a>.
            </p>
            <script>
                setTimeout(function() {
                    // SỬA: Lùi 1 cấp về login.html
                    window.location.href = '../login.html';
                }, 15000); 
            </script>
        <?php else: ?>
            <h2>🚀 Create Account</h2>
            <?php if ($error_message): ?><div class="message error"><?php echo $error_message; ?></div><?php endif; ?>
            
            <form method="POST" action="signup.php">
                <div class="form-group"><label>Name</label><input type="text" name="name" required></div>
                <div class="form-group"><label>Email</label><input type="email" name="email" required></div>
                <div class="form-group"><label>Password</label><input type="password" name="password" required></div>
                <button type="submit" class="register-btn">Register</button>
            </form>
            <div class="link-text">
                Already have an account? <a href="../login.html">Login here</a>
            </div>
        <?php endif; ?>
    </div>
    <script src="../script.js"></script> 
</body>
</html>
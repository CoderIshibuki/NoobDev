<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// ĐƯỜNG DẪN ĐÃ CHỈNH SỬA: db_connection.php nằm cùng thư mục
require_once 'db_connection.php';

$registration_message = "";
$error_message = "";
$registration_success = false; // Cờ mới để kiểm tra trạng thái đăng ký

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    
    if (empty($name) || empty($email) || empty($password)) {
        $error_message = "Vui lòng điền đầy đủ tất cả các trường.";
    } else {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        
        try {
            // Kiểm tra email đã tồn tại chưa
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            
            if ($stmt->rowCount() > 0) {
                $error_message = "Email đã tồn tại. Vui lòng thử Đăng nhập.";
            } else {
                // Thêm người dùng mới
                $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
                $stmt->execute([$name, $email, $hashed_password]);
                
                // --- Cập nhật biến trạng thái ---
                $registration_success = true;
                $registration_message = "Đã đăng ký thành công! Vui lòng đăng nhập trong 15 giây.";
            }
        } catch(PDOException $e) {
            $error_message = "Lỗi cơ sở dữ liệu: " . $e->getMessage();
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
    <link rel="stylesheet" href="../../style.css"> 
    
    <style>
        /* CSS cho nền và form (giữ nguyên từ câu trả lời trước) */
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
        .register-container {
            position: relative;
            z-index: 10; 
            background: rgba(255, 255, 255, 0.15); 
            backdrop-filter: blur(10px);
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            width: 100%;
            max-width: 400px;
            text-align: center;
        }
        .register-container h2 {
            margin-bottom: 25px;
            font-size: 28px;
            text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
        }
        .form-group { margin-bottom: 20px; text-align: left; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: bold; color: #d1e7ff; }
        .form-group input { 
            width: 100%; padding: 12px; border: none; border-radius: 8px;
            background: rgba(255, 255, 255, 0.2); color: white; font-size: 16px;
        }
        .form-group input:focus { background: rgba(255, 255, 255, 0.3); outline: none; box-shadow: 0 0 0 2px #4a8dbf; }
        .form-group input::placeholder { color: rgba(255, 255, 255, 0.7); }
        .register-btn {
            width: 100%; padding: 12px; background: #4a8dbf; color: white;
            border: none; border-radius: 8px; font-size: 18px; font-weight: bold;
            cursor: pointer; transition: all 0.3s ease; margin-top: 10px;
        }
        .register-btn:hover { background: #3a7daf; transform: translateY(-2px); }
        .link-text { margin-top: 20px; font-size: 14px; }
        .link-text a { color: #d1e7ff; text-decoration: none; font-weight: bold; }
        .link-text a:hover { text-decoration: underline; }
        .message { padding: 15px; border-radius: 10px; margin-bottom: 20px; font-weight: bold; font-size: 1.1em; }
        .success { background-color: #4CAF50; color: white; }
        .error { background-color: #f44336; color: white; }
        .stars, .moon, .clouds { pointer-events: none; }
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
    
    <div class="register-container">
        
        <?php if ($registration_success): ?>
            <h2>🎉 Đăng ký thành công!</h2>
            <div class="message success">
                <?php echo $registration_message; ?>
            </div>
            
            <p class="link-text">
                Nếu không muốn chờ, bạn có thể <a href="../login.html">nhấn vào đây để đăng nhập ngay</a>.
            </p>

            <script>
                // Chuyển hướng sau 15 giây (15000 milliseconds) đến trang đăng nhập (../login.html)
                var seconds = 15;
                var messageDiv = document.querySelector('.message.success');
                
                // Cập nhật đếm ngược trong thông báo
                function updateCountdown() {
                    messageDiv.innerHTML = "Đã đăng ký thành công! Vui lòng đăng nhập trong <b>" + seconds + "s</b>.";
                    seconds--;
                    if (seconds < 0) {
                        clearInterval(countdownInterval);
                    }
                }

                updateCountdown(); // Hiển thị lần đầu
                var countdownInterval = setInterval(updateCountdown, 1000); // Cập nhật mỗi giây
                
                // Logic chuyển hướng
                setTimeout(function() {
                    window.location.href = '../login.html';
                }, 15000); 
            </script>

        <?php else: ?>
            <h2>🚀 Create Your NoobDev Account</h2>
            
            <?php if ($error_message): ?>
                <div class="message error"><?php echo $error_message; ?></div>
            <?php endif; ?>

            <form method="POST" action="signup.php">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your full name" required value="<?php echo isset($name) ? htmlspecialchars($name) : ''; ?>">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email address" required value="<?php echo isset($email) ? htmlspecialchars($email) : ''; ?>">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Choose a strong password" required>
                </div>
                <button type="submit" class="register-btn">Register</button>
            </form>

            <div class="link-text">
                Already have an account? <a href="../login.html">Login here</a>
            </div>
        <?php endif; ?>
    </div>

    <script src="../../script.js"></script> 
</body>
</html>
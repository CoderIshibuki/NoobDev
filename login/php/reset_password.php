<?php
require_once 'db_connection.php';

$message = "";
$show_form = false;

if (isset($_GET['token'])) {
    $token = $_GET['token'];
    
    // Kiểm tra token có hợp lệ không
    $stmt = $pdo->prepare("SELECT id, email FROM users WHERE reset_token = ? AND reset_expires > NOW()");
    $stmt->execute([$token]);
    $user = $stmt->fetch();
    
    if ($user) {
        $show_form = true;
        
        // Xử lý form reset password
        if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['new_password'])) {
            $new_password = password_hash($_POST['new_password'], PASSWORD_DEFAULT);
            
            // Cập nhật password mới và xóa token
            $stmt = $pdo->prepare("UPDATE users SET password = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?");
            $stmt->execute([$new_password, $user['id']]);
            
            $message = "<div style='color: green;'><h2>Success!</h2><p>Your password has been reset successfully!</p></div>";
            $show_form = false;
        }
    } else {
        $message = "<div style='color: red;'><h2>Invalid Link</h2><p>This reset link is invalid or has expired.</p></div>";
    }
} else {
    $message = "<div style='color: red;'><h2>Missing Token</h2><p>No reset token provided.</p></div>";
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Reset Password</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 40px; 
            background: #f6f5f7;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 14px 28px rgba(0,0,0,0.25);
            max-width: 400px;
            width: 100%;
            text-align: center;
        }
        input[type="password"] {
            background-color: #eee;
            border: none;
            padding: 12px 15px;
            margin: 8px 0;
            width: 100%;
        }
        button {
            border-radius: 20px;
            border: 1px solid #FF4B2B;
            background-color: #FF4B2B;
            color: #FFFFFF;
            font-size: 12px;
            font-weight: bold;
            padding: 12px 45px;
            letter-spacing: 1px;
            text-transform: uppercase;
            cursor: pointer;
            margin-top: 20px;
        }
        a {
            color: #333;
            font-size: 14px;
            text-decoration: none;
            margin: 15px 0;
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Reset Password</h1>
        
        <?php echo $message; ?>
        
        <?php if ($show_form): ?>
        <form method="POST">
            <p>Enter your new password:</p>
            <input type="password" name="new_password" placeholder="New Password" required minlength="6">
            <button type="submit">Reset Password</button>
        </form>
        <?php endif; ?>
        
        <br>
        <a href="../index.html">← Back to Login</a>
    </div>
</body>
</html>
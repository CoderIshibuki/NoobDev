<?php
require_once 'db_connection.php';
// ... logic xử lý reset token ...
?>

<!DOCTYPE html>
<html>
<head>
    <title>Reset Password</title>
    <style>
        /* Giữ nguyên style */
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
        <a href="../login.html">← Back to Login</a>
    </div>
</body>
</html>
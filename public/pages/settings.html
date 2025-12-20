<?php
session_start();
require_once '../login/php/db_connection.php';

// Bảo mật: Chưa đăng nhập thì đá về login
if (!isset($_SESSION['user_id'])) {
    header("Location: ../login/login.html");
    exit();
}

$user_id = $_SESSION['user_id'];
$message = "";
$msg_type = "";

// XỬ LÝ FORM
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $new_name = trim($_POST['name']);
    $new_pass = $_POST['password'];
    
    // 1. Cập nhật Tên
    if (!empty($new_name)) {
        try {
            $stmt = $pdo->prepare("UPDATE users SET name = ? WHERE id = ?");
            $stmt->execute([$new_name, $user_id]);
            $_SESSION['user_name'] = $new_name; // Cập nhật session ngay
            $message = "Đã cập nhật tên hiển thị!";
            $msg_type = "success";
        } catch(PDOException $e) {
            $message = "Lỗi: " . $e->getMessage();
            $msg_type = "error";
        }
    }

    // 2. Cập nhật Mật khẩu
    if (!empty($new_pass)) {
        if (strlen($new_pass) < 6) {
            $message = "Mật khẩu quá ngắn (tối thiểu 6 ký tự).";
            $msg_type = "error";
        } else {
            $hashed = password_hash($new_pass, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("UPDATE users SET password = ? WHERE id = ?");
            $stmt->execute([$hashed, $user_id]);
            $message = "Đã đổi mật khẩu thành công!";
            $msg_type = "success";
        }
    }
    
    // 3. Xử lý Avatar (Lưu file ảnh tên là avatar_ID.jpg/png)
    if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] == 0) {
        $allowed = ['jpg', 'jpeg', 'png'];
        $filename = $_FILES['avatar']['name'];
        $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        
        if (in_array($ext, $allowed)) {
            $upload_dir = '../assets/uploads/';
            if (!is_dir($upload_dir)) mkdir($upload_dir, 0777, true);
            
            // Xóa ảnh cũ nếu có (để tránh rác)
            array_map('unlink', glob($upload_dir . "avatar_" . $user_id . ".*"));

            $new_filename = "avatar_" . $user_id . "." . $ext;
            $dest = $upload_dir . $new_filename;
            
            if (move_uploaded_file($_FILES['avatar']['tmp_name'], $dest)) {
                 // Lưu ext vào session để các trang khác biết đường load
                 $_SESSION['user_avatar'] = $new_filename;
                 $message = "Đã cập nhật ảnh đại diện!";
                 $msg_type = "success";
            } else {
                $message = "Lỗi khi lưu file ảnh.";
                $msg_type = "error";
            }
        } else {
            $message = "Chỉ chấp nhận file ảnh (JPG, PNG).";
            $msg_type = "error";
        }
    }
}

// Logic hiển thị Avatar hiện tại
$avatar_file = isset($_SESSION['user_avatar']) ? $_SESSION['user_avatar'] : null;
// Nếu session chưa có, thử tìm trong folder (phòng khi login lại)
if (!$avatar_file) {
    $files = glob("../assets/uploads/avatar_" . $user_id . ".*");
    if (count($files) > 0) {
        $avatar_file = basename($files[0]);
        $_SESSION['user_avatar'] = $avatar_file;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Settings - NoobDev</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <style>
        .settings-container {
            max-width: 600px; margin: 150px auto 50px; background: rgba(255,255,255,0.1);
            padding: 40px; border-radius: 20px; backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1); position: relative; z-index: 10;
        }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 8px; color: #d1e8ff; font-weight: bold;}
        .form-group input { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.2); color: white; }
        .btn-save { background: linear-gradient(135deg, #4a8dbf, #2c7da0); color: white; padding: 12px 30px; border: none; border-radius: 25px; cursor: pointer; font-weight: bold; width: 100%; transition: 0.3s; margin-top: 10px;}
        .btn-save:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
        .msg { padding: 15px; margin-bottom: 20px; border-radius: 8px; text-align: center; }
        .success { background: rgba(40, 167, 69, 0.2); color: #28a745; border: 1px solid #28a745; }
        .error { background: rgba(220, 53, 69, 0.2); color: #dc3545; border: 1px solid #dc3545; }
        
        .current-avatar-preview { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin: 0 auto 20px; display: block; border: 3px solid #4a8dbf; }
    </style>
</head>
<body>
    <nav>
        <div class="logo">NoobDev</div>
        <div class="nav-links">
            <a href="../index.php">Home</a>
            <a href="../dashboard.php">Dashboard</a>
            <div class="user-profile-nav" id="userProfileNav">
                <div class="user-avatar">
                    <?php if($avatar_file): ?>
                        <img src="../assets/uploads/<?php echo $avatar_file; ?>?t=<?php echo time(); ?>">
                    <?php else: ?>
                        <?php echo strtoupper(substr($_SESSION['user_name'], 0, 1)); ?>
                    <?php endif; ?>
                </div>
                <div class="user-name"><?php echo htmlspecialchars($_SESSION['user_name']); ?></div>
            </div>
        </div>
    </nav>

    <div class="hero">
        <div class="stars" id="starsContainer"></div>
        
        <div class="settings-container">
            <h2 style="text-align: center; margin-bottom: 30px; color: white;">Account Settings</h2>
            
            <?php if($message): ?>
                <div class="msg <?php echo $msg_type; ?>"><?php echo $message; ?></div>
            <?php endif; ?>

            <?php if($avatar_file): ?>
                <img src="../assets/uploads/<?php echo $avatar_file; ?>?t=<?php echo time(); ?>" class="current-avatar-preview">
            <?php endif; ?>

            <form method="POST" enctype="multipart/form-data">
                <div class="form-group">
                    <label>Display Name</label>
                    <input type="text" name="name" value="<?php echo htmlspecialchars($_SESSION['user_name']); ?>">
                </div>
                
                <div class="form-group">
                    <label>Change Profile Picture</label>
                    <input type="file" name="avatar" accept="image/*">
                </div>

                <div class="form-group">
                    <label>New Password (Leave blank to keep current)</label>
                    <input type="password" name="password" placeholder="Enter new password">
                </div>

                <button type="submit" class="btn-save">Save Changes</button>
            </form>
            <div style="text-align: center; margin-top: 20px;">
                <a href="../dashboard.php" style="color: rgba(255,255,255,0.6); text-decoration: none;">Cancel & Go Back</a>
            </div>
        </div>
        
        <div class="clouds"><div class="cloud cloud1"></div><div class="cloud cloud2"></div></div>
    </div>
    
    <script src="../assets/js/script.js"></script>
</body>
</html>
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

// Kiểm tra nếu chưa đăng nhập
if (!isset($_SESSION['user_id'])) {
    header("Location: login/login.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - NoobDev</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Montserrat', sans-serif;
        }

        body {
            background: linear-gradient(135deg, #0a2647 0%, #1a4d7a 100%);
            min-height: 100vh;
            color: white;
        }

        .header {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            padding: 15px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logo {
            font-size: 24px;
            font-weight: bold;
        }

        .user-profile {
            position: relative;
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            padding: 8px 16px;
            border-radius: 20px;
            transition: background 0.3s ease;
        }

        .user-profile:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .user-avatar {
            width: 40px;
            height: 40px;
            background: #4a8dbf;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 18px;
        }

        .user-name {
            font-size: 14px;
        }

        .dropdown-arrow {
            font-size: 12px;
            transition: transform 0.3s ease;
        }

        .user-profile.active .dropdown-arrow {
            transform: rotate(180deg);
        }

        .profile-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 10px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            min-width: 180px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            z-index: 1000;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .user-profile.active .profile-dropdown {
            opacity: 1;
            visibility: visible;
            transform: translateY(5px);
        }

        .dropdown-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 16px;
            color: #0a2647 !important;
            text-decoration: none;
            font-size: 14px;
            transition: all 0.2s ease;
            border-bottom: 1px solid rgba(10, 38, 71, 0.1);
        }

        .dropdown-item:last-child {
            border-bottom: none;
        }

        .dropdown-item:hover {
            background: rgba(10, 38, 71, 0.08);
        }

        .main-content {
            padding: 60px 40px;
            text-align: center;
        }

        .welcome-message {
            font-size: 48px;
            margin-bottom: 30px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .user-info {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            margin: 0 auto;
            backdrop-filter: blur(10px);
        }

        .info-item {
            margin: 15px 0;
            text-align: left;
            font-size: 18px;
        }

        .info-label {
            font-weight: bold;
            color: #4a8dbf;
            display: inline-block;
            width: 100px;
        }

        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: #4a8dbf;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin: 10px;
            transition: all 0.3s ease;
        }

        .btn:hover {
            background: #3a7daf;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div class="logo">NoobDev</div>
        
        <!-- User Profile -->
        <div class="user-profile" id="userProfile">
            <div class="user-avatar">
                <?php echo strtoupper(substr($_SESSION['user_name'], 0, 1)); ?>
            </div>
            <div class="user-name"><?php echo htmlspecialchars($_SESSION['user_name']); ?></div>
            <div class="dropdown-arrow">▼</div>
            
            <!-- Dropdown Menu -->
            <div class="profile-dropdown">
                <a href="profile.php" class="dropdown-item">
                    <span>👤</span> Profile
                </a>
                <a href="settings.php" class="dropdown-item">
                    <span>⚙️</span> Settings
                </a>
                <div style="height: 1px; background: rgba(10, 38, 71, 0.1); margin: 5px 0;"></div>
                <a href="login/php/logout.php" class="dropdown-item">
                    <span>🚪</span> Logout
                </a>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
        <h1 class="welcome-message">🎉 Welcome back, <?php echo htmlspecialchars($_SESSION['user_name']); ?>!</h1>
        
        <div class="user-info">
            <div class="info-item">
                <span class="info-label">User ID:</span> <?php echo $_SESSION['user_id']; ?>
            </div>
            <div class="info-item">
                <span class="info-label">Email:</span> <?php echo htmlspecialchars($_SESSION['user_email']); ?>
            </div>
            <div class="info-item">
                <span class="info-label">Status:</span> <span style="color: #4CAF50;">● Online</span>
            </div>
        </div>

        <div style="margin-top: 40px;">
            <a href="index.html" class="btn">🏠 Go to Homepage</a>
            <a href="#" class="btn">🎮 Start Typing Practice</a>
        </div>
    </div>

    <script>
        // User Profile Dropdown
        const userProfile = document.getElementById('userProfile');
        
        userProfile.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });

        document.addEventListener('click', function() {
            userProfile.classList.remove('active');
        });

        document.querySelector('.profile-dropdown').addEventListener('click', function(e) {
            e.stopPropagation();
        });
    </script>
</body>
</html>
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

// Vẫn giữ lại phần session.
// Nếu người dùng chưa đăng nhập, họ vẫn thấy trang chủ với nút Login.
// Nếu đã đăng nhập, họ sẽ thấy menu thả xuống tên người dùng.
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Learn Touch Typing - NoobDev</title>
    <link rel="stylesheet" href="style.css"> 
    
    <style>
        /* Các style cần thiết để menu dropdown hoạt động và hiển thị đúng */
        .nav-links {
            display: flex;
            align-items: center;
        }

        .user-profile-nav {
            position: relative;
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            padding: 8px 16px;
            border-radius: 20px;
            transition: background 0.3s ease;
            color: white; /* Đảm bảo chữ trắng trên nền tối */
        }

        .user-profile-nav:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        /* Cần điều chỉnh style cho avatar và tên người dùng trong navbar */
        .user-avatar {
            width: 30px;
            height: 30px;
            background: #4a8dbf;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
            color: white;
        }

        .user-name {
            font-size: 14px;
        }

        .dropdown-arrow {
            font-size: 10px;
            transition: transform 0.3s ease;
        }

        .user-profile-nav.active .dropdown-arrow {
            transform: rotate(180deg);
        }

        .profile-dropdown-nav {
            position: absolute;
            top: 100%;
            right: 0;
            /* Giả định background và box-shadow tương tự như style gốc của dashboard.php */
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
            margin-top: 5px; /* Khoảng cách với navbar */
        }

        .user-profile-nav.active .profile-dropdown-nav {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .dropdown-item-nav {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 16px;
            color: #0a2647 !important; /* Màu chữ tối cho menu dropdown */
            text-decoration: none;
            font-size: 14px;
            transition: all 0.2s ease;
            border-bottom: 1px solid rgba(10, 38, 71, 0.1);
        }

        .dropdown-item-nav:last-child {
            border-bottom: none;
        }

        .dropdown-item-nav:hover {
            background: rgba(10, 38, 71, 0.08);
        }
    </style>
</head>
<body>
    <div class="hero">
        <nav>
            <div class="nav-left">
                <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div class="logo">NoobDev</div>
            </div>
            <div class="nav-links">
                <a href="#start" data-translate="navGetStarted">Get Started</a>
                <a href="#school" data-translate="navSchool">School Edition</a>
                <a href="#store" data-translate="navStore">Store</a>
                <div class="language-dropdown">
                    <button class="language-btn" id="languageBtn">
                        <span data-translate="navLanguage">Language</span>
                        <span class="dropdown-arrow">▼</span>
                    </button>
                    <div class="language-menu" id="languageMenu">
                        <a href="#" data-lang="en" class="language-option active">English</a>
                        <a href="#" data-lang="vi" class="language-option">Vietnamese</a>
                    </div>
                </div>
                
                <?php if (isset($_SESSION['user_id'])): ?>
                    <div class="user-profile-nav" id="userProfileNav">
                        <div class="user-avatar">
                            <?php echo strtoupper(substr($_SESSION['user_name'], 0, 1)); ?>
                        </div>
                        <div class="user-name"><?php echo htmlspecialchars($_SESSION['user_name']); ?></div>
                        <div class="dropdown-arrow">▼</div>
                        
                        <div class="profile-dropdown-nav">
                            <a href="dashboard.php" class="dropdown-item-nav">
                                <span>🏠</span> Dashboard
                            </a>
                            <a href="profile.php" class="dropdown-item-nav">
                                <span>👤</span> Profile
                            </a>
                            <a href="settings.php" class="dropdown-item-nav">
                                <span>⚙️</span> Settings
                            </a>
                            <div style="height: 1px; background: rgba(10, 38, 71, 0.1); margin: 5px 0;"></div>
                            <a href="login/php/logout.php" class="dropdown-item-nav">
                                <span>🚪</span> Logout
                            </a>
                        </div>
                    </div>
                <?php else: ?>
                    <a href="login/login.html" class="login-btn" data-translate="navLogin">Login</a>
                <?php endif; ?>
            </div>
        </nav>

        <div class="side-menu" id="sideMenu">
            <div class="side-menu-header">
                <div class="logo">NoobDev</div>
            </div>
            <ul>
                <li><a href="#about" data-translate="menuAbout">About</a></li>
                <li><a href="#tips" data-translate="menuTips">Tips</a></li>
                <li><a href="#faq" data-translate="menuFaq">FAQ</a></li>
                <li><a href="#contact" data-translate="menuContact">Contact</a></li>
            </ul>
        </div>

        <div class="stars" id="starsContainer"></div>
        <div class="moon">
            <div class="moon-crater crater1"></div>
            <div class="moon-crater crater2"></div>
            <div class="moon-crater crater3"></div>
        </div>
        <div class="content">
            <h1 data-translate="heroTitle">Learn Touch Typing for free!</h1>
            <p class="subtitle" data-translate="heroSubtitle">Master keyboard skills with our interactive typing lessons</p>
            <a href="#" class="cta-button" data-translate="heroButton">Start Learning Now</a>
        </div>
        <div class="clouds">
            <div class="cloud cloud1"></div>
            <div class="cloud cloud2"></div>
            <div class="cloud cloud3"></div>
        </div>
        <div class="scroll-indicator">
            <div class="scroll-text" data-translate="scrollText">Scroll to explore</div>
            <div class="scroll-arrow">↓</div>
        </div>
    </div>

    <script src="script.js"></script>
    <script>
        // Logic JS cho User Profile Dropdown
        const userProfileNav = document.getElementById('userProfileNav');
        
        if (userProfileNav) { // Chỉ chạy nếu element tồn tại (người dùng đã đăng nhập)
            userProfileNav.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('active');
            });

            document.addEventListener('click', function() {
                userProfileNav.classList.remove('active');
            });

            document.querySelector('.profile-dropdown-nav').addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    </script>
</body>
</html>
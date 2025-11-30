<?php
session_start();

// Kiểm tra đăng nhập (Logic giống Dashboard)
if (!isset($_SESSION['user_id'])) {
    header("Location: ../login/login.html"); // Hoặc đường dẫn login của bạn
    exit();
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Luyện Gõ Phím - NoobDev</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/typing.css">
</head>
<body>
    <div class="hero typing-hero">
        <nav>
            <div class="nav-left">
                <button class="menu-toggle" id="menuToggle">
                    <span></span><span></span><span></span>
                </button>
                <div class="logo">NoobDev</div>
            </div>
            
            <div class="nav-links">
                <a href="dashboard.php" data-translate="navHome">Home</a>
                <a href="typing.php" class="active">Typing</a> 
                <a href="../about.html" data-translate="navAbout">About</a>
                <a href="../tips.html" data-translate="navTips">Tips</a>
                
                <div class="user-profile-nav" id="userProfileNav">
                    <img src="../assets/image/default-avatar.png" alt="Avatar" class="user-avatar" onerror="this.src='https://ui-avatars.com/api/?name=User'">
                    <span class="user-name"><?php echo htmlspecialchars($_SESSION['username'] ?? 'NoobDev User'); ?></span>
                    <span class="dropdown-arrow">▼</span>
                    
                    <div class="profile-dropdown-menu">
                        <a href="#" class="profile-item">Hồ sơ</a>
                        <a href="#" class="profile-item">Cài đặt</a>
                        <div class="dropdown-divider"></div>
                        <a href="../logout.php" class="profile-item logout">Đăng xuất</a>
                    </div>
                </div>
            </div>
        </nav>

        <div class="typing-container">
            <div class="game-layout">
                <div class="game-board">
                    <div class="stats-bar">
                        <div class="stat-box">
                            <span class="stat-label">Thời gian</span>
                            <span class="stat-value" id="timeLeft">60s</span>
                        </div>
                        <div class="stat-box">
                            <span class="stat-label">WPM</span>
                            <span class="stat-value" id="wpm">0</span>
                        </div>
                        <div class="stat-box">
                            <span class="stat-label">Chính xác</span>
                            <span class="stat-value" id="accuracy">100%</span>
                        </div>
                        <button class="btn-restart" onclick="resetGame()">Làm mới</button>
                    </div>

                    <div class="text-display-box">
                        <div class="typing-text" id="typingText">
                            </div>
                    </div>

                    <div class="keyboard">
                        <div class="row">
                            <div class="key" data-key="`">`</div><div class="key" data-key="1">1</div><div class="key" data-key="2">2</div><div class="key" data-key="3">3</div><div class="key" data-key="4">4</div><div class="key" data-key="5">5</div><div class="key" data-key="6">6</div><div class="key" data-key="7">7</div><div class="key" data-key="8">8</div><div class="key" data-key="9">9</div><div class="key" data-key="0">0</div><div class="key" data-key="-">-</div><div class="key" data-key="=">=</div><div class="key backspace" data-key="Backspace">Bksp</div>
                        </div>
                        <div class="row">
                            <div class="key tab" data-key="Tab">Tab</div><div class="key" data-key="q">Q</div><div class="key" data-key="w">W</div><div class="key" data-key="e">E</div><div class="key" data-key="r">R</div><div class="key" data-key="t">T</div><div class="key" data-key="y">Y</div><div class="key" data-key="u">U</div><div class="key" data-key="i">I</div><div class="key" data-key="o">O</div><div class="key" data-key="p">P</div><div class="key" data-key="[">[</div><div class="key" data-key="]">]</div><div class="key backslash" data-key="\">|</div>
                        </div>
                        <div class="row">
                            <div class="key caps" data-key="CapsLock">Caps</div><div class="key" data-key="a">A</div><div class="key" data-key="s">S</div><div class="key" data-key="d">D</div><div class="key" data-key="f">F</div><div class="key" data-key="g">G</div><div class="key" data-key="h">H</div><div class="key" data-key="j">J</div><div class="key" data-key="k">K</div><div class="key" data-key="l">L</div><div class="key" data-key=";">;</div><div class="key" data-key="'">'</div><div class="key enter" data-key="Enter">Enter</div>
                        </div>
                        <div class="row">
                            <div class="key shift" data-key="Shift">Shift</div><div class="key" data-key="z">Z</div><div class="key" data-key="x">X</div><div class="key" data-key="c">C</div><div class="key" data-key="v">V</div><div class="key" data-key="b">B</div><div class="key" data-key="n">N</div><div class="key" data-key="m">M</div><div class="key" data-key=",">,</div><div class="key" data-key=".">.</div><div class="key" data-key="/">/</div><div class="key shift" data-key="Shift">Shift</div>
                        </div>
                        <div class="row">
                            <div class="key space" data-key=" ">Space</div>
                        </div>
                    </div>
                </div>

                <div class="leaderboard-panel">
                    <h3>🏆 Bảng Xếp Hạng</h3>
                    <div id="leaderboardList">
                        <p class="no-data">Chưa có dữ liệu</p>
                    </div>
                    <button class="btn-clear" onclick="clearLeaderboard()">Xóa lịch sử</button>
                </div>
            </div>
        </div>
    </div>

    <script src="../assets/js/script.js"></script>
    <script src="../assets/js/typing.js"></script>
</body>
</html>
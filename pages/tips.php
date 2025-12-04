<?php
session_start();
$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
$avatar_file = isset($_SESSION['user_avatar']) ? $_SESSION['user_avatar'] : null;

if ($user_id && !$avatar_file) {
    $files = glob("../assets/uploads/avatar_" . $user_id . ".*");
    if (count($files) > 0) $_SESSION['user_avatar'] = basename($files[0]);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Typing Tips - NoobDev</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/tips.css">
</head>
<body>
    <nav>
        <div class="logo">NoobDev</div>
        <div class="nav-links">
            <a href="../index.php" data-translate="navHome">Home</a>
            <a href="about.php" data-translate="navAbout">About</a>
            <a href="tips.php" class="menu-Tips" data-translate="navTips">Tips</a>
            <a href="FAQ.php" data-translate="navFAQ">FAQ</a>
            <?php if (isset($_SESSION['user_id'])): ?>
                <a href="typing.php" data-translate="navTyping">Typing</a>
            <?php endif; ?>
            
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
                        <?php if(isset($_SESSION['user_avatar'])): ?>
                            <img src="../assets/uploads/<?php echo $_SESSION['user_avatar']; ?>?t=<?php echo time(); ?>">
                        <?php else: ?>
                            <?php echo strtoupper(substr($_SESSION['user_name'], 0, 1)); ?>
                        <?php endif; ?>
                    </div>
                    <div class="user-name"><?php echo htmlspecialchars($_SESSION['user_name']); ?></div>
                    <div class="dropdown-arrow">▼</div>
                    <div class="profile-dropdown-nav">
                        <a href="../dashboard.php" class="dropdown-item-nav"><span>🏠</span> Dashboard</a>
                        <a href="typing.php" class="dropdown-item-nav"><span>⌨️</span> Practice</a>
                        <a href="settings.php" class="dropdown-item-nav"><span>⚙️</span> Settings</a>
                        <div style="height: 1px; background: rgba(10, 38, 71, 0.1); margin: 5px 0;"></div>
                        <a href="../login/php/logout.php" class="dropdown-item-nav"><span>🚪</span> Logout</a>
                    </div>
                </div>
            <?php else: ?>
                <a href="../login/login.html" class="login-btn" data-translate="navLogin">Login</a>
            <?php endif; ?>
        </div>
        <button class="menu-toggle" id="menuToggle"><span></span><span></span><span></span></button>
    </nav>

    <div class="side-menu" id="sideMenu">
        <ul>
            <li><a href="../index.php" data-translate="navHome">Home</a></li>
            <li><a href="about.php" data-translate="navAbout">About</a></li>
            <li><a href="tips.php" data-translate="navTips">Tips</a></li>
            <li><a href="FAQ.php" data-translate="navFAQ">FAQ</a></li>
            <?php if (isset($_SESSION['user_id'])): ?>
                <li><a href="typing.php" data-translate="navTyping">Typing</a></li>
                <li><a href="settings.php">Settings</a></li>
                <li><a href="../login/php/logout.php">Logout</a></li>
            <?php else: ?>
                <li><a href="../login/login.html" data-translate="navLogin">Login</a></li>
            <?php endif; ?>
        </ul>
    </div>

    <div class="hero">
        <div class="stars" id="starsContainer"></div>
        <div class="moon"><div class="moon-crater crater1"></div></div>

        <div class="content-header">
            <h1 data-translate="tipsTitle">How to type faster</h1>
            <p data-translate="tipsSubtitle">Master the keyboard with these pro techniques</p>
        </div>

        <div class="faq-toc-container">
            <div class="faq-toc">
                <h2 data-translate="tocTitle">Table of Contents</h2>
                <ol>
                    <li><a href="#tip1" data-translate="tip1Title">Correct Posture</a></li>
                    <li><a href="#tip2" data-translate="tip2Title">Home Row Position</a></li>
                    <li><a href="#tip3" data-translate="tip3Title">Don't Look Down</a></li>
                    <li><a href="#tip4" data-translate="tip4Title">Use All 10 Fingers</a></li>
                </ol>
            </div>
        </div>

        <div class="faq-answers-container">
            <div id="tip1" class="faq-card">
                <h3 data-translate="tip1Title">Correct Sitting Posture</h3>
                <p data-translate="tip1Desc">Keep your back straight, feet flat on the floor, and screen at eye level.</p>
                <div style="text-align: center; margin-top: 20px;">
                    <img src="correct_posture.jfif" alt="Posture" style="max-width: 100%; border-radius: 10px;">
                </div>
            </div>
            <div id="tip2" class="faq-card">
                <h3 data-translate="tip2Title">Master the Home Row</h3>
                <p data-translate="tip2Desc">Always return your fingers to ASDF - JKL; after pressing a key.</p>
            </div>
            <div id="tip3" class="faq-card">
                <h3 data-translate="tip3Title">Don't Look at Keyboard</h3>
                <p data-translate="tip3Desc">Looking at the screen helps your muscle memory develop much faster.</p>
            </div>
             <div id="tip4" class="faq-card">
                <h3 data-translate="tip4Title">Use All 10 Fingers</h3>
                <p data-translate="tip4Desc">Stick to the correct finger mapping strictly.</p>
            </div>
        </div>

        <div class="clouds"><div class="cloud cloud1"></div></div>
    </div>

    <script src="../assets/js/script.js"></script>
    <script src="../assets/js/tips.js"></script>
</body>
</html>
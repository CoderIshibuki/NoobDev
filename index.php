<?php
session_start();
$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
$avatar_file = isset($_SESSION['user_avatar']) ? $_SESSION['user_avatar'] : null;
if ($user_id && !$avatar_file) {
    $files = glob("assets/uploads/avatar_" . $user_id . ".*");
    if (count($files) > 0) $_SESSION['user_avatar'] = basename($files[0]);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Learn Touch Typing - NoobDev</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="hero">
        <nav>
            <div class="nav-left"><div class="logo">NoobDev</div></div>
            <div class="nav-links">
                <a href="index.php" data-translate="navHome">Home</a>
                <a href="pages/about.php" data-translate="navAbout">About</a>
                <a href="pages/tips.php" data-translate="navTips">Tips</a>
                <a href="pages/FAQ.php" data-translate="navFAQ">FAQ</a>
                <?php if ($user_id): ?><a href="pages/typing.php" data-translate="navTyping">Typing</a><?php endif; ?>

                <div class="language-dropdown">
                    <button class="language-btn" id="languageBtn">Language ▼</button>
                    <div class="language-menu" id="languageMenu">
                        <a href="#" data-lang="en" class="language-option active">English</a>
                        <a href="#" data-lang="vi" class="language-option">Vietnamese</a>
                    </div>
                </div>

                <?php if ($user_id): ?>
                    <div class="user-profile-nav" id="userProfileNav">
                        <div class="user-avatar">
                            <?php if($avatar_file): ?>
                                <img src="assets/uploads/<?php echo $avatar_file; ?>?t=<?php echo time(); ?>">
                            <?php else: ?>
                                <?php echo strtoupper(substr($_SESSION['user_name'], 0, 1)); ?>
                            <?php endif; ?>
                        </div>
                        <div class="user-name"><?php echo htmlspecialchars($_SESSION['user_name']); ?></div>
                        <div class="dropdown-arrow">▼</div>
                        <div class="profile-dropdown-nav">
                            <a href="dashboard.php" class="dropdown-item-nav"><span>🏠</span> Dashboard</a>
                            <a href="pages/typing.php" class="dropdown-item-nav"><span>⌨️</span> Practice</a>
                            <a href="pages/settings.php" class="dropdown-item-nav"><span>⚙️</span> Settings</a>
                            <div style="height: 1px; background: rgba(10, 38, 71, 0.1); margin: 5px 0;"></div>
                            <a href="login/php/logout.php" class="dropdown-item-nav"><span>🚪</span> Logout</a>
                        </div>
                    </div>
                <?php else: ?>
                    <a href="login/login.html" class="login-btn" data-translate="navLogin">Login</a>
                <?php endif; ?>
            </div>
            <button class="menu-toggle" id="menuToggle"><span></span><span></span><span></span></button>
        </nav>
        
        <div class="side-menu" id="sideMenu">
            <ul>
                <li><a href="index.php">Home</a></li>
                <li><a href="pages/about.php">About</a></li>
                <li><a href="pages/tips.php">Tips</a></li>
                <li><a href="pages/FAQ.php">FAQ</a></li>
                <?php if ($user_id): ?>
                    <li><a href="pages/typing.php">Typing</a></li>
                    <li><a href="pages/settings.php">Settings</a></li>
                    <li><a href="login/php/logout.php">Logout</a></li>
                <?php else: ?>
                    <li><a href="login/login.html">Login</a></li>
                <?php endif; ?>
            </ul>
        </div>

        <div class="content">
            <h1 data-translate="heroTitle">Learn Touch Typing for free!</h1>
            <?php if ($user_id): ?>
                <a href="pages/typing.php" class="cta-button">Start Typing Now</a>
            <?php else: ?>
                <a href="login/login.html" class="cta-button" data-translate="heroButton">Start Learning Now</a>
            <?php endif; ?>
        </div>
        <div class="stars" id="starsContainer"></div>
    </div>
    <script src="assets/js/script.js"></script>
</body>
</html>
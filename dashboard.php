<?php
session_start();
if (!isset($_SESSION['user_id'])) { header("Location: login/login.html"); exit(); }

$user_id = $_SESSION['user_id'];
$avatar_file = isset($_SESSION['user_avatar']) ? $_SESSION['user_avatar'] : null;
if (!$avatar_file) {
    $files = glob("assets/uploads/avatar_" . $user_id . ".*");
    if (count($files) > 0) $_SESSION['user_avatar'] = basename($files[0]);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard - NoobDev</title>
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
                <a href="pages/typing.php" data-translate="navTyping">Typing Practice</a>
                
                <div class="language-dropdown">
                    <button class="language-btn" id="languageBtn">Language ▼</button>
                    <div class="language-menu" id="languageMenu">
                        <a href="#" data-lang="en" class="language-option active">English</a>
                        <a href="#" data-lang="vi" class="language-option">Vietnamese</a>
                    </div>
                </div>
                
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
            </div>
            <button class="menu-toggle" id="menuToggle"><span></span><span></span><span></span></button>
        </nav>

        <div class="side-menu" id="sideMenu">
            <ul>
                <li><a href="index.php">Home</a></li>
                <li><a href="pages/about.php">About</a></li>
                <li><a href="pages/tips.php">Tips</a></li>
                <li><a href="pages/FAQ.php">FAQ</a></li>
                <li><a href="pages/typing.php">Typing</a></li>
                <li><a href="pages/settings.php">Settings</a></li>
                <li><a href="login/php/logout.php">Logout</a></li>
            </ul>
        </div>

        <div class="stars" id="starsContainer"></div>
        <div class="content">
            <h1>Welcome back, <?php echo htmlspecialchars($_SESSION['user_name']); ?>!</h1>
            <a href="pages/typing.php" class="cta-button">Start Typing</a>
        </div>
    </div>
    <script src="assets/js/script.js"></script>
</body>
</html>
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
    <title>FAQ - NoobDev</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/FAQ.css">
</head>
<body>
    <nav>
        <div class="logo">NoobDev</div>
        <div class="nav-links">
            <a href="../index.php" data-translate="navHome">Home</a>
            <a href="about.php" data-translate="navAbout">About</a>
            <a href="tips.php" data-translate="navTips">Tips</a>
            <a href="FAQ.php" class="menu-FAQ" data-translate="navFAQ">FAQ</a>
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
            <h1 data-translate="faqTitle">Frequently Asked Questions</h1>
            <p data-translate="faqSubtitle">Common questions about touch typing.</p>
        </div>

        <div class="faq-toc-container">
            <div class="faq-toc">
                <h2 data-translate="tocTitle">Questions</h2>
                <ol>
                    <li><a href="#q1" data-translate="q1">Is NoobDev really free?</a></li>
                    <li><a href="#q2" data-translate="q2">Do I need an account?</a></li>
                    <li><a href="#q3" data-translate="q3">How is WPM calculated?</a></li>
                    <li><a href="#q4" data-translate="q4">Keyboard layout supported?</a></li>
                </ol>
            </div>
        </div>

        <div class="faq-answers-container">
            <div id="q1" class="faq-card">
                <h3 data-translate="q1">Is NoobDev really free?</h3>
                <p data-translate="a1">Yes! NoobDev is 100% free.</p>
            </div>
            <div id="q2" class="faq-card">
                <h3 data-translate="q2">Do I need an account?</h3>
                <p data-translate="a2">You need an account to use the Typing Practice tool.</p>
            </div>
            <div id="q3" class="faq-card">
                <h3 data-translate="q3">WPM Calculation</h3>
                <p data-translate="a3">(Total Characters / 5) / Minutes.</p>
            </div>
            <div id="q4" class="faq-card">
                <h3 data-translate="q4">Layouts</h3>
                <p data-translate="a4">Currently optimized for QWERTY.</p>
            </div>
        </div>

        <div class="clouds"><div class="cloud cloud1"></div></div>
    </div>

    <script src="../assets/js/script.js"></script>
    <script src="../assets/js/FAQ.js"></script>
</body>
</html>
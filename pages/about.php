<?php
session_start();
$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
$avatar_file = isset($_SESSION['user_avatar']) ? $_SESSION['user_avatar'] : null;

if ($user_id && !$avatar_file) {
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
    <title>About Us - NoobDev</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/about.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <nav>
        <div class="logo">NoobDev</div>
        <div class="nav-links">
            <a href="../index.php" data-translate="navHome">Home</a>
            <a href="about.php" class="active" data-translate="navAbout">About</a>
            <a href="tips.php" data-translate="navTips">Tips</a>
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
                        <?php if($avatar_file): ?>
                            <img src="../assets/uploads/<?php echo $avatar_file; ?>?t=<?php echo time(); ?>">
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

    <div class="stars" id="starsContainer"></div>
    <div class="moon"><div class="moon-crater crater1"></div></div>
    
    <div class="container">
        <div class="about-header">
            <h1 data-translate="aboutTitle">We are NoobDev</h1>
            <p data-translate="aboutDesc">The ultimate platform to master touch typing, built by students for students.</p>
        </div>

        <div class="story-grid">
            <div class="glass-card">
                <div class="feature-icon">🚀</div>
                <h3 data-translate="missionTitle">Our Mission</h3>
                <p data-translate="missionDesc">To provide a free, accessible platform for students to improve typing speed.</p>
            </div>
            <div class="glass-card">
                <div class="feature-icon">💡</div>
                <h3 data-translate="whyTitle">Why NoobDev?</h3>
                <ul>
                    <li data-translate="why1">Interactive Lessons</li>
                    <li data-translate="why2">Real-time Stats</li>
                    <li data-translate="why3">Free Forever</li>
                </ul>
            </div>
            <div class="glass-card">
                <div class="feature-icon">🎯</div>
                <h3 data-translate="visionTitle">Our Vision</h3>
                <p data-translate="visionDesc">We believe typing is a fundamental skill in the digital age.</p>
            </div>
        </div>

        <div class="team-section">
            <h2 class="section-title" data-translate="teamTitle">Meet Our Team</h2>
            <div class="team-grid">
                <div class="team-member">
                    <div class="avatar-placeholder">TH</div>
                    <div class="team-name">Tuấn Hứa</div>
                    <div class="team-role" style="color: #ffcc00;">Team Leader</div>
                    <p style="color: #cbd5e1; font-size: 13px;">Fullstack Developer</p>
                </div>
                <div class="team-member">
                    <div class="avatar-placeholder">PT</div>
                    <div class="team-name">Phát Trần</div>
                    <div class="team-role">Developer</div>
                    <p style="color: #cbd5e1; font-size: 13px;">Frontend & UI/UX</p>
                </div>
                <div class="team-member">
                    <div class="avatar-placeholder">TH</div>
                    <div class="team-name">Trí Huỳnh</div>
                    <div class="team-role">Developer</div>
                    <p style="color: #cbd5e1; font-size: 13px;">Backend Logic</p>
                </div>
                <div class="team-member">
                    <div class="avatar-placeholder">VH</div>
                    <div class="team-name">Vinh Huỳnh</div>
                    <div class="team-role">Developer</div>
                    <p style="color: #cbd5e1; font-size: 13px;">Database Management</p>
                </div>
                <div class="team-member">
                    <div class="avatar-placeholder">TP</div>
                    <div class="team-name">Tài Phạm</div>
                    <div class="team-role">Developer</div>
                    <p style="color: #cbd5e1; font-size: 13px;">Content & Testing</p>
                </div>
            </div>
        </div>
        
        <div class="tech-stack">
            <h2 style="margin-bottom: 30px;" data-translate="techTitle">Built With</h2>
            <div class="tech-icons">
                <div class="tech-item" title="HTML5">
                    <i class="fab fa-html5" style="color: #e34f26;"></i>
                </div>
                <div class="tech-item" title="CSS3">
                    <i class="fab fa-css3-alt" style="color: #1572b6;"></i>
                </div>
                <div class="tech-item" title="JavaScript">
                    <i class="fab fa-js" style="color: #f7df1e;"></i>
                </div>
                <div class="tech-item" title="PHP">
                    <i class="fab fa-php" style="color: #777bb4;"></i>
                </div>
                <div class="tech-item" title="MySQL">
                    <i class="fas fa-database" style="color: #00758f;"></i>
                </div>
            </div>
        </div>
        
        <footer><p>&copy; 2024 NoobDev. All rights reserved.</p></footer>
    </div>
    <div class="clouds"><div class="cloud cloud1"></div></div>

    <script src="../assets/js/script.js"></script>
    <script src="../assets/js/about.js"></script>
</body>
</html>
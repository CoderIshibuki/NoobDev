<?php
session_start();
// Logic lấy thông tin user
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - NoobDev</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/about.css">
</head>
<body>

    <div class="stars" id="starsContainer"></div>
    <div class="moon"><div class="moon-crater crater1"></div><div class="moon-crater crater2"></div><div class="moon-crater crater3"></div></div>
    <div class="clouds"><div class="cloud cloud1"></div><div class="cloud cloud2"></div><div class="cloud cloud3"></div></div>

    <nav>
        <div class="nav-left"><div class="logo">NoobDev</div></div>
        <div class="nav-links">
            <a href="../index.php" data-translate="navHome">Home</a>
            <a href="about.php" class="active" data-translate="navAbout">About</a>
            <a href="tips.php" data-translate="navTips">Tips</a>
            <a href="FAQ.php" data-translate="navFAQ">FAQ</a>
            <a href="typing.php" data-translate="navTyping">Typing</a>
            
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

            <?php if ($user_id): ?>
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
            <li><a href="../index.php">Home</a></li>
            <li><a href="about.php">About</a></li>
            <li><a href="tips.php">Tips</a></li>
            <li><a href="FAQ.php">FAQ</a></li>
            <li><a href="typing.php">Typing</a></li>
            <?php if($user_id): ?>
                <li><a href="../login/php/logout.php">Logout</a></li>
            <?php else: ?>
                <li><a href="../login/login.html">Login</a></li>
            <?php endif; ?>
        </ul>
    </div>

    <div class="about-container"> <div class="content-header">
            <h1 id="typing-text" style="min-height: 80px;"></h1> <p>Bridging the gap between your thoughts and the screen.</p>
        </div>

        <div class="story-grid">
            <div class="glass-card">
                <div class="feature-icon"><i class="fas fa-users-gear"></i></div>
                <h3>Who is NoobDev?</h3>
                <p>We are a collective of developers, designers, and keyboard enthusiasts. The name <strong>"NoobDev"</strong> reminds us that everyone starts somewhere.</p>
            </div>
            <div class="glass-card">
                <div class="feature-icon"><i class="fas fa-rocket"></i></div>
                <h3>Our Mission</h3>
                <p>Typing is the foundational skill of the digital age. Whether you're a coder debugging at 2 AM or a writer crafting a novel, the keyboard is your instrument.</p>
            </div>
            <div class="glass-card">
                <div class="feature-icon"><i class="fas fa-heart"></i></div>
                <h3>Why Choose Us?</h3>
                <ul>
                    <li><strong>Minimalist:</strong> No clutter, just you and the text.</li>
                    <li><strong>Ads-Free:</strong> We prioritize experience over profit.</li>
                    <li><strong>Community:</strong> Built by devs, for everyone.</li>
                </ul>
            </div>
            <div class="glass-card">
                <div class="feature-icon"><i class="fas fa-seedling"></i></div>
                <h3>The "Noob" Mindset</h3>
                <p>We wear the badge of "Noob" with pride. Being a beginner isn't a weakness; it's a state of infinite potential. We celebrate every WPM increase.</p>
            </div>
            <div class="glass-card">
                <div class="feature-icon"><i class="fas fa-map-location-dot"></i></div>
                <h3>What's Next?</h3>
                <p>We are building the ultimate typing ecosystem. <strong>Coming soon:</strong> Multiplayer battles, custom mechanical switch sound packs.</p>
            </div>
            <div class="glass-card">
                <div class="feature-icon"><i class="fas fa-comments"></i></div>
                <h3>Community First</h3>
                <p>NoobDev isn't just a tool; it's a gathering place. We actively listen to every pull request, feedback, and feature suggestion.</p>
            </div>
        </div>

        <div class="team-section">
            <h2 class="section-title">Meet the Team</h2>
            <div class="team-grid">
                <div class="team-member">
                    <div class="avatar-placeholder"><i class="fas fa-user-astronaut"></i></div>
                    <div class="team-name">Huỳnh Minh Trí</div>
                    <div class="team-role">Lead Developer</div>
                </div>
                <div class="team-member">
                    <div class="avatar-placeholder"><i class="fas fa-code"></i></div>
                    <div class="team-name">Huỳnh Phú Vinh</div>
                    <div class="team-role">UI/UX Designer</div>
                </div>
                <div class="team-member">
                    <div class="avatar-placeholder"><i class="fas fa-terminal"></i></div>
                    <div class="team-name">Trần Vũ Hòa Phát</div>
                    <div class="team-role">Backend Engineer</div>
                </div>
                <div class="team-member">
                    <div class="avatar-placeholder"><i class="fas fa-laptop-code"></i></div>
                    <div class="team-name">Hứa Nhựt Tuấn</div>
                    <div class="team-role">Fullstack Dev</div>
                </div>
                <div class="team-member">
                    <div class="avatar-placeholder"><i class="fas fa-keyboard"></i></div>
                    <div class="team-name">Phạm Hữu Tài</div>
                    <div class="team-role">Documents</div>
                </div>
            </div>
        </div>

        <div class="tech-stack">
            <h3 style="margin-bottom: 20px; font-size: 2rem;">Built With Passion & Code</h3>
            <p style="color: #cbd5e1;">Powered by modern web technologies.</p>
            <div class="tech-icons">
                <i class="fab fa-html5 tech-item" title="HTML5" style="color: #e34f26;"></i>
                <i class="fab fa-css3-alt tech-item" title="CSS3" style="color: #1572b6;"></i>
                <i class="fab fa-js tech-item" title="JavaScript" style="color: #f7df1e;"></i>
                <i class="fab fa-php tech-item" title="PHP" style="color: #777bb4;"></i>
                <i class="fas fa-database tech-item" title="MySQL" style="color: #00758f;"></i>
            </div>
        </div>
        
        <footer><p>&copy; 2025 NoobDev. Keep Clacking.</p></footer>

    </div>

    <script src="../assets/js/script.js"></script>
    <script src="../assets/js/pages/about.js"></script>
</body>
</html>
<?php
session_start();
if (!isset($_SESSION['user_id'])) { header("Location: ../login/login.html"); exit(); }

$user_id = $_SESSION['user_id'];
$avatar_file = isset($_SESSION['user_avatar']) ? $_SESSION['user_avatar'] : null;
if (!$avatar_file) {
    $files = glob("../assets/uploads/avatar_" . $user_id . ".*");
    if (count($files) > 0) $_SESSION['user_avatar'] = basename($files[0]);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Typing Practice - NoobDev</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/typing.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="stars" id="starsContainer"></div>
    <div class="moon"></div>
    
    <div class="hero">
        <nav>
            <div class="nav-left"><div class="logo">NoobDev</div></div>
            <div class="nav-links">
                <a href="../index.php" data-translate="navHome">Home</a>
                <a href="about.php" data-translate="navAbout">About</a>
                <a href="tips.php" data-translate="navTips">Tips</a>
                <a href="FAQ.php" data-translate="navFAQ">FAQ</a>
                <a href="typing.php" class="active" data-translate="navTyping">Typing</a>
                
                <div class="language-dropdown">
                    <button class="language-btn" id="languageBtn">Language ▼</button>
                    <div class="language-menu" id="languageMenu">
                        <a href="#" data-lang="en" class="language-option active">English</a>
                        <a href="#" data-lang="vi" class="language-option">Vietnamese</a>
                    </div>
                </div>
                
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
                        <a href="settings.php" class="dropdown-item-nav"><span>⚙️</span> Settings</a>
                        <div style="height: 1px; background: rgba(10, 38, 71, 0.1); margin: 5px 0;"></div>
                        <a href="../login/php/logout.php" class="dropdown-item-nav"><span>🚪</span> Logout</a>
                    </div>
                </div>
            </div>
            <button class="menu-toggle" id="menuToggle"><span></span><span></span><span></span></button>
        </nav>

        <div class="side-menu" id="sideMenu">
            <ul>
                <li><a href="../index.php">Home</a></li>
                <li><a href="typing.php">Typing</a></li>
                <li><a href="settings.php">Settings</a></li>
                <li><a href="../login/php/logout.php">Logout</a></li>
            </ul>
        </div>

        <div class="typing-container">
            
            <div class="back-nav-container">
    <div class="nav-controls">
        <button id="backToLessonsBtn" class="nav-control-btn" onclick="goToMenu()">
            <i class="fas fa-chevron-left"></i> Menu
        </button>
        
        <button id="externalRestartBtn" class="nav-control-btn refresh-btn" onclick="restartCurrent()">
            <i class="fas fa-redo"></i> Restart
        </button>
    </div>
</div>

            <div class="selection-bar">
                <div class="mode-tabs">
                    <button class="tab-btn active" onclick="switchMode('beginner')" data-translate="tabBeginner">Lessons</button>
                    <button class="tab-btn" onclick="switchMode('minigame')">Minigames</button>
                    <button class="tab-btn" onclick="switchMode('code')">Code</button>
                    <button class="tab-btn" onclick="switchMode('test')">Test</button>
                    <button class="tab-btn" onclick="switchMode('custom')" data-translate="tabMaster">Custom</button>
                </div>
            </div>

            <div class="stats-bar" id="gameStats" style="display: none;">
                <div class="stat-group">
                    <div class="stat-label" data-translate="statTime">TIME</div>
                    <div class="stat-value" id="timeLeft">60</div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-group">
                    <div class="stat-label" data-translate="statWPM">WPM</div>
                    <div class="stat-value" id="wpm">0</div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-group">
                    <div class="stat-label" data-translate="statAcc">ACCURACY</div>
                    <div class="stat-value" id="accuracy">100%</div>
                </div>
            </div>

            <div id="lessonDashboard" class="lesson-dashboard"></div>

            <div id="gameArea" style="display: none;">
                <input type="text" class="input-field" id="inputField" autocomplete="off" spellcheck="false">
                
                <div class="typing-box-wrapper" id="typingWrapper">
                    <div class="typing-box" id="quoteDisplay"></div>
                    
                    <div class="focus-overlay" id="focusOverlay">
                        <div class="start-msg">
                            <i class="fas fa-mouse-pointer"></i> 
                            <span data-translate="hintFocus">Click here to start</span>
                        </div>
                    </div>
                </div>

                <div class="keyboard-container" id="visualAids">
                    <div class="keyboard-row">
                        <div class="key" data-key="`">`</div><div class="key" data-key="1">1</div><div class="key" data-key="2">2</div><div class="key" data-key="3">3</div><div class="key" data-key="4">4</div><div class="key" data-key="5">5</div><div class="key" data-key="6">6</div><div class="key" data-key="7">7</div><div class="key" data-key="8">8</div><div class="key" data-key="9">9</div><div class="key" data-key="0">0</div><div class="key" data-key="-">-</div><div class="key" data-key="=">=</div><div class="key backspace">Backspace</div>
                    </div>
                    <div class="keyboard-row">
                        <div class="key tab">Tab</div><div class="key" data-key="q">Q</div><div class="key" data-key="w">W</div><div class="key" data-key="e">E</div><div class="key" data-key="r">R</div><div class="key" data-key="t">T</div><div class="key" data-key="y">Y</div><div class="key" data-key="u">U</div><div class="key" data-key="i">I</div><div class="key" data-key="o">O</div><div class="key" data-key="p">P</div><div class="key" data-key="[">[</div><div class="key" data-key="]">]</div><div class="key" data-key="\">|</div>
                    </div>
                    <div class="keyboard-row">
                        <div class="key caps">Caps</div><div class="key" data-key="a">A</div><div class="key" data-key="s">S</div><div class="key" data-key="d">D</div><div class="key" data-key="f">F</div><div class="key" data-key="g">G</div><div class="key" data-key="h">H</div><div class="key" data-key="j">J</div><div class="key" data-key="k">K</div><div class="key" data-key="l">L</div><div class="key" data-key=";">;</div><div class="key" data-key="'">'</div><div class="key enter">Enter</div>
                    </div>
                    <div class="keyboard-row">
                        <div class="key shift" id="shift-left">Shift</div><div class="key" data-key="z">Z</div><div class="key" data-key="x">X</div><div class="key" data-key="c">C</div><div class="key" data-key="v">V</div><div class="key" data-key="b">B</div><div class="key" data-key="n">N</div><div class="key" data-key="m">M</div><div class="key" data-key=",">,</div><div class="key" data-key=".">.</div><div class="key" data-key="/">/</div><div class="key shift" id="shift-right">Shift</div>
                    </div>
                    <div class="keyboard-row">
                        <div class="key space" data-key=" ">Space</div>
                    </div>
                </div>
            </div>

            <div id="minigamePanel" style="display: none; text-align: center; padding: 50px;">
                <h2 style="color: #fff; margin-bottom: 20px;">Coming Soon!</h2>
                <div class="section-grid" style="justify-content: center;">
                    <div class="lesson-card" style="opacity: 0.7; cursor: default; max-width: 300px;">
                        <div class="card-header"><i class="fas fa-gamepad lesson-icon" style="color: #ff6b6b;"></i></div>
                        <div class="lesson-info"><h3>Type Racer</h3><p>Race against ghosts</p></div>
                    </div>
                    <div class="lesson-card" style="opacity: 0.7; cursor: default; max-width: 300px;">
                        <div class="card-header"><i class="fas fa-meteor lesson-icon" style="color: #ffd93d;"></i></div>
                        <div class="lesson-info"><h3>Z-Type Defense</h3><p>Destroy falling words</p></div>
                    </div>
                </div>
            </div>

            <div id="customPanel" style="display: none; text-align: center; padding: 50px;">
     <div class="section-title">Custom Practice</div>
     
     <div class="custom-box">
         <p style="color: #cbd5e1; font-size: 1.1rem;">Paste your own text to practice.</p>
         <button class="cta-button" onclick="openCustomModal()">Enter Text</button>
     </div>
</div>
            </div>

            <div class="result-overlay" id="resultOverlay">
    <div class="result-card">
        <h2 style="color: cyan;">Great Job!</h2>
        <div class="result-stats">
            <div class="res-item"><div class="big-num" id="finalWpm">0</div><span>WPM</span></div>
            <div class="res-item"><div class="big-num" id="finalAcc">100%</div><span>Accuracy</span></div>
        </div>
        <div class="result-actions">
            <button id="btnNext" class="cta-button" onclick="nextAction()">
                Next Lesson <i class="fas fa-arrow-right"></i>
            </button>
            
            <button id="btnNewText" class="cta-button" onclick="loadNewText()" style="display: none;">
                New Text <i class="fas fa-random"></i>
            </button>

            <button class="btn-secondary" onclick="goToMenu()">
                Menu <i class="fas fa-bars"></i>
            </button>
        </div>
    </div>
</div>
            
            <div class="modal" id="customModal">
                <div class="modal-content">
                    <h3>Custom Text</h3>
                    <textarea id="customTextInput" placeholder="Paste your text here..."></textarea>
                    <div class="modal-btns">
                        <button class="btn-secondary" onclick="closeModal()">Cancel</button>
                        <button class="cta-button" onclick="applyCustomText()">Start</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        const CURRENT_USER_ID = "<?php echo $user_id; ?>";
    </script>
    <script src="../assets/js/script.js"></script>
    <script src="../assets/js/typing.js"></script>
</body>
</html>
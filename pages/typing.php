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
<style>
        /* 1. Cấu trúc khung tổng: Xếp các mục lớn (Beginner, Intermediate) theo chiều dọc */
        .lesson-dashboard {
            display: flex !important;
            flex-direction: column !important; /* Xếp dọc từ trên xuống dưới */
            gap: 40px !important; /* Khoảng cách giữa mục Beginner và Intermediate */
            width: 100% !important;
        }

        /* 2. Khung chứa bài học (Beginner/Intermediate): Trải dài full màn hình */
        .lesson-section {
            width: 100% !important;
            min-width: 0 !important;
        }

        /* 3. Lưới các ô bài tập con: CHIA ĐÚNG 3 CỘT */
        .section-grid {
            display: grid !important;
            /* repeat(3, 1fr) nghĩa là chia đúng 3 cột bằng nhau */
            grid-template-columns: repeat(3, 1fr) !important; 
            gap: 20px !important;
            width: 100% !important;
        }

        /* Style cho thẻ bài học */
        .lesson-card {
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            height: 140px !important; 
        }

        /* --- RESPONSIVE: Xử lý khi màn hình nhỏ --- */
        
        /* Trên máy tính bảng/laptop nhỏ: Xuống còn 2 cột */
        @media (max-width: 992px) {
            .section-grid {
                grid-template-columns: repeat(2, 1fr) !important;
            }
        }

        /* Trên điện thoại: Xuống 1 cột */
        @media (max-width: 600px) {
            .section-grid {
                grid-template-columns: 1fr !important;
            }
        }
    </style>
</head>
<body>
    
    <div class="hero">
        <div class="stars" id="starsContainer"></div>
        <div class="moon"><div class="moon-crater crater1"></div></div>
        <div class="clouds">
            <div class="cloud cloud1"></div>
            <div class="cloud cloud2"></div>
            <div class="cloud cloud3"></div>
        </div>

        <nav>
            <div class="nav-left">
                <div class="logo">NoobDev</div>
            </div>
            <div class="nav-links">
                <a href="../index.php" data-translate="navHome">Home</a>
                <a href="about.php" data-translate="navAbout">About</a>
                <a href="tips.php" data-translate="navTips">Tips</a>
                <a href="FAQ.php" data-translate="navFAQ">FAQ</a>
                <a href="typing.php" class="active menu-Tips" data-translate="navTyping">Typing</a>
                
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
            </div>
            <button class="menu-toggle" id="menuToggle"><span></span><span></span><span></span></button>
        </nav>

        <div class="side-menu" id="sideMenu">
            <ul>
                <li><a href="../index.php" data-translate="navHome">Home</a></li>
                <li><a href="about.php" data-translate="navAbout">About</a></li>
                <li><a href="tips.php" data-translate="navTips">Tips</a></li>
                <li><a href="FAQ.php" data-translate="navFAQ">FAQ</a></li>
                <li><a href="typing.php" data-translate="navTyping">Typing</a></li>
                <li><a href="../login/php/logout.php">Logout</a></li>
            </ul>
        </div>

        <div class="typing-container">
            
            <div class="back-nav-container">
                <div class="nav-controls" id="navControls" style="display: none;">
                    <button id="backToLessonsBtn" class="nav-control-btn" onclick="goToMenu()">
                        <i class="fas fa-chevron-left"></i> Menu
                    </button>
                    <button id="navNewTextBtn" class="nav-control-btn" onclick="loadNewText()">
                        <i class="fas fa-random"></i> New Text
                    </button>
                    <button id="externalRestartBtn" class="nav-control-btn refresh-btn" onclick="restartCurrent()">
                        <i class="fas fa-redo"></i> Restart
                    </button>
                </div>
            </div>

            <div class="selection-bar" id="selectionBar">
                <div class="mode-tabs">
                    <button class="tab-btn active" onclick="switchMode('beginner')">Lessons</button>
                    <button class="tab-btn" onclick="switchMode('minigame')">Minigames</button>
                    <button class="tab-btn" onclick="switchMode('code')">Code</button>
                    <button class="tab-btn" onclick="switchMode('test')">Test</button>
                    <button class="tab-btn" onclick="switchMode('custom')">Custom</button>
                </div>
            </div>

            <div class="stats-bar" id="gameStats" style="display: none;">
                <div class="stat-group">
                    <div class="stat-label">TIME</div>
                    <div class="stat-value" id="timeLeft">60</div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-group">
                    <div class="stat-label">WPM</div>
                    <div class="stat-value" id="wpm">0</div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-group">
                    <div class="stat-label">ACCURACY</div>
                    <div class="stat-value" id="accuracy">100%</div>
                </div>
            </div>

            <div id="lessonDashboard" class="lesson-dashboard"></div>

            <div id="gameArea" style="display: none;">
                <div class="typing-box-wrapper" id="typingWrapper">
                    <input type="text" class="input-field" id="inputField" autocomplete="off" spellcheck="false">
                    <div class="typing-box" id="quoteDisplay"></div>
                    <div class="focus-overlay" id="focusOverlay">
                        <div class="start-msg"><i class="fas fa-mouse-pointer"></i> Click here to start</div>
                    </div>
                </div>

                <div class="keyboard-container" id="visualAids">
                    <div class="keyboard-row"><div class="key" data-key="`">`</div><div class="key" data-key="1">1</div><div class="key" data-key="2">2</div><div class="key" data-key="3">3</div><div class="key" data-key="4">4</div><div class="key" data-key="5">5</div><div class="key" data-key="6">6</div><div class="key" data-key="7">7</div><div class="key" data-key="8">8</div><div class="key" data-key="9">9</div><div class="key" data-key="0">0</div><div class="key" data-key="-">-</div><div class="key" data-key="=">=</div><div class="key backspace">Backspace</div></div>
                    <div class="keyboard-row"><div class="key tab">Tab</div><div class="key" data-key="q">Q</div><div class="key" data-key="w">W</div><div class="key" data-key="e">E</div><div class="key" data-key="r">R</div><div class="key" data-key="t">T</div><div class="key" data-key="y">Y</div><div class="key" data-key="u">U</div><div class="key" data-key="i">I</div><div class="key" data-key="o">O</div><div class="key" data-key="p">P</div><div class="key" data-key="[">[</div><div class="key" data-key="]">]</div><div class="key" data-key="\">|</div></div>
                    <div class="keyboard-row"><div class="key caps">Caps</div><div class="key" data-key="a">A</div><div class="key" data-key="s">S</div><div class="key" data-key="d">D</div><div class="key" data-key="f">F</div><div class="key" data-key="g">G</div><div class="key" data-key="h">H</div><div class="key" data-key="j">J</div><div class="key" data-key="k">K</div><div class="key" data-key="l">L</div><div class="key" data-key=";">;</div><div class="key" data-key="'">'</div><div class="key enter">Enter</div></div>
                    <div class="keyboard-row"><div class="key shift" id="shift-left">Shift</div><div class="key" data-key="z">Z</div><div class="key" data-key="x">X</div><div class="key" data-key="c">C</div><div class="key" data-key="v">V</div><div class="key" data-key="b">B</div><div class="key" data-key="n">N</div><div class="key" data-key="m">M</div><div class="key" data-key=",">,</div><div class="key" data-key=".">.</div><div class="key" data-key="/">/</div><div class="key shift" id="shift-right">Shift</div></div>
                    <div class="keyboard-row"><div class="key space" data-key=" ">Space</div></div>
                </div>
            </div>

            <div id="minigamePanel" style="display: none; width: 100%;">
    <div class="lesson-dashboard" style="display: flex !important; flex-direction: column !important;">
        
        <div class="lesson-section">
            <h2 class="section-title" style="border-left-color: #facc15;">Arcade Zone</h2>
            
            <div class="section-grid">
                
                <a href="blinkgame.php" class="lesson-card" style="text-decoration: none; color: inherit;">
                    <div class="card-header">
                        <i class="fas fa-bolt lesson-icon" style="color: #facc15; font-size: 2rem; margin-bottom: 10px;"></i>
                        <div class="lesson-stars">
                            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                        </div>
                    </div>
                    <div class="lesson-info">
                        <h3>Blink Game</h3>
                        <p>Speed & Reflexes</p>
                    </div>
                </a>

                <a href="fallingblocks.php" class="lesson-card" style="text-decoration: none; color: inherit;">
                    <div class="card-header">
                        <i class="fas fa-cubes lesson-icon" style="color: #4ade80; font-size: 2rem; margin-bottom: 10px;"></i>
                        <div class="lesson-stars">
                            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                        </div>
                    </div>
                    <div class="lesson-info">
                        <h3>Falling Blocks</h3>
                        <p>Survival Typing</p>
                    </div>
                </a>

                <div class="lesson-card" style="opacity: 0.5; cursor: not-allowed;">
                    <div class="card-header">
                        <i class="fas fa-flag-checkered lesson-icon" style="color: #f87171; font-size: 2rem; margin-bottom: 10px;"></i>
                    </div>
                    <div class="lesson-info">
                        <h3>Type Racer</h3>
                        <p>Coming Soon</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

            <div id="customPanel" style="display: none;">
                 <div class="section-title" style="text-align: center; border: none; color: #38bdf8;">Custom Practice</div>
                 <div class="custom-box">
                     <p style="color: #cbd5e1; font-size: 1.1rem;">Paste your own text to practice.</p>
                     <button class="cta-button" onclick="openCustomModal()">Enter Text</button>
                 </div>
            </div>

            <div class="result-overlay" id="resultOverlay">
                <div class="result-card">
    <h2 style="color: #4ade80;">Great Job!</h2>
    <div class="result-stats">
        <div class="res-item"><div class="big-num" id="finalWpm">0</div><span>WPM</span></div>
        <div class="res-item"><div class="big-num" id="finalAcc">100%</div><span>Accuracy</span></div>
    </div>
    
    <div class="result-actions">
        <div class="primary-action">
            <button id="btnNext" class="cta-button" onclick="nextAction()" style="width: 100%; justify-content: center;">
                Next Lesson <i class="fas fa-arrow-right"></i>
            </button>
            <button id="btnNewText" class="cta-button" onclick="loadNewText()" style="display: none; width: 100%; justify-content: center;">
                New Text <i class="fas fa-random"></i>
            </button>
        </div>
        
        <div class="secondary-actions">
            <button class="btn-secondary" onclick="restartCurrent()">Retry <i class="fas fa-redo"></i></button>
            <button class="btn-secondary" onclick="goToMenu()">Menu <i class="fas fa-bars"></i></button>
        </div>
    </div>
</div>
            </div>
            
            <div class="modal" id="customModal">
    <div class="modal-content custom-modal-content">
        <div class="modal-icon">
            <i class="fas fa-file-alt"></i>
        </div>
        
        <h3>Custom Practice</h3>
        <p class="modal-desc">Paste your own text below to start typing.</p>
        
        <textarea id="customTextInput" class="custom-textarea" placeholder="Paste your text here..."></textarea>
        
        <div class="modal-btns">
            <button class="btn-secondary" onclick="closeModal()">Cancel</button>
            <button class="cta-button" onclick="applyCustomText()">Next <i class="fas fa-arrow-right"></i></button>
        </div>
    </div>
</div>

            <div class="modal" id="timeModal">
    <div class="modal-content time-modal-content">
        <div class="modal-icon">
            <i class="fas fa-stopwatch"></i>
        </div>
        
        <h3>Select Duration</h3>
        <p class="modal-desc">Choose a preset or enter your own time.</p>

        <div class="quick-select-container">
            <button class="quick-btn" onclick="setPresetTime('00:15')">15s</button>
            <button class="quick-btn active" onclick="setPresetTime('00:30')">30s</button>
            <button class="quick-btn" onclick="setPresetTime('01:00')">60s</button>
            <button class="quick-btn" onclick="setPresetTime('03:00')">3m</button>
            <button class="quick-btn" onclick="setPresetTime('')">∞</button>
        </div>

        <div class="time-input-wrapper">
            <input type="text" id="timeInput" class="styled-time-input" placeholder="mm:ss" maxlength="5" value="00:30">
        </div>

        <div class="modal-btns">
            <button class="btn-secondary" onclick="closeModal()">Cancel</button>
            <button class="cta-button" onclick="confirmStartGame()">Start Typing</button>
        </div>
    </div>
</div>

        </div>
    </div>

    <script>const CURRENT_USER_ID = "<?php echo $user_id; ?>";</script>
    <!--<script src="../assets/js/script.js"></script>-->
    <script src="../assets/js/typing.js"></script>
</body>
</html>
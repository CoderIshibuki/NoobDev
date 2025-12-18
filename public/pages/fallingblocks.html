<?php
session_start();
require_once 'php/db_connect.php'; 
$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
$avatar_file = isset($_SESSION['user_avatar']) ? $_SESSION['user_avatar'] : null;
if ($user_id && !$avatar_file) {
    $files = glob("../assets/uploads/avatar_" . $user_id . ".*");
    if (count($files) > 0) $_SESSION['user_avatar'] = basename($files[0]);
}

$my_best_score = 0;
if($user_id) {
    $stmt = $conn->prepare("SELECT MAX(score) as best FROM game_scores WHERE user_id = ? AND game_type = 'falling'");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $res = $stmt->get_result();
    if($row = $res->fetch_assoc()) $my_best_score = $row['best'] ? $row['best'] : 0;
    $stmt->close();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Falling Blocks - NoobDev</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/typing.css">
    <link rel="stylesheet" href="../assets/css/pages/fallingblocks.css">
</head>
<body>
    <div class="stars" id="starsContainer"></div>
    <div class="moon"><div class="moon-crater crater1"></div></div>
    
    <nav>
        <div class="nav-left"><div class="logo">NoobDev</div></div>
        <div class="nav-links">
            <a href="index.php">Home</a>
            <a href="about.php">About</a>
            <a href="tips.php">Tips</a>
            <a href="FAQ.php">FAQ</a>
            <a href="typing.php">Typing</a>
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
                        <a href="../login/php/logout.php" class="dropdown-item-nav"><span>🚪</span> Logout</a>
                    </div>
                </div>
            <?php else: ?>
                <a href="../login/login.html" class="login-btn">Login</a>
            <?php endif; ?>
        </div>
    </nav>

    <div class="game-wrapper">
        <div class="game-main-container">
            <div id="menuScreen" class="game-card">
                <a href="typing.php" class="exit-btn">✕</a>
                <h1 class="game-title neon-text">NEON FALL</h1>
                
                <div style="margin-bottom: 25px; display: inline-block; padding: 10px 30px; background: rgba(59, 130, 246, 0.15); border: 1px solid #3b82f6; border-radius: 50px; color: #60a5fa; font-weight: bold; font-family: monospace; font-size: 1.3rem; box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);">
                    <i class="fas fa-crown"></i> Best: <?php echo number_format($my_best_score); ?>
                </div>

                <p class="game-desc">Type the falling words! (Case Sensitive)</p>
                <div class="difficulty-grid">
                    <button class="diff-btn green" onclick="startGame(1)"><h3>Rookie</h3><span>Slow</span></button>
                    <button class="diff-btn yellow" onclick="startGame(2)"><h3>Hacker</h3><span>Medium</span></button>
                    <button class="diff-btn red" onclick="startGame(3)"><h3>Cyber</h3><span>Fast</span></button>
                </div>
            </div>

            <div id="playingScreen" class="game-card hidden fullscreen-game">
                <div id="gameArea" class="game-area">
                    <div class="hud-overlay">
                        <div class="hud-item score-container"><span class="score-label">SCORE</span><span id="scoreDisplay">0</span></div>
                        <div id="livesDisplay" class="hud-item lives-container"></div>
                    </div>
                    <div class="laser-line"></div>
                </div>
                <div class="keyboard-hint" style="margin-top: 15px; color: #94a3b8; font-size: 0.95rem;">
                    <span><i class="fas fa-keyboard"></i> Type falling words to destroy them!</span>
                </div>
                <button class="quit-btn" onclick="stopGame()">✕ Quit Game</button>
            </div>

            <div id="gameOverScreen" class="game-card hidden">
                <a href="typing.php" class="exit-btn">✕</a>
                <h2 class="game-over-title">SYSTEM FAILURE</h2>
                <div class="final-stats">
                    <div class="stat-box"><span>Final Score</span><h3 id="finalScore" class="highlight-score">0</h3></div>
                </div>
                <div class="action-buttons">
                    <button class="cta-button" onclick="resetGame()">Retry</button>
                    <button class="cta-button ghost" onclick="returnToMenu()">Menu</button>
                </div>
            </div>
        </div>
        </div>

    <script src="../assets/js/script.js"></script>
    <script src="../assets/js/pages/fallingblocks.js"></script>
    <script>
        const userNav = document.getElementById('userProfileNav');
        if(userNav) userNav.addEventListener('click', function(e){ e.stopPropagation(); this.classList.toggle('active'); });
        document.addEventListener('click', () => { if(userNav) userNav.classList.remove('active'); });
    </script>
</body>
</html>
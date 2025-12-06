<?php
session_start();
// Logic lấy thông tin user giống hệt các trang khác
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
    <title>FAQ - NoobDev</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/FAQ.css">
</head>
<body>

    <div class="stars" id="starsContainer"></div>
    <div class="moon">
        <div class="moon-crater crater1"></div>
        <div class="moon-crater crater2"></div>
        <div class="moon-crater crater3"></div>
    </div>
    <div class="clouds">
        <div class="cloud cloud1"></div>
        <div class="cloud cloud2"></div>
        <div class="cloud cloud3"></div>
    </div>

    <nav>
        <div class="nav-left">
            <button class="menu-toggle" id="menuToggle"><span></span><span></span><span></span></button>
            <div class="logo">NoobDev</div>
        </div>
        <div class="nav-links">
            <a href="../index.php" data-translate="navHome">Home</a>
            <a href="about.php" data-translate="navAbout">About</a>
            <a href="tips.php" data-translate="navTips">Tips</a>
            <a href="FAQ.php" class="active menu-FAQ" data-translate="navFAQ">FAQ</a>
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

    <div class="tips-container">
        
        <div class="content-header">
            <h1 data-translate="faqTitle">Frequently Asked Questions</h1>
            <p data-translate="faqSubtitle">Common questions regarding typing speed and techniques</p>
        </div>

        <div class="faq-toc-container">
            <div class="faq-toc">
                <h2 data-translate="tocTitle">Table of Contents</h2>
                <ol>
                    <li><a href="#faq-1" data-translate="q1Title">What is a typing test?</a></li>
                    <li><a href="#faq-2" data-translate="q2Title">What is a typing test for?</a></li>
                    <li><a href="#faq-3" data-translate="q3Title">Why practice typing?</a></li>
                    <li><a href="#faq-4" data-translate="q4Title">How long to practice?</a></li>
                    <li><a href="#faq-5" data-translate="q5Title">What is WPM?</a></li>
                    <li><a href="#faq-6" data-translate="q6Title">What are net keystrokes?</a></li>
                    <li><a href="#faq-7" data-translate="q7Title">What are gross keystrokes?</a></li>
                    <li><a href="#faq-8" data-translate="q8Title">What are total keystrokes?</a></li>
                    <li><a href="#faq-9" data-translate="q9Title">Accuracy vs Actual Accuracy?</a></li>
                    <li><a href="#faq-10" data-translate="q10Title">What is touch typing?</a></li>
                    <li><a href="#faq-11" data-translate="q11Title">How to practice touch typing?</a></li>
                    <li><a href="#faq-12" data-translate="q12Title">What is muscle memory?</a></li>
                    <li><a href="#faq-13" data-translate="q13Title">How to type faster?</a></li>
                    <li><a href="#faq-14" data-translate="q14Title">Average typing speed?</a></li>
                </ol>
            </div>
        </div>

        <div class="faq-answers-container">
            
            <div id="faq-1" class="faq-card">
                <h3 data-translate="q1Title">What is a typing test?</h3>
                <p data-translate="q1Desc">A typing test is a practical test that measures a person's speed and accuracy when typing text.</p>
            </div>

            <div id="faq-2" class="faq-card">
                <h3 data-translate="q2Title">What is a typing test for?</h3>
                <p data-translate="q2Desc">It checks how fast and accurately someone can type. This is often part of the selection process for jobs requiring computer use.</p>
            </div>

            <div id="faq-3" class="faq-card">
                <h3 data-translate="q3Title">Why practice typing?</h3>
                <p data-translate="q3Desc">To save time, finish work faster, communicate efficiently, and reduce physical strain on your hands.</p>
            </div>

            <div id="faq-4" class="faq-card">
                <h3 data-translate="q4Title">How long do I need to practice?</h3>
                <p data-translate="q4Desc">Ideally 10 to 20 minutes a day. Consistent practice with correct technique yields results in 1-3 months.</p>
            </div>

            <div id="faq-5" class="faq-card">
                <h3 data-translate="q5Title">What is WPM?</h3>
                <p data-translate="q5Desc">WPM stands for “Words Per Minute”. It is the standard unit for measuring typing speed.</p>
            </div>

            <div id="faq-6" class="faq-card">
                <h3 data-translate="q6Title">What are net keystrokes?</h3>
                <p data-translate="q6Desc">Net keystrokes count only the correct characters typed per minute.</p>
            </div>

            <div id="faq-7" class="faq-card">
                <h3 data-translate="q7Title">What are gross keystrokes?</h3>
                <p data-translate="q7Desc">Gross keystrokes count all characters typed, whether correct or incorrect (excluding corrections).</p>
            </div>

            <div id="faq-8" class="faq-card">
                <h3 data-translate="q8Title">What are total keystrokes?</h3>
                <p data-translate="q8Desc">Total keystrokes include every key press, including backspaces and corrections.</p>
            </div>

            <div id="faq-9" class="faq-card">
                <h3 data-translate="q9Title">Accuracy vs Actual Accuracy?</h3>
                <p data-translate="q9Desc">Accuracy considers only the final text. Actual accuracy considers all mistakes made while typing, even if corrected.</p>
            </div>

            <div id="faq-10" class="faq-card">
                <h3 data-translate="q10Title">What is touch typing?</h3>
                <p data-translate="q10Desc">A technique where you type without looking at the keyboard, relying on muscle memory and the Home Row (F and J keys).</p>
            </div>

            <div id="faq-11" class="faq-card">
                <h3 data-translate="q11Title">How to practice touch typing?</h3>
                <p data-translate="q11Desc">Place index fingers on F and J. Use all 10 fingers. Practice pressing keys without looking down using online tools.</p>
            </div>

            <div id="faq-12" class="faq-card">
                <h3 data-translate="q12Title">What is muscle memory?</h3>
                <p data-translate="q12Desc">When your brain memorizes movement sequences through repetition, allowing you to type automatically without conscious effort.</p>
            </div>

            <div id="faq-13" class="faq-card">
                <h3 data-translate="q13Title">How to type faster?</h3>
                <p data-translate="q13Desc">Stop looking at the keyboard. Prioritize accuracy over speed. Maintain good posture and consistent rhythm.</p>
            </div>

            <div id="faq-14" class="faq-card">
                <h3 data-translate="q14Title">What is the average typing speed?</h3>
                <p data-translate="q14Desc">The global average is around 42 WPM. Professional typists often exceed 100 WPM.</p>
            </div>

        </div>
    </div>

    <script src="../assets/js/script.js"></script>
    <script src="../assets/js/pages/FAQ.js"></script>
</body>
</html>
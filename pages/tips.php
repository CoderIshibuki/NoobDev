<?php
session_start();
// Lấy thông tin user để hiển thị Avatar trên Navbar
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
    <title>Typing Tips - NoobDev</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/tips.css">
</head>
<body>

    <div class="stars" id="starsContainer"></div>
    <div class="moon"><div class="moon-crater crater1"></div><div class="moon-crater crater2"></div><div class="moon-crater crater3"></div></div>
    <div class="clouds"><div class="cloud cloud1"></div><div class="cloud cloud2"></div><div class="cloud cloud3"></div></div>

    <nav>
        <div class="nav-left"><div class="logo">NoobDev</div></div>
        <div class="nav-links">
            <a href="../index.php" data-translate="navHome">Home</a>
            <a href="about.php" data-translate="navAbout">About</a>
            <a href="tips.php" class="active" data-translate="navTips">Tips</a>
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

    <div class="tips-container">
        
        <div class="content-header">
            <h1 data-translate="tipsTitle">How to type faster</h1>
            <p data-translate="tipsSubtitle">Master the keyboard with these pro techniques</p>
        </div>

        <div class="faq-toc-container">
            <div class="faq-toc">
                <h2 data-translate="tocTitle">Table of Contents</h2>
                <ol>
                    <li><a href="#faq-1">Choose a good typing technique</a></li>
                    <li><a href="#faq-2">Don't look at the keyboard</a></li>
                    <li><a href="#faq-3">Focus on accuracy</a></li>
                    <li><a href="#faq-4">Be consistent</a></li>
                    <li><a href="#faq-5">Set goals</a></li>
                    <li><a href="#faq-6">Take breaks</a></li>
                    <li><a href="#faq-7">Type naturally</a></li>
                    <li><a href="#faq-8">Have a good posture</a></li>
                    <li><a href="#faq-9">Choose a good keyboard</a></li>
                    <li><a href="#faq-10">Read ahead of what you're typing</a></li>
                    <li><a href="#faq-11">Use the keyboard shortcuts</a></li>
                    <li><a href="#faq-12">Use SHIFT for single capitalizations</a></li>
                </ol>
            </div>
        </div>

        <div class="faq-answers-container">
            
            <div id="faq-1" class="faq-card">
                <h3>Choose a good typing technique</h3>
                <p>
                    In order for you to increase typing speed, it is essential that you choose a proper typing technique. The whole process of improving your typing speed is based on <strong>movement memory (muscle memory)</strong> and the way you type directly affects the speed you can achieve and the time you will need to practice.
                    <br><br>
                    A technique that uses only the index fingers (hunt and peck), for example, is very slow. Even if you practice a lot, you will not be able to reach very high speeds with that. This is because with this technique your hands and fingers need to move around the keyboard a lot, as many keys are far from your index fingers. Also, the same finger has to press many different keys, which makes the typing process even slower.
                    <br><br>
                    The most indicated technique is <strong>touch typing </strong> (Home Row technique). In this method all 10 fingers are used and this has the opposite effect of the technique mentioned in the previous paragraph. In the touch typing method there is no need to move the hands and the movement of the fingers is much less. This is because the distance that the fingers need to move is much smaller, since they are very close to the keys they need to press.
                    <br><br>
                    Furthermore, each finger is responsible for a much smaller number of keys. This makes it possible for you to type many words almost instantly, as you can place each finger simultaneously on each letter of these words. All this makes typing using this technique (touch typing / Home Row) much faster, more efficient and much less tiring.
                </p>
            </div>

            <div id="faq-2" class="faq-card">
                <h3>Don't look at the keyboard</h3>
                <p>
                    Don't look at the keyboard when you type. Use the bumps on the “F” and “J” keys to position your fingers and type looking at the screen.
                    <br><br>
                    When we type looking at the keyboard we waste a lot of time visually looking for the keys. We also lose some time by constantly switching our view between the keyboard and the computer screen. In addition, when we type while looking at the screen, it is much easier to quickly identify and correct typing mistakes.
                    <br><br>
                    If you still don't know how to type without looking at the keyboard, we recommend that you learn the touch typing technique (Home Row technique). This is a technique based on <strong>muscle memory</strong> (movement memory) and in it you don't need to look at the keyboard.
                </p>
            </div>

            <div id="faq-3" class="faq-card">
                <h3>Focus on accuracy</h3>
                <p>
                    Having a good accuracy, that is, typing everything (or almost everything) correctly, is one of the most important things to improve your typing skills. This is because our brain learns through repetition and the greater the number of repetitions of correct typing movements the faster these movements are learned and the faster they will be executed.
                    <br><br>
                    Also, typos make us waste time making corrections and this is something we want to avoid. So, whenever you find yourself making a lot of mistakes, slow down your typing speed a little and try to type everything correctly. This results in faster speed than typing quickly and making multiple mistakes.
                    <br><br>
                    So, while you practice typing, your focus should be on accuracy and not so much on speed. You should always aim to maintain an accuracy above 96% and speed will come naturally with practice.
                </p>
            </div>

            <div id="faq-4" class="faq-card">
                <h3>Be consistent</h3>
                <p>
                    To be consistent is to continue throughout the days the activities that lead to a goal. In this sense, developing the ability to type quickly requires consistent practice, as this skill is not something that can be achieved overnight.
                    <br><br>
                    So, set aside some time every day to practice typing. Remember that it is better to practice a few minutes every day than to practice many hours in one day and not practice again for weeks.
                    <br><br>
                    Typing fast is a skill, and the key to developing any skill is consistency and dedication.
                </p>    
            </div>
            
            <div id="faq-5" class="faq-card">
                <h3>Set goals</h3>
                <p>
                    A goal is a simple, well-defined outcome that can be achieved in a short time and is part of a larger objective. Setting goals is essential in any project, as they serve as motivation and provide a sense of direction for those engaged in the pursuit of an objective.
                    <br><br>
                    If your current typing speed is 40 WPM (words per minute), for example, you can set a goal of reaching a speed of 50 WPM. Then, when that goal is accomplished, you can create another one in which the speed to be achieved is 60 WPM. That way, you can keep creating bigger and bigger goals and getting closer and closer to your ultimate goal, which can be, for example, reaching 100 WPM.
                    <br><br>
                    It is important that your goals have a deadline, that they are realistic and that they can be achieved in a short period of time. This way you will stay motivated by reaching each goal and by seeing that your efforts are generating results that bring you closer and closer to your ultimate goal.
                </p>                
            </div>

            <div id="faq-6" class="faq-card">
                <h3>Take breaks</h3>
                <p>
                    Typing for a long time without breaks leads to mental and physical fatigue. That way, mistakes increase and you end up typing slower. To prevent this from happening, it is important to take short breaks of a few minutes during each typing session. This way, in addition to reducing fatigue, we also increase our productivity. Also, when we take breaks, we can type for much longer.
                    <br><br>
                    So when you are typing, always take breaks every 20 or 30 minutes or when you feel that you are fumbling too much with the keys on the keyboard, feeling too tired or getting too frustrated. Take a break, get some air, rest, and continue when you feel you are ready to type again.
                </p>
            </div>

            <div id="faq-7" class="faq-card">
                <h3>Type naturally</h3>
                <p>While typing, try not to hit the keys too hard. Press each key naturally, with solid and precise movements. Also, try not to tense your hands while typing. This reduces physical strain and fatigue, increasing comfort and performance while typing.</p>
            </div>

            <div id="faq-8" class="faq-card">
                <h3>Have a good posture</h3>
                <p>
                    Good posture is essential for good typing performance. This is because it directly affects the comfort and naturalness of each movement of our body. In addition, using the computer for a long time without proper posture results in greater physical strain and can even cause some health problems.
                    <br><br>
                    Therefore, when typing: <br>
                </p>
                <ul>
                    <li>Keep your spine straight and supported by the back of the chair. The angle between the trunk and the thigh should be close to 100 degrees. If necessary, adjust the angle of the backrest.</li>
                    <li>Keep your feet flat on the floor. The angle of the knees should be close to 90 degrees. If necessary, adjust the height of your chair. All of this relieves pressure on the thighs and improves circulation.</li>
                    <li>Keep your arms and hands straight and aligned with your body. The wrists should not be bent up or down and should be slightly raised while you type. The angle between your arm and forearm should be close to 90 degrees. If necessary, adjust the height of your chair.</li>
                    <li>Keep your head straight and look straight ahead. Avoid tilting it up or down. Adjust the monitor so that the top of the screen is at eye level and an arm's length away from you.</li>
                </ul>
                <div style="text-align: center; margin-top: 20px;">
                    </div>
            </div>

            <div id="faq-9" class="faq-card">
                <h3>Choose a good keyboard</h3>
                <p>
                    Choosing a good keyboard is essential for you to achieve high typing speeds. Good quality keyboards are comfortable, fast and have soft and stable keys. This allows you to type much faster and for much longer.
                    <br><br>
                    On the other hand, poor quality keyboards may require more strength from your fingers to press the keys or have unstable keys that cause you to make mistakes and compromise your typing speed.
                    <br><br>
                    Good keyboards have a good tactile response, that is, you can easily detect the activation of each key by touch. On mechanical keyboards, for example, you can feel a click when you press each key and also hear the sound each one makes. This virtually eliminates typing mistakes that occur when you do not press the keys all the way down.
                </p>
            </div>

            <div id="faq-10" class="faq-card">
                <h3>Read ahead of what you're typing</h3>
                <p>
                    While typing you must always know the word that will come next. To do this, try to read 1 or 2 words ahead of what you're typing.
                    <br><br>
                    This way you will be able to type continuously, as you don't have to stop to read the current word you have to type.
                </p>                
            </div>

            <div id="faq-11" class="faq-card">
                <h3>Use the keyboard shortcuts</h3>
                <p>
                    You can use some keyboard shortcuts to make corrections faster. <strong>CTRL + Backspace</strong>, for example, will delete the whole word before the cursor. <strong>CTRL + Del</strong>, otherwise, will delete the word after the cursor.
                    <br><br>
                    You can also use <strong> CTRL + Right</strong> arrow or <strong>CTRL + Left</strong> arrow to move the cursor to the end or the beginning of the current word, respectively.
                    <br><br>
                    Correcting typing mistakes with these shortcuts is much better and faster than having to press the <strong>backspace</strong> key multiple times.
                </p>                
            </div>

            <div id="faq-12" class="faq-card">
                <h3>Use SHIFT for single capitalizations</h3>
                <p>
                    Hold the <strong>Right SHIFT</strong> key to capitalize letters that you type with the left hand (“A”, “S”, “D”, for example). For capitalizing letters that you type with the right hand (such as “J”, “K”, “L”), hold the <strong>Left SHIFT</strong>.
                    <br><br>
                    This results in faster typing because we press a key once to capitalize a letter (holding <strong>SHIFT</strong> and pressing a letter to capitalize it). When using <strong>CAPS LOCK</strong>, we have to press the same key twice. Once for enabling capitalization and again to disable it.
                    <br><br>
                    So should I stop using the CAPS LOCK key? No! This key is still faster for cases when we have multiple capitalized letters (such as whole words or sentences).
                </p>    
            </div>

        </div>

    </div>

    <script src="../assets/js/script.js"></script>
    <script src="../assets/js/tips.js"></script>
</body>
</html>
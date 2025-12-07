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
                <p data-translate="q1Desc">A typing test is a practical test that measures a person's speed and accuracy when typing text. Therefore, anyone who wants a good result on a typing test needs to be able to type quickly and without making too many mistakes.</p>
            </div>

            <div id="faq-2" class="faq-card">
                <h3 data-translate="q2Title">What is a typing test for?</h3>
                <p data-translate="q2Desc">A typing test is a way to check how fast someone can type and how accurately they can do it. This type of test is part of the selection process for some professions and is one of the elimination criteria. Anyone who intends to join in legal areas, for example, will need to pass such a test. This is because the speed and quality of typing of those who will perform these positions is essential for the tasks that will be assigned to them.
                </p>
            </div>

            <div id="faq-3" class="faq-card">
                <h3 data-translate="q3Title">Why practice typing?</h3>
                <p data-translate="q3Desc">The first and clearest benefit of practicing typing is time savings. Let's say, for example, that someone can type a text at a speed of 30 WPM (words per minute). If this same person practices and manages to reach a speed of 60 WPM, they will be able to type the same text in half the time it took the first time. This means that this person will be able to perform their typing activities at twice their initial speed.
                    <br><br>
                    In this sense, by practicing typing with the right techniques, you will evolve and be able to finish your work in less time. You will also be able to communicate on the internet more quickly and efficiently. You will be able to respond faster to your customers, co-workers and friends, interact much more dynamically on social networks and communicate quickly in online games.
                    <br><br>
                    Another advantage of practicing typing is that it decreases physical strain and increases comfort in activities involving a computer. By applying the right typing techniques, your hands and fingers will move much less and more efficiently while typing. Also, the time you need to spend in front of the computer will be less, as your activities will be completed in less time.</p>
            </div>

            <div id="faq-4" class="faq-card">
                <h3 data-translate="q4Title">How long do I need to practice?</h3>
                <p data-translate="q4Desc">The ideal is to practice 10 to 20 minutes a day. The increase in typing speed varies from person to person, but by consistently practicing with the right techniques, results can be seen within a month or three.</p>
            
            </div>

            <div id="faq-5" class="faq-card">
                <h3 data-translate="q5Title">What is WPM?</h3>
                <p data-translate="q5Desc">WPM stands for “words per minute”. This abbreviation is used as a unit of measurement to represent typing speed. A person who has achieved a typing speed of 60 WPM on a typing test, for example, can type approximately 60 words per minute.</p>
            </div>

            <div id="faq-6" class="faq-card">
                <h3 data-translate="q6Title">What are net keystrokes?</h3>
                <p data-translate="q6Desc">Net keystrokes is the number of correct characters per minute that were entered in a typing test. Saying that someone has reached 200 net keystrokes, for example, means saying that this person has typed approximately 200 correct characters every minute.</p>
            </div>

            <div id="faq-7" class="faq-card">
                <h3 data-translate="q7Title">What are gross keystrokes?</h3>
                <p data-translate="q7Desc">Gross keystrokes is the total number of characters, correct or incorrect, entered in a typing test. Only the final content of the test is considered, that is, corrections are not counted.</p>
            </div>

            <div id="faq-8" class="faq-card">
                <h3 data-translate="q8Title">What are total keystrokes?</h3>
                <p data-translate="q8Desc">Total keystrokes include every key press, including backspaces and corrections.</p>
            </div>

            <div id="faq-9" class="faq-card">
                <h3 data-translate="q9Title">Accuracy vs Actual Accuracy?</h3>
                <p data-translate="q9Desc">Accuracy shows how much of the test content was typed correctly. Only the final typed content is taken into account, that is, corrections made during the test are not counted.
                    <br><br>
                    Actual accuracy also shows how much of the test content was typed correctly. However, in actual accuracy everything that was typed is taken into account, including the corrections made during the test.
                </p>
            </div>

            <div id="faq-10" class="faq-card">
                <h3 data-translate="q10Title">What is touch typing?</h3>
                <p data-translate="q10Desc">Touch typing (Home Row) is a technique based on <strong>muscle memory (motion memory)</strong> in which a person types without looking at the keyboard. In this technique, the bumps on the “F” and “J” keys serve as a reference so that the keys can be found without the individual having to look at the keyboard. In the initial typing position, the four fingers of each hand are positioned on the central line of the keyboard and operate the other keys from that position, while the thumbs operate the space key.
                    <br><br>
                    This is one of the main techniques used for typing and is taught in many institutions and typing courses. </p>
                </div>

            <div id="faq-11" class="faq-card">
                <h3 data-translate="q11Title">How to practice touch typing?</h3>
                <p data-translate="q11Desc">
                    The first step in practicing <strong>touch typing</strong> (Home Row technique) is to position your fingers correctly on the keyboard. To do this, use the bumps on the “F” and “J” keys to position the index finger of the left hand on the letter “F” and the one of the right hand on the letter “J”. This should be done without you looking at the keyboard.
                    <br><br>
                    The other fingers of the left hand should be positioned on the keys “A”, “S” and “D” while the ones on the right hand should be on the keys “K”, “L” and “;“ (or “Ç”). Finally, the thumbs should position themselves to press the “space” key. The correct positioning of the fingers can be seen in the image below.
                    <br><br>
                    Each finger is responsible for a group of keys and must always press the same keys and with the same movement. The keys “2”, “W”, “S” and “X”, for example, must always be pressed by the ring finger of the left hand. The distribution of keys between the fingers of each hand can be seen in the image below.
                    <br><br>
                    The next step is to practice pressing the keys. There are many online tools that guide you through this process. To find these tools just search the internet for “touch typing course”.
                    <br><br>
                    However, if you prefer, you can practice on your own. To do this, open a text editor (Word or Notepad) or any other tool where you can type. Then repeat pressing each key without looking at the keyboard. Always remember to use the correct fingers to press the keys. Refer to the previous image if you need to remember which finger to use to press each key.
                    <br><br>
                    Start by typing the letter “F” several times, looking at the screen and not looking at the keyboard, until you feel that you've gotten used to that key. Then do the same with the letters “J”, “D”, “K”, “S”, “L”, “A”, “;” (or “Ç”) and also with the other keys. After that, try typing the same keys alternately. When you realize that you can press all the main keys on the keyboard without looking, you can practice typing your name, words, phrases and then texts.
                    <br><br>
                    Learning touch typing is a process that is often difficult at first and can take a few days, so be patient. Remember that while practicing, the most important thing is to type everything (or almost everything) correctly, not the speed.
                    <br><br>
                    With practice, your brain will learn the correct movements to press each key and your speed will naturally increase. Then your typing movements will become automatic and you will no longer need to concentrate on the details of each movement. Everything will be much easier and natural. This is possible because of a process called <strong>muscle memory</strong>. This is the same process that occurs when we learn, for example, to ride a bicycle or play a musical instrument.
                </p> 
            </div>

            <div id="faq-12" class="faq-card">
                <h3 data-translate="q12Title">What is muscle memory?</h3>
                <p data-translate="q12Desc"> Muscle memory is also known as movement memory. When we perform a movement many times, our brain creates a memory of that movement, that is, of the sequence of actions necessary (such as muscle contractions, for example) to perform that movement. The more repetitions of that movement, the stronger the memory for it becomes and thus, it can be performed automatically in the future, without the need to concentrate on it. This is what we call muscle memory, movement memory or motor memory. This is how we learn, for example, to ride a bicycle or play musical instruments.
                    <br><br>
                    In addition, depending on the movements performed (as in physical exercises), new nuclei are created in muscle cells. These nuclei make the results appear much faster for those who have started exercising again after some time off. This process is also considered as muscle memory.
                </p> </div>

            <div id="faq-13" class="faq-card">
                <h3 data-translate="q13Title">How to type faster?</h3>
                <p data-translate="q13Desc">1. Stop looking at the keyboard.<br>2. Prioritize accuracy over speed.<br>3. Maintain good posture.<br>4. Practice rhythm. </p>
            </div>

            <div id="faq-14" class="faq-card">
                <h3 data-translate="q14Title">What is the average typing speed?</h3>
                <p data-translate="q14Desc">According to tests conducted by various typing websites, the average typing speed using a physical keyboard is 42 WPM (words per minute). The data pointing to this speed is based on more than 14 million tests performed in over 40 languages.
                    <br><br>
                    The average typing speed in the English language reaches 52 WPM. This is according to a controlled study conducted by Aalto University in Finland together with the University of Cambridge in the United Kingdom. This study involved 168,000 volunteers from various countries, totaling 136 million keystrokes. The highest speed recorded in this test was 120 WPM.
                    <br><br>
                    Considering that the language, the content of the tests and the way they are conducted can interfere with the results of the statistics, we can consider that the overall average typing speed is somewhere between 42 WPM and 52 WPM.
                </p>  
            </div>

        </div>
        <footer><p>&copy; 2025 NoobDev. Keep Clacking.</p></footer>
    </div>

    <script src="../assets/js/script.js"></script>
    <script src="../assets/js/pages/FAQ.js"></script>
</body>
</html>
/* assets/js/typing.js - Full Refactor */

// ======================================================
// 1. DATA STRUCTURES (DỮ LIỆU BÀI HỌC)
// ======================================================

// --- A. Beginner Lessons ---
const lessonData = [
    {
        title: "Beginner: The Essentials",
        lessons: [
            { id: 1, name: "J, F, and Space", keys: "j, f, space", text: "jjj fff jf jf jfj fjf j j f f jf jjj fff jf jf jfj fjf j j f f jf", icon: "fa-keyboard" },
            { id: 2, name: "U, R, and K Keys", keys: "u, r, k", text: "uju frf kjk uju frf kuk rir uju frf kjk uju frf kuk rir", icon: "fa-share" },
            { id: 3, name: "D, E, and I Keys", keys: "d, e, i", text: "ded kik ded kik ded ded kik ded kik ded", icon: "fa-cube" },
            { id: 4, name: "C, G, and N Keys", keys: "c, g, n", text: "fgf jnj dcd fgf jnj fgf jnj dcd fgf jnj", icon: "fa-layer-group" }
        ]
    },
    {
        title: "Intermediate: Words & Sentences",
        lessons: [
            { id: 5, name: "Common Words", keys: "common words", text: "the be to of and a in that have I it for not on with he as you do at this but his by from", icon: "fa-font" },
            { id: 6, name: "Home Row Words", keys: "a, s, d, f, j, k, l", text: "dad sad lad fad ask all fall lass glass add gas jag salad flask alfalfa", icon: "fa-home" }
        ]
    }
];

// --- B. Code Practice Data ---
const codeData = [
    {
        title: "Programming Languages",
        lessons: [
            { id: 301, name: "Python", keys: "Variables, Loops", type: "code", lang: "python", icon: "fa-python", color: "#306998" },
            { id: 302, name: "C++", keys: "Syntax, Pointers", type: "code", lang: "cpp", icon: "fa-cuttlefish", color: "#00599C" },
            { id: 303, name: "Java", keys: "Classes, OOP", type: "code", lang: "java", icon: "fa-java", color: "#f89820" },
            { id: 304, name: "HTML", keys: "Tags, Structure", type: "code", lang: "html", icon: "fa-html5", color: "#e34c26" },
            { id: 305, name: "JavaScript", keys: "DOM, ES6", type: "code", lang: "js", icon: "fa-js", color: "#f7df1e" },
            { id: 306, name: "PHP", keys: "Backend Syntax", type: "code", lang: "php", icon: "fa-php", color: "#777bb4" }
        ]
    }
];

const codeSnippets = {
    python: ["print('Hello World')", "def factorial(n): return 1 if n==0 else n*factorial(n-1)", "for i in range(10): print(i)", "import random\nprint(random.randint(1, 100))"],
    cpp: ["#include <iostream>\nusing namespace std;\nint main() { cout << 'Hello'; return 0; }", "void swap(int &a, int &b) { int t = a; a = b; b = t; }", "for(int i=0; i<10; i++) { cout << i << endl; }"],
    java: ["public static void main(String[] args) { System.out.println('Java'); }", "class Car { String model; int year; }", "ArrayList<String> cars = new ArrayList<String>();"],
    html: ["<div class='container'><h1>Title</h1></div>", "<ul><li>Item 1</li><li>Item 2</li></ul>", "<a href='#'>Click Me</a>", "<input type='text' placeholder='Enter name'>"],
    js: ["const element = document.getElementById('app');", "array.forEach(item => console.log(item));", "function add(a, b) { return a + b; }", "document.addEventListener('click', () => { alert('Hi'); });"],
    php: ["<?php echo 'Hello World'; ?>", "$arr = array(1, 2, 3, 4);", "function test($x) { return $x * 2; }", "foreach ($colors as $value) { echo $value; }"]
};

// --- C. Test Data (Page & Time) ---
const pageTexts = {
    short: "Typing is a skill that can significantly improve your productivity. Focus on accuracy first!",
    medium: "The concept of 'touch typing' involves using muscle memory to find keys without looking at the keyboard. This method is far superior to the 'hunt and peck' method. To master touch typing, one must practice regularly.",
    full: "Typing is a skill that can significantly improve your productivity in the digital age. Whether you are writing an email, coding a software application, or writing a novel, the ability to type quickly and accurately allows you to translate your thoughts into text with minimal friction. The concept of 'touch typing' involves using muscle memory to find keys without looking at the keyboard. Remember to maintain good posture, keep your wrists elevated, and take breaks to stretch your hands. Happy typing!"
};

const testData = [
    {
        title: "Timed Tests",
        lessons: [
            { id: 401, name: "15 Seconds", keys: "Speed Burst", type: "timetest", duration: 15, icon: "fa-stopwatch" },
            { id: 402, name: "30 Seconds", keys: "Standard Sprint", type: "timetest", duration: 30, icon: "fa-clock" },
            { id: 403, name: "60 Seconds", keys: "Endurance", type: "timetest", duration: 60, icon: "fa-hourglass-half" }
        ]
    },
    {
        title: "Page Tests",
        lessons: [
            { id: 201, name: "Short Text", keys: "~30 words", type: "pagetest", text: pageTexts.short, icon: "fa-file-alt" },
            { id: 202, name: "Medium Text", keys: "~60 words", type: "pagetest", text: pageTexts.medium, icon: "fa-file-invoice" },
            { id: 203, name: "Full Text", keys: "Full Paragraph", type: "pagetest", text: pageTexts.full, icon: "fa-book-open" }
        ]
    }
];

const randomWords = "the be to of and a in that have I it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us".split(" ");
const externalRestartBtn = document.getElementById('externalRestartBtn'); 
const navControls = document.querySelector('.nav-controls'); // Wrapper của 2 nút

// ======================================================
// 2. GLOBAL VARIABLES
// ======================================================
let currentText = "";
let charIndex = 0;
let mistakes = 0;
let isTyping = false;
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let currentMode = 'beginner'; 
let activeLessonId = null;
let currentLessonObj = null; // Lưu object bài học hiện tại để dùng cho nút New Text

// DOM Elements
const dashboard = document.getElementById('lessonDashboard');
const gameArea = document.getElementById('gameArea');
const backBtn = document.getElementById('backToLessonsBtn');
const display = document.getElementById('quoteDisplay');
const inputField = document.getElementById('inputField');
const focusOverlay = document.getElementById('focusOverlay');
const typingWrapper = document.getElementById('typingWrapper');
const gameStats = document.getElementById('gameStats'); 
const minigamePanel = document.getElementById('minigamePanel');
const customPanel = document.getElementById('customPanel');

// Result Buttons
const btnNext = document.getElementById('btnNext');
const btnNewText = document.getElementById('btnNewText');
const btnRestart = document.getElementById('btnRestart');

// Stats
const timeTag = document.getElementById('timeLeft');
const wpmTag = document.getElementById('wpm');
const accTag = document.getElementById('accuracy');

// Helper: Generate Storage Key
function getStorageKey(lessonId) {
    if (typeof CURRENT_USER_ID !== 'undefined') return `u_${CURRENT_USER_ID}_lesson_${lessonId}_stars`;
    return `lesson_${lessonId}_stars`;
}


// ======================================================
// 3. INITIALIZATION & EVENTS
// ======================================================
document.addEventListener('DOMContentLoaded', () => {
    // Mặc định vào màn hình Beginner
    if(dashboard) showLessonDashboard(); 
    
    // Focus logic
    if(focusOverlay) {
        focusOverlay.addEventListener('click', (e) => {
            e.stopPropagation();
            inputField.focus();
        });
    }
    if(typingWrapper) typingWrapper.addEventListener('click', () => inputField.focus());

    inputField.addEventListener('focus', () => {
        if(focusOverlay) {
            focusOverlay.style.opacity = '0';
            setTimeout(() => { focusOverlay.style.display = 'none'; }, 200);
        }
    });

    inputField.addEventListener('blur', () => {
        if(focusOverlay) {
            focusOverlay.style.display = 'flex';
            setTimeout(() => { focusOverlay.style.opacity = '1'; }, 10);
        }
    });

    // Typing Event
    inputField.addEventListener('input', initTyping);
});


// ======================================================
// 4. MENU & NAVIGATION LOGIC
// ======================================================

function switchMode(mode) {
    // 1. Update Tabs UI
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const btn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.getAttribute('onclick').includes(`'${mode}'`));
    if(btn) btn.classList.add('active');

    // 2. Hide everything
    hideAllPanels();
    currentMode = mode;

    // 3. Show specific content based on mode
    if(mode === 'beginner') {
        renderDashboard(); // Render Lessons
        dashboard.style.display = 'flex';
    } 
    else if (mode === 'code') {
        renderCodeDashboard(); // Render Code
        dashboard.style.display = 'flex';
    }
    else if (mode === 'test') {
        renderTestDashboard(); // Render Tests
        dashboard.style.display = 'flex';
    }
    else if (mode === 'minigame') {
        minigamePanel.style.display = 'block';
    } 
    else if (mode === 'custom') {
        customPanel.style.display = 'block'; // Hiển thị panel Custom
    }
}

function hideAllPanels() {
    dashboard.style.display = 'none';
    gameArea.style.display = 'none';
    gameStats.style.display = 'none';
    minigamePanel.style.display = 'none';
    customPanel.style.display = 'none';
    
    // Ẩn cả cụm nút điều khiển
    if(navControls) navControls.style.display = 'none';
    
    document.getElementById('resultOverlay').classList.remove('active');
}

function showLessonDashboard() { switchMode('beginner'); }

function goToMenu() { 
    // Quay lại dashboard của mode hiện tại
    switchMode(currentMode); 
}


// ======================================================
// 5. RENDER FUNCTIONS (HIỂN THỊ DANH SÁCH BÀI)
// ======================================================

function renderDashboard() {
    dashboard.innerHTML = "";
    lessonData.forEach(section => createSectionElement(section, false));
}

function renderCodeDashboard() {
    dashboard.innerHTML = "";
    codeData.forEach(section => createSectionElement(section, true, 'code-card'));
}

function renderTestDashboard() {
    dashboard.innerHTML = "";
    testData.forEach(section => createSectionElement(section, false, 'test-card'));
}

function createSectionElement(section, isCode = false, extraClass = '') {
    const secDiv = document.createElement('div');
    secDiv.className = 'lesson-section';
    secDiv.innerHTML = `<h2 class="section-title">${section.title}</h2>`;
    const gridDiv = document.createElement('div');
    gridDiv.className = 'section-grid';
    
    section.lessons.forEach(lesson => {
        const stars = localStorage.getItem(getStorageKey(lesson.id)) || 0;
        const starHTML = Array(5).fill(0).map((_, i) => `<i class="${i < stars ? 'fas' : 'far'} fa-star"></i>`).join('');
        const iconStyle = lesson.color ? `style="color: ${lesson.color}"` : '';

        const card = document.createElement('div');
        card.className = `lesson-card ${extraClass}`;
        card.onclick = () => startGenericLesson(lesson);
        card.innerHTML = `
            <div class="card-header">
                <i class="fab ${lesson.icon} lesson-icon" ${iconStyle}></i>
                <div class="lesson-stars">${starHTML}</div>
            </div>
            <div class="lesson-info"><h3>${lesson.name}</h3><p>${lesson.keys}</p></div>
        `;
        gridDiv.appendChild(card);
    });
    secDiv.appendChild(gridDiv);
    dashboard.appendChild(secDiv);
}


// ======================================================
// 6. GAME START LOGIC
// ======================================================

function startGenericLesson(lesson) {
    activeLessonId = lesson.id;
    currentLessonObj = lesson; // Lưu lại để dùng cho New Text
    
    // Logic xác định text và thời gian
    if (lesson.type === 'timetest') {
        currentText = generateRandomWords(100); 
        maxTime = lesson.duration;
    } 
    else if (lesson.type === 'pagetest') {
        currentText = lesson.text;
        maxTime = 0; // Count up
    }
    else if (lesson.type === 'code') {
        const snippets = codeSnippets[lesson.lang];
        currentText = snippets[Math.floor(Math.random() * snippets.length)];
        maxTime = 0; // Count up
    }
    else {
        // Beginner Lessons
        currentText = lesson.text;
        maxTime = 60; 
    }

    setupGameEnvironment();
}

function setupGameEnvironment() {
    hideAllPanels();
    gameArea.style.display = 'block';
    gameStats.style.display = 'flex'; 
    
    // Hiện cụm nút điều khiển (bao gồm Back và Restart)
    if(navControls) navControls.style.display = 'flex';
    
    renderGame();
    setTimeout(() => { inputField.value = ""; inputField.focus(); }, 100);
}

// Hàm sinh từ ngẫu nhiên
function generateRandomWords(count) {
    let res = [];
    for(let i=0; i<count; i++) {
        res.push(randomWords[Math.floor(Math.random() * randomWords.length)]);
    }
    return res.join(" ");
}


// ======================================================
// 7. RESTART & NEW TEXT LOGIC
// ======================================================

// Restart: Chơi lại đúng đoạn text vừa rồi
function restartCurrent() {
    // Ẩn overlay kết quả nếu nó đang hiện
    document.getElementById('resultOverlay').classList.remove('active');
    setupGameEnvironment();
}

// New Text: Random bài mới hoặc mở lại modal
function loadNewText() {
    if (currentMode === 'custom') {
        openCustomModal();
    } else if (currentLessonObj) {
        startGenericLesson(currentLessonObj); // Gọi lại sẽ random ra text mới (với Code/TimeTest)
    } else {
        goToMenu();
    }
}


// ======================================================
// 8. TYPING ENGINE (CORE)
// ======================================================

function renderGame() {
    display.innerHTML = "";
    // Xử lý hiển thị
    currentText.split("").forEach(char => {
        let span = document.createElement('span');
        span.innerText = char;
        display.appendChild(span);
    });
    
    inputField.value = "";
    charIndex = 0;
    mistakes = 0;
    isTyping = false;
    
    if(wpmTag) wpmTag.innerText = 0;
    if(accTag) accTag.innerText = "100%";
    
    if (maxTime === 0) {
        timeLeft = 0; 
        updateTimeDisplay(0);
    } else {
        timeLeft = maxTime; 
        updateTimeDisplay(timeLeft);
    }
    
    clearInterval(timer);
    document.getElementById('resultOverlay').classList.remove('active');
    
    const chars = display.querySelectorAll("span");
    if(chars.length > 0) chars[0].classList.add("active");
}

function initTyping() {
    const chars = display.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];
    let canType = (maxTime === 0) ? true : (timeLeft > 0);

    if(charIndex < chars.length && canType) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if(typedChar == null) { // Handle Backspace
            if(charIndex > 0) {
                charIndex--;
                if(chars[charIndex].classList.contains("incorrect")) mistakes--;
                chars[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            flashPressedKey(typedChar); 
            
            // Check correct char
            if(chars[charIndex].innerText === typedChar) {
                chars[charIndex].classList.add("correct");
            } else {
                mistakes++;
                chars[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }

        // Move cursor & Active class
        chars.forEach(span => span.classList.remove("active"));
        if(charIndex < chars.length) {
            chars[charIndex].classList.add("active");
            
            // Auto scroll logic
            let activeEl = chars[charIndex];
            if(activeEl.offsetTop > display.clientHeight - 50) {
                 display.scrollTop = activeEl.offsetTop - 50;
            }
        } else {
            finishGame();
        }

        updateStats();

    } else if (charIndex >= chars.length) {
        finishGame();
    }
}

function updateStats() {
    let timePassed;
    if (maxTime === 0) timePassed = timeLeft;
    else timePassed = maxTime - timeLeft;
    
    if(timePassed <= 0) timePassed = 1;
    
    let wpm = Math.round(((charIndex - mistakes) / 5) / (timePassed / 60));
    wpm = (!wpm || wpm < 0) ? 0 : wpm;
    if(wpmTag) wpmTag.innerText = wpm;
    
    let acc;
    if (charIndex === 0) acc = 100;
    else {
        acc = Math.round(((charIndex - mistakes) / charIndex) * 100);
        if(acc < 0) acc = 0; 
    }
    if(accTag) accTag.innerText = acc + "%";
}

function initTimer() {
    if (maxTime === 0) {
        timeLeft++; // Count up
        updateTimeDisplay(timeLeft);
    } else {
        if(timeLeft > 0) {
            timeLeft--; // Count down
            updateTimeDisplay(timeLeft);
        } else {
            finishGame();
        }
    }
}

function updateTimeDisplay(s) {
    let m = Math.floor(s / 60);
    let sec = s % 60;
    const formatted = `${m}:${sec < 10 ? '0' : ''}${sec}`;
    if(timeTag) timeTag.innerText = formatted;
}


// ======================================================
// 9. FINISH GAME & RESULTS
// ======================================================

function finishGame() {
    clearInterval(timer);
    inputField.value = "";
    
    const finalWpm = wpmTag ? wpmTag.innerText : 0;
    const finalAcc = accTag ? accTag.innerText : "100%";

    document.getElementById('finalWpm').innerText = finalWpm;
    document.getElementById('finalAcc').innerText = finalAcc;
    document.getElementById('resultOverlay').classList.add('active');
    
    // Lưu điểm... (giữ nguyên logic lưu điểm)
    if(activeLessonId && currentMode !== 'custom') {
        const acc = parseInt(finalAcc);
        let stars = Math.floor(acc / 20); 
        if(stars > 5) stars = 5;
        const storageKey = getStorageKey(activeLessonId);
        const oldStars = localStorage.getItem(storageKey) || 0;
        if(stars > oldStars) {
            localStorage.setItem(storageKey, stars);
        }
    }

    // BUTTON VISIBILITY LOGIC
    // Chỉ cần xử lý nút Next/New Text vì nút Restart giờ đã nằm bên ngoài Overlay
    if (currentMode === 'beginner') {
        if(btnNext) btnNext.style.display = 'flex';
        if(btnNewText) btnNewText.style.display = 'none';
    } 
    else {
        if(btnNext) btnNext.style.display = 'none';
        if(btnNewText) btnNewText.style.display = 'flex'; 
    }
}

function nextAction() {
    goToMenu(); // Beginner mode: Quay về menu chọn bài tiếp
}

// ======================================================
// 10. VISUAL AIDS & CUSTOM TEXT
// ======================================================

function flashPressedKey(char) {
    document.querySelectorAll('.key.highlight, .key.shift-highlight').forEach(k => {
        k.classList.remove('highlight', 'shift-highlight');
    });
    if(!char) return;
    let keyToPress = char.toLowerCase();
    if(char === " ") keyToPress = " ";
    
    const keyEl = document.querySelector(`.key[data-key="${keyToPress}"]`);
    if(keyEl) {
        keyEl.classList.add('highlight');
        setTimeout(() => { keyEl.classList.remove('highlight'); }, 150);
    }
}

// Custom Text Modal Logic
function openCustomModal() {
    document.getElementById('customModal').classList.add('active');
}
function closeModal() {
    document.getElementById('customModal').classList.remove('active');
}
function applyCustomText() {
    const text = document.getElementById('customTextInput').value.trim();
    if(text) { 
        currentText = text; 
        maxTime = 0; // Custom: Count up
        activeLessonId = null; 
        currentLessonObj = null;
        closeModal();
        setupGameEnvironment();
    }
}
/* --- LƯU TẠI: assets/js/typing.js --- */

// ======================================================
// 1. DATA STRUCTURES (DỮ LIỆU BÀI HỌC)
// ======================================================

const lessonData = [
    {
        title: "Beginner: The Essentials",
        lessons: [
            { id: 1, name: "J, F, and Space", keys: "j, f, space", text: "jjj fff jf jf jfj fjf j j f f jf jjj fff jf jf jfj fjf j j f f jf", icon: "fas fa-keyboard" },
            { id: 2, name: "U, R, and K Keys", keys: "u, r, k", text: "uju frf kjk uju frf kuk rir uju frf kjk uju frf kuk rir", icon: "fas fa-share" },
            { id: 3, name: "D, E, and I Keys", keys: "d, e, i", text: "ded kik ded kik ded ded kik ded kik ded", icon: "fas fa-cube" },
            { id: 4, name: "C, G, and N Keys", keys: "c, g, n", text: "fgf jnj dcd fgf jnj fgf jnj dcd fgf jnj", icon: "fas fa-layer-group" },
            { id: 5, name: "T, S, and L Keys", keys: "t, s, l", text: "st st ll tt slt lts slt lls stt tsl lts", icon: "fas fa-arrow-up" },
            { id: 6, name: "O, B, and A Keys", keys: "o, b, a", text: "oa ba bo aba bob obo baa boa bob oba", icon: "fas fa-circle" }
        ]
    },
    {
        title: "Intermediate: Full Keyboard",
        lessons: [
            { id: 7, name: "V, H, and M Keys", keys: "v, h, m", text: "hm mv vh ham van hmm vvh mhm vhm", icon: "fas fa-font" },
            { id: 8, name: "W, X, and Y Keys", keys: "w, x, y", text: "way qax yew wax xay yaw wxy xyw", icon: "fas fa-times" },
            { id: 9, name: "P, Q, and Z Keys", keys: "p, q, z", text: "zap zip pop qap zaz qpq zpq pzq", icon: "fas fa-bolt" },
            { id: 10, name: "Common Words", keys: "common words", text: "the be to of and a in that have I it for not on with he as you do at this but his by from", icon: "fas fa-book" },
            { id: 11, name: "Capital Letters", keys: "Shift Key", text: "The Quick Brown Fox Jumps Over The Lazy Dog Alice Bob Charlie Dave Eve", icon: "fas fa-arrow-circle-up" },
            { id: 12, name: "Punctuation", keys: ".,;?!", text: "Hello, world. How are you? I am fine; thanks! Wait... really?", icon: "fas fa-quote-right" },
            { id: 13, name: "Number Row", keys: "1-0", text: "1990 2024 123 456 7890 100% 50% 24/7 365 days", icon: "fas fa-hashtag" }
        ]
    }
];

// Dữ liệu cho phần CODE (Programming Languages)
const codeData = [
    {
        title: "Programming Languages",
        lessons: [
            { id: 301, name: "Python", keys: "Variables, Loops", type: "code", lang: "python", icon: "fab fa-python", color: "#306998" },
            { id: 302, name: "C++", keys: "Syntax, Pointers", type: "code", lang: "cpp", icon: "fab fa-cuttlefish", color: "#00599C" },
            { id: 303, name: "Java", keys: "Classes, OOP", type: "code", lang: "java", icon: "fab fa-java", color: "#f89820" },
            { id: 304, name: "HTML", keys: "Tags, Structure", type: "code", lang: "html", icon: "fab fa-html5", color: "#e34c26" },
            { id: 305, name: "JavaScript", keys: "DOM, ES6", type: "code", lang: "js", icon: "fab fa-js", color: "#f7df1e" },
            { id: 306, name: "PHP", keys: "Backend Syntax", type: "code", lang: "php", icon: "fab fa-php", color: "#777bb4" }
        ]
    }
];

// Dữ liệu cho phần TEST (Timed & Page)
const testData = [
    {
        title: "Timed Tests",
        lessons: [
            { id: 401, name: "15 Seconds", keys: "Speed Burst", type: "timetest", duration: 15, icon: "fas fa-stopwatch" },
            { id: 402, name: "30 Seconds", keys: "Standard Sprint", type: "timetest", duration: 30, icon: "fas fa-clock" },
            { id: 403, name: "60 Seconds", keys: "Endurance", type: "timetest", duration: 60, icon: "fas fa-hourglass-half" },
            { id: 404, name: "3 Minutes", keys: "Stamina", type: "timetest", duration: 180, icon: "fas fa-running" },
            { id: 405, name: "5 Minutes", keys: "Marathon", type: "timetest", duration: 300, icon: "fas fa-coffee" },
            { id: 406, name: "10 Minutes", keys: "Hardcore", type: "timetest", duration: 600, icon: "fas fa-fire" }
        ]
    },
    {
        title: "Page Tests",
        lessons: [
            { id: 201, name: "Short Text", keys: "~30 words", type: "pagetest", text: "Typing is a skill that can significantly improve your productivity. Focus on accuracy first!", icon: "fas fa-file-alt" },
            { id: 202, name: "Medium Text", keys: "~60 words", type: "pagetest", text: "The concept of 'touch typing' involves using muscle memory to find keys without looking at the keyboard. This method is far superior to the 'hunt and peck' method. To master touch typing, one must practice regularly.", icon: "fas fa-file-invoice" },
            { id: 203, name: "Full Text", keys: "Full Paragraph", type: "pagetest", text: "Typing is a skill that can significantly improve your productivity in the digital age. Whether you are writing an email, coding a software application, or writing a novel, the ability to type quickly and accurately allows you to translate your thoughts into text with minimal friction. The concept of 'touch typing' involves using muscle memory to find keys without looking at the keyboard. Remember to maintain good posture, keep your wrists elevated, and take breaks to stretch your hands. Happy typing!", icon: "fas fa-book-open" }
        ]
    }
];

// ======================================================
// 2. SUPPORTING DATA (Snippets & Words)
// ======================================================

// Các đoạn mã mẫu cho phần Code
const codeSnippets = {
    python: [
        "def hello_world():\n    print('Hello World')\n    return True",
        "for i in range(10):\n    if i % 2 == 0:\n        print(i)",
        "import random\nvalue = random.randint(1, 100)\nprint(f'Random: {value}')"
    ],
    cpp: [
        "#include <iostream>\nusing namespace std;\nint main() {\n    cout << 'Hello';\n    return 0;\n}",
        "void swap(int &a, int &b) {\n    int t = a;\n    a = b;\n    b = t;\n}"
    ],
    java: [
        "public class Main {\n    public static void main(String[] args) {\n        System.out.println('Java');\n    }\n}",
        "ArrayList<String> cars = new ArrayList<String>();\ncars.add('Volvo');\ncars.add('BMW');"
    ],
    html: [
        "<!DOCTYPE html>\n<html>\n<body>\n    <h1>My First Heading</h1>\n    <p>My first paragraph.</p>\n</body>\n</html>",
        "<div class='container'>\n    <ul>\n        <li>Item 1</li>\n        <li>Item 2</li>\n    </ul>\n</div>"
    ],
    js: [
        "const btn = document.getElementById('btn');\nbtn.addEventListener('click', () => {\n    alert('Clicked!');\n});",
        "function add(a, b) {\n    return a + b;\n}\nconsole.log(add(5, 10));"
    ],
    php: [
        "<?php\necho 'Hello World';\n$x = 5;\n$y = 10;\necho $x + $y;\n?>",
        "foreach ($colors as $value) {\n    echo \"$value <br>\";\n}"
    ]
};

// Từ vựng ngẫu nhiên cho phần Timed Test
const randomWords = "the be to of and a in that have I it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us".split(" ");

// ======================================================
// 3. LOGIC & GLOBAL VARIABLES (Giữ nguyên)
// ======================================================
let currentText = "", charIndex = 0, mistakes = 0, isTyping = false, timer;
let maxTime = 60, timeLeft = maxTime, currentMode = 'beginner';
let activeLessonId = null, currentLessonObj = null;
let pendingLesson = null, isCustomPending = false, pendingCustomText = "";

// DOM Elements
const selectionBar = document.querySelector('.selection-bar');
const dashboard = document.getElementById('lessonDashboard');
const gameArea = document.getElementById('gameArea');
const display = document.getElementById('quoteDisplay');
const inputField = document.getElementById('inputField');
const focusOverlay = document.getElementById('focusOverlay');
const typingWrapper = document.getElementById('typingWrapper');
const gameStats = document.getElementById('gameStats'); 
const minigamePanel = document.getElementById('minigamePanel');
const customPanel = document.getElementById('customPanel');
const navControls = document.getElementById('navControls');
const navNewTextBtn = document.getElementById('navNewTextBtn');
const timeModal = document.getElementById('timeModal');
const timeInput = document.getElementById('timeInput');
const customModal = document.getElementById('customModal');
const btnNext = document.getElementById('btnNext');
const btnNewText = document.getElementById('btnNewText');
const timeTag = document.getElementById('timeLeft');
const wpmTag = document.getElementById('wpm');
const accTag = document.getElementById('accuracy');

function getStorageKey(lessonId) {
    if (typeof CURRENT_USER_ID !== 'undefined') return `u_${CURRENT_USER_ID}_lesson_${lessonId}_stars`;
    return `lesson_${lessonId}_stars`;
}

document.addEventListener('DOMContentLoaded', () => {
    if(dashboard) showLessonDashboard();
    
    if(timeInput) {
        timeInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); 
            if (value.length >= 3) value = value.substring(0, 2) + ':' + value.substring(2, 4);
            e.target.value = value;
        });
    }

    if(focusOverlay) {
        focusOverlay.addEventListener('click', (e) => {
            e.stopPropagation(); inputField.focus();
            focusOverlay.classList.add('hidden'); focusOverlay.style.opacity = '0';
        });
    }
    if(typingWrapper) {
        typingWrapper.addEventListener('click', () => { inputField.focus(); });
    }
    if(inputField) {
        inputField.addEventListener('focus', () => {
            if(focusOverlay) { focusOverlay.classList.add('hidden'); focusOverlay.style.opacity = '0'; }
        });
        inputField.addEventListener('blur', () => {
            if(gameArea.style.display !== 'none' && focusOverlay) {
                focusOverlay.classList.remove('hidden'); focusOverlay.style.opacity = '1';
            }
        });
        inputField.addEventListener('input', initTyping);
    }
});

function switchMode(mode) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const btn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.getAttribute('onclick').includes(`'${mode}'`));
    if(btn) btn.classList.add('active');

    hideAllPanels();
    if(selectionBar) selectionBar.style.display = 'flex'; 

    currentMode = mode;

    if(mode === 'beginner') { 
        renderDashboard(); 
        dashboard.style.display = 'flex'; 
    } 
    else if (mode === 'code') { 
        renderCodeDashboard(); 
        dashboard.style.display = 'flex'; 
    }
    else if (mode === 'test') { 
        renderTestDashboard(); 
        dashboard.style.display = 'flex'; 
    }
    else if (mode === 'minigame') { 
        if(minigamePanel) minigamePanel.style.display = 'block'; 
    } 
    else if (mode === 'custom') { 
        if(customPanel) customPanel.style.display = 'block'; 
    }
}

function hideAllPanels() {
    if(selectionBar) selectionBar.style.display = 'none';
    if(dashboard) dashboard.style.display = 'none';
    if(gameArea) gameArea.style.display = 'none';
    if(gameStats) gameStats.style.display = 'none';
    if(minigamePanel) minigamePanel.style.display = 'none';
    if(customPanel) customPanel.style.display = 'none';
    if(navControls) navControls.style.display = 'none';
    const overlay = document.getElementById('resultOverlay');
    if(overlay) overlay.classList.remove('active');
    closeModal();
}

function showLessonDashboard() { switchMode('beginner'); }
function goToMenu() { switchMode(currentMode); }

function openCustomModal() { customModal.classList.add('active'); const txt = document.getElementById('customTextInput'); if(txt) { txt.value = ""; txt.focus(); } }
function applyCustomText() { const txt = document.getElementById('customTextInput'); if (txt && txt.value.trim() !== "") { pendingCustomText = txt.value.trim(); isCustomPending = true; customModal.classList.remove('active'); openTimeModal(); } }
function openTimeModal(lessonObj = null) { if(lessonObj) pendingLesson = lessonObj; timeInput.value = ""; timeModal.classList.add('active'); setTimeout(() => timeInput.focus(), 100); }
function closeModal() { timeModal.classList.remove('active'); customModal.classList.remove('active'); if (!timeModal.classList.contains('active')) { pendingLesson = null; isCustomPending = false; } }

function confirmStartGame() {
    let timeStr = timeInput.value.trim(); let seconds = 0; 
    if (timeStr) { if (timeStr.includes(':')) { let parts = timeStr.split(':'); seconds = (parseInt(parts[0]) * 60) + (parseInt(parts[1]) || 0); } else { seconds = parseInt(timeStr); } }
    if (isNaN(seconds)) seconds = 0;
    if (isCustomPending) { if(pendingCustomText) { currentText = pendingCustomText; maxTime = seconds; activeLessonId = null; currentLessonObj = null; setupGameEnvironment(); } } 
    else if (pendingLesson) { setupLessonContent(pendingLesson, seconds); }
    closeModal();
}

function startGenericLesson(lesson) {
    if (lesson.type === 'timetest') { setupLessonContent(lesson, lesson.duration); } 
    else { openTimeModal(lesson); }
}

function setupLessonContent(lesson, selectedTime) {
    activeLessonId = lesson.id;
    currentLessonObj = lesson;
    currentText = "";

    if (lesson.type === 'timetest') {
        currentText = generateRandomWords(100);
        maxTime = (selectedTime > 0) ? selectedTime : lesson.duration;
    } 
    else if (lesson.type === 'pagetest') {
        currentText = lesson.text;
        maxTime = selectedTime;
    }
    else if (lesson.type === 'code') {
        const snippets = codeSnippets[lesson.lang];
        if (snippets && snippets.length > 0) {
            currentText = snippets[Math.floor(Math.random() * snippets.length)];
        } else {
            currentText = "print('Hello World')";
        }
        maxTime = selectedTime; 
    } 
    else { 
        currentText = lesson.text; 
        maxTime = selectedTime; 
    }
    setupGameEnvironment();
}

function setupGameEnvironment() {
    hideAllPanels();
    gameArea.style.display = 'block'; 
    gameStats.style.display = 'flex'; 
    navControls.style.display = 'flex'; 
    if (currentMode === 'beginner') navNewTextBtn.style.display = 'none';
    else navNewTextBtn.style.display = 'flex';
    renderGame();
    setTimeout(() => { if(inputField) { inputField.value = ""; inputField.focus(); inputField.click(); } }, 100);
}

function renderDashboard() { dashboard.innerHTML = ""; lessonData.forEach(s => createSectionElement(s)); }
function renderCodeDashboard() { dashboard.innerHTML = ""; codeData.forEach(s => createSectionElement(s, true, 'code-card')); }
function renderTestDashboard() { dashboard.innerHTML = ""; testData.forEach(s => createSectionElement(s, false, 'test-card')); }

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
        card.innerHTML = `<div class="card-header"><i class="${lesson.icon} lesson-icon" ${iconStyle}></i><div class="lesson-stars">${starHTML}</div></div><div class="lesson-info"><h3>${lesson.name}</h3><p>${lesson.keys}</p></div>`;
        gridDiv.appendChild(card);
    });
    secDiv.appendChild(gridDiv);
    dashboard.appendChild(secDiv);
}

function generateRandomWords(count) {
    let res = [];
    for(let i=0; i<count; i++) res.push(randomWords[Math.floor(Math.random() * randomWords.length)]);
    return res.join(" ");
}

function restartCurrent() { document.getElementById('resultOverlay').classList.remove('active'); setupGameEnvironment(); }
function loadNewText() {
    document.getElementById('resultOverlay').classList.remove('active');
    if (currentMode === 'custom') { openCustomModal(); } 
    else if (currentLessonObj) { startGenericLesson(currentLessonObj); } 
    else { goToMenu(); }
}

function nextAction() {
    let allLessons = [];
    if(currentMode === 'beginner') lessonData.forEach(s => allLessons = allLessons.concat(s.lessons));
    else if (currentMode === 'code') codeData.forEach(s => allLessons = allLessons.concat(s.lessons));
    
    const currentIndex = allLessons.findIndex(l => l.id === activeLessonId);
    if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
        const nextLesson = allLessons[currentIndex + 1];
        startGenericLesson(nextLesson);
        document.getElementById('resultOverlay').classList.remove('active');
    } else {
        goToMenu();
    }
}

function renderGame() {
    display.innerHTML = "";
    currentText.split("").forEach(char => {
        let span = document.createElement('span');
        span.innerText = char; display.appendChild(span);
    });
    inputField.value = ""; charIndex = 0; mistakes = 0; isTyping = false;
    if(wpmTag) wpmTag.innerText = 0;
    if(accTag) accTag.innerText = "100%";
    if (maxTime === 0) { timeLeft = 0; updateTimeDisplay(0); } 
    else { timeLeft = maxTime; updateTimeDisplay(timeLeft); }
    clearInterval(timer);
    const chars = display.querySelectorAll("span");
    if(chars.length > 0) chars[0].classList.add("active");
}

function initTyping() {
    const chars = display.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];
    let canType = (maxTime === 0) ? true : (timeLeft > 0);

    if(charIndex < chars.length && canType) {
        if(!isTyping) { timer = setInterval(initTimer, 1000); isTyping = true; }
        if(typedChar == null) { 
            if(charIndex > 0) {
                charIndex--;
                if(chars[charIndex].classList.contains("incorrect")) mistakes--;
                chars[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            flashPressedKey(typedChar); 
            if(chars[charIndex].innerText === typedChar) chars[charIndex].classList.add("correct");
            else { mistakes++; chars[charIndex].classList.add("incorrect"); }
            charIndex++;
        }
        chars.forEach(span => span.classList.remove("active"));
        if(charIndex < chars.length) {
            chars[charIndex].classList.add("active");
            let activeEl = chars[charIndex];
            if(activeEl.offsetTop > display.clientHeight - 50) display.scrollTop = activeEl.offsetTop - 50;
        } else finishGame();
        updateStats();
    } else if (charIndex >= chars.length) finishGame();
}

function updateStats() {
    let timePassed = (maxTime === 0) ? timeLeft : maxTime - timeLeft;
    if(timePassed <= 0) timePassed = 1;
    let wpm = Math.round(((charIndex - mistakes) / 5) / (timePassed / 60));
    wpm = (!wpm || wpm < 0) ? 0 : wpm;
    if(wpmTag) wpmTag.innerText = wpm;
    let acc = (charIndex === 0) ? 100 : Math.round(((charIndex - mistakes) / charIndex) * 100);
    if(acc < 0) acc = 0; 
    if(accTag) accTag.innerText = acc + "%";
}

function initTimer() {
    if (maxTime === 0) { timeLeft++; updateTimeDisplay(timeLeft); } 
    else {
        if(timeLeft > 0) { timeLeft--; updateTimeDisplay(timeLeft); } 
        else finishGame();
    }
}

function updateTimeDisplay(s) {
    let m = Math.floor(s / 60); let sec = s % 60;
    const formatted = `${m}:${sec < 10 ? '0' : ''}${sec}`;
    if(timeTag) timeTag.innerText = formatted;
}

function finishGame() {
    clearInterval(timer); inputField.value = "";
    const finalWpm = wpmTag ? wpmTag.innerText : 0;
    const finalAcc = accTag ? accTag.innerText : "100%";
    document.getElementById('finalWpm').innerText = finalWpm;
    document.getElementById('finalAcc').innerText = finalAcc;
    document.getElementById('resultOverlay').classList.add('active');
    
    if(activeLessonId && currentMode !== 'custom') {
        const acc = parseInt(finalAcc);
        let stars = Math.floor(acc / 20); if(stars > 5) stars = 5;
        const key = getStorageKey(activeLessonId);
        if(stars > (localStorage.getItem(key) || 0)) localStorage.setItem(key, stars);
    }
    
    if (currentMode === 'beginner') { btnNext.style.display = 'flex'; btnNewText.style.display = 'none'; } 
    else { btnNext.style.display = 'none'; btnNewText.style.display = 'flex'; }
}

function flashPressedKey(char) {
    document.querySelectorAll('.key.highlight').forEach(k => k.classList.remove('highlight'));
    if(!char) return;
    let k = char.toLowerCase(); if(char === " ") k = " ";
    const el = document.querySelector(`.key[data-key="${k}"]`);
    if(el) { el.classList.add('highlight'); setTimeout(() => el.classList.remove('highlight'), 150); }
}

function setPresetTime(timeStr) {
    const input = document.getElementById('timeInput');
    const btns = document.querySelectorAll('.quick-btn');
    if(input) { input.value = timeStr; input.focus(); }
    btns.forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase().includes(timeStr) || 
          (timeStr === '' && btn.innerText === '∞') ||
          (btn.innerText.replace('s','') === timeStr.split(':')[1])) {
             btn.classList.add('active');
        }
    });
}
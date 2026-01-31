/* assets/js/pages/typing.js */
import { lessonData, lessonDataVi, codeData, testData, getRandomText } from '../data/typing-data.js';
import { translations } from '../data/translations.js';
import { auth } from '../firebase/config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { renderNavbar } from '../components/navbar.js';

// ======================================================
// 1. GLOBAL STATE & DOM ELEMENTS
// ======================================================

const state = {
    timeLeft: 60,
    maxTime: 60,
    charIndex: 0,
    mistakes: 0,
    isTyping: false,
    timer: null,
    charSpans: [], // Cache DOM elements (Tối ưu hóa)
    activeLesson: null,
    currentMode: 'beginner',
    pendingLesson: null,
    startTime: null,
    totalTyped: 0,
    totalErrors: 0,
    lang: localStorage.getItem('language') || 'en'
};

// Lấy element an toàn (tránh lỗi null)
const getEl = (id) => document.getElementById(id);
const els = {
    dashboard: getEl('lessonDashboard'),
    selectionBar: document.querySelector('.selection-bar'),
    navControls: getEl('navControls'),
    gameArea: getEl('gameArea'),
    gameStats: getEl('gameStats'),
    display: getEl('quoteDisplay'),
    input: getEl('inputField'),
    wpm: getEl('wpm'),
    acc: getEl('accuracy'),
    time: getEl('timeLeft'),
    resultOverlay: getEl('resultOverlay'),
    finalWpm: getEl('finalWpm'),
    finalAcc: getEl('finalAcc'),
    minigamePanel: getEl('minigamePanel'),
    customPanel: getEl('customPanel'),
    customModal: getEl('customModal'),
    timeModal: getEl('timeModal'),
    timeInput: getEl('timeInput'),
    typingWrapper: getEl('typingWrapper'),
    focusOverlay: getEl('focusOverlay')
};

// ======================================================
// 2. NAVIGATION & UI LOGIC
// ======================================================

function switchMode(mode) {
    state.currentMode = mode;
    
    // Update Tabs UI
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = Array.from(document.querySelectorAll('.tab-btn'))
        .find(b => b.getAttribute('onclick')?.includes(`'${mode}'`));
    if(activeBtn) activeBtn.classList.add('active');

    hideAllPanels();
    if(els.selectionBar) els.selectionBar.style.display = 'flex';

    if(mode === 'beginner' && els.dashboard) {
        const data = state.lang === 'vi' ? lessonDataVi : lessonData;
        if (data) renderDashboard(data);
        els.dashboard.style.display = 'flex';
    } else if (mode === 'code' && els.dashboard) {
        renderDashboard(codeData, true, 'code-card');
        els.dashboard.style.display = 'flex';
    } else if (mode === 'test' && els.dashboard) {
        renderDashboard(testData, false, 'test-card');
        els.dashboard.style.display = 'flex';
    } else if (mode === 'minigame' && els.minigamePanel) {
        els.minigamePanel.style.display = 'block';
    } else if (mode === 'custom' && els.customPanel) {
        renderCustomDashboard(); // Render giao diện Custom mới
        els.customPanel.style.display = 'block';
    }
}

function hideAllPanels() {
    if(els.dashboard) els.dashboard.style.display = 'none';
    if(els.gameArea) els.gameArea.style.display = 'none';
    if(els.gameStats) els.gameStats.style.display = 'none';
    if(els.minigamePanel) els.minigamePanel.style.display = 'none';
    if(els.customPanel) els.customPanel.style.display = 'none';
    if(els.navControls) els.navControls.style.display = 'none';
    if(els.resultOverlay) els.resultOverlay.classList.remove('active');
    closeModal();
}

function goToMenu() {
    clearInterval(state.timer);
    switchMode(state.currentMode);
}

function renderDashboard(data, isCode = false, extraClass = '') {
    if (!els.dashboard) return;
    els.dashboard.innerHTML = "";
    
    data.forEach(section => {
        const secDiv = document.createElement('div');
        secDiv.className = 'lesson-section';
        secDiv.innerHTML = `<h2 class="section-title">${section.title}</h2>`;
        
        const gridDiv = document.createElement('div');
        gridDiv.className = 'section-grid';
        
        section.lessons.forEach(lesson => {
            const card = document.createElement('div');
            card.className = `lesson-card ${extraClass}`;
            
            // Tạo element icon riêng để xử lý style màu
            const iconHTML = `<i class="${lesson.icon} lesson-icon" style="${lesson.color ? 'color:'+lesson.color : ''}"></i>`;

            // --- Logic hiển thị sao đã lưu (Mới) ---
            const savedStars = parseInt(localStorage.getItem(`lesson_stars_${lesson.id}`) || 0);
            let starsHTML = '';
            if (savedStars > 0) {
                starsHTML = '<div class="lesson-stars">';
                for(let i=0; i<5; i++) {
                    starsHTML += `<i class="fas fa-star" style="color: ${i < savedStars ? '#facc15' : 'rgba(255,255,255,0.1)'}; font-size: 0.8rem; margin-left: 2px;"></i>`;
                }
                starsHTML += '</div>';
            }
            
            card.innerHTML = `
                <div class="card-header">${iconHTML}${starsHTML}</div>
                <div class="lesson-info">
                    <h3>${lesson.name}</h3>
                    <p>${lesson.keys || 'Practice'}</p>
                </div>
            `;
            // Gán sự kiện click bằng JS để tránh lỗi scope
            card.addEventListener('click', () => prepareLessonStart(lesson));
            
            gridDiv.appendChild(card);
        });
        
        secDiv.appendChild(gridDiv);
        els.dashboard.appendChild(secDiv);
    });
}

// --- HÀM RENDER CUSTOM DASHBOARD (MỚI) ---
function renderCustomDashboard() {
    if (!els.customPanel) return;
    els.customPanel.innerHTML = ""; // Xóa nội dung cũ
    const t = translations[state.lang];

    const secDiv = document.createElement('div');
    secDiv.className = 'lesson-section';
    secDiv.innerHTML = `<h2 class="section-title">${t.customTitle}</h2>`;

    const gridDiv = document.createElement('div');
    gridDiv.className = 'section-grid';

    // Option 1: Paste Text (Tự nhập)
    const cardPaste = document.createElement('div');
    cardPaste.className = 'lesson-card';
    cardPaste.innerHTML = `
        <div class="card-header"><i class="fas fa-edit lesson-icon"></i></div>
        <div class="lesson-info"><h3>${t.cardPaste}</h3><p>${t.cardPasteDesc}</p></div>
    `;
    cardPaste.addEventListener('click', openCustomModal);
    gridDiv.appendChild(cardPaste);

    // Option 2: Random Quote (Ngẫu nhiên)
    const cardRandom = document.createElement('div');
    cardRandom.className = 'lesson-card';
    cardRandom.innerHTML = `
        <div class="card-header"><i class="fas fa-random lesson-icon"></i></div>
        <div class="lesson-info"><h3>${t.cardQuote}</h3><p>${t.cardQuoteDesc}</p></div>
    `;
    cardRandom.addEventListener('click', () => {
        const text = getRandomText('timetest', null, state.lang);
        startLesson({ type: 'custom', text: text, name: "Random Quote" }, 60);
    });
    gridDiv.appendChild(cardRandom);

    secDiv.appendChild(gridDiv);
    els.customPanel.appendChild(secDiv);
}

// ======================================================
// 3. MODAL LOGIC
// ======================================================

function prepareLessonStart(lesson) {
    if (lesson.type === 'timetest') {
        startLesson(lesson, lesson.duration);
    } else {
        state.pendingLesson = lesson;
        openTimeModal();
    }
}

function openTimeModal() {
    if(els.timeModal) {
        els.timeModal.classList.add('active');
        if(els.timeInput) {
            els.timeInput.value = "00:00";
            setTimeout(() => els.timeInput.focus(), 100);
        }
    }
}

function openCustomModal() {
    if(els.customModal) {
        els.customModal.classList.add('active');
        const txtInput = document.getElementById('customTextInput');
        if(txtInput) txtInput.focus();
    }
}

function closeModal() {
    if(els.timeModal) els.timeModal.classList.remove('active');
    if(els.customModal) els.customModal.classList.remove('active');
    state.pendingLesson = null;
}

function confirmStartGame() {
    let seconds = 30;
    if(els.timeInput) {
        const timeStr = els.timeInput.value.trim();
        if (timeStr.includes(':')) {
            let parts = timeStr.split(':');
            let m = parseInt(parts[0]) || 0;
            let s = parseInt(parts[1]) || 0;
            seconds = (m * 60) + s;
        } else {
            if (timeStr === "") seconds = 0; // Chế độ Vô tận
            else seconds = parseInt(timeStr) || 30;
        }
    }

    const customTextRaw = document.getElementById('customTextInput')?.value;
    
    if (state.currentMode === 'custom' && customTextRaw) {
        startLesson({ type: 'custom', text: customTextRaw }, seconds);
    } else if (state.pendingLesson) {
        startLesson(state.pendingLesson, seconds);
    }
    closeModal();
}

function applyCustomText() {
    if(els.customModal) els.customModal.classList.remove('active');
    openTimeModal();
}

function setPresetTime(timeStr) {
    if(els.timeInput) els.timeInput.value = timeStr;
    // Highlight button visual
    document.querySelectorAll('.quick-btn').forEach(b => b.classList.remove('active'));
    // Do event.target có thể là window, cần kiểm tra
    if(window.event && window.event.target) window.event.target.classList.add('active');
}

// ======================================================
// 4. GAME ENGINE (LÕI XỬ LÝ)
// ======================================================

function startLesson(lesson, duration) {
    state.activeLesson = lesson;
    hideAllPanels();
    
    if(els.selectionBar) els.selectionBar.style.display = 'none';
    if(els.gameArea) els.gameArea.style.display = 'block';
    if(els.gameStats) els.gameStats.style.display = 'flex';
    if(els.navControls) els.navControls.style.display = 'flex';
    
    clearInterval(state.timer);
    state.maxTime = (duration === undefined || duration === null) ? 60 : duration;
    state.timeLeft = state.maxTime;
    state.charIndex = 0;
    state.mistakes = 0;
    state.totalTyped = 0;
    state.totalErrors = 0;
    state.startTime = null;
    state.isTyping = false;
    if(els.input) els.input.value = "";
    
    let text = "";
    if (lesson.type === 'custom') text = lesson.text;
    else if (lesson.text) text = lesson.text;
    else text = getRandomText(lesson.type, lesson.subtype, state.lang);

    renderText(text);
    initKeyboard(); // Khởi tạo bàn phím
    updateKeyboardHints(text[0]); // Highlight ký tự đầu tiên
    updateTimeDisplay(state.timeLeft); // Cập nhật hiển thị giờ ngay lập tức
    updateStatsUI();
    
    setTimeout(() => { 
        if(els.input) { els.input.focus(); els.input.click(); }
    }, 100);
}

function renderText(text) {
    if(!els.display) return;
    els.display.innerHTML = "";
    state.charSpans = [];

    text.split("").forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        els.display.appendChild(span);
        state.charSpans.push(span);
    });

    if (state.charSpans.length > 0) state.charSpans[0].classList.add("active");
}

function handleTyping(e) {
    if (state.charIndex >= state.charSpans.length || (state.maxTime > 0 && state.timeLeft <= 0)) return;

    if (!state.isTyping) {
        state.startTime = Date.now();
        state.timer = setInterval(runTimer, 1000);
        state.isTyping = true;
        if(els.focusOverlay) els.focusOverlay.classList.add('hidden');
    }

    const inputChars = els.input.value.split("");
    const typedChar = inputChars[state.charIndex];
    const currSpan = state.charSpans[state.charIndex];

    if (typedChar == null) {
        // Backspace
        if (state.charIndex > 0) {
            state.charIndex--;
            const prevSpan = state.charSpans[state.charIndex];
            if (prevSpan.classList.contains("incorrect")) state.mistakes--;
            prevSpan.classList.remove("correct", "incorrect", "active");
            prevSpan.classList.add("active");
        }
    } else {
        // Typing logic
        state.totalTyped++;
        if (currSpan.innerText === typedChar) {
            currSpan.classList.add("correct");
        } else {
            state.mistakes++;
            state.totalErrors++;
            currSpan.classList.add("incorrect");
        }
        
        currSpan.classList.remove("active");
        state.charIndex++;
        
        if (state.charIndex < state.charSpans.length) {
            const nextSpan = state.charSpans[state.charIndex];
            nextSpan.classList.add("active");
            
            // Auto Scroll
            if (nextSpan.offsetTop > els.display.clientHeight + els.display.scrollTop - 50) {
                els.display.scrollTop = nextSpan.offsetTop - 50;
            }
            updateKeyboardHints(state.charSpans[state.charIndex].innerText);
        } else {
            finishGame();
        }
    }
    updateStatsUI();
}

function runTimer() {
    if (state.maxTime === 0) {
        state.timeLeft++;
        updateTimeDisplay(state.timeLeft);
    } else {
        if (state.timeLeft > 0) {
            state.timeLeft--;
            updateTimeDisplay(state.timeLeft);
        } else {
            finishGame();
        }
    }
    updateStatsUI();
}

function updateTimeDisplay(val) {
    const m = Math.floor(val / 60);
    const s = val % 60;
    if(els.time) els.time.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
}

function updateStatsUI() {
    if (!state.startTime) {
        if(els.wpm) els.wpm.innerText = 0;
        if(els.acc) els.acc.innerText = "100%";
        return;
    }
    
    const timePassed = (Date.now() - state.startTime) / 1000;
    const minutes = timePassed / 60;
    
    // WPM = (Correct Chars / 5) / Minutes
    const netChars = Math.max(0, state.charIndex - state.mistakes);
    const wpm = Math.round((netChars / 5) / (minutes < 0.001 ? 0.001 : minutes));
    
    // Accuracy = (TotalTyped - TotalErrors) / TotalTyped
    const acc = state.totalTyped > 0 
        ? Math.round(((state.totalTyped - state.totalErrors) / state.totalTyped) * 100) 
        : 100;
    
    if(els.wpm) els.wpm.innerText = wpm;
    if(els.acc) els.acc.innerText = acc + "%";
}

function finishGame() {
    updateStatsUI();
    clearInterval(state.timer);
    state.isTyping = false;
    if(els.input) els.input.value = "";
    
    if(els.finalWpm) els.finalWpm.innerText = els.wpm?.innerText || 0;
    if(els.finalAcc) els.finalAcc.innerText = els.acc?.innerText || "100%";

    // --- Logic hiển thị sao (20% = 1 sao) ---
    const accVal = parseInt(els.acc?.innerText) || 0;
    const starCount = Math.floor(accVal / 20);
    
    // --- Lưu kỷ lục sao vào LocalStorage (Mới) ---
    if (state.activeLesson && state.activeLesson.id) {
        const key = `lesson_stars_${state.activeLesson.id}`;
        const currentBest = parseInt(localStorage.getItem(key) || 0);
        // Chỉ lưu nếu kết quả mới tốt hơn kết quả cũ
        if (starCount > currentBest) localStorage.setItem(key, starCount);
    }

    // --- STREAK LOGIC (NEW) ---
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem('lastPracticeDate');
    let streak = parseInt(localStorage.getItem('userStreak') || 0);

    if (lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastDate === yesterday.toDateString()) {
            streak++;
        } else {
            streak = 1; // Reset if missed a day
        }
        localStorage.setItem('lastPracticeDate', today);
        localStorage.setItem('userStreak', streak);
    } else if (streak === 0) {
        streak = 1;
        localStorage.setItem('lastPracticeDate', today);
        localStorage.setItem('userStreak', streak);
    }

    // Display Streak in Result
    let streakDiv = document.getElementById('resStreak');
    if (!streakDiv && els.resultOverlay) {
        const statsDiv = els.resultOverlay.querySelector('.result-stats');
        if (statsDiv) {
            streakDiv = document.createElement('div');
            streakDiv.className = 'res-item';
            streakDiv.id = 'resStreak';
            streakDiv.innerHTML = `<div class="big-num" style="color:#facc15">${streak}</div><span>Streak</span>`;
            statsDiv.appendChild(streakDiv);
        }
    } else if (streakDiv) {
        streakDiv.querySelector('.big-num').innerText = streak;
    }

    let starContainer = document.getElementById('resultStars');
    // Nếu chưa có container sao thì tạo mới và chèn vào result-card
    if (!starContainer && els.resultOverlay) {
        const card = els.resultOverlay.querySelector('.result-card');
        if (card) {
            starContainer = document.createElement('div');
            starContainer.id = 'resultStars';
            const statsDiv = card.querySelector('.result-stats');
            if (statsDiv) card.insertBefore(starContainer, statsDiv);
        }
    }

    if (starContainer) {
        starContainer.innerHTML = Array(5).fill(0).map((_, i) => 
            `<i class="fas fa-star ${i < starCount ? 'active' : ''}" style="animation-delay: ${i * 0.1}s"></i>`
        ).join('');
    }
    
    if(els.resultOverlay) els.resultOverlay.classList.add('active');
}

function restartCurrent() {
    if (state.activeLesson) {
        startLesson(state.activeLesson, state.maxTime);
        if(els.resultOverlay) els.resultOverlay.classList.remove('active');
    } else {
        goToMenu();
    }
}

function loadNewText() {
    if(els.resultOverlay) els.resultOverlay.classList.remove('active');
    if (state.currentMode === 'custom') openCustomModal();
    else if (state.activeLesson) startLesson(state.activeLesson, state.maxTime);
    else goToMenu();
}

// ======================================================
// 5. INITIALIZATION & EXPORT WINDOW
// ======================================================

// Gán hàm ra Window để file HTML gọi được onclick="..."
window.switchMode = switchMode;
window.goToMenu = goToMenu;
window.openCustomModal = openCustomModal;
window.closeModal = closeModal;
window.confirmStartGame = confirmStartGame;
window.applyCustomText = applyCustomText;
window.setPresetTime = setPresetTime;
window.restartCurrent = restartCurrent;
window.loadNewText = loadNewText;
window.nextAction = loadNewText;

document.addEventListener('DOMContentLoaded', () => {
    // Sự kiện Gõ phím
    if(els.input) els.input.addEventListener('input', handleTyping);

    // Xử lý nhập liệu Time (Auto jump :)
    if(els.timeInput) {
        els.timeInput.addEventListener('input', (e) => {
            let val = e.target.value;
            val = val.replace(/[^0-9:]/g, ''); // Chỉ giữ số và dấu :
            val = val.replace(/:+/g, ':'); // Ngăn nhập nhiều dấu :
            
            // Tự động thêm : sau 2 số (nếu không phải đang xóa)
            if (e.inputType !== 'deleteContentBackward' && e.inputType !== 'deleteContentForward') {
                if (/^\d{2}$/.test(val)) val = val + ':';
            }
            
            if (val.length > 5) val = val.substring(0, 5); // Giới hạn MM:SS
            if (val !== e.target.value) e.target.value = val;
        });
        els.timeInput.addEventListener('focus', (e) => e.target.select());
    }
    
    // Sự kiện Focus
    if(els.typingWrapper) els.typingWrapper.addEventListener('click', () => els.input.focus());
    if(els.focusOverlay) els.focusOverlay.addEventListener('click', (e) => {
        e.stopPropagation(); // Ngăn click lan ra ngoài
        els.input.focus();
        els.focusOverlay.classList.add('hidden');
    });

    // Khi mất focus thì hiện lại overlay
    if(els.input) {
        els.input.addEventListener('blur', () => {
            if(els.gameArea.style.display !== 'none' && 
               els.resultOverlay.classList.contains('active') === false) {
                 if(els.focusOverlay) els.focusOverlay.classList.remove('hidden');
            }
        });
    }

    // Chạy mặc định
    switchMode('beginner'); 
    
    initStars(); // Tạo hiệu ứng sao
    renderNavbar(); // Sử dụng hàm chuẩn từ component
    applyGlobalLanguage(state.lang);
});

// ======================================================
// 6. KEYBOARD & HANDS VISUALIZATION (MỚI)
// ======================================================

const keyboardLayout = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
    ['Space']
];

// Mapping ký tự sang ngón tay (1-4: Trái, 5: Cái, 6-9: Phải)
// 1: Út, 2: Áp út, 3: Giữa, 4: Trỏ
const fingerMap = {
    '1':1, 'q':1, 'a':1, 'z':1, '`':1, 'Tab':1, 'Caps':1, 'Shift':1,
    '2':2, 'w':2, 's':2, 'x':2,
    '3':3, 'e':3, 'd':3, 'c':3,
    '4':4, 'r':4, 'f':4, 'v':4, '5':4, 't':4, 'g':4, 'b':4,
    ' ':5, // Space (Ngón cái)
    '6':6, 'y':6, 'h':6, 'n':6, '7':6, 'u':6, 'j':6, 'm':6,
    '8':7, 'i':7, 'k':7, ',':7,
    '9':8, 'o':8, 'l':8, '.':8,
    '0':9, 'p':9, ';':9, '/':9, '-':9, '=':9, '[':9, ']':9, "'":9, '\\':9, 'Enter':9, 'Backspace':9
};

function initKeyboard() {
    // Tìm hoặc tạo container cho bàn phím
    let kbContainer = document.querySelector('.keyboard-container');
    if (!kbContainer) {
        kbContainer = document.createElement('div');
        kbContainer.className = 'keyboard-container';
        // Chèn vào sau gameArea
        if(els.gameArea) els.gameArea.appendChild(kbContainer);
    }
    kbContainer.innerHTML = ''; // Reset

    // 1. Render Phím
    keyboardLayout.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'keyboard-row';
        row.forEach(key => {
            const keyDiv = document.createElement('div');
            keyDiv.className = `key ${key.toLowerCase()}`;
            keyDiv.innerText = key === 'Space' ? '' : key;
            keyDiv.dataset.key = key.toLowerCase();
            
            // Gán màu ngón tay
            const f = fingerMap[key.toLowerCase()] || fingerMap[key] || 9;
            keyDiv.dataset.finger = f;
            
            rowDiv.appendChild(keyDiv);
        });
        kbContainer.appendChild(rowDiv);
    });

    // 2. Render Bàn tay (Hands)
    const handsDiv = document.createElement('div');
    handsDiv.className = 'hands-wrapper';
    
    // Tay trái
    const leftHand = document.createElement('div');
    leftHand.className = 'hand left';
    [1, 2, 3, 4, 5].forEach(i => {
        const f = document.createElement('div');
        f.className = `finger ${getFingerName(i)}`;
        f.dataset.fingerId = i;
        leftHand.appendChild(f);
    });

    // Tay phải
    const rightHand = document.createElement('div');
    rightHand.className = 'hand right';
    [5, 6, 7, 8, 9].forEach(i => { // 5 là ngón cái dùng chung hoặc riêng
        const f = document.createElement('div');
        f.className = `finger ${getFingerName(i)}`;
        f.dataset.fingerId = i;
        rightHand.appendChild(f);
    });

    handsDiv.appendChild(leftHand);
    handsDiv.appendChild(rightHand);
    kbContainer.appendChild(handsDiv);
}

function getFingerName(id) {
    if(id===1 || id===9) return 'pinky';
    if(id===2 || id===8) return 'ring';
    if(id===3 || id===7) return 'middle';
    if(id===4 || id===6) return 'index';
    return 'thumb';
}

function updateKeyboardHints(char) {
    if (!char) return;
    const lowerChar = char.toLowerCase();
    
    // Reset active
    document.querySelectorAll('.key.active, .finger.active').forEach(el => el.classList.remove('active'));

    // Highlight Key
    const keyEl = document.querySelector(`.key[data-key="${lowerChar}"]`) 
               || document.querySelector(`.key[data-key="${char}"]`); // Fallback
    
    if (keyEl) {
        keyEl.classList.add('active');
        const fingerId = keyEl.dataset.finger;
        
        // Highlight Finger
        if (fingerId) {
            document.querySelectorAll(`.finger[data-finger-id="${fingerId}"]`).forEach(f => f.classList.add('active'));
        }

        // Highlight Shift nếu là chữ hoa hoặc ký tự đặc biệt
        if (char !== lowerChar || "!@#$%^&*()_+{}|:\"<>?~".includes(char)) {
            const shiftKey = document.querySelector('.key.shift');
            if(shiftKey) shiftKey.classList.add('active');
            // Highlight ngón út trái hoặc phải cho Shift (mặc định trái cho đơn giản)
            const shiftFinger = document.querySelector('.finger[data-finger-id="1"]');
            if(shiftFinger) shiftFinger.classList.add('active');
        }
    } else if (char === ' ') {
        const spaceKey = document.querySelector('.key.space');
        if(spaceKey) spaceKey.classList.add('active');
        // Highlight ngón cái (cả 2 hoặc 1)
        document.querySelectorAll('.finger.thumb').forEach(f => f.classList.add('active'));
    }
}

// ======================================================
// 7. BACKGROUND EFFECTS & LANGUAGE (MỚI)
// ======================================================

function initStars() {
    // Kiểm tra setting từ localStorage
    const isEffectsOn = localStorage.getItem('bgEffects') !== 'off';
    if (!isEffectsOn) return;

    let container = document.getElementById('starsContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'starsContainer';
        container.className = 'stars'; // Class từ style.css
        document.body.prepend(container);
    }

    container.innerHTML = '';
    const starCount = 400;
    for(let i=0; i<starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const s = Math.random() * 2 + 1;
        star.style.width = s + 'px'; star.style.height = s + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 5 + 's';
        star.style.opacity = Math.random() * 0.7 + 0.3;
        container.appendChild(star);
    }
}

function applyGlobalLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    // 1. Dịch Navbar (Tìm theo href hoặc class)
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if(link.href.includes('index.html')) link.innerText = t.navHome;
        if(link.href.includes('about.html')) link.innerText = t.navAbout;
        if(link.href.includes('tips.html')) link.innerText = t.navTips;
        if(link.href.includes('FAQ.html')) link.innerText = t.navFAQ;
        if(link.href.includes('typing.html')) link.innerText = t.navTyping;
    });

    // 2. Dịch Tabs
    const tabs = document.querySelectorAll('.tab-btn');
    if(tabs.length >= 5) {
        tabs[0].innerText = t.tabBeginner;
        tabs[1].innerText = t.tabCode;
        tabs[2].innerText = t.tabTest;
        tabs[3].innerText = t.tabMinigame;
        tabs[4].innerText = t.tabCustom;
    }

    // 3. Dịch Stats Labels
    const statLabels = document.querySelectorAll('.stat-label');
    statLabels.forEach(lbl => {
        if(lbl.innerText.includes('WPM') || lbl.innerText.includes('Tốc độ')) lbl.innerText = t.statWPM;
        if(lbl.innerText.includes('Accuracy') || lbl.innerText.includes('Chính xác')) lbl.innerText = t.statAcc;
        if(lbl.innerText.includes('Time') || lbl.innerText.includes('Thời gian')) lbl.innerText = t.statTime;
    });

    // 4. Dịch Modal
    const modalTitle = document.querySelector('.modal-content h3');
    if(modalTitle) modalTitle.innerText = t.modalTimeTitle;
    
    const btnStart = document.querySelector('.modal-btns .cta-button');
    if(btnStart) btnStart.innerText = t.btnStart;
    
    const btnCancel = document.querySelector('.modal-btns .btn-secondary');
    if(btnCancel) btnCancel.innerText = t.btnCancel;

    const customInput = document.getElementById('customTextInput');
    if(customInput) customInput.placeholder = t.placeholderCustom;
}
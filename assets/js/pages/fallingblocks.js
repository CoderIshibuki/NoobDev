/* --- LƯU TẠI: assets/js/pages/fallingblocks.js --- */

import { saveGameScore, renderLeaderboardUI } from '../firebase/db.js';

const WORDS = {
    en: ["Python", "Java", "HTML", "CSS", "React", "NodeJS", "SQL", "Docker", "Git", "Windows", "Linux", "Apple", "Google", "Amazon", "Tesla", "CPU", "GPU", "RAM", "SSD", "USB", "WIFI", "VPN", "API", "JSON", "XML", "PDF", "Code", "Bug", "Dev", "Web", "App", "AI"],
    vi: ["PhanMem", "PhanCung", "MayTinh", "DienThoai", "BanPhim", "Chuot", "ManHinh", "TaiNghe", "Loa", "Wifi", "3G", "4G", "5G", "Pin", "Sac", "Code", "Bug", "Web", "App", "Game", "Tien", "Vang", "Bac", "Sach", "Vo", "But"]
};

let gameState = 'menu', level = 1, score = 0, lives = 3;
let spawnInterval, activeBlocks = [], currentTargetId = null;
let gameCurrentLang = localStorage.getItem('language') || 'en';

// ... (các biến global) ...

document.addEventListener('DOMContentLoaded', () => {
    initStars();
    setupLeaderboard();
});

window.startGame = function(selectedLevel) {
    console.log("Start Falling Blocks: " + selectedLevel);

    level = selectedLevel; 
    score = 0; 
    lives = 3; 
    streak = 0; 
    maxStreak = 0;
    activeBlocks = []; 
    currentTargetId = null;
    
    // Reset Game Area
    const area = document.getElementById('gameArea');
    if(area) area.innerHTML = '<div class="laser-line"></div>'; 
    
    updateHUD();
    
    document.getElementById('menuScreen').classList.add('hidden');
    document.getElementById('gameOverScreen').classList.add('hidden');
    document.getElementById('playingScreen').classList.remove('hidden');
    
    gameState = 'playing';
    const rate = (level===1)? 2200 : ((level===2)? 1800 : 1400);
    
    if(spawnInterval) clearInterval(spawnInterval);
    spawnInterval = setInterval(spawnBlock, rate);
    
    window.removeEventListener('keydown', handleInput); // Xóa sự kiện cũ tránh trùng
    window.addEventListener('keydown', handleInput);
};
// ...

window.stopGame = function() {
    gameState = 'menu'; clearInterval(spawnInterval);
    window.removeEventListener('keydown', handleInput);
    
    const blocks = document.querySelectorAll('.block');
    blocks.forEach(b => b.remove());
    
    document.getElementById('playingScreen').classList.add('hidden');
    document.getElementById('menuScreen').classList.remove('hidden');
    
    location.reload(); // Reload để cập nhật Best Score mới
};

window.returnToMenu = function() {
    location.reload(); 
};

window.resetGame = function() { window.startGame(level); };

function spawnBlock() {
    if (gameState !== 'playing') return;
    const wordList = WORDS[gameCurrentLang] || WORDS.en;
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    const duration = (level===1)? 8000 : ((level===2)? 6000 : 4000);
    
    const blockEl = document.createElement('div');
    blockEl.className = 'block';
    blockEl.innerHTML = word.split('').map(c => `<span>${c}</span>`).join('');
    
    blockEl.style.left = (Math.random() * 70 + 10) + '%';
    blockEl.style.animationDuration = `${duration}ms`;
    
    const id = Date.now() + Math.random();
    blockEl.dataset.id = id;
    
    activeBlocks.push({ id, word, progress: 0, element: blockEl });
    document.getElementById('gameArea').appendChild(blockEl);
    
    blockEl.addEventListener('animationend', () => handleMiss(id));
}

function handleInput(e) {
    if (gameState !== 'playing') return;
    const key = e.key;
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(key)) return;

    if (currentTargetId === null) {
        const targets = activeBlocks.filter(b => b.word[0] === key);
        if (targets.length > 0) {
            currentTargetId = targets[0].id;
            processCorrectKey(targets[0]);
        }
    } else {
        const target = activeBlocks.find(b => b.id === currentTargetId);
        if (target) {
            if (key === target.word[target.progress]) processCorrectKey(target);
            else triggerDamage();
        } else {
            currentTargetId = null;
        }
    }
}

function processCorrectKey(block) {
    block.progress++;
    const letters = block.element.querySelectorAll('span');
    if(letters[block.progress-1]) letters[block.progress-1].classList.add('typed');
    block.element.classList.add('active-target');

    if (block.progress >= block.word.length) {
        block.element.remove();
        activeBlocks = activeBlocks.filter(b => b.id !== block.id);
        currentTargetId = null;
        score += 10 * block.word.length; 
        updateHUD();
    }
}

function handleMiss(id) {
    const idx = activeBlocks.findIndex(b => b.id == id);
    if (idx !== -1) {
        activeBlocks[idx].element.remove();
        activeBlocks.splice(idx, 1);
        if (currentTargetId === id) currentTargetId = null;
        triggerDamage();
    }
}

function triggerDamage() {
    lives--; updateHUD();
    
    // Hiệu ứng đỏ màn hình
    const screen = document.getElementById('gameArea'); // Sửa lại target vào gameArea để không bị lỗi GUI
    if(screen) {
        screen.style.boxShadow = "inset 0 0 50px rgba(239, 68, 68, 0.8)";
        setTimeout(() => screen.style.boxShadow = "none", 200);
    }

    if (lives <= 0) endGame();
}

function endGame() {
    gameState = 'gameover'; 
    clearInterval(spawnInterval);
    window.removeEventListener('keydown', handleInput);
    
    activeBlocks.forEach(b => b.element.remove());
    
    document.getElementById('playingScreen').classList.add('hidden');
    document.getElementById('gameOverScreen').classList.remove('hidden');
    document.getElementById('finalScore').innerText = score;
    console.log("Saving score to Firebase...");
    saveGameScore('falling', score); // Gọi hàm từ db.js
}

function updateHUD() {
    document.getElementById('scoreDisplay').innerText = score;
    const livesContainer = document.getElementById('livesDisplay');
    livesContainer.innerHTML = '';
    for(let i=0; i<3; i++) {
        livesContainer.innerHTML += `<i class="fas fa-heart ${i<lives?'heart-filled':'heart-empty'}"></i>`;
    }
}

// --- NEW FEATURES ---
function initStars() {
    const isEffectsOn = localStorage.getItem('bgEffects') !== 'off';
    if (!isEffectsOn) return;

    let container = document.getElementById('starsContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'starsContainer';
        container.className = 'stars';
        document.body.prepend(container);
    }
    container.innerHTML = '';
    for(let i=0; i<200; i++) {
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

function setupLeaderboard() {
    const wrapper = document.querySelector('.game-wrapper');
    if (!wrapper) return;

    // Tạo panel leaderboard
    const lbPanel = document.createElement('div');
    lbPanel.className = 'leaderboard-panel';
    lbPanel.innerHTML = `
        <h3><i class="fas fa-history"></i> Your Scores</h3>
        <div id="fallingLeaderboard" class="lb-list">
            <div class="loading">Đang tải...</div>
        </div>
    `;
    wrapper.appendChild(lbPanel);

    renderLeaderboardUI('falling', 'fallingLeaderboard');
}
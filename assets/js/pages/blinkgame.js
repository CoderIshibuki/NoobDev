/* --- LƯU TẠI: assets/js/pages/blinkgame.js --- */

import { saveGameScore } from '../firebase/db.js';

const WORDS = {
    en: ["Python", "Java", "HTML", "CSS", "React", "NodeJS", "SQL", "Docker", "Git", "Windows", "Linux", "Apple", "Google", "Amazon", "Tesla", "CPU", "GPU", "RAM", "SSD", "USB", "WIFI", "VPN", "API", "JSON", "XML", "PDF", "Code", "Bug", "Dev", "Web", "App", "AI"],
    vi: ["PhanMem", "PhanCung", "MayTinh", "DienThoai", "BanPhim", "Chuot", "ManHinh", "TaiNghe", "Loa", "Wifi", "3G", "4G", "5G", "Pin", "Sac", "Code", "Bug", "Web", "App", "Game", "Tien", "Vang", "Bac", "Sach", "Vo", "But"]
};

// ĐÃ XÓA BIẾN STREAK
let level=1, lives=3, score=0, currentWord='', typedIndex=0, isWaiting=false, timerRef=null;
let gameCurrentLang = localStorage.getItem('language') || 'en';

window.startGame = function(lvl) {
    if(timerRef) clearTimeout(timerRef);
    level = lvl; lives = 3; score = 0;
    
    document.getElementById('levelScreen').classList.add('hidden');
    document.getElementById('gameOverScreen').classList.add('hidden');
    document.getElementById('playingScreen').classList.remove('hidden');
    
    updateHUD(); 
    renderLives();
    
    const wc = document.getElementById('wordContainer');
    wc.innerHTML = "";
    wc.classList.add('hidden');
    
    document.getElementById('readyText').classList.remove('hidden');
    document.getElementById('feedbackDisplay').classList.add('hidden');
    
    setTimeout(generateRandomWord, 1000);
};

window.returnToMenu = function() {
    if(timerRef) clearTimeout(timerRef);
    
    document.getElementById('playingScreen').classList.add('hidden');
    document.getElementById('gameOverScreen').classList.add('hidden');
    document.getElementById('levelScreen').classList.remove('hidden');
    
    // Cập nhật lại điểm Best Score ở Menu (nếu vừa đạt kỷ lục mới)
    const menuScore = document.querySelector('#levelScreen .fa-crown').parentNode;
    if(menuScore) {
        // Logic đơn giản: Reload trang để PHP lấy điểm mới nhất từ DB
        // Hoặc update text thủ công nếu muốn mượt hơn
        location.reload(); 
    }
};

window.resetGame = function() { window.startGame(level); };

function generateRandomWord() {
    if (document.getElementById('playingScreen').classList.contains('hidden')) return;
    
    const gameArea = document.getElementById('gameArea');
    const wc = document.getElementById('wordContainer');
    const feedback = document.getElementById('feedbackDisplay');
    
    document.getElementById('readyText').classList.add('hidden');
    feedback.classList.add('hidden');
    
    const wordList = WORDS[gameCurrentLang] || WORDS.en;
    currentWord = wordList[Math.floor(Math.random() * wordList.length)];
    typedIndex = 0;
    
    wc.innerHTML = currentWord.split('').map(char => `<span>${char}</span>`).join('');
    wc.style.opacity = '0';
    wc.classList.remove('hidden', 'correct-anim');
    
    // Tính toán vị trí an toàn
    requestAnimationFrame(() => {
        const wordW = wc.offsetWidth;
        const wordH = wc.offsetHeight;
        const areaW = gameArea.offsetWidth;
        const areaH = gameArea.offsetHeight;

        const minX = 30;
        const maxX = areaW - wordW - 30;
        const minY = 30; 
        const maxY = areaH - wordH - 30;

        let randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        let randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
        
        if(randomX < 0) randomX = 10;
        if(randomY < 20) randomY = 20;

        wc.style.left = `${randomX}px`;
        wc.style.top = `${randomY}px`;
        wc.style.transform = 'none'; 
        wc.style.opacity = '1';
    });
    
    isWaiting = true;
    let time = (level === 1) ? 5000 : ((level === 2) ? 3000 : 2000);
    timerRef = setTimeout(handleTimeout, time);
}

window.addEventListener('keydown', e => {
    if(!isWaiting) return;
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(e.key)) return;
    
    if(e.key === currentWord[typedIndex]) {
        document.getElementById('wordContainer').children[typedIndex].classList.add('typed');
        typedIndex++;
        if(typedIndex === currentWord.length) {
            // Cộng điểm: Bỏ phần cộng streak
            score += (level * 10) + (currentWord.length * 5);
            updateHUD();
            showFeedback('Awesome!', 'success');
            document.getElementById('wordContainer').classList.add('correct-anim');
            isWaiting = false; 
            if(timerRef) clearTimeout(timerRef);
            setTimeout(generateRandomWord, 400);
        }
    } else {
        handleDamage();
    }
});

function handleTimeout() {
    showFeedback('Missed!', 'timeout');
    handleDamage();
}

function handleDamage() {
    if(timerRef) clearTimeout(timerRef);
    lives--; renderLives();
    
    const screen = document.getElementById('playingScreen');
    screen.style.boxShadow = "inset 0 0 50px rgba(239, 68, 68, 0.5)";
    setTimeout(() => screen.style.boxShadow = "none", 200);

    if(lives > 0) {
        isWaiting = false;
        setTimeout(generateRandomWord, 1000);
    } else {
        endGame();
    }
}

function endGame() {
    isWaiting = false;
    document.getElementById('playingScreen').classList.add('hidden');
    document.getElementById('gameOverScreen').classList.remove('hidden');
    
    document.getElementById('finalScore').innerText = score;
    
    // 2. XÓA FETCH PHP CŨ & THAY BẰNG CODE MỚI
    console.log("Saving blink score...");
    saveGameScore('blink', score); 
}

function renderLives() {
    const c = document.getElementById('livesContainer');
    if(c) { 
        c.innerHTML = ''; 
        for(let i=0; i<3; i++) c.innerHTML += `<i class="fas fa-heart ${i<lives?'heart-filled':'heart-empty'}"></i>`; 
    }
}

function updateHUD() {
    document.getElementById('scoreDisplay').innerText = score;
}

function showFeedback(msg, type) {
    const fb = document.getElementById('feedbackDisplay');
    fb.innerText = msg; fb.className = `feedback ${type}`; 
    fb.classList.remove('hidden');
    setTimeout(() => fb.classList.add('hidden'), 500); 
}
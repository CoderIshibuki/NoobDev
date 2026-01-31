/* assets/js/pages/scramble.js */
import { renderNavbar } from '../components/navbar.js';

const WORDS = [
    "PYTHON", "JAVASCRIPT", "HTML", "CSS", "REACT", "ANGULAR", "VUE", "NODE", "DATABASE", "SERVER",
    "BROWSER", "INTERNET", "CODING", "ALGORITHM", "VARIABLE", "FUNCTION", "OBJECT", "ARRAY", "STRING",
    "BOOLEAN", "INTEGER", "FLOAT", "DOUBLE", "CHAR", "CLASS", "INTERFACE", "MODULE", "PACKAGE", "IMPORT"
];

let score = 0;
let timeLeft = 60;
let currentWord = "";
let timerInterval;

document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    const input = document.getElementById('gameInput');
    if(input) {
        input.addEventListener('input', checkInput);
        input.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') checkInput();
        });
    }
});

window.startGame = function() {
    score = 0;
    timeLeft = 60;
    
    document.getElementById('menuScreen').classList.add('hidden');
    document.getElementById('gameOverScreen').classList.add('hidden');
    document.getElementById('playingScreen').classList.remove('hidden');
    
    updateHUD();
    nextWord();
    
    document.getElementById('gameInput').value = "";
    document.getElementById('gameInput').focus();
    
    if(timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(gameLoop, 1000);
};

function gameLoop() {
    timeLeft--;
    updateHUD();
    if(timeLeft <= 0) {
        endGame();
    }
}

function nextWord() {
    currentWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    const scrambled = scramble(currentWord);
    document.getElementById('scrambledWord').innerText = scrambled;
}

function scramble(word) {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Ensure it's not the same as original
    const res = arr.join('');
    return res === word ? scramble(word) : res;
}

function checkInput() {
    const input = document.getElementById('gameInput');
    const val = input.value.toUpperCase().trim();
    const feedback = document.getElementById('feedback');
    
    if (val === currentWord) {
        score += 10 + Math.floor(timeLeft / 5); // Bonus for speed
        feedback.innerText = "Correct!";
        feedback.className = "feedback correct";
        input.value = "";
        
        // Animation effect
        input.style.borderColor = "#4ade80";
        setTimeout(() => input.style.borderColor = "rgba(255,255,255,0.1)", 200);
        
        nextWord();
        updateHUD();
    } else if (val.length >= currentWord.length) {
        feedback.innerText = "Try Again";
        feedback.className = "feedback wrong";
        input.style.borderColor = "#f87171";
    } else {
        feedback.innerText = "";
    }
}

function updateHUD() {
    document.getElementById('scoreDisplay').innerText = score;
    document.getElementById('timeDisplay').innerText = timeLeft;
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById('playingScreen').classList.add('hidden');
    document.getElementById('gameOverScreen').classList.remove('hidden');
    document.getElementById('finalScore').innerText = score;
}
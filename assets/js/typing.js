const paragraphs = [
    "The quick brown fox jumps over the lazy dog.",
    "Coding is not just about writing syntax, it is about solving problems.",
    "Practice makes perfect. The more you type, the faster you get.",
    "Lập trình viên giỏi không phải là người gõ nhanh nhất, mà là người tư duy tốt nhất.",
    "NoobDev là nơi khởi đầu tuyệt vời cho hành trình công nghệ của bạn."
];

const typingText = document.querySelector(".typing-text");
const timeTag = document.querySelector("#timeLeft");
const wpmTag = document.querySelector("#wpm");
const accuracyTag = document.querySelector("#accuracy");
const keys = document.querySelectorAll(".key");

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = 0,
    mistakes = 0,
    isTyping = 0;

function loadParagraph() {
    const randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`;
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    
    // Focus vào document để gõ luôn không cần click
    document.addEventListener("keydown", () => typingText.focus());
    typingText.addEventListener("click", () => typingText.focus());
}

function initTyping(e) {
    const characters = typingText.querySelectorAll("span");
    let typedChar = e.key;

    // Hiệu ứng phím ảo (Visual Keyboard)
    highlightKey(typedChar);

    if (charIndex < characters.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (typedChar === "Backspace") { // Xử lý xóa
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else if (typedChar.length === 1) { // Chỉ nhận ký tự thường (bỏ qua Shift, CapsLock...)
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        
        // Cập nhật con trỏ active
        characters.forEach(span => span.classList.remove("active"));
        if (charIndex < characters.length) characters[charIndex].classList.add("active");

        // Tính toán stats
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        let accuracy = Math.floor(((charIndex - mistakes) / charIndex) * 100);
        accuracy = accuracy ? accuracy : 100;

        wpmTag.innerText = wpm;
        accuracyTag.innerText = `${accuracy}%`;

        // Nếu gõ hết đoạn văn -> Tự động load đoạn mới hoặc kết thúc
        if(charIndex === characters.length) {
            clearInterval(timer);
            saveScore(wpm, accuracy);
            alert(`Hoàn thành! WPM: ${wpm}, Chính xác: ${accuracy}%`);
            resetGame();
        }
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = `${timeLeft}s`;
    } else {
        clearInterval(timer);
        // Hết giờ -> Lưu điểm
        let wpm = wpmTag.innerText;
        let accuracy = accuracyTag.innerText;
        saveScore(wpm, accuracy);
        alert("Hết giờ! Điểm của bạn đã được lưu.");
        resetGame();
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = `${timeLeft}s`;
    wpmTag.innerText = 0;
    accuracyTag.innerText = "100%";
}

// Hàm hiệu ứng bàn phím
function highlightKey(key) {
    let keyElement;
    // Xử lý các phím đặc biệt để map với data-key trong HTML
    if (key === " ") key = " "; 
    
    // Tìm phím trên bàn phím ảo
    keys.forEach(k => {
        if (k.dataset.key.toLowerCase() === key.toLowerCase()) {
            keyElement = k;
        }
    });

    if (keyElement) {
        keyElement.classList.add("active");
        setTimeout(() => {
            keyElement.classList.remove("active");
        }, 100);
    }
}

// --- Leaderboard Logic (Lưu LocalStorage) ---
function saveScore(wpm, acc) {
    const today = new Date().toLocaleDateString('vi-VN');
    // Lấy tên user từ thẻ HTML (PHP đã render) hoặc mặc định
    const username = document.querySelector('.user-name')?.innerText || "User";
    
    const score = { name: username, wpm: wpm, acc: acc, date: today };
    
    let scores = JSON.parse(localStorage.getItem('noobdev_typing_scores') || '[]');
    scores.push(score);
    scores.sort((a, b) => b.wpm - a.wpm); // Sắp xếp giảm dần theo WPM
    scores = scores.slice(0, 10); // Chỉ giữ Top 10
    
    localStorage.setItem('noobdev_typing_scores', JSON.stringify(scores));
    renderLeaderboard();
}

function renderLeaderboard() {
    const list = document.getElementById('leaderboardList');
    let scores = JSON.parse(localStorage.getItem('noobdev_typing_scores') || '[]');
    
    list.innerHTML = "";
    if (scores.length === 0) {
        list.innerHTML = '<p class="no-data" style="text-align:center; opacity:0.6;">Chưa có dữ liệu</p>';
        return;
    }

    scores.forEach((s, index) => {
        let div = document.createElement('div');
        div.className = 'score-item';
        div.innerHTML = `
            <div><strong>#${index + 1} ${s.name}</strong> <span style="font-size:11px; opacity:0.7">(${s.date})</span></div>
            <div>${s.wpm} WPM</div>
        `;
        list.appendChild(div);
    });
}

function clearLeaderboard() {
    if(confirm("Bạn có chắc muốn xóa lịch sử đấu?")) {
        localStorage.removeItem('noobdev_typing_scores');
        renderLeaderboard();
    }
}

// Khởi chạy khi trang load
loadParagraph();
renderLeaderboard();
document.addEventListener("keydown", initTyping);
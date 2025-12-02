const paragraphs = [
            "The quick brown fox jumps over the lazy dog.",
            "Technology is best when it brings people together.",
            "Success is not final, failure is not fatal.",
            "In the middle of difficulty lies opportunity."
        ];

        const beginnerLessons = [
            { id: 1, text: "fjfj fjfj fff jjj fjf jfj" },
            { id: 2, text: "dkdk dkdk ddd kkk dkd kdk" },
            { id: 3, text: "slsl slsl sss lll sls lsl" },
            { id: 4, text: "a;a; a;a; aaa ;;; a;a ;a;" },
            { id: 5, text: "asdf jkl; asdf jkl;" },
            { id: 6, text: "hello world hello world" },
            { id: 7, text: "typing is fun typing is fun" },
            { id: 8, text: "keep practicing keep practicing" }
        ];

        const translations = {
            en: {
                navHome: "Home", navLanguage: "Language", 
                tabBeginner: "Beginner", tabMaster: "Master",
                labelType: "Type:", labelTime: "Time:", btnCustom: "Custom Text",
                statTime: "Time Left", statWPM: "WPM", statAcc: "Accuracy",
                msgComplete: "Test Complete!", btnRestart: "Try Again",
                hintFocus: "Click on the text box to start typing",
                modalTitle: "Enter Custom Text",
                level: "Level"
            },
            vi: {
                navHome: "Trang chủ", navLanguage: "Ngôn ngữ",
                tabBeginner: "Cơ bản", tabMaster: "Nâng cao",
                labelType: "Loại:", labelTime: "Thời gian:", btnCustom: "Tự nhập text",
                statTime: "Thời gian", statWPM: "Tốc độ (từ/phút)", statAcc: "Độ chính xác",
                msgComplete: "Hoàn thành!", btnRestart: "Thử lại",
                hintFocus: "Nhấn vào khung để bắt đầu gõ",
                modalTitle: "Nhập văn bản của bạn",
                level: "Cấp độ"
            }
        };

        let currentMode = 'beginner'; 
        let timer = null;
        let maxTime = 60;
        let timeLeft = maxTime;
        let charIndex = 0;
        let mistakes = 0;
        let isTyping = false;
        let currentText = "";
        let currentLang = localStorage.getItem('language') || 'en';

        const display = document.getElementById('quoteDisplay');
        const inputField = document.getElementById('inputField');
        const timeTag = document.getElementById('timeLeft');
        const wpmTag = document.getElementById('wpm');
        const accTag = document.getElementById('accuracy');
        const resultOverlay = document.getElementById('resultOverlay');
        const levelsGrid = document.getElementById('levelsGrid');
        const visualAids = document.getElementById('visualAids');

        document.addEventListener('DOMContentLoaded', () => {
            generateStars();
            initTranslation();
            initBeginnerGrid();
            
            setTimeout(() => {
                resetGame();
            }, 100);

            document.querySelector('.typing-box').addEventListener('click', () => inputField.focus());
            inputField.addEventListener('input', initTyping);
            
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                });
            });

            document.getElementById('timeLimit').addEventListener('change', resetGame);
            document.getElementById('textType').addEventListener('change', resetGame);
            
            document.getElementById('customBtn').addEventListener('click', () => {
                document.getElementById('customModal').classList.add('active');
            });
        });

        function switchMode(mode) {
            currentMode = mode;
            document.getElementById('beginner-panel').style.display = mode === 'beginner' ? 'block' : 'none';
            document.getElementById('master-panel').style.display = mode === 'master' ? 'block' : 'none';
            
            if(mode === 'beginner') {
                visualAids.style.display = 'flex';
                // Trigger highlight for first char
                setTimeout(() => {
                    if(currentText.length > 0) highlightCurrentKey(currentText[charIndex]);
                }, 50);
            } else {
                visualAids.style.display = 'none';
            }
            
            resetGame();
        }

        function loadParagraph() {
            if (currentMode === 'beginner') {
                if(!currentText) loadLevel(1); 
                return; 
            }

            const type = document.getElementById('textType').value;
            maxTime = parseInt(document.getElementById('timeLimit').value);
            
            if (type === 'sentences') {
                const randIndex = Math.floor(Math.random() * paragraphs.length);
                currentText = paragraphs[randIndex];
            } else if (type === 'numbers') {
                currentText = Array(50).fill(0).map(() => Math.floor(Math.random() * 100)).join(' ');
            } else if (type === 'special') {
                const chars = '!@#$%^&*()_+{}|:"<>?-=[]\';/.,';
                currentText = Array(40).fill(0).map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join(' ');
            }

            renderText();
        }

        function loadLevel(id) {
            const lesson = beginnerLessons.find(l => l.id === id);
            currentText = lesson ? lesson.text : "Error loading lesson";
            
            document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
            const btn = document.querySelector(`.level-btn[data-id="${id}"]`);
            if(btn) btn.classList.add('active');

            maxTime = 300; 
            renderText();
        }

        function renderText() {
            display.innerHTML = "";
            currentText.split("").forEach(char => {
                let span = `<span class="char">${char}</span>`;
                display.innerHTML += span;
            });
            const firstChar = display.querySelectorAll(".char")[0];
            if(firstChar) firstChar.classList.add("active");
            
            timeLeft = maxTime;
            timeTag.innerText = timeLeft;
            wpmTag.innerText = 0;
            accTag.innerText = 100;

            if(currentMode === 'beginner') highlightCurrentKey(currentText[0]);
        }

        function initTyping() {
            const characters = display.querySelectorAll(".char");
            let currentInputLength = inputField.value.length;
            
            if (!isTyping && currentInputLength > 0) {
                timer = setInterval(initTimer, 1000);
                isTyping = true;
            }

            // Backspace Logic
            if (currentInputLength < charIndex) {
                charIndex--; 
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--; 
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
            // Typing Logic
            else if (currentInputLength > charIndex) {
                let typedChar = inputField.value.slice(-1); 
                if (characters[charIndex].innerText === typedChar) {
                    characters[charIndex].classList.add("correct");
                } else {
                    mistakes++;
                    characters[charIndex].classList.add("incorrect");
                }
                charIndex++; 
            }

            // Cursor & Visuals
            characters.forEach(span => span.classList.remove("active"));
            
            if (charIndex < characters.length) {
                characters[charIndex].classList.add("active");
                highlightCurrentKey(characters[charIndex].innerText); // Highlight NEXT key
            } else {
                finishGame();
                clearHighlights();
            }

            if (charIndex > 0) {
                let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
                wpmTag.innerText = (wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm);
                let acc = Math.round(((charIndex - mistakes) / charIndex) * 100);
                accTag.innerText = (isNaN(acc) || acc < 0 ? 100 : acc);
            }
        }

        // --- HIGHLIGHT KEY LOGIC ---

        function highlightCurrentKey(char) {
            if(currentMode !== 'beginner') return;

            // Clear previous highlight
            clearHighlights();

            const lowerChar = char.toLowerCase();
            
            // Highlight Key on Keyboard
            const keyEl = document.querySelector(`.key[data-key="${lowerChar}"]`);
            if(keyEl) keyEl.classList.add('active-key');

            // Handle Shift for Uppercase or Symbols
            if (char !== lowerChar || "!@#$%^&*()_+{}|:\"<>?".includes(char)) {
                // Highlight both shifts for visibility
                const shiftL = document.getElementById('key-shift-l');
                const shiftR = document.getElementById('key-shift-r');
                if(shiftL) shiftL.classList.add('active-key');
                if(shiftR) shiftR.classList.add('active-key');
            }
        }

        function clearHighlights() {
            document.querySelectorAll('.active-key').forEach(el => el.classList.remove('active-key'));
        }

        function initTimer() {
            if (timeLeft > 0) {
                timeLeft--;
                timeTag.innerText = timeLeft;
                if(charIndex > 0) {
                    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
                    wpmTag.innerText = (wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm);
                }
            } else {
                finishGame();
            }
        }

        function finishGame() {
            clearInterval(timer);
            inputField.value = "";
            document.getElementById('finalWpm').innerText = wpmTag.innerText;
            document.getElementById('finalAcc').innerText = accTag.innerText + "%";
            resultOverlay.classList.add('active');
            clearHighlights();
        }

        function resetGame() {
            loadParagraph();
            clearInterval(timer);
            timeLeft = maxTime;
            charIndex = mistakes = 0;
            isTyping = false;
            inputField.value = ""; 
            timeTag.innerText = timeLeft;
            wpmTag.innerText = 0;
            accTag.innerText = 100;
            resultOverlay.classList.remove('active');
            inputField.focus(); 
            
            if(currentMode === 'beginner') {
                setTimeout(() => {
                    if(currentText.length > 0) highlightCurrentKey(currentText[0]);
                }, 50);
            }
        }

        function initBeginnerGrid() {
            levelsGrid.innerHTML = "";
            beginnerLessons.forEach(l => {
                const btn = document.createElement('div');
                btn.className = 'level-btn';
                btn.setAttribute('data-id', l.id);
                btn.innerHTML = `<b data-translate="level">Level</b> ${l.id}`;
                btn.onclick = () => {
                    loadLevel(l.id);
                    resetGame(); 
                };
                levelsGrid.appendChild(btn);
            });
        }

        function applyCustomText() {
            const text = document.getElementById('customTextInput').value.trim();
            if (text) {
                currentText = text;
                document.getElementById('customModal').classList.remove('active');
                resetGame();
            }
        }

        function closeModal() {
            document.getElementById('customModal').classList.remove('active');
        }

        function generateStars() {
            const container = document.getElementById('starsContainer');
            for(let i=0; i<100; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.width = Math.random() * 2 + 1 + 'px';
                star.style.height = star.style.width;
                star.style.animationDelay = Math.random() * 4 + 's';
                container.appendChild(star);
            }
        }

        function initTranslation() {
            const btn = document.getElementById('languageBtn');
            const menu = document.querySelector('.language-menu');
            btn.addEventListener('click', (e) => { e.stopPropagation(); document.querySelector('.language-dropdown').classList.toggle('active'); });
            document.addEventListener('click', () => document.querySelector('.language-dropdown').classList.remove('active'));
            
            document.querySelectorAll('.language-option').forEach(opt => {
                opt.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = opt.getAttribute('data-lang');
                    translatePage(lang);
                    localStorage.setItem('language', lang);
                });
            });

            translatePage(currentLang);
        }

        function translatePage(lang) {
            currentLang = lang;
            document.querySelectorAll('[data-translate]').forEach(el => {
                const key = el.getAttribute('data-translate');
                if(translations[lang][key]) el.innerText = translations[lang][key];
            });
            initBeginnerGrid(); 
            document.querySelectorAll('.language-option').forEach(o => o.classList.remove('active'));
            document.querySelector(`.language-option[data-lang="${lang}"]`).classList.add('active');
            
            if(currentMode === 'beginner') {
                visualAids.style.display = 'flex';
                // Trigger visual update for current char
                const chars = display.querySelectorAll('.char');
                if(chars.length > charIndex) highlightCurrentKey(chars[charIndex].innerText);
            }
        }
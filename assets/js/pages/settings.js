import { auth, db } from '../firebase/config.js';
import { updateProfile, updatePassword, onAuthStateChanged, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { translations } from '../data/translations.js';
import { renderNavbar } from '../components/navbar.js';

document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('language') || 'en';
    renderNavbar(); // Sử dụng hàm chuẩn từ component
    
    // UI Elements
    const nameInput = document.getElementById('displayNameInput');
    const photoInput = document.getElementById('photoURLInput');
    const fileInput = document.getElementById('fileInput'); 
    const currentPassInput = document.getElementById('currentPasswordInput');
    const newPassInput = document.getElementById('newPasswordInput');
    const avatarImg = document.getElementById('avatarImg');
    const emailLabel = document.getElementById('emailDisplay');
    const form = document.getElementById('settingsForm');
    const msgBox = document.getElementById('messageBox');
    const effectsToggle = document.getElementById('toggleEffects');
    const volumeSlider = document.getElementById('volumeSlider');
    const cursorStyleInput = document.getElementById('cursorStyleInput');
    const cursorColorInput = document.getElementById('cursorColorInput');
    const btnRestore = document.getElementById('btnRestore');
    const cursorPreviewBox = document.getElementById('cursorPreviewBox');
    const fontFamilyInput = document.getElementById('fontFamilyInput');
    const toggleSmoothCaret = document.getElementById('toggleSmoothCaret');
    const fontFileInput = document.getElementById('fontFileInput');

    // --- 1. HIỆU ỨNG SAO (Cập nhật giống Tips: 500 sao) ---
    function createStarsDirectly() {
        const container = document.getElementById('starsContainer');
        if(!container) return;

        container.innerHTML = ''; 
        const starCount = 200; // Số lượng sao dày đặc

        for(let i=0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 2 + 1; 
            const delay = Math.random() * 5;

            star.style.left = x + '%';
            star.style.top = y + '%';
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.animationDelay = delay + 's';
            star.style.opacity = Math.random() * 0.7 + 0.3;

            container.appendChild(star);
        }
    }

    // Xử lý bật/tắt hiệu ứng
    const isEffectsOn = localStorage.getItem('bgEffects') !== 'off';
    if (effectsToggle) {
        effectsToggle.checked = isEffectsOn;
        if(isEffectsOn) createStarsDirectly(); // Chạy hàm tạo 500 sao
        
        effectsToggle.addEventListener('change', (e) => {
            const status = e.target.checked ? 'on' : 'off';
            localStorage.setItem('bgEffects', status);
            if(status === 'on') createStarsDirectly();
            else {
                const container = document.getElementById('starsContainer');
                if(container) container.innerHTML = ''; 
            }
        });
    }

    // --- 2. XỬ LÝ UPLOAD ẢNH ---
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (!file.type.match('image.*')) {
                alert("Chỉ được upload file ảnh!");
                return;
            }
            if (file.size > 1024 * 500) { 
                alert("Ảnh quá lớn! Vui lòng chọn ảnh dưới 500KB.");
                return;
            }

            const reader = new FileReader();
            reader.onload = function(evt) {
                const base64Str = evt.target.result;
                avatarImg.src = base64Str;
                photoInput.value = base64Str; 
            };
            reader.readAsDataURL(file);
        });
    }

    if (photoInput) {
        photoInput.addEventListener('input', () => {
            const url = photoInput.value.trim();
            if(url) avatarImg.src = url;
        });
    }
    
    if (avatarImg) {
        avatarImg.onerror = function() { this.src = "https://ui-avatars.com/api/?name=User&background=1e293b&color=fff"; };
    }

    // --- 3. VOLUME ---
    if (volumeSlider) {
        volumeSlider.value = localStorage.getItem('gameVolume') || 80;
        volumeSlider.addEventListener('input', (e) => {
            localStorage.setItem('gameVolume', e.target.value);
        });
    }

    // --- HELPER: UPDATE PREVIEW ---
    function updateCursorPreview() {
        if (!cursorPreviewBox) return;
        const style = localStorage.getItem('cursorStyle') || 'underscore';
        const color = localStorage.getItem('cursorColor') || '#38bdf8';
        const font = localStorage.getItem('typingFont') || "'Courier New', Courier, monospace";
        
        // Update Style Class
        cursorPreviewBox.className = `cursor-preview-box cursor-${style}`;
        // Update Color Variable
        cursorPreviewBox.style.setProperty('--cursor-color', color);
        cursorPreviewBox.style.fontFamily = font;

        // Update Smooth Caret Preview
        const isSmooth = localStorage.getItem('smoothCaret') === 'true';
        cursorPreviewBox.classList.toggle('smooth-mode', isSmooth);
    }

    // --- 3.1 CURSOR SETTINGS (MỚI) ---
    if (cursorStyleInput) {
        cursorStyleInput.value = localStorage.getItem('cursorStyle') || 'underscore';
        cursorStyleInput.addEventListener('change', (e) => {
            localStorage.setItem('cursorStyle', e.target.value);
            updateCursorPreview();
        });
    }

    if (cursorColorInput) {
        const savedColor = localStorage.getItem('cursorColor') || '#38bdf8';
        cursorColorInput.value = savedColor;
        // Hiệu ứng visual ban đầu
        cursorColorInput.style.borderColor = savedColor;
        cursorColorInput.style.boxShadow = `0 0 15px ${savedColor}40`; // 40 = độ trong suốt thấp

        cursorColorInput.addEventListener('input', (e) => {
            const color = e.target.value;
            localStorage.setItem('cursorColor', color);
            // Cập nhật visual ngay lập tức
            cursorColorInput.style.borderColor = color;
            cursorColorInput.style.boxShadow = `0 0 20px ${color}60`;
            updateCursorPreview();
        });
    }

    if (fontFamilyInput) {
        fontFamilyInput.value = localStorage.getItem('typingFont') || "'Courier New', Courier, monospace";
        fontFamilyInput.addEventListener('change', (e) => {
            localStorage.setItem('typingFont', e.target.value);
            updateCursorPreview();
        });
    }

    // --- 3.3 SMOOTH CARET ---
    if (toggleSmoothCaret) {
        toggleSmoothCaret.checked = localStorage.getItem('smoothCaret') === 'true';
        toggleSmoothCaret.addEventListener('change', (e) => {
            localStorage.setItem('smoothCaret', e.target.checked);
            updateCursorPreview();
        });
    }

    // --- 3.4 CUSTOM FONT UPLOAD ---
    if (fontFileInput) {
        fontFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async function(evt) {
                try {
                    const fontData = evt.target.result;
                    // Load font vào document
                    const font = new FontFace('CustomFont', `url(${fontData})`);
                    await font.load();
                    document.fonts.add(font);

                    // Lưu vào localStorage
                    localStorage.setItem('customFontData', fontData);
                    localStorage.setItem('typingFont', 'CustomFont');
                    
                    // Cập nhật UI
                    if(fontFamilyInput) fontFamilyInput.value = 'CustomFont'; // Cần thêm option này vào select nếu chưa có
                    // Cập nhật tên file hiển thị
                    document.getElementById('fontFileName').innerText = file.name;
                    alert("Custom font loaded successfully!");
                    updateCursorPreview();
                } catch (err) {
                    alert("Error loading font. File might be too large for storage.");
                }
            };
            reader.readAsDataURL(file);
        });
    }
    
    // Init Preview on Load
    updateCursorPreview();

    // --- 3.2 RESTORE DEFAULTS (MỚI) ---
    if (btnRestore) {
        btnRestore.addEventListener('click', () => {
            if(confirm("Are you sure you want to reset all settings to default?")) {
                // Reset LocalStorage
                localStorage.setItem('gameVolume', '80');
                localStorage.setItem('bgEffects', 'on');
                localStorage.setItem('cursorStyle', 'underscore');
                localStorage.setItem('cursorColor', '#38bdf8');
                localStorage.setItem('typingFont', "'Courier New', Courier, monospace");
                localStorage.setItem('smoothCaret', 'false');
                
                // Update UI
                if(volumeSlider) volumeSlider.value = 80;
                if(effectsToggle) {
                    effectsToggle.checked = true;
                    createStarsDirectly();
                }
                if(cursorStyleInput) cursorStyleInput.value = 'underscore';
                if(cursorColorInput) cursorColorInput.value = '#38bdf8';
                if(fontFamilyInput) fontFamilyInput.value = "'Courier New', Courier, monospace";
                if(toggleSmoothCaret) toggleSmoothCaret.checked = false;
                updateCursorPreview();
                
                // Show message
                msgBox.style.display = 'block';
                msgBox.className = 'msg success';
                msgBox.innerText = "Settings restored to defaults!";
                setTimeout(() => msgBox.style.display = 'none', 2000);
            }
        });
    }

    // --- 4. LOAD DATA ---
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if(nameInput) nameInput.value = user.displayName || "";
            if(emailLabel) emailLabel.innerText = user.email || "";
            const currentPhoto = user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=random`;
            if(photoInput) photoInput.value = user.photoURL || ""; 
            if(avatarImg) avatarImg.src = currentPhoto;
        } else {
            window.location.href = "/login.html";
        }
    });
    
    // --- 6. APPLY LANGUAGE ---
    applySettingsLanguage(lang);

    // --- 5. SAVE ---
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const user = auth.currentUser;
            const newName = nameInput.value.trim();
            const newPhoto = photoInput.value.trim();
            const currentPass = currentPassInput.value;
            const newPass = newPassInput.value;
            
            msgBox.style.display = 'block';
            msgBox.className = 'msg'; 
            msgBox.innerText = "Saving changes...";

            try {
                const promises = [];
                // Update Info
                if ((newName && newName !== user.displayName) || (newPhoto !== user.photoURL)) {
                    promises.push(updateProfile(user, { displayName: newName, photoURL: newPhoto }));
                    const userRef = doc(db, "users", user.uid);
                    promises.push(updateDoc(userRef, { name: newName, photoURL: newPhoto }).catch(console.error));
                }
                
                // Update Password
                if (newPass) {
                    if (!currentPass) throw new Error("Current password is required to set a new one.");
                    const credential = EmailAuthProvider.credential(user.email, currentPass);
                    await reauthenticateWithCredential(user, credential);
                    promises.push(updatePassword(user, newPass));
                }

                if (promises.length === 0) { 
                    msgBox.innerText = "Preferences saved locally!";
                    setTimeout(() => msgBox.style.display = 'none', 1500);
                    return; 
                }

                await Promise.all(promises);
                msgBox.className = 'msg success';
                msgBox.innerHTML = '<i class="fas fa-check-circle"></i> Settings Updated!';
                
                currentPassInput.value = ""; newPassInput.value = "";
                setTimeout(() => window.location.reload(), 1500);

            } catch (error) {
                console.error(error);
                msgBox.className = 'msg error';
                if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                    msgBox.innerText = "Incorrect Current Password!";
                } else if (error.code === 'auth/invalid-photo-url') {
                    msgBox.innerText = "Invalid Image URL or Image too large!";
                } else {
                    msgBox.innerText = error.message;
                }
            }
        });
    }
});

function applySettingsLanguage(lang) {
    const t = translations[lang];
    if (!t) return;
    
    const title = document.querySelector('.settings-container h2');
    if(title) title.innerText = t.settingsTitle;
    
    const labels = document.querySelectorAll('label');
    labels.forEach(l => {
        if(l.innerText.includes('Display Name')) l.innerText = t.lblDisplayName;
        if(l.innerText.includes('Avatar URL')) l.innerText = t.lblPhotoUrl;
        if(l.innerText.includes('Game Volume')) l.innerText = t.lblVolume;
        if(l.innerText.includes('Background Effects')) l.innerText = t.lblEffects;
        if(l.id === 'lblCursorStyle') l.innerText = t.lblCursorStyle;
        if(l.id === 'lblCursorColor') l.innerText = t.lblCursorColor;
        if(l.id === 'lblFontFamily') l.innerText = t.lblFontFamily;
        if(l.id === 'lblSmoothCaret') l.innerText = t.lblSmoothCaret;
        if(l.id === 'lblCustomFont') l.innerText = t.lblCustomFont;
        if(document.getElementById('fontFileName')) document.getElementById('fontFileName').innerText = t.btnUploadFont;
    });
    
    const btn = document.querySelector('.save-btn');
    if(btn) btn.innerText = t.btnSave;

    const restoreBtn = document.getElementById('btnRestore');
    if(restoreBtn) restoreBtn.innerText = t.btnRestore;
}
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

    // --- 1. HIỆU ỨNG SAO (Cập nhật giống Tips: 500 sao) ---
    function createStarsDirectly() {
        const container = document.getElementById('starsContainer');
        if(!container) return;

        container.innerHTML = ''; 
        const starCount = 500; // Số lượng sao dày đặc

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
    });
    
    const btn = document.querySelector('.save-btn');
    if(btn) btn.innerText = t.btnSave;
}
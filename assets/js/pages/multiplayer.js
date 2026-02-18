import { auth, db } from '../firebase/config.js'; // Import db (Firestore)
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set, onValue, update, push, child, get, remove, onDisconnect, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { doc, getDoc, updateDoc, arrayUnion, collection, query, where, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { translations } from '../data/translations.js';
import { renderNavbar } from '../components/navbar.js';
import { requireAuth } from '../auth-guard.js';
import { getRandomText } from '../data/typing-data.js';
import { saveGameScore } from '../firebase/db.js';

// Bảo vệ trang
requireAuth();

const rtdb = getDatabase();

const state = {
    mpRoomId: null,
    mpPlayerId: null,
    mpPlayersData: {},
    mpChartData: {},
    hostId: null, // Lưu ID chủ phòng
    isUserReady: false, // Trạng thái sẵn sàng của bản thân
    
    // Game State
    isTyping: false,
    text: "",
    charIndex: 0,
    mistakes: 0,
    timeLeft: 0,
    maxTime: 0,
    timer: null,
    charSpans: [],
    lang: localStorage.getItem('language') || 'en',
    soundEnabled: localStorage.getItem('typingSound') === 'true',
    zenMode: false,
    smoothCaret: localStorage.getItem('smoothCaret') === 'true',
    heatmap: {}, 
    heatmapEnabled: false,
    typingTimeout: null // Dùng cho chat typing indicator
};

const els = {
    lobby: document.getElementById('lobbySection'),
    game: document.getElementById('gameSection'),
    input: document.getElementById('inputField'),
    display: document.getElementById('quoteDisplay'),
    wpm: document.getElementById('wpm'),
    time: document.getElementById('timeLeft'),
    acc: document.getElementById('accuracy'),
    wrapper: document.getElementById('typingWrapper'),
    overlay: document.getElementById('focusOverlay'),
    navControls: document.querySelector('.nav-controls'),
    resultOverlay: document.getElementById('resultOverlay'),
    finalWpm: document.getElementById('finalWpm'),
    finalAcc: document.getElementById('finalAcc')
};

document.addEventListener('DOMContentLoaded', () => {
    initStars();
    renderNavbar();
    renderLobby();
    applyGlobalLanguage(state.lang);
    
    // Event Listeners cho Game
    if(els.input) els.input.addEventListener('input', handleTyping);
    if(els.wrapper) els.wrapper.addEventListener('click', () => els.input.focus());
    if(els.overlay) els.overlay.addEventListener('click', () => {
        els.input.focus();
        els.overlay.classList.add('hidden');
    });
    if(els.input) els.input.addEventListener('blur', () => {
        if(els.game.style.display !== 'none') els.overlay.classList.remove('hidden');
    });

    // Setup Controls
    setupControls();

    // Kiểm tra URL xem có phải link mời không
    checkInviteLink();
});

function setupControls() {
    const btnSound = document.getElementById('btnSound');
    if(btnSound) {
        btnSound.onclick = toggleSound;
    }

    // Thêm nút Zen và Heatmap vào nav-controls nếu chưa có
    if (els.navControls) {
        const zenBtn = document.createElement('button');
        zenBtn.id = 'btnZen';
        zenBtn.className = 'nav-control-btn';
        zenBtn.innerHTML = '<i class="fas fa-compress-arrows-alt"></i> Zen Mode';
        zenBtn.onclick = toggleZenMode;

        const heatBtn = document.createElement('button');
        heatBtn.id = 'btnHeatmap';
        heatBtn.className = 'nav-control-btn';
        heatBtn.onclick = toggleHeatmap;

        els.navControls.insertBefore(heatBtn, els.navControls.firstChild);
        els.navControls.insertBefore(zenBtn, els.navControls.firstChild);
    }
    updateControlButtons();
}

function checkInviteLink() {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('room');
    if (roomId) {
        // Tự động vào phòng nếu có ID trên URL
        // Cần đợi Auth load xong, nên logic này sẽ được gọi lại trong onAuthStateChanged hoặc xử lý ở joinRoom
        // Tuy nhiên, để đơn giản, ta gán vào input và đợi người dùng bấm hoặc tự kích hoạt sau
        const roomInput = document.getElementById('roomInput');
        if(roomInput) roomInput.value = roomId;
        
        // Nếu đã đăng nhập, tự động join (cần check auth state)
        onAuthStateChanged(auth, (user) => {
            if(user && roomId) joinRoom(roomId);
        });
    }
}

// --- LOBBY LOGIC ---

function renderLobby() {
    const t = translations[state.lang] || translations['en'];
    els.lobby.innerHTML = `
        <div class="lobby-left" id="mpLobbyControls">
            <h2 class="section-title"><i class="fas fa-users"></i> ${t.tabMultiplayer}</h2>
            <div style="display:flex; flex-direction:column; gap:15px; width:100%; align-items:center;">
                
                <div class="lobby-actions" style="gap: 20px; width: 100%;">
                    <button class="cta-button btn-quick" id="btnQuickMatch" style="flex:1;">${t.btnQuickMatch}</button>
                    <button class="cta-button btn-ranked" id="btnRanked" style="flex:1;"><i class="fas fa-trophy"></i> ${t.btnRanked}</button>
                </div>

                <div style="color: #94a3b8; margin: 5px 0;">- OR -</div>

                <div class="lobby-actions">
                    <button class="btn-secondary" id="btnCreateRoom" style="margin-right: 10px;">${t.btnCreateRoom}</button>
                    <input type="text" id="roomInput" class="room-input" placeholder="${t.placeholderRoomID}">
                    <button class="btn-secondary" id="btnJoinRoom">${t.btnJoinRoom}</button>
                </div>
            </div>
        </div>

        <div id="mpRoomInfo" style="display:none; width:100%; display:flex; gap:20px; flex-wrap: wrap;">
            <div class="lobby-left" style="min-width: 300px;">
                <div style="display:flex; align-items:center; margin-bottom: 10px; flex-direction: column;">
                    <h3>${t.lblRoomID}: <span id="roomIdDisplay" style="color:#38bdf8"></span></h3>
                    <button class="btn-invite" id="btnInvite" title="${t.btnInvite}"><i class="fas fa-link"></i> ${t.btnInvite}</button>
                    <div id="roomModeBadge" style="margin-top: 5px; font-size: 0.9rem; padding: 2px 8px; border-radius: 4px; background: rgba(255,255,255,0.1);"></div>
                </div>
                
                <!-- Player List -->
                <h4 style="margin-top: 15px; font-size: 0.9rem; color: #94a3b8;">${t.lblPlayers || 'PLAYERS'}</h4>
                <div class="player-list" id="playerList" style="width:100%;"></div>
                
                <!-- Friends Section (Mockup) -->
                <div class="friends-panel">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h4 style="font-size: 0.9rem; color: #94a3b8;">${t.lblFriends || 'FRIENDS'}</h4>
                        <span id="myShortId" style="font-size: 0.8rem; color: #38bdf8; font-weight:bold;">ID: ...</span>
                    </div>
                    
                    <div class="add-friend-box">
                        <input type="text" id="friendIdInput" placeholder="${t.placeholderFriendID || 'Enter ID'}" class="friend-input">
                        <button id="btnAddFriend" class="btn-icon small" style="background:rgba(56,189,248,0.2); color:#38bdf8;"><i class="fas fa-plus"></i></button>
                    </div>

                    <div class="friends-list" id="friendsList">
                        <!-- Friends will be populated here -->
                    </div>
                </div>

                <div class="lobby-controls" style="margin-top: 20px; display: flex; gap: 10px;">
                    <button class="cta-button" id="btnReady" style="flex: 1; background: #64748b;">${t.btnReady || 'Ready'}</button>
                    <button class="cta-button" id="btnStartMatch" style="flex: 1; display:none;">${t.btnStartMatch}</button>
                </div>
                <p id="waitingMsg" style="margin-top:10px; color:#94a3b8;">${t.lblWaiting}</p>
            </div>
            <div class="lobby-right" style="min-width: 300px;">
                <h3>${t.lblChat}</h3>
                <div class="chat-box">
                    <div class="chat-messages" id="chatMessages"></div>
                    <div class="chat-input-area">
                        <input type="text" id="chatInput" class="chat-input" placeholder="${t.placeholderChat}">
                        <button id="btnSendChat" class="btn-send">${t.btnSend}</button>
                    </div>
                    <div id="typingIndicator" class="typing-indicator"></div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('btnCreateRoom').onclick = () => createRoom('normal');
    document.getElementById('btnQuickMatch').onclick = () => findMatch('normal');
    document.getElementById('btnRanked').onclick = () => findMatch('ranked');
    document.getElementById('btnJoinRoom').onclick = () => {
        const rid = document.getElementById('roomInput').value.trim();
        if(rid) joinRoom(rid);
    };
    document.getElementById('btnStartMatch').onclick = startMultiplayerGame;
    document.getElementById('btnReady').onclick = toggleReady;
    document.getElementById('btnAddFriend').onclick = addFriend;
    
    // Chat Events
    document.getElementById('btnSendChat').onclick = sendChat;
    document.getElementById('chatInput').addEventListener('keypress', (e) => { if(e.key === 'Enter') sendChat(); });
    
    // Typing Indicator Event
    document.getElementById('chatInput').addEventListener('input', handleChatTyping);
    document.getElementById('btnInvite').onclick = copyInviteLink;

    // Load User Profile & Friends
    loadUserProfile();
}


function copyInviteLink() {
    if (!state.mpRoomId) return;
    const inviteUrl = `${window.location.origin}${window.location.pathname}?room=${state.mpRoomId}`;
    navigator.clipboard.writeText(inviteUrl).then(() => {
        const t = translations[state.lang] || translations['en'];
        // Dùng hàm showToast có sẵn hoặc alert tạm
        const toastContainer = document.getElementById('toast-container');
        if(toastContainer) showToast(t.msgLinkCopied, 'success'); // Giả sử hàm showToast global hoặc import
        else alert(t.msgLinkCopied);
    });
}

async function findMatch(mode) {
    const user = auth.currentUser;
    if(!user) return alert("Please login first!");

    const t = translations[state.lang] || translations['en'];
    const btnId = mode === 'ranked' ? 'btnRanked' : 'btnQuickMatch';
    const btn = document.getElementById(btnId);
    const originalText = btn.innerHTML;
    
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${t.lblSearching}`;
    btn.disabled = true;

    try {
        // Lấy danh sách phòng (Trong thực tế nên dùng query orderByChild để tối ưu)
        const roomsRef = ref(rtdb, 'rooms');
        const snapshot = await get(roomsRef);
        const rooms = snapshot.val() || {};
        
        let foundRoomId = null;

        // Tìm phòng phù hợp: status='waiting', mode khớp, < 5 người
        for (const [id, room] of Object.entries(rooms)) {
            if (room.status === 'waiting' && room.mode === mode) {
                const playerCount = room.players ? Object.keys(room.players).length : 0;
                if (playerCount < 5) {
                    foundRoomId = id;
                    break;
                }
            }
        }

        if (foundRoomId) joinRoom(foundRoomId);
        else createRoom(mode);

    } catch (e) {
        console.error(e);
        alert("Error finding match");
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

function createRoom(mode = 'normal') {
    const user = auth.currentUser;
    if(!user) return;

    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    state.mpRoomId = roomId;
    state.mpPlayerId = user.uid;

    const roomRef = ref(rtdb, `rooms/${roomId}`);
    set(roomRef, {
        host: user.uid,
        status: 'waiting',
        mode: mode, // Lưu chế độ chơi
        text: getRandomText('timetest', null, state.lang)
    });

    joinRoom(roomId);
}

async function joinRoom(roomId) {
    const user = auth.currentUser;
    if(!user) return;
    
    state.mpRoomId = roomId;
    state.mpPlayerId = user.uid;
    state.isUserReady = false;
    updateReadyButtonUI();

    // 1. Kiểm tra số lượng người chơi (Max 5)
    const playersRef = ref(rtdb, `rooms/${roomId}/players`);
    const snapshot = await get(playersRef);
    const currentPlayers = snapshot.val() || {};
    if (Object.keys(currentPlayers).length >= 5) {
        const t = translations[state.lang] || translations['en'];
        alert(t.msgRoomFull || "Room is full!");
        return;
    }

    const playerRef = ref(rtdb, `rooms/${roomId}/players/${user.uid}`);
    set(playerRef, {
        name: user.displayName || 'Guest',
        photoURL: user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'Guest'}&background=random`,
        progress: 0,
        isReady: false, // Mặc định chưa sẵn sàng
        wpm: 0
    });
    onDisconnect(playerRef).remove();

    // UI Update
    document.getElementById('mpLobbyControls').style.display = 'none';
    document.getElementById('mpRoomInfo').style.display = 'flex';
    document.getElementById('roomIdDisplay').innerText = roomId;

    // Hiển thị chế độ phòng
    get(child(ref(rtdb), `rooms/${roomId}/mode`)).then((snap) => {
        const mode = snap.val() || 'normal';
        const badge = document.getElementById('roomModeBadge');
        const t = translations[state.lang] || translations['en'];
        const modeName = mode === 'ranked' ? (t.modeRanked || 'Ranked') : (t.modeNormal || 'Normal');
        badge.innerText = modeName;
        badge.style.color = mode === 'ranked' ? '#facc15' : '#38bdf8';
        badge.style.border = `1px solid ${mode === 'ranked' ? '#facc15' : '#38bdf8'}`;
    });

    // Lấy Host ID để xác định quyền Kick
    get(child(ref(rtdb), `rooms/${roomId}/host`)).then((snap) => {
        state.hostId = snap.val();
        if(state.hostId === user.uid) {
            document.getElementById('btnStartMatch').style.display = 'inline-block';
            document.getElementById('waitingMsg').style.display = 'none';
        }
    });

    // Listeners
    onValue(ref(rtdb, `rooms/${roomId}/players`), (snapshot) => {
        const players = snapshot.val() || {};
        
        // Kiểm tra nếu mình bị Kick (Không còn trong danh sách players nhưng state vẫn còn roomId)
        if (state.mpRoomId && !players[state.mpPlayerId]) {
            const t = translations[state.lang] || translations['en'];
            alert(t.msgKicked || "You have been kicked!");
            location.reload(); // Reload để reset
            return;
        }

        state.mpPlayersData = players;
        renderPlayerList(players);
    });

    onChildAdded(ref(rtdb, `rooms/${roomId}/chat`), (snapshot) => {
        const msg = snapshot.val();
        appendChatMessage(msg.user, msg.text);
    });
    
    setupTypingListener(roomId);

    onValue(ref(rtdb, `rooms/${roomId}/status`), (snapshot) => {
        if(snapshot.val() === 'playing') {
            get(child(ref(rtdb), `rooms/${roomId}/text`)).then((snap) => {
                startGame(snap.val());
            });
        }
    });
}

function renderPlayerList(players) {
    const list = document.getElementById('playerList');
    const currentUid = auth.currentUser?.uid;
    const isHost = state.hostId === currentUid;
    const t = translations[state.lang] || translations['en'];
    const readyText = t.btnReady || "Ready";
    const notReadyText = t.btnNotReady || "Not Ready";

    const playerArray = Object.entries(players);
    let html = '';

    // Render 5 Slots
    for (let i = 0; i < 5; i++) {
        if (i < playerArray.length) {
            const [uid, p] = playerArray[i];
            const isPlayerHost = state.hostId === uid;
            
            html += `
            <div class="player-card filled ${isPlayerHost ? 'host' : ''}">
                ${isHost && uid !== currentUid ? `<button class="kick-btn" onclick="kickPlayer('${uid}')"><i class="fas fa-times"></i></button>` : ''}
                <img src="${p.photoURL}" class="avatar" alt="Avatar">
                <div class="name">${p.name}</div>
                <div class="stats">${p.wpm || 0} WPM</div>
                
                <div class="card-status ${p.isReady ? 'ready' : 'not-ready'}">
                    ${p.isReady ? '<i class="fas fa-check"></i> Ready' : 'Waiting'}
                </div>
            </div>`;
        } else {
            html += `
            <div class="player-card empty">
                <i class="fas fa-plus" style="font-size: 2rem; margin-bottom: 10px;"></i>
                <span>Empty Slot</span>
            </div>`;
        }
    }
    list.innerHTML = html;
}

function toggleReady() {
    if (!state.mpRoomId || !state.mpPlayerId) return;
    state.isUserReady = !state.isUserReady;
    
    update(ref(rtdb, `rooms/${state.mpRoomId}/players/${state.mpPlayerId}`), { 
        isReady: state.isUserReady 
    });
    updateReadyButtonUI();
}

function updateReadyButtonUI() {
    const btn = document.getElementById('btnReady');
    const t = translations[state.lang] || translations['en'];
    if (btn) {
        btn.innerText = state.isUserReady ? (t.btnNotReady || "Not Ready") : (t.btnReady || "Ready");
        btn.classList.toggle('is-ready', state.isUserReady);
    }
}

function startMultiplayerGame() {
    // Check if all players are ready
    const allReady = Object.values(state.mpPlayersData).every(p => p.isReady);
    if (!allReady) {
        const t = translations[state.lang] || translations['en'];
        alert(t.msgNotAllReady || "All players must be Ready!");
        return;
    }
    update(ref(rtdb, `rooms/${state.mpRoomId}`), { status: 'playing' });
}

// Helper for private chat button
window.mentionUser = function(name) {
    const input = document.getElementById('chatInput');
    if(input) { input.value = `@${name} `; input.focus(); }
};

// Helper for Kick button
window.kickPlayer = function(uid) {
    const t = translations[state.lang] || translations['en'];
    if (!state.mpRoomId || state.hostId !== auth.currentUser?.uid) return;
    if (confirm(t.confirmKick || "Kick this player?")) {
        remove(ref(rtdb, `rooms/${state.mpRoomId}/players/${uid}`));
    }
};

function handleChatTyping() {
    if (!state.mpRoomId || !auth.currentUser) return;
    
    const typingRef = ref(rtdb, `rooms/${state.mpRoomId}/typing/${auth.currentUser.uid}`);
    
    // Set typing status
    set(typingRef, auth.currentUser.displayName || 'Guest');
    onDisconnect(typingRef).remove();

    // Clear sau 2s nếu không gõ nữa
    if (state.typingTimeout) clearTimeout(state.typingTimeout);
    state.typingTimeout = setTimeout(() => {
        remove(typingRef);
    }, 2000);
}

function setupTypingListener(roomId) {
    const typingIndicator = document.getElementById('typingIndicator');
    if (!typingIndicator) return;

    onValue(ref(rtdb, `rooms/${roomId}/typing`), (snapshot) => {
        const data = snapshot.val() || {};
        const currentUid = auth.currentUser?.uid;
        
        // Lọc bỏ bản thân
        const names = Object.keys(data)
            .filter(uid => uid !== currentUid)
            .map(uid => data[uid]);
            
        if (names.length > 0) {
            const t = translations[state.lang] || translations['en'];
            const text = names.join(', ') + ' ' + (t.lblTyping || 'is typing...');
            typingIndicator.innerText = text;
        } else {
            typingIndicator.innerText = '';
        }
    });
}

function sendChat() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    
    const text = input.value.trim();
    if(!text) return;
    
    if (!state.mpRoomId) {
        console.error("Chưa tham gia phòng nào!");
        return;
    }
    
    const user = auth.currentUser;
    if (!user) {
        alert("Bạn cần đăng nhập để chat!");
        return;
    }

    push(ref(rtdb, `rooms/${state.mpRoomId}/chat`), {
        user: user.displayName || 'Guest',
        text: text,
        timestamp: Date.now()
    }).then(() => console.log("Sent")).catch(err => console.error("Lỗi gửi tin nhắn:", err));
    
    // Xóa trạng thái typing ngay lập tức khi gửi
    if (state.typingTimeout) clearTimeout(state.typingTimeout);
    remove(ref(rtdb, `rooms/${state.mpRoomId}/typing/${user.uid}`));

    input.value = '';
    input.focus();
}

function appendChatMessage(user, text) {
    const container = document.getElementById('chatMessages');
    if(!container) return;
    
    // Tạo element an toàn để tránh lỗi XSS và hiển thị đúng
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg';
    
    const userStrong = document.createElement('strong');
    userStrong.textContent = user + ':';
    
    const textNode = document.createTextNode(' ' + text);
    
    msgDiv.appendChild(userStrong);
    msgDiv.appendChild(textNode);
    
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

// --- FRIEND SYSTEM (FIRESTORE) ---
async function loadUserProfile() {
    const user = auth.currentUser;
    if (!user) return;

    // 1. Get User Data (Short ID & Friends)
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const data = userSnap.data();
        
        // Display Short ID
        const idDisplay = document.getElementById('myShortId');
        if (idDisplay) {
            // Nếu chưa có shortId (user cũ), tạo mới và lưu lại
            if (!data.shortId) {
                const newShortId = Math.floor(10000000 + Math.random() * 90000000).toString();
                await updateDoc(userRef, { shortId: newShortId });
                idDisplay.innerText = `ID: ${newShortId}`;
            } else {
                idDisplay.innerText = `ID: ${data.shortId}`;
            }
        }

        // Render Friends
        if (data.friends && data.friends.length > 0) {
            renderFriendsList(data.friends);
        }
    }
}

async function addFriend() {
    const input = document.getElementById('friendIdInput');
    const friendId = input.value.trim();
    const t = translations[state.lang] || translations['en'];
    
    if (!friendId) return;

    // Find user by shortId
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("shortId", "==", friendId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        alert(t.msgUserNotFound || "User not found!");
        return;
    }

    const friendDoc = querySnapshot.docs[0];
    const friendData = friendDoc.data();
    const currentUserRef = doc(db, "users", auth.currentUser.uid);

    // Add to friends array
    await updateDoc(currentUserRef, {
        friends: arrayUnion({ uid: friendData.uid, name: friendData.name, photoURL: friendData.photoURL })
    });

    alert(t.msgFriendAdded || "Friend added!");
    input.value = "";
    loadUserProfile(); // Reload list
}

function renderFriendsList(friends) {
    const list = document.getElementById('friendsList');
    if (!list) return;
    list.innerHTML = friends.map(f => `
        <div class="friend-item">
            <img src="${f.photoURL || 'https://ui-avatars.com/api/?background=random'}" class="player-avatar">
            <span>${f.name}</span>
            <div class="friend-status"></div>
        </div>
    `).join('');
}

// --- GAME ENGINE ---

function startGame(text) {
    els.lobby.style.display = 'none';
    els.game.style.display = 'block';
    
    state.text = text;
    state.charIndex = 0;
    state.mistakes = 0;
    state.isTyping = false;
    state.timeLeft = 0;
    state.mpChartData = {};
    
    renderText(text);
    initKeyboard(); // Khởi tạo bàn phím
    updateKeyboardHints(text[0]);
    els.input.value = "";
    els.input.focus();
    
    // Start Timer
    state.timer = setInterval(() => {
        state.timeLeft++;
        const m = Math.floor(state.timeLeft / 60);
        const s = state.timeLeft % 60;
        els.time.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
        updateWPMChart(state.timeLeft);
    }, 1000);
}

function renderText(text) {
    els.display.innerHTML = "";
    state.charSpans = [];
    text.split("").forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        els.display.appendChild(span);
        state.charSpans.push(span);
    });
    if(state.charSpans.length > 0) {
        state.charSpans[0].classList.add("active");
        if (state.smoothCaret) updateSmoothCaret();
    }
}

function handleTyping() {
    if (!state.isTyping) {
        state.isTyping = true;
        els.overlay.classList.add('hidden');
    }

    const inputChars = els.input.value.split("");
    const typedChar = inputChars[state.charIndex];
    const currSpan = state.charSpans[state.charIndex];

    if (state.soundEnabled) playMechanicalClick();

    if (typedChar == null) {
        if (state.charIndex > 0) {
            state.charIndex--;
            const prevSpan = state.charSpans[state.charIndex];
            if (prevSpan.classList.contains("incorrect")) state.mistakes--;
            prevSpan.classList.remove("correct", "incorrect", "active");
            prevSpan.classList.add("active");
        }
    } else {
        if (currSpan.innerText === typedChar) {
            currSpan.classList.add("correct");
        } else {
            state.mistakes++;
            currSpan.classList.add("incorrect");
            // Heatmap
            const expectedChar = currSpan.innerText.toLowerCase();
            state.heatmap[expectedChar] = (state.heatmap[expectedChar] || 0) + 1;
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
            if (state.smoothCaret) updateSmoothCaret();
        } else {
            finishGame();
        }
    }
    
    updateStats();
    if (state.heatmapEnabled) updateKeyboardHeatmap();
    
    // Sync Progress
    if (state.mpRoomId) {
        const progress = Math.floor((state.charIndex / state.charSpans.length) * 100);
        const wpm = parseInt(els.wpm.innerText);
        update(ref(rtdb, `rooms/${state.mpRoomId}/players/${state.mpPlayerId}`), { progress, wpm });
    }
}

function updateStats() {
    const timePassed = state.timeLeft / 60;
    if (timePassed === 0) return;
    
    const netChars = Math.max(0, state.charIndex - state.mistakes);
    const wpm = Math.round((netChars / 5) / (timePassed < 0.001 ? 0.001 : timePassed));
    const acc = state.charIndex > 0 ? Math.round(((state.charIndex - state.mistakes) / state.charIndex) * 100) : 100;
    
    els.wpm.innerText = wpm;
    els.acc.innerText = acc + "%";
}

function finishGame() {
    clearInterval(state.timer);
    state.isTyping = false;
    if(els.input) els.input.value = "";

    // Show Result
    if(els.finalWpm) els.finalWpm.innerText = els.wpm?.innerText || 0;
    if(els.finalAcc) els.finalAcc.innerText = els.acc?.innerText || "100%";
    if(els.resultOverlay) els.resultOverlay.classList.add('active');

    // Save Score
    const wpmVal = parseInt(els.wpm?.innerText || 0);
    const accVal = parseInt(els.acc?.innerText || 0);
    saveGameScore('multiplayer', wpmVal, accVal);
}

// --- CHART ---
function updateWPMChart(timePoint) {
    const canvas = document.getElementById('mpChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    Object.keys(state.mpPlayersData).forEach(uid => {
        if (!state.mpChartData[uid]) state.mpChartData[uid] = [];
        const p = state.mpPlayersData[uid];
        state.mpChartData[uid].push({ x: timePoint, y: p.wpm || 0 });
    });

    const rect = canvas.parentNode.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let maxWPM = 60;
    Object.values(state.mpChartData).forEach(arr => {
        arr.forEach(pt => { if(pt.y > maxWPM) maxWPM = pt.y; });
    });
    maxWPM += 10;

    const colors = ['#38bdf8', '#facc15', '#4ade80', '#f87171', '#a8a29e'];
    let colorIdx = 0;

    Object.keys(state.mpChartData).forEach(uid => {
        const points = state.mpChartData[uid];
        if (points.length < 2) return;

        ctx.beginPath();
        ctx.strokeStyle = colors[colorIdx % colors.length];
        ctx.lineWidth = 3;
        
        points.forEach((pt, i) => {
            const x = (pt.x / (state.timeLeft + 30)) * canvas.width; // Scale X tạm thời
            const y = canvas.height - (pt.y / maxWPM) * canvas.height;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();
        colorIdx++;
    });
}

// --- KEYBOARD & VISUALS ---
const keyboardLayout = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
    ['Space']
];

const fingerMap = {
    '1':1, 'q':1, 'a':1, 'z':1, '`':1, 'Tab':1, 'Caps':1, 'Shift':1,
    '2':2, 'w':2, 's':2, 'x':2,
    '3':3, 'e':3, 'd':3, 'c':3,
    '4':4, 'r':4, 'f':4, 'v':4, '5':4, 't':4, 'g':4, 'b':4,
    ' ':5,
    '6':6, 'y':6, 'h':6, 'n':6, '7':6, 'u':6, 'j':6, 'm':6,
    '8':7, 'i':7, 'k':7, ',':7,
    '9':8, 'o':8, 'l':8, '.':8,
    '0':9, 'p':9, ';':9, '/':9, '-':9, '=':9, '[':9, ']':9, "'":9, '\\':9, 'Enter':9, 'Backspace':9
};

function initKeyboard() {
    let kbContainer = document.querySelector('.keyboard-container');
    if (!kbContainer) return;
    kbContainer.innerHTML = '';

    keyboardLayout.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'keyboard-row';
        row.forEach(key => {
            const keyDiv = document.createElement('div');
            keyDiv.className = `key ${key.toLowerCase()}`;
            keyDiv.innerText = key === 'Space' ? '' : key;
            keyDiv.dataset.key = key.toLowerCase();
            const f = fingerMap[key.toLowerCase()] || fingerMap[key] || 9;
            keyDiv.dataset.finger = f;
            rowDiv.appendChild(keyDiv);
        });
        kbContainer.appendChild(rowDiv);
    });

    // Hands
    const handsDiv = document.createElement('div');
    handsDiv.className = 'hands-wrapper';
    const leftHand = document.createElement('div'); leftHand.className = 'hand left';
    [1, 2, 3, 4, 5].forEach(i => {
        const f = document.createElement('div'); f.className = `finger ${getFingerName(i)}`; f.dataset.fingerId = i; leftHand.appendChild(f);
    });
    const rightHand = document.createElement('div'); rightHand.className = 'hand right';
    [5, 6, 7, 8, 9].forEach(i => {
        const f = document.createElement('div'); f.className = `finger ${getFingerName(i)}`; f.dataset.fingerId = i; rightHand.appendChild(f);
    });
    handsDiv.appendChild(leftHand); handsDiv.appendChild(rightHand);
    kbContainer.appendChild(handsDiv);
}

function getFingerName(id) {
    if(id===1 || id===9) return 'pinky';
    if(id===2 || id===8) return 'ring';
    if(id===3 || id===7) return 'middle';
    if(id===4 || id===6) return 'index';
    return 'thumb';
}

const specialKeyMap = {
    '!': '1', '@': '2', '#': '3', '$': '4', '%': '5', '^': '6', '&': '7', '*': '8', '(': '9', ')': '0',
    '_': '-', '+': '=', '{': '[', '}': ']', '|': '\\', ':': ';', '"': "'", '<': ',', '>': '.', '?': '/', '~': '`'
};

function updateKeyboardHints(char) {
    if (!char) return;
    const lowerChar = char.toLowerCase();
    document.querySelectorAll('.key.active, .finger.active').forEach(el => el.classList.remove('active'));

    let targetKey = lowerChar;
    if (specialKeyMap[char]) targetKey = specialKeyMap[char];

    let keyEl = null;
    try {
        keyEl = document.querySelector(`.key[data-key="${CSS.escape(targetKey)}"]`);
    } catch (e) {}
    
    if (keyEl) {
        keyEl.classList.add('active');
        const fingerId = keyEl.dataset.finger;
        if (fingerId) document.querySelectorAll(`.finger[data-finger-id="${fingerId}"]`).forEach(f => f.classList.add('active'));
        if (char !== lowerChar || "!@#$%^&*()_+{}|:\"<>?~".includes(char)) {
            const shiftKey = document.querySelector('.key.shift');
            if(shiftKey) shiftKey.classList.add('active');
        }
    } else if (char === ' ') {
        const spaceKey = document.querySelector('.key.space');
        if(spaceKey) spaceKey.classList.add('active');
        document.querySelectorAll('.finger.thumb').forEach(f => f.classList.add('active'));
    }
}

function updateKeyboardHeatmap() {
    document.querySelectorAll('.key').forEach(k => {
        k.classList.remove('heat-1', 'heat-2', 'heat-3', 'heat-4', 'heat-5');
    });
    if (!state.heatmapEnabled) return;
    Object.keys(state.heatmap).forEach(char => {
        const count = state.heatmap[char];
        let heatClass = '';
        if (count >= 10) heatClass = 'heat-5';
        else if (count >= 7) heatClass = 'heat-4';
        else if (count >= 5) heatClass = 'heat-3';
        else if (count >= 3) heatClass = 'heat-2';
        else if (count >= 1) heatClass = 'heat-1';
        if (heatClass) {
            let keyEl = null;
            try { keyEl = document.querySelector(`.key[data-key="${CSS.escape(char)}"]`); } catch(e) {}
            if (keyEl) keyEl.classList.add(heatClass);
        }
    });
}

function updateSmoothCaret() {
    let caret = document.getElementById('smoothCaret');
    if (!caret) {
        caret = document.createElement('div');
        caret.id = 'smoothCaret';
        const style = localStorage.getItem('cursorStyle') || 'underscore';
        caret.className = `cursor-${style}`;
        els.display.appendChild(caret);
    }
    const activeSpan = state.charSpans[state.charIndex];
    if (activeSpan) {
        const left = activeSpan.offsetLeft;
        const top = activeSpan.offsetTop;
        const width = activeSpan.offsetWidth;
        const height = activeSpan.offsetHeight;
        caret.style.left = left + 'px';
        caret.style.top = top + 'px';
        if (caret.classList.contains('cursor-block') || caret.classList.contains('cursor-underscore')) {
            caret.style.width = width + 'px';
        }
        caret.style.height = height + 'px';
    }
}

// --- SOUND & EFFECTS ---
let audioCtx = null;
function playMechanicalClick() {
    try {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) audioCtx = new AudioContext();
            else return;
        }
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
        const vol = (parseInt(localStorage.getItem('gameVolume') || 80) / 100) * 0.5;
        gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {}
}

function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    localStorage.setItem('typingSound', state.soundEnabled);
    updateControlButtons();
    if(state.soundEnabled) playMechanicalClick();
}

function toggleZenMode() {
    state.zenMode = !state.zenMode;
    if (state.zenMode) document.body.classList.add('zen-mode');
    else document.body.classList.remove('zen-mode');
    updateControlButtons();
}

function toggleHeatmap() {
    state.heatmapEnabled = !state.heatmapEnabled;
    updateControlButtons();
    updateKeyboardHeatmap();
}

function updateControlButtons() {
    const soundBtn = document.getElementById('btnSound');
    const zenBtn = document.getElementById('btnZen');
    const heatBtn = document.getElementById('btnHeatmap');
    
    if(soundBtn) {
        soundBtn.classList.toggle('active', state.soundEnabled);
        soundBtn.innerHTML = state.soundEnabled ? '<i class="fas fa-volume-up"></i> Sound On' : '<i class="fas fa-volume-mute"></i> Sound Off';
    }
    if(zenBtn) zenBtn.classList.toggle('active', state.zenMode);
    if(heatBtn) {
        heatBtn.classList.toggle('active', state.heatmapEnabled);
        heatBtn.innerHTML = state.heatmapEnabled ? '<i class="fas fa-fire"></i> Heatmap On' : '<i class="fas fa-fire-alt"></i> Heatmap Off';
    }
}

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

function applyGlobalLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    // Dịch tự động theo data-translate
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if(t[key]) el.innerHTML = t[key];
    });

    const navLinks = document.querySelectorAll('.nav-links > a');
    navLinks.forEach(link => {
        if(link.href.includes('index.html')) link.innerText = t.navHome;
        if(link.href.includes('about.html')) link.innerText = t.navAbout;
        if(link.href.includes('tips.html')) link.innerText = t.navTips;
        if(link.href.includes('FAQ.html')) link.innerText = t.navFAQ;
        if(link.href.includes('typing.html')) link.innerText = t.navTyping;
        if(link.href.includes('contact.html')) link.innerText = t.navContact;
        if(link.href.includes('multiplayer.html')) link.innerText = t.tabMultiplayer;
    });
    const statLabels = document.querySelectorAll('.stat-label');
    statLabels.forEach(lbl => {
        if(lbl.innerText.includes('WPM')) lbl.innerText = t.statWPM;
        if(lbl.innerText.includes('Accuracy')) lbl.innerText = t.statAcc;
        if(lbl.innerText.includes('Time')) lbl.innerText = t.statTime;
    });
}

// Helper Toast (Copy từ contact.js nếu chưa có global)
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hiding');
        toast.addEventListener('animationend', () => toast.remove());
    }, 3000);
}
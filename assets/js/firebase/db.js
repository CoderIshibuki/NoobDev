// assets/js/firebase/db.js
import { db, auth } from './config.js';
import { collection, addDoc, query, where, orderBy, limit, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- LƯU ĐIỂM ---
export async function saveGameScore(gameType, score) {
    const user = auth.currentUser;
    if (!user) return; // Chưa đăng nhập thì không lưu

    try {
        await addDoc(collection(db, "scores"), {
            uid: user.uid,
            userName: user.displayName,
            gameType: gameType, // 'blink', 'falling', 'typing'
            score: Number(score),
            createdAt: serverTimestamp() // Lấy giờ server
        });
        console.log("Score saved!");
    } catch (e) {
        console.error("Error saving score: ", e);
    }
}

// --- LẤY BẢNG XẾP HẠNG (Top 10) ---
export async function getLeaderboard(gameType) {
    const scoresRef = collection(db, "scores");
    const q = query(
        scoresRef, 
        where("gameType", "==", gameType), 
        orderBy("score", "desc"), 
        limit(10)
    );

    const snapshot = await getDocs(q);
    let data = [];
    snapshot.forEach(doc => data.push(doc.data()));
    return data;
}

export async function renderLeaderboardUI(gameType, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '<div class="loading">Loading...</div>';

    const data = await getLeaderboard(gameType); // Hàm này đã viết ở Bước 2 hồi nãy
    
    let html = '';
    data.forEach((item, index) => {
        const rank = index + 1;
        const rankClass = rank <= 3 ? `rank-${rank}` : '';
        html += `
            <div class="lb-item ${rankClass}">
                <div class="lb-rank">#${rank}</div>
                <div class="lb-name">${item.userName}</div>
                <div class="lb-score">${item.score}</div>
            </div>
        `;
    });

    container.innerHTML = html || '<div class="no-data">Chưa có ai chơi!</div>';
}
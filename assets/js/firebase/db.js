// assets/js/firebase/db.js
import { db, auth } from './config.js';
import { 
    collection, addDoc, query, where, orderBy, limit, getDocs, serverTimestamp,
    doc, updateDoc, increment, getDoc, setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- LƯU ĐIỂM ---
export async function saveGameScore(gameType, score, accuracy = 0) {
    const user = auth.currentUser;
    if (!user) return; // Chưa đăng nhập thì không lưu

    try {
        // 1. Lưu vào lịch sử chi tiết (collection scores)
        await addDoc(collection(db, "scores"), {
            uid: user.uid,
            userName: user.displayName,
            gameType: gameType, // 'blink', 'falling', 'typing'
            score: Number(score),
            accuracy: Number(accuracy),
            createdAt: serverTimestamp() // Lấy giờ server
        });

        // 2. Cập nhật thống kê tổng quan của user (số trận, wpm cao nhất)
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        let updateData = { matches_played: increment(1) };
        
        if (userSnap.exists()) {
            const currentBest = userSnap.data().wpm_best || 0;
            // Nếu là bài tập gõ (typing) và điểm cao hơn kỷ lục cũ thì cập nhật
            if (gameType.includes('typing') && Number(score) > currentBest) {
                updateData.wpm_best = Number(score);
            }
        }
        
        await updateDoc(userRef, updateData);
        console.log("Score saved!");
    } catch (e) {
        console.error("Error saving score: ", e);
    }
}

// --- LẤY BẢNG XẾP HẠNG (Top 10) ---
export async function getLeaderboard(gameType) {
    const user = auth.currentUser;
    if (!user) return []; // Nếu chưa đăng nhập, trả về mảng rỗng

    const scoresRef = collection(db, "scores");
    const q = query(
        scoresRef, 
        where("gameType", "==", gameType),
        where("uid", "==", user.uid), // Lọc theo ID của người dùng hiện tại
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

    container.innerHTML = '<div class="loading">Đang tải...</div>';

    try {
        const data = await getLeaderboard(gameType); 
        
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

        container.innerHTML = html || '<div class="no-data">Bạn chưa có điểm nào!</div>';
    } catch (error) {
        console.error("Leaderboard Error:", error);
        container.innerHTML = '<div class="no-data" style="color: #f87171">Lỗi tải dữ liệu!</div>';
    }
}

// --- SYNC TIẾN ĐỘ BÀI HỌC (STARS) ---
export async function saveStarProgress(lessonId, stars) {
    const user = auth.currentUser;
    if (!user) return;

    try {
        // Lưu vào document: users/{uid}/progress/typing
        // Dùng merge: true để không ghi đè các bài khác
        const progressRef = doc(db, "users", user.uid, "progress", "typing");
        await setDoc(progressRef, {
            [lessonId]: stars
        }, { merge: true });
    } catch (e) {
        console.error("Error saving progress:", e);
    }
}

export async function fetchUserProgress() {
    const user = auth.currentUser;
    if (!user) return null;

    try {
        const progressRef = doc(db, "users", user.uid, "progress", "typing");
        const docSnap = await getDoc(progressRef);
        if (docSnap.exists()) return docSnap.data();
    } catch (e) {
        console.error("Error fetching progress:", e);
    }
    return null;
}
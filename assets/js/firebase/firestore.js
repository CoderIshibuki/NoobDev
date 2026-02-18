import { db } from './config.js';
import { 
    collection, 
    addDoc, 
    doc, 
    updateDoc, 
    increment, 
    serverTimestamp, 
    getDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * Lưu kết quả luyện gõ vào Firestore
 */
export async function saveGameResult(userId, wpm, accuracy, mode) {
    try {
        // 1. Lưu lịch sử chi tiết lượt chơi vào collection 'results'
        await addDoc(collection(db, "results"), {
            uid: userId,
            wpm: Number(wpm),
            accuracy: Number(accuracy),
            mode: mode || 'standard',
            timestamp: serverTimestamp()
        });

        // 2. Cập nhật thống kê tổng quan của user (số trận, wpm cao nhất)
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
            matches_played: increment(1)
        });

        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            const currentBest = userSnap.data().wpm_best || 0;
            if (Number(wpm) > currentBest) {
                await updateDoc(userRef, { wpm_best: Number(wpm) });
            }
        }
    } catch (error) {
        console.error("Lỗi khi lưu kết quả:", error);
    }
}
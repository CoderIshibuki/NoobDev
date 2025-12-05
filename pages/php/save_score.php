<?php
session_start();
require 'db_connect.php'; // Gọi file kết nối ở trên

header('Content-Type: application/json');

// Chỉ lưu nếu người dùng đã đăng nhập
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = $_SESSION['user_id'];
    $game_type = $_POST['game_type']; // Nhận loại game ('blink' hoặc 'falling')
    $score = intval($_POST['score']); // Nhận điểm số

    // Chống hack điểm âm
    if ($score > 0) {
        // Chuẩn bị câu lệnh SQL an toàn (Prepared Statement)
        $stmt = $conn->prepare("INSERT INTO game_scores (user_id, game_type, score) VALUES (?, ?, ?)");
        $stmt->bind_param("isi", $user_id, $game_type, $score);
        
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => $stmt->error]);
        }
        $stmt->close();
    }
}
$conn->close();
?>
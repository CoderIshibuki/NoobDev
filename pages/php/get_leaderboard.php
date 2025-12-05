<?php
// LƯU TẠI: pages/php/get_leaderboard.php
require 'db_connect.php';
session_start();

$game_type = isset($_GET['game']) ? $_GET['game'] : 'blink';

// --- 1. LẤY TOP 5 NGƯỜI CHƠI ---
// FIX: ORDER BY high_score DESC, u.id DESC
// (Nếu điểm bằng nhau, ID lớn hơn - tức là người mới hơn/đăng ký sau - sẽ xếp trên)
$sql = "SELECT u.username, MAX(s.score) as high_score 
        FROM game_scores s 
        JOIN users u ON s.user_id = u.id 
        WHERE s.game_type = ? 
        GROUP BY u.id, u.username 
        ORDER BY high_score DESC, u.id DESC 
        LIMIT 5";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $game_type);
$stmt->execute();
$result = $stmt->get_result();
$rank = 1;

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $rankClass = ($rank == 1) ? 'rank-1' : (($rank == 2) ? 'rank-2' : (($rank == 3) ? 'rank-3' : ''));
        $initial = strtoupper(substr($row['username'], 0, 1));
        ?>
        <div class="lb-item <?php echo $rankClass; ?>">
            <div class="lb-rank"><?php echo $rank++; ?></div>
            <div class="lb-avatar"><?php echo $initial; ?></div>
            <div class="lb-info">
                <div class="lb-name"><?php echo htmlspecialchars($row['username']); ?></div>
                <div class="lb-score"><?php echo number_format($row['high_score']); ?> pts</div>
            </div>
        </div>
        <?php
    }
} else {
    echo '<div style="text-align:center; color:#94a3b8; padding:20px;">No scores yet!</div>';
}
$stmt->close();

// --- 2. HIỂN THỊ THỨ HẠNG CỦA BẠN ---
if(isset($_SESSION['user_id'])) {
    $my_id = $_SESSION['user_id'];
    
    // Lấy điểm cao nhất của bạn
    $my_best_sql = "SELECT MAX(score) as my_best FROM game_scores WHERE user_id = ? AND game_type = ?";
    $stmt2 = $conn->prepare($my_best_sql);
    $stmt2->bind_param("is", $my_id, $game_type);
    $stmt2->execute();
    $my_res = $stmt2->get_result();
    $my_row = $my_res->fetch_assoc();
    $my_score = ($my_row['my_best'] !== null) ? $my_row['my_best'] : 0;
    $stmt2->close();

    // Tính hạng dựa trên logic "Ai điểm cao hơn thì xếp trên"
    $my_rank_display = '-';
    if ($my_score > 0) {
        // Đếm số người có điểm > điểm của bạn
        $rank_sql = "SELECT COUNT(*) as rank_above FROM (
                        SELECT MAX(score) as max_s FROM game_scores 
                        WHERE game_type = ? 
                        GROUP BY user_id
                     ) as all_scores 
                     WHERE max_s > ?";
        
        $stmt3 = $conn->prepare($rank_sql);
        $stmt3->bind_param("si", $game_type, $my_score);
        $stmt3->execute();
        $rank_row = $stmt3->get_result()->fetch_assoc();
        
        // Nếu bằng điểm, coi như mình xếp ngay sau họ hoặc đồng hạng (ở đây lấy đơn giản là rank_above + 1)
        // Vì SQL trên đã ưu tiên u.id DESC, nên nếu bạn bằng điểm ProGamer và id bạn > id ProGamer, bạn sẽ thấy mình ở trên trong danh sách Top 5.
        // Còn số rank hiển thị ở đây chỉ mang tính tham khảo.
        $my_rank = $rank_row['rank_above'] + 1;
        $my_rank_display = '#' . $my_rank;
        $stmt3->close();
    }
    
    echo '<div class="lb-divider"></div>
          <div class="lb-item current-user">
            <div class="lb-rank">'.$my_rank_display.'</div>
            <div class="lb-avatar" style="background: linear-gradient(135deg, #facc15, #f59e0b);">You</div>
            <div class="lb-info">
                <div class="lb-name">'.htmlspecialchars($_SESSION['user_name']).'</div>
                <div class="lb-score">'.number_format($my_score).' pts</div>
            </div>
          </div>';
}
?>
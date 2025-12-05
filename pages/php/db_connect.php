<?php
$servername = "localhost";
$username = "ishibuki";  // User bạn đã tạo
$password = "123";       // Pass bạn đã tạo
$dbname = "noobdev_db";

// Tạo kết nối
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

// Thiết lập font chữ tiếng Việt
$conn->set_charset("utf8mb4");
?>
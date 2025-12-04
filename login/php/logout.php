<?php
session_start();
session_destroy();
// SỬA: Ra khỏi php (..) -> về login.html
header("Location: ../login.html");
exit();
?>
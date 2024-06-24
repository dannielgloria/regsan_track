<?php
require_once '../db.php';

$rfc = $_POST['rfc'];
$db = Database::getInstance();
$connection = $db->getConnection();

$sql = "SELECT * FROM clientes WHERE rfc = ?";
$stmt = $connection->prepare($sql);
$stmt->bind_param("s", $rfc);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    $row['success'] = true;
    echo json_encode($row);
} else {
    echo json_encode(['success' => false]);
}

$stmt->close();
?>
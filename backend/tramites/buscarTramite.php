<?php
require_once '../db.php';

$clave = $_POST['clave'];

$db = Database::getInstance();
$connection = $db->getConnection();

$sql = "SELECT * FROM tramites WHERE clave = ?";
$stmt = $connection->prepare($sql);
$stmt->bind_param("s", $clave);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $tramite = $result->fetch_assoc();
    echo json_encode(["success" => true, "tramite" => $tramite]);
} else {
    echo json_encode(["success" => false, "message" => "Trámite no encontrado."]);
}

$stmt->close();
?>

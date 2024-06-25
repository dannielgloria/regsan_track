<?php
require_once '../db.php';

$db = Database::getInstance();
$connection = $db->getConnection();

$sql = "SELECT rfc, razon_social FROM clientes";
$result = $connection->query($sql);

$clientes = array();
while ($row = $result->fetch_assoc()) {
    $clientes[] = $row;
}

echo json_encode($clientes);
?>

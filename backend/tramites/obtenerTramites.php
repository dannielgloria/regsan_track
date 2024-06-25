<?php
require_once '../db.php';

$db = Database::getInstance();
$connection = $db->getConnection();

$sql = "SELECT clave, rfc_cliente, nombre_producto, fabricante_producto, tipo_servicio, estatus FROM tramites";
$result = $connection->query($sql);

$tramites = array();
while ($row = $result->fetch_assoc()) {
    $tramites[] = $row;
}

echo json_encode($tramites);
?>

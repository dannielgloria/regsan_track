<?php
require_once '../db.php';

$rfc = $_POST['rfc'];

$db = Database::getInstance();
$connection = $db->getConnection();

// Primero, eliminar trámites asociados (si la base de datos no está configurada para hacerlo automáticamente)
$sql_tramites = "DELETE FROM tramites WHERE rfc_cliente = ?";
$stmt_tramites = $connection->prepare($sql_tramites);
$stmt_tramites->bind_param("s", $rfc);
$stmt_tramites->execute();
$stmt_tramites->close();

// Luego, eliminar el cliente
$sql_cliente = "DELETE FROM clientes WHERE rfc = ?";
$stmt_cliente = $connection->prepare($sql_cliente);
$stmt_cliente->bind_param("s", $rfc);

if ($stmt_cliente->execute()) {
    echo "Cliente y trámites asociados eliminados exitosamente.";
} else {
    echo "Error al eliminar el cliente: " . $stmt_cliente->error;
}

$stmt_cliente->close();
?>

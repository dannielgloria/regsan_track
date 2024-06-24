<?php
require_once '../db.php';

$rfc = $_POST['rfcCliente'];
$razon_social = $_POST['razonSocialCliente'];
$email = $_POST['emailCliente'];
$telefono = $_POST['telefonoCliente'];
$nombre_responsable = $_POST['nombreResponsableCliente'];
$apellido_responsable = $_POST['apellidoResponsableCliente'];

$db = Database::getInstance();
$connection = $db->getConnection();

$sql = "INSERT INTO clientes (rfc, razon_social, email, telefono, nombre_responsable, apellido_responsable) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $connection->prepare($sql);
$stmt->bind_param("ssssss", $rfc, $razon_social, $email, $telefono, $nombre_responsable, $apellido_responsable);

if ($stmt->execute()) {
    echo "Cliente creado exitosamente.";
} else {
    echo "Error al crear el cliente: " . $stmt->error;
}

$stmt->close();
?>

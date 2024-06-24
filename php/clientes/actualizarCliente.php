<?php
require_once 'Database.php';

$rfc = $_POST['rfcCliente'];
$razon_social = $_POST['razonSocialCliente'];
$email = $_POST['emailCliente'];
$telefono = $_POST['telefonoCliente'];
$nombre_responsable = $_POST['nombreResponsableCliente'];
$apellido_responsable = $_POST['apellidoResponsableCliente'];

$db = Database::getInstance();
$connection = $db->getConnection();

$sql = "UPDATE clientes SET razon_social=?, email=?, telefono=?, nombre_responsable=?, apellido_responsable=? WHERE rfc=?";
$stmt = $connection->prepare($sql);
$stmt->bind_param("ssssss", $razon_social, $email, $telefono, $nombre_responsable, $apellido_responsable, $rfc);
$result = $stmt->execute();

if ($result) {
    echo "Datos del cliente actualizados con éxito.";
} else {
    echo "Error al actualizar datos del cliente.";
}

$stmt->close();
?>

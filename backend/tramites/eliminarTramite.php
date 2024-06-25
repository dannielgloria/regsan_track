<?php
require_once '../db.php';

$clave = $_POST['clave'];

$db = Database::getInstance();
$connection = $db->getConnection();

$sql = "DELETE FROM tramites WHERE clave = ?";
$stmt = $connection->prepare($sql);
$stmt->bind_param("s", $clave);

if ($stmt->execute()) {
    echo "Trámite eliminado exitosamente.";
} else {
    echo "Error al eliminar el trámite: " . $stmt->error;
}

$stmt->close();
?>

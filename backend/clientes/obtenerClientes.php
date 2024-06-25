<?php
require_once '../db.php';

// Obtener la instancia de la base de datos
$db = Database::getInstance();
$connection = $db->getConnection();

// Preparar y ejecutar la consulta SQL para obtener todos los clientes
$sql = "SELECT rfc, razon_social, email, telefono, nombre_responsable, apellido_responsable FROM clientes";
$result = $connection->query($sql);

// Array para almacenar los clientes
$clientes = [];

if ($result->num_rows > 0) {
    // Iterar sobre cada fila del resultado
    while ($row = $result->fetch_assoc()) {
        $clientes[] = $row;
    }
    // Enviar los resultados en formato JSON
    echo json_encode($clientes);
} else {
    // Enviar un array vacío si no hay clientes
    echo json_encode([]);
}

// Cerrar la conexión
$connection->close();
?>

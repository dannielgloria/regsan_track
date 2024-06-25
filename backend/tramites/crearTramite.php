<?php
require_once '../db.php';

$clave = $_POST['claveTramite'];
$rfc_cliente = $_POST['rfcClienteTramite'];
$nombre_producto = $_POST['nombreProducto'];
$fabricante_producto = $_POST['fabricanteProducto'];
$tipo_servicio = $_POST['tipoServicio'];
$datos_tecnicos = $_POST['datosTecnicos'];
$fecha_inicio = $_POST['fechaInicio'];
$fecha_fin = $_POST['fechaFin'];
$estatus = $_POST['estatus'];
$fecha_ingreso_cofepris = $_POST['fechaIngresoCofepris'];
$numero_entrada_cofepris = $_POST['numeroEntradaCofepris'];
$link_cofepris = $_POST['linkCofepris'];
$consultor = $_POST['consultor'];

$db = Database::getInstance();
$connection = $db->getConnection();

$sql = "INSERT INTO tramites (clave, rfc_cliente, nombre_producto, fabricante_producto, tipo_servicio, datos_tecnicos, fecha_inicio, fecha_fin, estatus, fecha_ingreso_cofepris, numero_entrada_cofepris, link_cofepris, consultor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $connection->prepare($sql);
$stmt->bind_param("sssssssssssss", $clave, $rfc_cliente, $nombre_producto, $fabricante_producto, $tipo_servicio, $datos_tecnicos, $fecha_inicio, $fecha_fin, $estatus, $fecha_ingreso_cofepris, $numero_entrada_cofepris, $link_cofepris, $consultor);

if ($stmt->execute()) {
    echo "Trámite creado exitosamente.";
} else {
    echo "Error al crear el trámite: " . $stmt->error;
}

$stmt->close();
?>

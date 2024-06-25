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

$sql = "UPDATE tramites SET rfc_cliente=?, nombre_producto=?, fabricante_producto=?, tipo_servicio=?, datos_tecnicos=?, fecha_inicio=?, fecha_fin=?, estatus=?, fecha_ingreso_cofepris=?, numero_entrada_cofepris=?, link_cofepris=?, consultor=? WHERE clave=?";
$stmt = $connection->prepare($sql);
$stmt->bind_param("sssssssssssss", $rfc_cliente, $nombre_producto, $fabricante_producto, $tipo_servicio, $datos_tecnicos, $fecha_inicio, $fecha_fin, $estatus, $fecha_ingreso_cofepris, $numero_entrada_cofepris, $link_cofepris, $consultor, $clave);

if ($stmt->execute()) {
    echo "Trámite actualizado exitosamente.";
} else {
    echo "Error al actualizar el trámite: " . $stmt->error;
}

$stmt->close();
?>

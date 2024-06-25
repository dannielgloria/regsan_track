function mostrarAlerta(mensaje, tipo="alert-primary") {
    return `<div class="alert ${tipo}" role="alert">${mensaje}</div>`;
}

function registrarTramite() {
    let formData = new FormData(document.getElementById('formCrearTramite'));
    fetch('./crearTramite.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('alertPlaceholderCrear').innerHTML = mostrarAlerta(data);
        cargarTramites(); // Recargar lista de trámites después de la creación
    })
    .catch(error => {
        document.getElementById('alertPlaceholderCrear').innerHTML = mostrarAlerta("Error al registrar el trámite.", "alert-danger");
    });
    event.preventDefault(); // Prevenir recarga de la página
}

function buscarTramite() {
    let clave = document.getElementById('claveTramiteActualizar').value;
    fetch('./buscarTramite.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'clave=' + encodeURIComponent(clave)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            let tramite = data.tramite;
            document.getElementById('nombreProductoActualizar').value = tramite.nombre_producto;
            document.getElementById('fabricanteProductoActualizar').value = tramite.fabricante_producto;
            document.getElementById('tipoServicioActualizar').value = tramite.tipo_servicio;
            document.getElementById('datosTecnicosActualizar').value = tramite.datos_tecnicos;
            document.getElementById('fechaInicioActualizar').value = tramite.fecha_inicio;
            document.getElementById('fechaFinActualizar').value = tramite.fecha_fin;
            document.getElementById('estatusActualizar').value = tramite.estatus;
            document.getElementById('fechaIngresoCofeprisActualizar').value = tramite.fecha_ingreso_cofepris;
            document.getElementById('numeroEntradaCofeprisActualizar').value = tramite.numero_entrada_cofepris;
            document.getElementById('linkCofeprisActualizar').value = tramite.link_cofepris;
            document.getElementById('consultorActualizar').value = tramite.consultor;
            document.querySelectorAll('#formActualizarTramite input, #formActualizarTramite select, #formActualizarTramite textarea').forEach(input => input.disabled = false);
            document.getElementById('actualizarDatos').disabled = false;
        } else {
            document.getElementById('alertPlaceholderActualizar').innerHTML = mostrarAlerta("Trámite no encontrado.", "alert-danger");
        }
    })
    .catch(error => {
        document.getElementById('alertPlaceholderActualizar').innerHTML = mostrarAlerta("Error al buscar el trámite.", "alert-danger");
    });
}

function actualizarTramite() {
    let formData = new FormData(document.getElementById('formActualizarTramite'));
    fetch('./actualizarTramite.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('alertPlaceholderActualizar').innerHTML = mostrarAlerta(data);
        cargarTramites(); // Recargar lista de trámites después de la actualización
    })
    .catch(error => {
        document.getElementById('alertPlaceholderActualizar').innerHTML = mostrarAlerta("Error al actualizar el trámite.", "alert-danger");
    });
    event.preventDefault(); // Prevenir recarga de la página
}

function eliminarTramite() {
    let clave = document.getElementById('claveTramiteEliminar').value;
    if (!confirm("¿Estás seguro de que deseas eliminar este trámite?")) {
        return; // Si el usuario cancela, no proceder con la eliminación
    }

    fetch('./eliminarTramite.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'clave=' + encodeURIComponent(clave)
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('alertPlaceholderEliminar').innerHTML = mostrarAlerta(data);
        cargarTramites(); // Recargar lista de trámites después de la eliminación
    })
    .catch(error => {
        document.getElementById('alertPlaceholderEliminar').innerHTML = mostrarAlerta("Error al eliminar el trámite.", "alert-danger");
    });
}

function cargarTramites() {
    fetch('./obtenerTramites.php')
    .then(response => response.json())
    .then(data => {
        let tabla = document.getElementById('tablaTramitesBody');
        tabla.innerHTML = '';
        let selectActualizar = document.getElementById('claveTramiteActualizar');
        let selectEliminar = document.getElementById('claveTramiteEliminar');
        selectActualizar.innerHTML = '<option value="" selected>Open this select menu</option>';
        selectEliminar.innerHTML = '<option value="" selected>Open this select menu</option>';
        data.forEach((tramite, index) => {
            let fila = `<tr>
                <th scope="row">${index + 1}</th>
                <td>${tramite.clave}</td>
                <td>${tramite.rfc_cliente}</td>
                <td>${tramite.nombre_producto}</td>
                <td>${tramite.fabricante_producto}</td>
                <td>${tramite.tipo_servicio}</td>
                <td>${tramite.estatus}</td>
            </tr>`;
            tabla.innerHTML += fila;
            let option = `<option value="${tramite.clave}">${tramite.clave}</option>`;
            selectActualizar.innerHTML += option;
            selectEliminar.innerHTML += option;
        });
    })
    .catch(error => {
        document.getElementById('alertPlaceholder').innerHTML = mostrarAlerta("Error al cargar trámites.", "alert-danger");
    });
}

function cargarClientes() {
    fetch('./obtenerClientes.php')
    .then(response => response.json())
    .then(data => {
        let selectCrear = document.getElementById('rfcClienteTramiteCrear');
        selectCrear.innerHTML = '<option value="" selected>Open this select menu</option>';
        data.forEach(cliente => {
            let option = `<option value="${cliente.rfc}">${cliente.razon_social}</option>`;
            selectCrear.innerHTML += option;
        });
    })
    .catch(error => {
        document.getElementById('alertPlaceholderCrear').innerHTML = mostrarAlerta("Error al cargar clientes.", "alert-danger");
    });
}

document.addEventListener('DOMContentLoaded', function() {
    cargarTramites();  // Carga inicial de trámites
    cargarClientes();  // Cargar lista de clientes para los select
});

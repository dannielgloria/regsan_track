function mostrarAlerta(mensaje, tipo="alert-primary") {
    return `<div class="alert ${tipo}" role="alert">${mensaje}</div>`;
}

function registrarCliente() {
    let formData = new FormData(document.getElementById('formCrearCliente'));
    fetch('./crearCliente.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('alertPlaceholderCrear').innerHTML = mostrarAlerta(data);
        cargarClientes(); // Recargar lista de clientes después de la creación
    })
    .catch(error => {
        document.getElementById('alertPlaceholderCrear').innerHTML = mostrarAlerta("Error al registrar el cliente.", "alert-danger");
    });
    event.preventDefault(); // Prevenir recarga de la página
}

function buscarCliente() {
    let rfc = document.getElementById('rfcClienteBuscar').value;
    fetch('./buscarCliente.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'rfc=' + encodeURIComponent(rfc)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('rfcClienteActualizar').value = data.rfc;
            document.getElementById('razonSocialCliente').value = data.razon_social;
            document.getElementById('emailCliente').value = data.email;
            document.getElementById('telefonoCliente').value = data.telefono;
            document.getElementById('nombreResponsableCliente').value = data.nombre_responsable;
            document.getElementById('apellidoResponsableCliente').value = data.apellido_responsable;
            document.querySelectorAll('#formActualizarCliente input').forEach(input => input.disabled = false);
            document.getElementById('actualizarDatos').disabled = false;
        } else {
            document.getElementById('alertPlaceholderActualizar').innerHTML = mostrarAlerta("Cliente no encontrado.", "alert-danger");
        }
    })
    .catch(error => {
        document.getElementById('alertPlaceholderActualizar').innerHTML = mostrarAlerta("Error al buscar el cliente.", "alert-danger");
    });
}

function actualizarCliente() {
    let formData = new FormData(document.getElementById('formActualizarCliente'));
    fetch('./actualizarCliente.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('alertPlaceholderActualizar').innerHTML = mostrarAlerta(data);
        cargarClientes(); // Recargar lista de clientes después de la actualización
    })
    .catch(error => {
        document.getElementById('alertPlaceholderActualizar').innerHTML = mostrarAlerta("Error al actualizar el cliente.", "alert-danger");
    });
    event.preventDefault(); // Prevenir recarga de la página
}

function eliminarCliente() {
    let rfc = document.getElementById('rfcClienteEliminar').value;
    if (!confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
        return; // Si el usuario cancela, no proceder con la eliminación
    }

    fetch('./borrarCliente.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'rfc=' + encodeURIComponent(rfc)
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('alertPlaceholderEliminar').innerHTML = mostrarAlerta(data);
        cargarClientes(); // Recargar lista de clientes después de la eliminación
    })
    .catch(error => {
        document.getElementById('alertPlaceholderEliminar').innerHTML = mostrarAlerta("Error al eliminar el cliente.", "alert-danger");
    });
}

function cargarClientes() {
    fetch('./obtenerClientes.php')
    .then(response => response.json())
    .then(data => {
        let tabla = document.getElementById('tablaClientesBody');
        tabla.innerHTML = '';
        data.forEach((cliente, index) => {
            let fila = `<tr>
                <th scope="row">${index + 1}</th>
                <td>${cliente.rfc}</td>
                <td>${cliente.razon_social}</td>
                <td>${cliente.email}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.nombre_responsable}</td>
                <td>${cliente.apellido_responsable}</td>
            </tr>`;
            tabla.innerHTML += fila;
        });
    })
    .catch(error => {
        document.getElementById('alertPlaceholder').innerHTML = mostrarAlerta("Error al cargar clientes.", "alert-danger");
    });
}

document.addEventListener('DOMContentLoaded', function() {
    cargarClientes();  // Carga inicial de clientes
});

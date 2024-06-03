// Función para cerrar la sesión del usuario
function cerrarSesion() {
    localStorage.removeItem("isLoggedIn"); // Elimina la sesión del usuario
    window.location.href = '/login.html'; // Redirecciona a la página de inicio de sesión
}
// Función para editar la descripción y el precio del producto
function editarProducto(idDescripcion, idPrecio) {
    // Solicitar al administrador que ingrese la nueva descripción y precio
    var nuevaDescripcion = prompt("Ingrese la nueva descripción:");
    var nuevoPrecio = prompt("Ingrese el nuevo precio:");

    // Actualizar los elementos HTML con los nuevos valores ingresados
    document.getElementById(idDescripcion).textContent = nuevaDescripcion;
    document.getElementById(idPrecio).innerHTML = "<strong>$" + nuevoPrecio + "</strong>";
}
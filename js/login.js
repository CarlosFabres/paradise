document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const loginErrorMessages = document.getElementById("loginErrorMessages");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("pwd").value;

        // Obtener usuarios existentes
        const users = JSON.parse(localStorage.getItem("users")) || {};

        // Verificar si el usuario existe y las credenciales son correctas
        if (users[email] && users[email].password === password) {
            // Establecer indicador de sesión al iniciar sesión
            localStorage.setItem("isLoggedIn", true);
            // Guardar el correo electrónico del usuario actualmente autenticado
            localStorage.setItem("currentUser", email);
            if (email === "admin@admin") {
                window.location.href = "admin.html"; // Redirigir a vista de administrador
            } else {
                window.location.href = "perfil.html";
            }
        } else {
            loginErrorMessages.innerHTML = "Credenciales incorrectas";
            loginErrorMessages.classList.remove("d-none");
        }
    });
});
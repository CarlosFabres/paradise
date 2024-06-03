document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const errorMessages = document.getElementById("errorMessages");

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPwd").value;

        // Validaciones de contraseña
        const passwordMinLength = 8;
        const passwordMaxLength = 20;
        const passwordRegex = {
            lowercase: /[a-z]/,
            uppercase: /[A-Z]/,
            digit: /[0-9]/,
            specialChar: /[!@#$%^&*(),.?":{}|<>]/
        };

        let passwordErrors = [];

        if (password.length < passwordMinLength) {
            passwordErrors.push(`La contraseña debe tener al menos ${passwordMinLength} caracteres.`);
        }
        if (password.length > passwordMaxLength) {
            passwordErrors.push(`La contraseña debe tener un máximo de ${passwordMaxLength} caracteres.`);
        }
        if (!passwordRegex.lowercase.test(password)) {
            passwordErrors.push("La contraseña debe tener al menos una letra minúscula.");
        }
        if (!passwordRegex.uppercase.test(password)) {
            passwordErrors.push("La contraseña debe tener al menos una letra mayúscula.");
        }
        if (!passwordRegex.digit.test(password)) {
            passwordErrors.push("La contraseña debe tener al menos un número.");
        }
        if (!passwordRegex.specialChar.test(password)) {
            passwordErrors.push("La contraseña debe tener al menos un carácter especial (ej. !@#$%^&*).");
        }

        if (passwordErrors.length > 0) {
            errorMessages.innerHTML = passwordErrors.join("<br>");
            errorMessages.classList.remove("d-none");
            return;
        } else {
            errorMessages.classList.add("d-none");
        }

        // Obtener usuarios existentes o inicializar un objeto vacío si no hay usuarios
        const users = JSON.parse(localStorage.getItem("users")) || {};

        // Verificar si el correo electrónico ya está registrado
        if (users[email]) {
            errorMessages.innerHTML = "El correo electrónico ya está registrado";
            errorMessages.classList.remove("d-none");
        } else {
            // Registrar el nuevo usuario
            users[email] = { name, email, password };
            localStorage.setItem("users", JSON.stringify(users));
            // Establecer indicador de sesión al iniciar sesión
            localStorage.setItem("isLoggedIn", true);
            // Guardar el correo electrónico del usuario actualmente autenticado
            localStorage.setItem("currentUser", email);
            window.location.href = "perfil.html";
        }
    });
});
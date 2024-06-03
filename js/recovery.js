document.addEventListener("DOMContentLoaded", function () {
    const recoverForm = document.getElementById("recoverForm");
    const recoveryMessages = document.getElementById("recoveryMessages");
    const recoveryErrorMessages = document.getElementById("recoveryErrorMessages");


    // Obtener usuarios existentes o inicializar un objeto vacío si no hay usuarios
    const users = JSON.parse(localStorage.getItem("users")) || {};

    //Recuperar Contraseña
    recoverForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("recoverEmail").value;
        const storedUser = JSON.parse(localStorage.getItem("user"));
        // Verificar si el usuario con el correo electrónico proporcionado existe
        if (users[email]) {
            recoveryMessages.innerHTML = `Se ha enviado un correo electrónico a la dirección proporcionada con las instrucciones para restablecer su contraseña: ${users[email].password}`;
            recoveryMessages.classList.remove("d-none");
            recoveryErrorMessages.classList.add("d-none");
        } else {
            recoveryErrorMessages.innerHTML = "Correo no registrado.";
            recoveryErrorMessages.classList.remove("d-none");
        }
    });
});
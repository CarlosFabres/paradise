// profile.js
document.addEventListener('DOMContentLoaded', function () {
    const profileForm = document.getElementById('profile-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const profileImage = document.getElementById('profile-image');
    const profileImageInput = document.getElementById('profile-image-input');
    const loginNavItem = document.getElementById('loginNavItem');
    const perfilMessages = document.getElementById("perfilMessages");

    // Verificar si hay una sesión activa al cargar la página
    const isUserLoggedIn = localStorage.getItem('isLoggedIn');

    if (isUserLoggedIn) {
        // Si hay un usuario autenticado, cambia el contenido del enlace a "Salir"
        loginNavItem.innerHTML = `
        <a class="nav-link" href="#" id="logoutLink">
            <i class="fas fa-sign-out-alt"></i><br>
            Salir
        </a>`;
        // Añade evento clic para cerrar sesión
        const logoutLink = document.getElementById('logoutLink');
        logoutLink.addEventListener('click', function () {
            localStorage.removeItem("isLoggedIn"); // Elimina la sesión del usuario
            window.location.href = '/login.html'; // Redirige a la página de inicio de sesión
        });
    }

    // Obtener el usuario actualmente autenticado
    const currentUserEmail = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users')) || {};

    const storedUser = users[currentUserEmail];

    if (storedUser) {
        nameInput.value = storedUser.name;
        emailInput.value = storedUser.email;
        if (storedUser.image) {
            profileImage.src = storedUser.image;
        }
    }

    profileImage.addEventListener('click', function () {
        profileImageInput.click();
    });

    profileImageInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    profileForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Actualizar los datos del usuario en localStorage
        const updatedUser = {
            name: nameInput.value,
            email: emailInput.value,
            password: storedUser.password,
            image: profileImage.src
        };

        users[currentUserEmail] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
        perfilMessages.innerHTML = "Perfil actualizado exitosamente";
        perfilMessages.classList.remove("d-none");
        setTimeout(function () {
            perfilMessages.classList.add("d-none");
        }, 2000);
    });
});
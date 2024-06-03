
document.addEventListener('DOMContentLoaded', function () {
    const priceFilter = document.getElementById('priceFilter');
    const brandFilter = document.getElementById('brandFilter');
    const productCards = document.querySelectorAll('.col-lg-2');
    // Función para actualizar la cantidad de productos en el carrito


    function filterProducts() {
        const priceValue = priceFilter.value;
        const brandValue = brandFilter.value;

        productCards.forEach(card => {
            const productPrice = parseInt(card.getAttribute('data-price'));
            const productBrand = card.getAttribute('data-brand');

            let isPriceMatch = false;
            if (priceValue === 'all') {
                isPriceMatch = true;
            } else {
                const [minPrice, maxPrice] = priceValue.split('-').map(Number);
                isPriceMatch = productPrice >= minPrice && (maxPrice ? productPrice <= maxPrice : true);
            }

            const isBrandMatch = brandValue === 'all' || productBrand === brandValue;

            if (isPriceMatch && isBrandMatch) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }
    priceFilter.addEventListener('change', filterProducts);
    brandFilter.addEventListener('change', filterProducts);

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = cart.reduce((count, product) => count + product.quantity, 0);
        const cartCountElement = document.querySelector('.badge-cart-count');

        if (cartCount > 0) {
            cartCountElement.textContent = cartCount;
            cartCountElement.style.display = 'inline-block';
        } else {
            cartCountElement.style.display = 'none';
        }
    }

    // Función para añadir productos al carrito
    function addToCart(productId, productName, productPrice) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(product => product.id === productId);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    // Función para eliminar un producto del carrito
    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(product => product.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showCartItems();
    }

    // Función para mostrar los productos en el modal del carrito
    function showCartItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsList = document.getElementById('cartItemsList');
        cartItemsList.innerHTML = ''; // Limpia la lista

        if (cart.length > 0) {
            cart.forEach(product => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                listItem.innerHTML = `
                                            ${product.name} (x${product.quantity}) - $${(product.price * product.quantity).toLocaleString('es-CL')}
                                            <button class="btn btn-danger btn-sm remove-item" data-product-id="${product.id}">&times;</button>
                                        `;
                cartItemsList.appendChild(listItem);
            });

            // Asigna el evento de clic a los botones de eliminar
            const removeButtons = document.querySelectorAll('.remove-item');
            removeButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const productId = this.getAttribute('data-product-id');
                    removeFromCart(productId);
                });
            });
        } else {
            const emptyMessage = document.createElement('li');
            emptyMessage.className = 'list-group-item';
            emptyMessage.textContent = 'El carrito está vacío';
            cartItemsList.appendChild(emptyMessage);
        }
    }

    // Asigna el evento de clic a los botones de "Añadir"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const productId = this.getAttribute('data-product-id');
            const productName = this.parentElement.querySelector('.card-title').textContent;
            const productPrice = parseFloat(this.parentElement.querySelector('.card-price strong').textContent.replace('$', '').replace('.', '').replace(',', '.'));

            addToCart(productId, productName, productPrice);
        });
    });

    // Evento para mostrar el carrito al hacer clic en el icono del carrito
    const cartIcon = document.querySelector('.fa-shopping-cart').parentElement;
    cartIcon.addEventListener('click', function (event) {
        event.preventDefault();
        showCartItems();
        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
        cartModal.show();
    });

    // Actualiza la cantidad de productos en el carrito al cargar la página
    updateCartCount();
});
// Verificar si hay una sesión activa al cargar la página
const isUserLoggedIn = localStorage.getItem('isLoggedIn');

if (isUserLoggedIn) {
    // Si hay un usuario autenticado, cambia el contenido del enlace a "Salir"
    loginNavItem.innerHTML = `
 <a class="nav-link" href="/perfil.html">
                 <i class="fas fa-user"></i><br>
                 Perfil
             </a>`;
    // Añade evento clic para cerrar sesión
    const logoutLink = document.getElementById('logoutLink');
    logoutLink.addEventListener('click', function () {
        localStorage.removeItem("isLoggedIn"); // Elimina la sesión del usuario
        window.location.href = '/login.html'; // Redirige a la página de inicio de sesión
    });
}
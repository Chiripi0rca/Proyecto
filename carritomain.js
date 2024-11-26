let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsContainer = document.getElementById("cart-items");
const emptyCartMessage = document.getElementById("empty-cart-message");
const clearCartButton = document.getElementById("clear-cart");
const checkoutButton = document.getElementById("checkout-button");


function updateCart() {
    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
        emptyCartMessage.style.display = "block";
    } else {
        emptyCartMessage.style.display = "none";
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Precio: ${item.price}</p>
                    <div class="quantity">
                        <button class="decrease-quantity" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-index="${index}">+</button>
                    </div>
                    <button class="remove-item" data-index="${index}">Eliminar</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Añadir eventos para modificar cantidades y eliminar productos
        document.querySelectorAll(".decrease-quantity").forEach((button) => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                saveCart();
                updateCart();
            });
        });

        document.querySelectorAll(".increase-quantity").forEach((button) => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                cart[index].quantity += 1;
                saveCart();
                updateCart();
            });
        });

        document.querySelectorAll(".remove-item").forEach((button) => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                cart.splice(index, 1);
                saveCart();
                updateCart();
            });
        });
    }
}
// Función para agregar productos al carrito
function addToCart(productId) {
    // Buscar el producto en la lista de productos
    const product = galleryProducts.find((p) => p.id === productId);
    if (product) {
        // Obtener el carrito desde el localStorage o inicializarlo
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find((item) => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1; // Incrementar la cantidad si ya está en el carrito
        } else {
            cart.push({ ...product, quantity: 1 }); // Agregar el producto como nuevo
        }

        // Guardar el carrito actualizado en el localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`Agregaste "${product.name}" al carrito.`);

        // Redirigir al carrito de compras (opcional)
        window.location.href = "carritomain.html";
    }
}

// Guardar carrito en localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Vaciar carrito
clearCartButton.addEventListener("click", () => {
    cart = [];
    saveCart();
    updateCart();
});

// Finalizar compra (simulado xd)
checkoutButton.addEventListener("click", () => {
    if (cart.length > 0) {
        alert("Gracias por tu compra. ¡Pedido realizado!");
        cart = [];
        saveCart();
        updateCart();
    } else {
        alert("Tu carrito está vacío.");
    }
});


updateCart();

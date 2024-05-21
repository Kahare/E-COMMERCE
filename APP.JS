// APP.js

// Define products array
const products = [
    { id: 1, name: 'Product 1', price: 19.99, quantity: 10 },
    { id: 2, name: 'Product 2', price: 29.99, quantity: 8 },
    { id: 3, name: 'Product 3', price: 39.99, quantity: 5 },
    { id: 4, name: 'Product 4', price: 49.99, quantity: 2 }
];

// Define cart array
let cart = [];

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        if (cartItem.quantity < product.quantity) {
            cartItem.quantity++;
        } else {
            alert('Not enough stock');
        }
    } else {
        cart.push({ productId: product.id, quantity: 1 });
    }

    updateCartCount();
    displayCart();
}

// Function to update cart count
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount;
}

// Function to display cart
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return;

        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            ${product.name} - $${product.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}
            <button onclick="updateCartQuantity(${product.id}, -1)">-</button>
            <button onclick="updateCartQuantity(${product.id}, 1)">+</button>
            <button onclick="removeFromCart(${product.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    document.getElementById('cart-total').innerText = total.toFixed(2);
}

// Function to update cart quantity
function updateCartQuantity(productId, change) {
    const cartItem = cart.find(item => item.productId === productId);
    if (!cartItem) return;

    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (cartItem.quantity + change > product.quantity || cartItem.quantity + change <= 0) {
        alert('Invalid quantity');
    } else {
        cartItem.quantity += change;
    }

    updateCartCount();
    displayCart();
}

// Function to remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    updateCartCount();
    displayCart();
}

// Initialize
updateCartCount();
displayCart();

document.addEventListener('DOMContentLoaded', () => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productGrid = document.getElementById('product-grid');
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close');
    const addProductForm = document.getElementById('add-product-form');

    function saveProducts() {
        localStorage.setItem('products', JSON.stringify(products));
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addProduct(product) {
        products.push(product);
        saveProducts();
        renderProducts();
    }

    function addToCart(product) {
        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveCart();
        updateCart();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        saveCart();
        updateCart();
    }

    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                <button class="remove" data-index="${index}">Remove</button>
                <button class="decrease" data-index="${index}">-</button>
                <button class="increase" data-index="${index}">+</button>
            `;
            cartItemsElement.appendChild(li);
            total += item.price * item.quantity;
        });
        cartTotalElement.textContent = total.toFixed(2);
        cartCountElement.textContent = cart.length;
    }

    function renderProducts() {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const div = document.createElement('div');
            div.className = 'product';
            div.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
            `;
            productGrid.appendChild(div);
        });
    }

    addProductForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('product-name').value;
        const price = parseFloat(document.getElementById('product-price').value);
        const image = document.getElementById('product-image').value;
        addProduct({ name, price, image });
        addProductForm.reset();
    });

    productGrid.addEventListener('click', e => {
        if (e.target.classList.contains('add-to-cart')) {
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));
            addToCart({ name, price });
        }
    });

    cartItemsElement.addEventListener('click', e => {
        if (e.target.classList.contains('remove')) {
            const index = e.target.getAttribute('data-index');
            removeFromCart(index);
        } else if (e.target.classList.contains('decrease')) {
            const index = e.target.getAttribute('data-index');
            cart[index].quantity--;
            if (cart[index].quantity === 0) {
                removeFromCart(index);
            } else {
                saveCart();
                updateCart();
            }
        } else if (e.target.classList.contains('increase')) {
            const index = e.target.getAttribute('data-index');
            cart[index].quantity++;
            saveCart();
            updateCart();
        }
    });

    document.getElementById('cart-icon').addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', e => {
        if (e.target == cartModal) {
            cartModal.style.display = 'none';
        }
    });

    renderProducts();
    updateCart();
});

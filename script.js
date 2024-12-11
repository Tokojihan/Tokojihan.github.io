document.addEventListener("DOMContentLoaded", function () {
    // Keranjang Belanja
    const cart = [];

    // Fungsi untuk memperbarui harga total
    function updateTotalPrice(quantityInput, unitPrice, totalPriceElement) {
        const quantity = parseInt(quantityInput.value);
        const totalPrice = unitPrice * quantity;
        totalPriceElement.textContent = totalPrice.toLocaleString(); // Format angka
    }

    // Fungsi untuk menambah item ke keranjang
    function addToCart(name, price, quantity) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
        updateCartUI();
    }

    // Fungsi untuk menghapus item dari keranjang
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartUI();
    }

    // Fungsi untuk memperbarui UI keranjang
    function updateCartUI() {
        const cartContainer = document.querySelector('.cart-container');
        cartContainer.innerHTML = '<h3>Keranjang Belanja</h3>';
        if (cart.length === 0) {
            cartContainer.innerHTML += '<p>Keranjang kosong</p>';
            return;
        }

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} (x${item.quantity})</p>
                <p>Total: Rp ${item.quantity * item.price}</p>
                <button class="remove" data-index="${index}">Hapus</button>
            `;
            cartContainer.appendChild(cartItem);
        });

        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartContainer.innerHTML += `<p><strong>Total Keseluruhan: Rp ${totalPrice}</strong></p>`;
    }

    // Fungsi untuk menangani tombol tambah/kurang jumlah produk
    function handleQuantityChange(buttons, quantityInput, unitPrice, totalPriceElement) {
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                let quantity = parseInt(quantityInput.value);
                if (button.classList.contains('plus')) {
                    quantity += 1;
                } else if (button.classList.contains('minus') && quantity > 1) {
                    quantity -= 1;
                }
                quantityInput.value = quantity;
                updateTotalPrice(quantityInput, unitPrice, totalPriceElement);
            });
        });

        quantityInput.addEventListener('input', () => {
            let quantity = parseInt(quantityInput.value);
            if (quantity < 1) {
                quantity = 1;
            }
            quantityInput.value = quantity;
            updateTotalPrice(quantityInput, unitPrice, totalPriceElement);
        });
    }

    // Menambahkan event listeners untuk produk
    const produkItems = document.querySelectorAll('.produk-item');
    produkItems.forEach(produk => {
        const minusButton = produk.querySelector('.minus');
        const plusButton = produk.querySelector('.plus');
        const quantityInput = produk.querySelector('.quantity');
        const unitPriceElement = produk.querySelector('.unit-price');
        const totalPriceElement = produk.querySelector('.total-price');
        const addButton = produk.querySelector('.add-to-cart');

        const unitPrice = parseInt(unitPriceElement.textContent.replace('Rp', '').replace('.', ''));

        // Menangani perubahan kuantitas
        handleQuantityChange([minusButton, plusButton], quantityInput, unitPrice, totalPriceElement);

        // Menangani penambahan produk ke keranjang
        addButton.addEventListener('click', () => {
            const productName = produk.querySelector('h3').textContent;
            const quantity = parseInt(quantityInput.value);
            addToCart(productName, unitPrice, quantity);
            alert(`${productName} berhasil ditambahkan ke keranjang!`);
        });
    });

    // Mengatur event listener untuk ikon menu burger
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Menampilkan keranjang di bagian bawah
    const cartContainer = document.createElement('div');
    cartContainer.classList.add('cart-container');
    document.body.appendChild(cartContainer);
    updateCartUI(); // Update tampilan keranjang ketika halaman pertama kali dimuat

    // Menghapus item dari keranjang
    cartContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove')) {
            const index = parseInt(event.target.dataset.index, 10);
            removeFromCart(index);
        }
    });
});

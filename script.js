// Script untuk fitur interaktif

// 1. Fitur Tombol Tambah/Kurang Jumlah Produk
document.querySelectorAll('.quantity-control').forEach(control => {
    const minusBtn = control.querySelector('.minus');
    const plusBtn = control.querySelector('.plus');
    const quantityInput = control.querySelector('.quantity');

    minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });
});

// 2. Fitur Tambah ke Keranjang
const cart = [];
document.querySelectorAll('.add-to-cart').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const productCard = btn.parentElement;
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('p').textContent;
        const quantity = productCard.querySelector('.quantity').value;

        cart.push({
            name: productName,
            price: productPrice,
            quantity: parseInt(quantity),
        });

        alert(`${productName} berhasil ditambahkan ke keranjang!`);
        console.log(cart); // Untuk debugging
    });
});

// Pilih elemen burger menu dan navigasi
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

// Tambahkan event listener untuk toggle class "show"
menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});
// Pilih semua produk
const produkItems = document.querySelectorAll('.produk-item');

produkItems.forEach(produk => {
    const minusButton = produk.querySelector('.minus');
    const plusButton = produk.querySelector('.plus');
    const quantityInput = produk.querySelector('.quantity');
    const unitPriceElement = produk.querySelector('.unit-price');
    const totalPriceElement = produk.querySelector('.total-price');

    // Ambil harga per satuan
    const unitPrice = parseInt(unitPriceElement.textContent);

    // Fungsi untuk memperbarui total harga
    const updateTotalPrice = () => {
        const quantity = parseInt(quantityInput.value);
        const totalPrice = unitPrice * quantity;
        totalPriceElement.textContent = totalPrice.toLocaleString(); // Format angka
    };

    // Event listener tombol minus
    minusButton.addEventListener('click', () => {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
            updateTotalPrice();
        }
    });

    // Event listener tombol plus
    plusButton.addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
        updateTotalPrice();
    });

    // Event listener perubahan input jumlah secara manual
    quantityInput.addEventListener('input', () => {
        if (quantityInput.value < 1) {
            quantityInput.value = 1; // Minimal 1
        }
        updateTotalPrice();
    });
});

    // Ambil elemen yang diperlukan
    const addButtons = document.querySelectorAll('.add-to-cart');
    const minusButtons = document.querySelectorAll('.minus');
    const plusButtons = document.querySelectorAll('.plus');
    const quantities = document.querySelectorAll('.quantity');
    const totalPrices = document.querySelectorAll('.total-price');
    const unitPrices = document.querySelectorAll('.unit-price');

    // Menambah jumlah produk
    plusButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const quantityInput = quantities[index];
            let quantity = parseInt(quantityInput.value);
            quantityInput.value = quantity + 1;
            updateTotalPrice(index);
        });
    });

    // Mengurangi jumlah produk
    minusButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const quantityInput = quantities[index];
            let quantity = parseInt(quantityInput.value);
            if (quantity > 1) {
                quantityInput.value = quantity - 1;
            }
            updateTotalPrice(index);
        });
    });

    // Fungsi untuk memperbarui harga total berdasarkan jumlah
function updateTotalPrice(index) {
    const quantity = parseInt(quantities[index].value);
    const unitPrice = parseInt(unitPrices[index].textContent.replace('Rp', '').replace('.', '')); // Pastikan ini benar
    const totalPrice = quantity * unitPrice;

    // Perbarui teks harga total dengan format angka
    totalPrices[index].textContent = totalPrice.toLocaleString();
}

// Menambah jumlah produk
plusButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const quantityInput = quantities[index];
        let quantity = parseInt(quantityInput.value);
        quantityInput.value = quantity + 1;

        // Perbarui harga total
        updateTotalPrice(index);
    });
});

// Mengurangi jumlah produk
minusButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const quantityInput = quantities[index];
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantityInput.value = quantity - 1;
        }

        // Perbarui harga total
        updateTotalPrice(index);
    });
});


    // Menambahkan produk ke keranjang
addButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const productName = document.querySelectorAll('.produk-item h3')[index].textContent;
        const productPrice = totalPrices[index].textContent; // Ambil harga yang sudah diperbarui
        const quantity = quantities[index].value;

        // Simpan data ke keranjang
        const item = {
            name: productName,
            price: productPrice,
            quantity: parseInt(quantity),
        };
        cart.push(item);

        // Beri notifikasi
        alert(`${productName} berhasil ditambahkan ke keranjang dengan harga total ${productPrice}`);
        console.log(cart); // Untuk debugging
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartContainer = document.createElement('div');
    cartContainer.classList.add('cart-container');
    document.body.appendChild(cartContainer);

    const updateCartUI = () => {
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
    };

    const addToCart = (name, price, quantity) => {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
        updateCartUI();
    };

    const removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCartUI();
    };

    document.querySelectorAll('.produk-item').forEach(item => {
        const addButton = item.querySelector('.add-to-cart');
        const quantityInput = item.querySelector('.quantity');
        const productName = item.querySelector('h3').textContent;
        const productPrice = parseInt(item.querySelector('.unit-price').textContent, 10);

        addButton.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value, 10);
            if (quantity > 0) {
                addToCart(productName, productPrice, quantity);
                alert(`${quantity} ${productName} berhasil ditambahkan ke keranjang!`);
            } else {
                alert('Jumlah harus lebih dari 0!');
            }
        });
    });

    cartContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove')) {
            const index = parseInt(event.target.dataset.index, 10);
            removeFromCart(index);
        }
    });
});

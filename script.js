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

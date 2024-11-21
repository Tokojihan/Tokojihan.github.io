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

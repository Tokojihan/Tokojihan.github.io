// Deklarasi elemen dan variabel
const addButtons = document.querySelectorAll('.add-to-cart');
const minusButtons = document.querySelectorAll('.minus');
const plusButtons = document.querySelectorAll('.plus');
const quantities = document.querySelectorAll('.quantity');
const totalPrices = document.querySelectorAll('.total-price');
const unitPrices = document.querySelectorAll('.unit-price');
const cart = []; // Keranjang belanja

// Fungsi untuk memperbarui harga total
function updateTotalPrice(index) {
    const quantity = parseInt(quantities[index].value);
    const unitPrice = parseInt(unitPrices[index].textContent.replace(/[^\d]/g, ''));
    const totalPrice = quantity * unitPrice;

    // Format angka dan perbarui elemen total harga
    totalPrices[index].textContent = totalPrice.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });
}

// Event listener tombol tambah jumlah
plusButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const quantityInput = quantities[index];
        quantityInput.value = parseInt(quantityInput.value) + 1;

        // Perbarui harga total
        updateTotalPrice(index);
    });
});

// Event listener tombol kurang jumlah
minusButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const quantityInput = quantities[index];
        if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;

            // Perbarui harga total
            updateTotalPrice(index);
        }
    });
});

// Event listener untuk tombol "Tambah ke Keranjang"
addButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const productName = document.querySelectorAll('.produk-item h3')[index].textContent;
        const productPrice = totalPrices[index].textContent;
        const quantity = parseInt(quantities[index].value);

        // Tambahkan produk ke keranjang
        cart.push({
            name: productName,
            price: productPrice,
            quantity: quantity,
        });

        // Tampilkan notifikasi dan log keranjang
        alert(`${productName} berhasil ditambahkan ke keranjang dengan harga total ${productPrice}`);
        console.log(cart); // Debugging isi keranjang
    });
});

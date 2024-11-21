// Sederhana untuk menangani klik pada tombol "Tambah ke Keranjang"
const addToCartButtons = document.querySelectorAll('.product-item button');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Produk telah ditambahkan ke keranjang!');
    });
});

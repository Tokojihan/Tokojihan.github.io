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
        const unitPrice = parseInt(unitPrices[index].innerText.replace('Rp', '').replace('.', ''));
        const totalPrice = quantity * unitPrice;
        totalPrices[index].innerText = 'Rp ' + totalPrice.toLocaleString();
    }

    // Menambahkan produk ke keranjang
    addButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const productName = document.querySelectorAll('.produk-item h3')[index].innerText;
            const productPrice = totalPrices[index].innerText;
            alert(`${productName} telah ditambahkan ke keranjang dengan harga ${productPrice}`);
        });
    });
    function tambahProduk(nama, harga, gambar) {
        const produkContainer = document.querySelector('#produk-list'); // Kontainer untuk produk

        const produkBaru = document.createElement('div');
        produkBaru.classList.add('produk-item');
        produkBaru.innerHTML = `
            <img src="${gambar}" alt="${nama}">
            <h3>${nama}</h3>
            <p>Harga per satuan: <span class="unit-price">${harga}</span></p>
            <p>Total Harga: Rp <span class="total-price">${harga}</span></p>
            <div class="quantity-control">
                <button class="minus">-</button>
                <input type="number" value="1" class="quantity" min="1">
                <button class="plus">+</button>
            </div>
            <button class="btn add-to-cart">Tambah ke Keranjang</button>
        `;
        produkContainer.appendChild(produkBaru);
        updateTotalPrice(produkContainer.children.length - 1); // Update harga total setelah menambah produk baru
    }

    // Contoh menambahkan produk
    tambahProduk('Minyak Goreng', 30000, 'minyak.jpg');

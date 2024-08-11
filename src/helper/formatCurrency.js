

// untuk mengatur titik setiap 3 digit angka
function formatCurrency(input) {
    let value = String(input);

    // Menghapus semua karakter selain digit
    value = value.replace(/\D/g, '');

    // Menambahkan titik setiap tiga digit dari belakang
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return value
}

export default formatCurrency;
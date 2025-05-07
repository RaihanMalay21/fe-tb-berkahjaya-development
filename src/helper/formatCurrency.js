

// untuk mengatur titik setiap 3 digit angka
function formatCurrency(input) {
    if (input === null || input === undefined || input === '') {
        return ''; // Mengembalikan string kosong jika input tidak valid
    }

    let value = String(input);

    // Menghapus semua karakter selain digit
    value = value.replace(/\D/g, '');

    // Menambahkan titik setiap tiga digit dari belakang
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return value
}


console.log(formatCurrency(100000000))

export default formatCurrency;
import axios from "axios";
import { useNavigate } from "react-router-dom";

// fungsi untuk menghapus barang
function DeleteBarang(id, nama_barang, harga_barang, harga_beli, image, kode) {
    // inialisasi navigate
    const navigate = useNavigate();
    
    const data = {
        id: id,
        nama_barang: nama_barang,
        harga_barang: harga_barang,
        harga_beli: harga_beli,
        image: image,
        kode: kode,
    };

    const config = {
        headers : {
            'Content-Type': 'application/json',
        },
    };

    axios.post('http://localhost:8080/berkahjaya/adminside/barang/deletebarang', data, config)
    .then(respose => {
        console.log(respose.data);

        // malakukan reload halaman web
        window.location.reload();
    }) 
    .catch(error => {
        console.error(error);
        // Penanganan kesalahan khusus
        if (error.response && error.response.status === 401) {
            // Menavigasi ke halaman login jika tidak terotorisasi
            navigate('/login');
            return; // Menghentikan eksekusi kode selanjutnya
        };
    });

};

export default DeleteBarang;
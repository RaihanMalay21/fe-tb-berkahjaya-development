import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
import React, { useState } from 'react';
import "../../App.css";
import formatCurrency from '../../helper/formatCurrency';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactFileReader from "react-file-reader"
import axios from 'axios';

function UpdateBarang() {
    // mengambil value dari uselocation redirect from '/adminside/barang'
    const location = useLocation();
    const {id, nama_barang, harga_barang, harga_beli, image, kode} = location.state;

    // usestate untuk menyimpan value untuk dikirim ke server
    const [formValue, setFormValue] = useState({
        id: id,
        nama_barang: nama_barang,
        harga_barang: harga_barang,
        harga_beli: harga_beli,
        image: '', 
        path_image: image,
        kode: kode
    })
    console.log(formValue)

    // usestate untuk menyiman file reader 
    const [readfile, setreadfile] = useState({
        image_read: ''
    });

    // fungsi untuk menyimpan input ke dalam usestate value
    const handleInput = (event) => {
        const {name, value} = event.target;

        const formattedValue = (name === "harga_beli" || name === "harga_barang") ? formatCurrency(value) : value;

        // menyimpan name dan value ke dalam usesate fromValue
        setFormValue({
            ...formValue,
            [name]: formattedValue
        });
    };
    
     // fungsi untuk membaca gambar dan menyimpan ke use state
    const handleFiles = (files) => {
        const file = files[0];
        const reader = new FileReader();
        // membaca gambar dan menyimpannya di setreadfile
        reader.onloadend = () => {
            setreadfile({
                ...readfile,
                image_read: reader.result
            });      
        };
        reader.readAsDataURL(files[0]);
    
        // menyimpan file ke usesate formvalue 
        setFormValue({
            ...formValue,
            image: file
        })
    };

    // fungsi untuk membuat default image
    let defaultImagePath;
    if (readfile.image_read !== "") {
        defaultImagePath = readfile.image_read;
    } else {
        defaultImagePath = require(`../../images/${image}`);
    };

    // inialisasi fungsi redairect
    const navigate = useNavigate()
    //post ke server
    const handleUpdate = () => {

        // Melepas referensi gambar dari DOM sebelum menghapusnya
        const imgElement = document.getElementById('image-preview');
        if (imgElement) {
            imgElement.src = '';
        }

        setTimeout(() => {
            const config = {
                headers : {
                  'Content-Type' : 'multipart/form-data'  
                },
                withCredentials : true,
            };
            axios.put('http://localhost:8080/admin/berkahjaya/adminside/barang/updatebarang', formValue, config)
                .then(response => {
                    console.log(response.data);
                    // redirect ke halaman barang
                    navigate("/berkahjaya/adminside/barang");
                })
                .catch(error => {
                    console.error(error);
    
                    // Penanganan kesalahan khusus
                    if (error.response && error.response.status === 401) {
                        // Menavigasi ke halaman login jika tidak terotorisasi
                        navigate('/login');
                        return; // Menghentikan eksekusi kode selanjutnya
                    };
                })
        }, 100)

    };

    const style = {
        NameInput: {
            width: '20%',
            textAlign: 'start'
        }
    }

    return(
        <div className='container-main-update'>
            <ul class="list-group">
                <li class="list-group-item active text-center" aria-current="true" style={{ backgroundColor: '#006664'}}><h2>Barang</h2></li>
                <li class="list-group-item text-center">
                <ReactFileReader handleFiles={handleFiles}>
                    {formValue.path_image && <img class='img-hadiah-update'  src={defaultImagePath} alt='selected'/>}
                </ReactFileReader>
                </li>
                <li class="list-group-item">
                    <span class="input-group-text">
                        <h8 style={style.NameInput}>NAMA BARANG</h8><input className='input-barang-update' placeholder='Nama Barang' type='text' name='nama_barang' onChange={handleInput} value={formValue.nama_barang} style={{marginLeft: '6rem'}}/>
                    </span>
                </li>
                <li class="list-group-item">
                <span class="input-group-text">
                    <h8 style={style.NameInput}>HARGA BARANG</h8><input className='input-barang-update' placeholder='Harga Barang' type='text' name='harga_barang'  onChange={handleInput} value={formValue.harga_barang} style={{marginLeft: '6rem'}}/>
                </span>
                </li>
                <li class="list-group-item">
                <span class="input-group-text">
                    <h8 style={style.NameInput}>HARGA BELI</h8><input className='input-barang-update' placeholder='Harga Beli' type='text' name='harga_beli'  onChange={handleInput} value={formValue.harga_beli} style={{marginLeft: '6rem'}}/>
                </span>
                </li>
                <li class="list-group-item">
                <span class="input-group-text">
                    <h8 style={style.NameInput}>KODE</h8><input className='input-barang-update' placeholder='Kode Barang' type='number' name='kode' onChange={handleInput} value={formValue.kode} style={{marginLeft: '6rem'}}/>
                </span>
                </li>
                <button onClick={handleUpdate} type="button" class="btn btn-primary" style={{width: '100%', padding: '7.5px 0', fontSize: '20px', backgroundColor: '#006664'}}>Update</button>
            </ul>
        </div>
    )
};

export default UpdateBarang;
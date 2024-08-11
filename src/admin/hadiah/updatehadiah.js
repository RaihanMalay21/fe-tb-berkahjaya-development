import 'bootstrap/dist/css/bootstrap.min.css';
import {useLocation, useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import axios from "axios";
import ReactFileReader from 'react-file-reader';
import formatCurrency from '../../helper/formatCurrency';
import "../../App";

function UpdateHadiah() {
    const location = useLocation();
    const { ID, image, nama_barang, harga_hadiah, poin, deskripsi } = location.state;
    // inialisai function rediarect
    const navigate = useNavigate();
  
    // Panggil useState tanpa kondisi
    const [formValue, setFormValue] = useState({
      ID: ID,
      image: '',
      path_image: image,
      nama_barang: nama_barang,
      harga_hadiah: harga_hadiah,
      poin: poin,
      deskripsi: deskripsi
    });
  
    // usestate untuk read file
    const [readfile, setreadfile] = useState ({
      image_read: image
    });
  
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
    
        // menyimpan file ke setformvalue
        setFormValue({
            ...formValue,
            image: file,
        })
    };
    
  
    const InputChange = (event) => {
      const { name, value } = event.target;

      const formattedValue = name === "harga_hadiah" ? formatCurrency(value) : value;

      setFormValue({
        ...formValue,
        [name]: formattedValue
      });
    }
  
    // Define default image path
    let defaultImagePath;  
    if (readfile.image_read !== image) {
      defaultImagePath = readfile.image_read;  
    } else {
      defaultImagePath = require(`../../images/${image}`);
    };
    
    
    const PostUpdate = () => {
      console.log(formValue)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
      };

      axios.post('http://localhost:8080/berkahjaya/adminside/hadiah/updatehadiah', formValue, config)
        .then(response => {
          console.log(response);
          // melakukan redirect
          navigate("/berkahjaya/adminside/hadiah");
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
      
    const style = {
      NameInput: {
        width: '20%',
        textAlign: 'start'
      }
    }
  
    return (
      <div class='container-main-update'>
        <form enctype="multipart/form-data">
          <ul class="list-group">
            <li class="list-group-item active text-center" aria-current="true" style={{ backgroundColor: '#006664'}}><h1>Hadiah</h1></li>
            <li class="list-group-item text-center">
              <ReactFileReader handleFiles={handleFiles}>
                  {formValue.path_image && <img class='img-hadiah-update'  src={defaultImagePath} alt='selected'/>}
              </ReactFileReader>
            </li>
            <li class="list-group-item">
              <span class="input-group-text">
                  <h8 style={style.NameInput}>NAMA BARANG</h8><input className='input-hadiah-update' placeholder="Nama Barang"  type='text' name='nama_barang' onChange={InputChange} value={formValue.nama_barang} />
              </span>
            </li>
            <li class="list-group-item">
            <span class="input-group-text">
              <h8 style={style.NameInput}>HARGA HADIAH</h8><input className='input-hadiah-update' placeholder="Harga Hadiah"  type='text' name='harga_hadiah' onChange={InputChange} value={formValue.harga_hadiah} />
            </span>
            </li>
            <li class="list-group-item">
              <span class="input-group-text">
                <h8 style={style.NameInput}>POIN</h8><input className='input-hadiah-update' placeholder="Poin" type='number' name='poin' onChange={InputChange} value={formValue.poin} disabled/>
              </span>
            </li>
            <li class="list-group-item">
              <span class="input-group-text">
                <textarea className='input-hadiah-update' placeholder="Deskripsi" type='text' name='deskripsi' onChange={InputChange} value={formValue.deskripsi} />
              </span>
            </li>
          </ul>
          <li class="list-group-item">
            <button onClick={PostUpdate} type="button" class="btn" style={{width: '100%', padding: '7.5px 0', fontSize: '20px', backgroundColor: '#006664', color: 'white'}}>Update</button>
          </li>
        </form>
      </div>
    );
  }

  export default UpdateHadiah;
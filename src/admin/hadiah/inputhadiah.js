import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import "../../App.css";
import formatCurrency from "../../helper/formatCurrency";
import { useNavigate } from "react-router-dom";
import SideBare from "../sideBare";
import { useDispatch, useSelector } from "react-redux";
import { postInputHadiah } from "../../actions/actionsPost";

function InputHadiah() {
    // inialisasi navigate atau redirect
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // state untuk  menyimpan nilai input
    const [formData, setFormData] = useState({
      image: '',
      nama_barang: '',
      harga_hadiah: '',
      desc: ''
    });

    // usestate untuk alert
    const [succesAlert, setSuccesAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [msg, setMsg] = useState('');
  
    // handler untuk mengubah nilai input saat ada perubahan
    const handleChange = (event) => {
      const {name, value} = event.target;

      // Format harga_hadiah
      const formattedValue = name === "harga_hadiah" ? formatCurrency(value) : value;

      setFormData({
        ...formData,
        [name]: formattedValue
      });

      console.log(formData)
    };
  
    // handler untuk mengirim formulir
    const { msgSuccess, msgError, errStatus } = useSelector((state) => state.inputHadiahState);

    useEffect(() => {
      if (msgSuccess) {
        setMsg(msgSuccess);
        setSuccesAlert(true);
        setFormData({
          image: '',
          nama_barang: '',
          harga_hadiah: '',
          desc: ''
        })
        // hide alert
        setTimeout(() => {
          setSuccesAlert(false);
        }, 2500); 
      }
      if (msgError) {
        console.error('Error:', msgError);
          if (errStatus === 401) {
            navigate('/login');
            return; 
        }
        setMsg(msgError);
        setErrorAlert(true);
        setTimeout(() => {
          setErrorAlert(false);
        }, 2500);
      }
    }, [msgSuccess, msgError, errStatus])

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const formData = new FormData(event.target); // membuat object formdata dari formulir
      dispatch(postInputHadiah(formData));
      // try {
      //   // kirim data menggunakan Axios
      //   const response = await axios.post('http://localhost:8080/admin/berkahjaya/adminside/hadiah/inputhadiah', formData, {
      //     headers : {
      //       'Content-Type' : 'multipart/form-data'
      //     },
      //     withCredentials: true,
      //   });
  
      //   console.log('Response:', response.data);
      //   // menampilkan response message used alert succes
      //   setMsg(response.data.message);
      //   setSuccesAlert(true);
      //   // hide alert
      //   setTimeout(() => {
      //     setSuccesAlert(false);
      //   }, 2500); 

      //   // mengatur kembali input setelah berhasil mengirimkan value
      //   setFormData({
      //     image: '',
      //     nama_barang: '',
      //     harga_hadiah: '',
      //     poin: '',
      //     desc: ''
      //   });
      // } catch (error) {
      //   console.error('Error:', error);

      //   // Penanganan kesalahan khusus
      //   if (error.response && error.response.status === 401) {
      //       // Menavigasi ke halaman login jika tidak terotorisasi
      //       navigate('/login');
      //       return; // Menghentikan eksekusi kode selanjutnya
      //   }
      //   // menampilakan response error used alert
      //   setMsg(error.response.data.message);
      //   setErrorAlert(true);
      //   // hide alert after 2,5 second
      //   setTimeout(() => {
      //     setErrorAlert(false);
      //   }, 2500);
      // }
    }
  
    const style = {
      container: {
        display: 'flex',
      },
      containerInputHadiah: {
        display: 'block',
        width: '100%',
        paddingLeft: '18%',
      }
    }
    return (
      <div style={style.container}>
        <SideBare/>
        <div style={style.containerInputHadiah}>
          <div className='container-main'>
            <div className="alert-container">
              {succesAlert && (
                <div class="alert alert-success d-flex align-items-center" role="alert">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                  </svg>
                  <div>
                      {msg}
                  </div>
              </div>
              )}

              {errorAlert && (
                <div className="alert alert-danger d-flex align-items-center justify-content-center" role="alert">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16" style={{ transform: 'scale(1.25)', marginRight: '7.5px'}}>
                  <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
                  <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                  </svg>
                  <div>
                      {msg}
                  </div>
              </div>
              )}
            </div>
            <div style={{width: '50%', margin: '0 auto', paddingTop: '2rem', backgroundColor: 'white', minHeight: '100vh', padding: '0 20px', zIndex: '9999', borderRadius: '10px', boxShadow: '0 0 10px 0 rgb(0, 0, 0, 0.7'}}>
              <h2 style={{ marginBottom: '4rem', paddingTop: '2rem', color: '#006664', fontWeight: 'bold', fontFamily: 'constania'}}>Tambah Hadiah</h2>
              <form className='form-input-hadiah' encType="multipart/form-data" onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="formFile" class="form-label">Input Foto Barang</label>
                    <input class="form-control" type="file" id="formFile" name="image" onChange={handleChange} value={formData.image} required/>
                </div>
                <div class="mb-3">
                  <label for="exampleInputNB" class="form-label">Nama Barang</label>
                  <input class="form-control" type="text" name="nama_barang" onChange={handleChange} value={formData.nama_barang}  aria-label="default input example" required/>
                </div>
                <div class="mb-3">
                  <label for="exampleInputPoin"  class="form-label">Harga Hadiah</label>
                  <input class="form-control" onChange={handleChange} type="text" name="harga_hadiah" value={formData.harga_hadiah} aria-label="default input example" required/>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Deskripsi Hadiah</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="desc" onChange={handleChange} value={formData.desc} required></textarea>
                </div>
                <button type="submit" class="btn" style={{width: "100%", fontSize: '22.5px', marginTop: '1rem', backgroundColor: '#006664', color: 'white'}}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default InputHadiah;
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../../App.css";
import formatCurrency from '../../helper/formatCurrency';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../component/navbar';
import SideBare from '../sideBare';
import { useDispatch, useSelector } from 'react-redux';
import { postInputBarang } from "../../actions/actionsPost";

function InputBarang() {
    // inialisasi navigate atau redirect
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formValue, setFormValue] = useState({
        nama_barang: '',
        harga_barang: '',
        harga_beli: '',
        kode: '',
        image: ''
    }
    );
    // usesatete untuk alert
    const [alertSucces, setAlertSucces] = useState(false)
    const [alertError, setAlertError] = useState(false)
    // usesate untuk message response
    const [message, setMessage] = useState('')

    // mengambil nilai dari form input
    const handleChange = (event) => {
        const {name, value} = event.target;

        const formattedValue = (name === "harga_beli" || name === "harga_barang") ? formatCurrency(value) : value;

        setFormValue({
            ...formValue,
            [name]: formattedValue
        })
    };

    const { msgSuccess, msgError, responseStatus, errValidateField } = useSelector((state) => state.inputBarangState);
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target); // membuat object formdata dari formulir
        
        dispatch(postInputBarang(formData));
        // try {
            // const config = {
            //     headers : {
            //         "Content-Type": "multipart/form-data"
            //     },
            //     withCredentials: true,
            // };
            // const response = await axios.post("http://localhost:8080/admin/berkahjaya/adminside/barang/inputbarang", formData, config);

            // // ambil message response succes
            // setMessage(response.data);
            // // menampilkan alert succes
            // setAlertSucces(true);
            // // set time untuk alert
            // setTimeout(() => {
            //     setAlertSucces(false);
            // }, 2500);

            // mengosongkan kembali usesate
            // setFormValue({
            //     ...formValue,
            //     nama_barang: '',
            //     harga_barang: '',
            //     harga_beli: '',
            //     kode: '',
            //     image: '',
            // });
        // } catch(error) {
        //     console.error(error);

        //     // Penanganan kesalahan khusus
        //     if (error.response && error.response.status === 401) {
        //         // Menavigasi ke halaman login jika tidak terotorisasi
        //         navigate('/login');
        //         return; // Menghentikan eksekusi kode selanjutnya
        //     }

        //     // ambil pesan error
        //     setMessage(error.response.data.message);
        //     // tampilkan alert error
        //     setAlertError(true);
        //     // hide after 2.5 second
        //     setTimeout(() => {
        //         setAlertError(false);
        //     }, 2500);

        // };
    };

    // handle untuk menangani response dari request to servser
    useEffect(() => {
        if (msgSuccess && responseStatus === 200) {
            setMessage(msgSuccess);
            setAlertSucces(true);
            setTimeout(() => {
                setAlertSucces(false);
            }, 2500);

            // kosongkan data 
            setFormValue({
                ...formValue,
                nama_barang: '',
                harga_barang: '',
                harga_beli: '',
                kode: '',
                image: '',
            });
        };
        if (msgError) {
            console.log("Error:", msgError);
            setMessage(msgError);
            setAlertError(true);
            setTimeout(() => {
                setAlertError(false);
            }, 2500);
            if (responseStatus === 401) {
                navigate('/login');
                return; 
            }
        }
    }, [msgSuccess, msgError, responseStatus, errValidateField])


    const style = {
        container: {
            display: 'flex',
            fontFamily: 'arial, sans-serif'
        },
        containerBodyInput: {
            width: '100%',
            paddingLeft: '18%',
            margin: '0 auto'
        },
        bodyInput: {
            width: '50%',
            backgroundColor: 'white',
            minHeight: '100vh',
            margin: '0 auto',
            borderRadius: '10px',
            padding: '0 20px',
            zIndex: '9999',
            boxShadow: '0 0 10px 0 rgb(0, 0, 0, 0.7',
        }
    }
    
    return (
        <div style={style.container}>
            <SideBare/>
            <div className="alert-container">
                { alertSucces && (
                    <div class="alert alert-success d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                        </svg>
                        <div>
                            {message}
                        </div>
                    </div>
                )}

                { alertError && (
                    <div className="alert alert-danger d-flex align-items-center justify-content-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16" style={{ transform: 'scale(1.25)', marginRight: '7.5px'}}>
                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                        </svg>
                        <div>
                            {message}
                        </div>
                    </div>
                )}
            </div>
            <div style={style.containerBodyInput}>
                <div className='container-main'>
                    <div style={style.bodyInput}>
                        <h2 style={{ marginBottom: '4rem', paddingTop: '2rem', color: '#006664', fontWeight: 'bold', fontFamily: 'constania'}}>Tambah Barang</h2>
                        <form encType="multipart/form-data" onSubmit={handleSubmit}>
                            <div class="mb-3">
                                <label for="exampleInputNB" class="form-label">Nama Barang</label>
                                <input class="form-control"  type="text" name="nama_barang" onChange={handleChange} value={formValue.nama_barang} aria-label="default input example" required/>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="exampleInputharga" class="form-label">Harga Barang</label>
                                <input class="form-control" type="text" name='harga_barang' onChange={handleChange} value={formValue.harga_barang}  id="exampleInputharga" required/>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="exampleInputharga" class="form-label">Harga Beli</label>
                                <input class="form-control" type="text" name='harga_beli' onChange={handleChange} value={formValue.harga_beli} id="exampleInputharga" required/>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="exampleInputkode" class="form-label">Kode Barang</label>
                                <input  class="form-control" type="number" name='kode' onChange={handleChange} value={formValue.kode} id="exampleInputkode" required/>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="formFile" class="form-label">Foto Barang</label>
                                <input class="form-control" type="file" name='image' onChange={handleChange} value={formValue.image} id="formFile" required/>
                            </div>
                            <button type="submit" class="btn btn-secondary" style={{width: '100%', marginTop: '1rem', fontSize: '22.5px', backgroundColor: '#006664', color: 'white'}}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputBarang;
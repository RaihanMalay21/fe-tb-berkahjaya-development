import React, { useState, useEffect, useContext, createContext, useRef} from "react";
import "../App.css"
import axios from "axios";
import NavbarUser from "./navuser";
import Footer from "./footer";
import { ValueContext } from "../App";
import { useNavigate } from "react-router-dom";
import ClickOutSide from "../helper/clikOutSide";
// export const ValueContext = createContext(); 

export const ButtonLoginActiveContext = createContext();

function Home() {
    const [dataHadiah, setDataHadiah] = useState([]);
    const navigate = useNavigate();
    // const [ onLogin, setOnLogin ] = useState(true);
    const contextAllDataUsers = useContext(ValueContext);
    const { dataUser, onLogin } = contextAllDataUsers || {};
    const [ buttonLoginActive, setButtonLoginActive ] = useState(false);
    // image upload nota
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [ formData, setFormData ] = useState(new FormData());
    // message submit nota
    const [ notaAlertFail, setNotaAlertFail ] = useState(false);
    const [ notaAlertMessageFail, setNotaAlertMessageFail ] = useState("");
    const [ notaAlertSucces, setNotaAlertSucces ] = useState(false);
    const [ notaAlertMessageSucces, setNotaAlertMessageSucces ] = useState("");
    // useState untuk alert poin tidak cukup dan ensure change hadiah
    const [ alertEnsureChange, setAlertEnsureChange ] = useState(false);
    const [ alertPoinNotEnough, setAlertPoinNotEnough ] = useState(false);
    const [ data, setData ] = useState();
    // useRef untuk mengatatur model close when user  clik outside modal
    const modalRef = useRef(null);
    const [ hadiahHaveChange, setHadiahHaveChange ] = useState([]);

    ClickOutSide(modalRef, () => setAlertEnsureChange(false));

    // mengambil data hadiah yang telah di tukar dan tidak bisa di tukar kembali
    useEffect(() => {
        const fetchData = async () =>  {
            try {
                const response = await axios.get(`https://server-customer-tb-berkah-jaya-750892348569.us-central1.run.app/berkahjaya/gifts/have/change/user`, { withCredentials: true} )
                setHadiahHaveChange(response.data);
            } catch(error) {
                console.error(error.response);
            }
        }
        fetchData();
    }, [])
    console.log(hadiahHaveChange)
    // const handleClickOutside = (event) => {
    //     if( modalRef.current && !modalRef.current.contains(event.target)) {
    //         setAlertEnsureChange(false);
    //     } 
    // }

    // useEffect(() => {
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    // untuk mengatur lama dari activenya dari buttonLoginActive
    useEffect(() => {
        if (buttonLoginActive) {
            setTimeout(() => {
                setButtonLoginActive(false);     
            }, 1500)
        }
    }, [buttonLoginActive])

    // // get data user form server
    // useEffect(() => {
    //     const fetchData = async () =>  {
    //         try {
    //             const response = await axios.get("http://localhost:8080/berkahjaya/users/data", { withCredentials : true })
    //             setDataUser(response.data)
    //         } catch(error) {
    //             console.error(error.response);
    //             if (error.response && error.response.status === 401) {
    //                 setOnLogin(false);
    //             }
    //         }
    //     }
    //     fetchData();
    // }, []);

    // get data hadiah from server
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get(`https://server-customer-tb-berkah-jaya-750892348569.us-central1.run.app/berkahjaya/get/hadiah`)
                setDataHadiah(response.data);
            } catch(error) {
                console.error("error fetching data:", error)
            }
        };
        fetchData();
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
    
            const newFormData = new FormData();
            newFormData.append('file', file);
            setFormData(newFormData);
        }
    };
    
    
    const handleUploadNota = () => {
        setShowModal(true); // Example action when "Upload Nota" is clicked
    };

    const CloseUploadNota = () => {
        setShowModal(false);
        setImage(null);
    }

    const CancelUploadNota = () => {
        setImage(null);
        document.getElementById('input-file').value = ''; // Reset the input element
    };
    
     
    // submit nota 
    const submitNota = async (event) => {
        event.preventDefault();

        try{
            const config = {
                headers : {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            }

            const response = await axios.post("https://server-customer-tb-berkah-jaya-750892348569.us-central1.run.app/berkahjaya/scan/poin", formData, config);

            console.log(response.data);

            setImage(null);
            setShowModal(false);
            setNotaAlertSucces(true);
            setNotaAlertMessageSucces(response.data.message);

            setTimeout(() => {
                setNotaAlertSucces(false);
            }, 2500);
        } catch(error) {
            console.error(error);
            setImage(null)

            // Penanganan kesalahan khusus
            if (error.response && error.response.status === 401) {
                // Menavigasi ke halaman login jika tidak terotorisasi
                navigate('/login');
                return; // Menghentikan eksekusi kode selanjutnya
            }

            setShowModal(false);
            setNotaAlertFail(true);
            setNotaAlertMessageFail(error.response.data.message);

            setTimeout(() => {
                setNotaAlertFail(false);
            }, 2500);
        }
    } 

    // handle untuk menukarkan poin menjadi hadiah
    const handlePoinChangeToGift = async () => {
        console.log(data);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }

            const response = await axios.post("https://server-customer-tb-berkah-jaya-750892348569.us-central1.run.app/berkahjaya/tukar/poin/hadiah", data, config)
            
            console.log(response.data);
            window.location.reload();
        } catch(error) {
            console.error(error)
        }

    }

    // handle tukar hadiah
    const handleTukarHadiah = (id, nama_barang, poin, image, desc) => {
        if (!onLogin) {
            setButtonLoginActive(true);
            return
        } else if(dataUser.poin < poin) {
            setAlertPoinNotEnough(true);
            setTimeout(() => {
                setAlertPoinNotEnough(false);
            }, 1500)
            return
        } 
        setAlertEnsureChange(true);
        setData({
            ID: id, 
            nama_barang: nama_barang,
            Poin: poin, 
            Image: image,
            desc: desc,
        });
    }

    const style = {
        cardTitleStyle: {
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            height: '3em', // Adjust based on the line-height
            lineHeight: '1.5em',
            textAlign: 'start'
        },
        containerModalChangeGift: {
            width: '16rem',
            left: '50%',
            right: '50%',
            borderRadius: '5px',
            border: '1px solid white',
            padding: '1.5rem 0',
            position: 'fixed',
            top: '25%',
            zIndex: '9999',
            fontFamily: 'arial, sans-serif',
            backgroundColor: 'rgba(0, 102, 100, 0.9)',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 102, 100, 1)',
            color: 'white'
        },
        textComplate: {
            position: 'absolute',
            fontFamily: 'costania',
            top: '2px',/* Sesuaikan posisi vertikal */
            right: '2px',
            color: '#006664',
            zIndex: '10',
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: '4px',
        }
    }
    return (
        <ButtonLoginActiveContext.Provider value={ buttonLoginActive }>
            <div>
                { alertPoinNotEnough && (
                    <div class="alert" role="alert" style={{ border: '1px solid white', boxShadow: '0 4px 8px rgba(220, 53, 69, 1)',zIndex: '9999',backgroundColor: '#dc3545', color: 'white', position: 'fixed', top: '30%', width: '16rem', right: "50%", left: '42%', textAlign: "center"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" style={{ marginRight: '20px'}} fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                        Poin Anda Tidak Cukup!
                    </div>
                )}
                { alertEnsureChange && (
                    <div style={{ backgroundColor: 'white'}}>
                        <div class="alert alert-success" ref={modalRef} style={style.containerModalChangeGift}>
                            <h4 style={{ marginBottom: '25px' }}>Tukar Poin Anda </h4>
                            <img style={{ margin: '0 auto', width: '150px', height: '150px'}} src={require(`../images/${data.Image}`)} />
                            <h5 style={{ marginBottom: '25px', marginTop: '10px' }}>{data.Poin}</h5>
                            <div class="buttonTukarPoin">
                                <button onClick={() => {handlePoinChangeToGift()}} style={{ backgroundColor: 'rgb(251, 251, 0)', border: 'none', borderRadius: '5px', color: 'white', padding: '5px 50px'}}> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-coin" viewBox="0 0 16 16" style={style.logoUnderNavsvg}>
                                    <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z"/>
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <NavbarUser onUploadNota={handleUploadNota}/>
                <div className="container-home" style={ onLogin ? {paddingTop: '150px'} : {paddingTop: '110px'}}>
                    <div className="container-banner-promotion"> 
                        <div className="container-fill-benner">
                            <div className="container-main-promotion">
                                <img src={require("../images/main-benner.PNG")}/>
                            </div>
                            <div className="container-banner-promotion-child">
                                <div>
                                    <img src={require("../images/benner-child-1.PNG")}/>
                                </div>
                                <div>
                                    <img src={require("../images/benner-child-2.PNG")}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container-body-main">
                        <div class="container-main-fill">
                            <div class="row">
                                { dataHadiah.map((data, _) => (
                                    <div class="column-card">
                                        <a onClick={(e) =>{ 
                                             if (hadiahHaveChange.some(hadiah => hadiah.HadiahID === data.ID)) {
                                                e.preventDefault(); 
                                                return; 
                                              }
                                            handleTukarHadiah(data.ID, data.nama_barang, data.poin, data.image, data.desc)}}>
                                            <div className="card-hadiah" style={ hadiahHaveChange.some(hadiah => hadiah.HadiahID === data.ID) ? {opacity: "0.5"} : {}}>
                                                <div className="card-body-home">
                                                    <img src={require(`../images/${data.image}`)} className="image-card-home" alt="..."/>
                                                </div>
                                                { hadiahHaveChange.some(hadiah => hadiah.HadiahID === data.ID) && (
                                                    <div style={ style.textComplate}>
                                                        <h4 style={{  fontSize: '20px'}}>Complate</h4>
                                                    </div>
                                                )}
                                                <div class="card-body">
                                                    <h5 class="card-title" style={style.cardTitleStyle}>{data.nama_barang}</h5>
                                                    <div>
                                                        <p class="text-start mt-3">{data.poin} Poin</p>
                                                        <p class="text-start">Periode 26-01-2026</p> 
                                                        <p class="text-start" style={{ color: "#006664"}}>Bebas Pengambilan</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                )) }
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
                {showModal && (
                    <div className="container-model-inputNota">
                        <label for="input-file" id="drop-area">
                        <button onClick={CloseUploadNota} type="button" class="btn-close" aria-label="Close" style={{ position: 'absolute', top: '5px', right: '10px' }}></button>
                            <form encType="multipart/form-data">
                                <input type="file" accept="image/*" name="image" id="input-file" hidden onChange={handleImageUpload}/>
                            </form>
                            {!image && (
                                <div id="img-view">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="140" fill="#006664" class="bi bi-upload" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                                    </svg>
                                    <p style={{ marginTop: '5px', fontSize: '16px', padding: '0 15px'}}>1. Gambar Hanya Bisa Berjenis jpg, jpeg, png, gif, jpe<br/>2. Pastikan Nota Yang Anda Submit Telah Di Foto Oleh Penjaga Toko</p>
                                </div>
                            )}
                            {image && (
                                <div>
                                    <div id="uploaded-img" className="image-container">
                                        <img src={image} alt="Uploaded Nota" />
                                    </div>
                                    <div class="model-buttos-input-nota">
                                        <button onClick={submitNota} style={{marginRight: '1.5rem', backgroundColor: '#006664'}}>Submit</button>
                                        <button onClick={CancelUploadNota} style={{ backgroundColor: '#cec51cd7'}}>Cancel</button>
                                    </div>
                                </div>
                            )}
                        </label>
                    </div>
                )}
                { notaAlertFail && (
                    <div class="alert alert-danger d-flex align-items-center" role="alert" style={{ position: 'fixed', top: '2rem', zIndex: '1000', width: '100%', textAlign: "center",left: '50%', transform: 'translateX(-50%)'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16" style={{ marginRight: '1rem'}}>
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                        <div>
                            {notaAlertMessageFail}
                        </div>
                </div>
                )}
                { notaAlertSucces && (
                    <div class="alert alert-success d-flex align-items-center" role="alert" style={{ position: 'fixed', top: '2rem', zIndex: '1000', width: '100%', textAlign: "center",left: '50%', transform: 'translateX(-50%)'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16" style={{ marginRight: '1rem'}}>
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                        <div>
                            {notaAlertMessageSucces}
                        </div>
                    </div>
                )}
            </div>
        </ButtonLoginActiveContext.Provider>
    )
}

export default Home;
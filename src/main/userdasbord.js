import "../App.css"
import NavbarUser from "./navuser"
import Footer from "./footer";
import React,{ useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataProsesHadiah, fetchDataProsesPoin } from "../actions/actionsGet"
import { postChangePassword, postRemoveNotaNotValid } from "../actions/actionsPost"
import axios from "axios";
import { set } from "date-fns";

function DasbordUser() {
    const [ userProfile, setUserProfile ] = useState(true);
    const [ ProsesNota, setProsesNota ] = useState(false);
    const [ ProsesHadiah, setProsesHadiah ] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    // mengambil data user from redirect used useLocation
    const { username, email, whatshapp, poin } = location.state;

    // usestate untuk menampung value data user
    const [ dataUser, setDataUser ] = useState({
        username: username,
        email: email, 
        whatshapp: whatshapp,
        poin: poin,
    })

    const handleUserProfile = () => {
        setUserProfile(true);
        setProsesHadiah(false);
        setProsesNota(false);
    }

    const handleNotaProses = () => {
        setUserProfile(false);
        setProsesHadiah(false);
        setProsesNota(true);
    }

    const handleHadiahProses = () => {
        setUserProfile(false);
        setProsesNota(false);
        setProsesHadiah(true);
    }

    // function change password 
    const [ focusInputRepeatPassword, setFocusInputRepeatPassword ] = useState(false);
    const [ focusInputRepeatMessage, setFocusInputRepeatMessage ] = useState("");
    const [ focusInputCurrentPassword, setFocusInputCurrentPassword ] = useState(false);
    const [ focusInputCurrentPasswordMessage, setFocusInputCurrentPasswordMessage ] = useState("");
    const [ focusInputNewPassword, setFocusInputNewPassword ] = useState(false);
    const [ focusInputNewPasswordMessage, setFocusInputNewPasswordMessage ] = useState("");
    const [ alertSuccesChangePassword, setAlertSuccesChangePassword ] = useState(false);
    const [ alertMessageChangePassword, setMessageAlertChangePassword] = useState("");
    const inputRef = useRef(null);
    // retreaving data proses nota from server
    // const [ dataProseNota, setDataProsesNota ] = useState([]);
    // mengambiil data Proses hadiah from server
    // const [ dataProsesHadiah, setDataProsesHadiah ] = useState([]);

    const [ dataChangePassword, setDataChangePassword ] = useState({
        email: dataUser.email,
        passwordBefore: "",
        passwordNew: "",
        passwordNewRepeat: ""
    });

    const handleInputChangePassword = (e) => {
        const { name, value } = e.target;
        setDataChangePassword({
            ...dataChangePassword,
            [name] : value
        })
    }

    // request data Proses Hadiah ke server
    const { dataProsesHadiah, error } = useSelector((state) => state.dataProsesHadiahState);
    useEffect(() => {
        dispatch(fetchDataProsesHadiah());
    }, [dispatch]);
    console.log(error);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try{
    //             const response = await axios.get("http://localhost:8080/customer/berkahjaya/user/proses/hadiah", {withCredentials: true})
    //             setDataProsesHadiah(response.data);
    //         }catch(error){
    //             console.error(error.response);
    //         }
    //     }
    //     fetchData();
    // }, [])

    useEffect(() => {
        if (focusInputRepeatPassword && inputRef.current) {
            inputRef.current.focus();
        }
    }, [focusInputRepeatPassword]);

    // useEffect untuk mengsongkan field passwordNewRepeat ketika passwordNew dan passwordNewRepeat tidak sesuai
    useEffect(() => {
        if (focusInputRepeatPassword) {
            setDataChangePassword((prevData) => ({
                ...prevData,
                passwordNewRepeat : ""
            }))
        }
    }, [focusInputRepeatPassword]);

    // useEffect untuk mengsongkan field passwordBefore ketika passwordCurrent salah 
    useEffect(() => {
        if (focusInputCurrentPassword) {
            setDataChangePassword((prevData) => ({
                ...prevData,
                passwordBefore: ""
            }))
        }
    }, [focusInputCurrentPassword]);

    // mengsongkan kembali data usestate datachangepassword
    const RefresDataChangePassword = () => {
        setDataChangePassword((prevData) => ({
            ...prevData,
            passwordBefore: "",
            passwordNew: "",
            passwordNewRepeat: ""
        }))
    };

    // section handle post change password 
    const { responseSucces, errorField, errorMessage, errorCP } = useSelector((state) => state.changePasswordState)

    const submitChangePassword = async (e) => {
        e.preventDefault();
        if ( dataChangePassword.passwordNew !== dataChangePassword.passwordNewRepeat) {
            setFocusInputRepeatPassword(true);
            setFocusInputRepeatMessage("Password Baru Tidak Sesuai");
            dataChangePassword.passwordNewRepeat = "";
            return
        } else {
            const data = {
                email: dataChangePassword.email,
                passwordBefore: dataChangePassword.passwordBefore, 
                passwordNew: dataChangePassword.passwordNew   
            }
            dispatch(postChangePassword(data));
        }
    }

    useEffect(() => {
        if (responseSucces) {
            setFocusInputRepeatMessage(false);
            setFocusInputRepeatMessage("");
            RefresDataChangePassword();
            setAlertSuccesChangePassword(true);
            setMessageAlertChangePassword(responseSucces);

            setTimeout(() => {
                setAlertSuccesChangePassword(false);
            }, 2500);
        } else if (errorCP) {
            setFocusInputRepeatPassword(false);
            setFocusInputRepeatMessage("");
            console.error(error);

            if (errorField === "passwordBefore") {
                setFocusInputCurrentPassword(true);
                setFocusInputCurrentPasswordMessage(errorMessage);
                dataChangePassword.passwordBefore = "";
                return
            }

            if (errorField === "passwordNew") {
                setFocusInputNewPassword(errorField)
                setFocusInputNewPasswordMessage(errorMessage);
                dataChangePassword.passwordNew = "";
                dataChangePassword.passwordNewRepeat = "";
                return
            }
        }
    }, [responseSucces, errorCP]);

    const CancelSubmitChangePassword = () => {
        setFocusInputRepeatPassword(false);
        setFocusInputRepeatMessage("");
        RefresDataChangePassword();
    }

    // useEffect untuk menghilangkan otline red ketika user telah menginput satu karakter ke element input di element input repeatPassword
    useEffect(() => {
        if (dataChangePassword.passwordNewRepeat !== "") {
            setFocusInputRepeatPassword(false);
        }
    })

    // useEffect untuk menghilangkan otline red ketika user telah menginput satu karakter ke element input di element input currentPassword
    useEffect(() => {
        if (dataChangePassword.passwordBefore !== "") {
            setFocusInputCurrentPassword(false);
        }
    })

    //useEffect untuk menghilangkan otline red ketika user telah menginput satu karakter ke element input di element input passwordNew
    useEffect(() => {
        if (dataChangePassword.passwordNew !== "") {
            setFocusInputNewPassword(false);
        }
    })
    
    // mengambil data poin yang sedang di dalam proses kalkulasi beserta poin yang di reject(poin proses/ nota proses to poin)
    const { dataProseNota, errorPP } = useSelector((state) => state.prosesPoinState);

    useEffect(() => {
        dispatch(fetchDataProsesPoin());
    }, [dispatch])

    useEffect(() => {
        console.log(errorPP);
    }, [errorPP])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try{
    //             const response = await axios.get("http://localhost:8080/customer/berkahjaya/proses/poin/verify", { withCredentials: true });
    //             setDataProsesNota(response.data);
    //         } catch(error) {    
    //             console.error(error)
    //         }
    //     }
    //     fetchData();
    // }, [])

    // menghapus nota yang tidak valid atau sudah di tolak oleh admin
    const { successRemoveNota, errorRemoveNota } = useSelector((state) => state.removeNotaNotValidState)

    const handleRemoveNotaNotValid = async (ID) => {
        dispatch(postRemoveNotaNotValid(ID));
    }
    
    useEffect(() => {
        if (successRemoveNota) {
            console.log("Nota berhasil dihapus:", successRemoveNota);
            // Simpan status aktif ke localStorage
            localStorage.setItem('activeSection', 'ProsesNota');
            window.location.reload();
        }
        if (errorRemoveNota) {
            console.log("Error saat menghapus nota", errorRemoveNota)
        }
    }, [successRemoveNota, errorRemoveNota])
    // const handleRemoveNotaNotValid = async (ID) => {
    //     try {
    //         const config = {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             withCredentials : true,
    //         }

    //         const data = {
    //             ID: ID,
    //         }

    //         const response = await axios.post("http://localhost:8080/customer/berkahjaya/user/remove/nota/not/valid", data, config)
    //         console.log(response.data);

    //         // Simpan status aktif ke localStorage
    //         localStorage.setItem('activeSection', 'ProsesNota')

    //         window.location.reload();
    //     } catch(error) {
    //         console.error(error.response);
    //     }
    // }

    // berfungsi untuk after handleRemoveNotaNotValid success users tetap berada di section prosesNota
    useEffect(() => {
        const activeNota = localStorage.getItem('activeSection')
        if (activeNota === 'ProsesNota') {
            setProsesNota(true);
            setUserProfile(false);
            setProsesHadiah(false);
        }
    }, []);

    const style = {
        svgPersonal: {
            margin: 'auto',
            textAlign: 'center',
            marginBottom: '2rem',
        },
        divButtonPassword: {
            marginTop: '2rem',
            textAlign: 'center',
        },
        buttonPassword: {
            borderRadius: "5px",
            padding: "5px 10px",
            border: "none",
            backgroundColor: "#006664",
            color: "white",
            width: '160px',
            marginRight: '2.5rem'
        },
        buttonPasswordCancel: {
            borderRadius: "5px",
            padding: "5px 10px",
            border: "1px solid #006664",
            width: "160px",
            backgroundColor: "white",
        },
        inputChangePasswordRepeat: {
            ...(focusInputRepeatPassword ? {outline: "1.5px solid red"} : {})
        },
        messageCurrentPassword: {
            textAlign: "start",
            fontSize: "12px",
            ...(focusInputCurrentPassword ? {color: "red"} : {})
        },
        currentPassword: {
            ...(focusInputCurrentPassword ? {outline: "1.5px solid red"} : {})
        }, 
        messageRepeatPassword: {
            textAlign: "start",
            fontSize: "12px",
            ...(focusInputRepeatPassword ? {color: "red"} : {})
        },
        newPassword: {
            ...(focusInputNewPassword ? {outline: "1.5px solid red"} : {})
        },
        messageNewPassword: {
            textAlign: "start",
            fontSize: "12px",
            ...(focusInputNewPassword ? {color: "red"} : {})
        },
        containerHeader: {
            display: 'flex',
            padding: '10px 20px',
            backgroundColor: 'white',
            borderRadius: '7.5px',
            boxShadow: '5px 7px 4px 0 rgb(0, 0, 0, 0.8)',
            marginBottom: '20px',
            zIndex: '9999'
        },
        containerHeaderFill: {
            display: 'flex',
            marginRight: '40px',
            fontSize: '15px'
        },
        redIcon: {
            backgroundColor: '#dc354550', 
            width: '25px', 
            height: '25px', 
            borderRadius: '30px',
            marginRight: '10px'
        },
        redFont: {
            color: '#dc3545',
        },
        GreenIcon: {
            backgroundColor: '#19875450', 
            width: '25px', 
            height: '25px', 
            borderRadius: '30px',
            marginRight: '10px'
        }, 
        greenFont: {
            color: '#198754'
        },
        buttonUserProfile: {
            borderBottomLeftRadius: '10px',
            ...(userProfile ? {backgroundColor: '#00666450'} : {})
        },
        buttonPoinProses: {
            borderRight: '0.5px solid rgba(0, 0, 0, 0.105)', 
            borderLeft: '0.5px solid rgba(0, 0, 0, 0.105)',
            ...(ProsesNota ? {backgroundColor: '#00666450'} : {})
        },
        buttonHadiahProses: {
            borderRight: '0.5px solid rgba(0, 0, 0, 0.105)',
            ...(ProsesHadiah ? {backgroundColor: '#00666450'} : {})
        }
    }

    return(
        <div>
            <NavbarUser/>

            <div class="container-user-dasbord">
                <div class="container-head-user-dasbord">
                    <button onClick={handleUserProfile} style={style.buttonUserProfile}>Profile</button>
                    <button onClick={handleNotaProses} style={style.buttonPoinProses}>Poin Proses</button>
                    <button onClick={handleHadiahProses} style={style.buttonHadiahProses}>Hadiah Proses</button>
                </div>
                { userProfile && (
                    <div class="container-user-dasbord-profile">
                        <div class="container-fill-user-dasbord-profile">
                            <div class="container-fill-user-dasbord-profile-information">
                                <h6>Personal Information</h6> 
                                <p style={{ textAlign: 'start'}}>Use a Permanent address where you can receive email</p>
                            </div>
                            <div class="container-fill-user-dasbord-profile-data">
                                <div style={ style.svgPersonal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-square" viewBox="0 0 16 16" >
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                                    </svg>
                                </div>
                                <div class="data-dasbord-user">
                                    <h6>username</h6>
                                    <input type="text" className="input-dasbord-user" name="username" placeholder="Your username" value={dataUser.username}/>
                                </div>
                                <div class="data-dasbord-user">
                                    <h6>email</h6>
                                    <input type="email" className="input-dasbord-user"  name="emial" placeholder="Your email" value={dataUser.email}/>
                                </div>
                                <div class="data-dasbord-user">
                                    <h6>whatshapp</h6>
                                    <input type="number" className="input-dasbord-user" name="whatshapp" placeholder="Your Whatshapp" value={dataUser.whatshapp}/>
                                </div>
                            </div>
                        </div>
                        <div class="container-fill-user-dasbord-profile">
                            <div class="container-fill-user-dasbord-profile-information">
                                <h6>Change Password</h6>
                                <p style={{ textAlign: 'start'}}>Update your password associated with your account</p>
                            </div>
                            <div class="container-fill-user-dasbord-profile-data">
                                <form onSubmit={(e) => submitChangePassword(e)}>
                                    <div className="password-dasbord-user">
                                        <h6>current password</h6>
                                        <input id="currentPassword" type="password" className="input-dasbord-user" name="passwordBefore" value={ dataChangePassword.passwordBefore } onChange={ handleInputChangePassword } placeholder={"Password Anda Saat Ini"} style={style.currentPassword} required/>
                                        <p style={style.messageCurrentPassword} className="messageCurrentPassword">{ focusInputCurrentPassword ? focusInputCurrentPasswordMessage : null}</p>
                                    </div>
                                    <div className="password-dasbord-user">
                                        <h6>new password</h6>
                                        <input type="password" className="input-dasbord-user" name="passwordNew" value={ dataChangePassword.passwordNew } onChange={ handleInputChangePassword } placeholder="Masukan Password Baru" style={style.newPassword} required/>
                                        <p style={style.messageNewPassword}>{focusInputNewPassword ? focusInputNewPasswordMessage : null}</p>
                                    </div>
                                    <div className="password-dasbord-user">
                                        <h6>repeat new password</h6>
                                        <input type="password" id="PasswordRepeat" className="input-dasbord-user" name="passwordNewRepeat" value={ dataChangePassword.passwordNewRepeat } onChange={ handleInputChangePassword } style={ style.inputChangePasswordRepeat } placeholder={"Ulangi Password"} required/>
                                        <p style={style.messageRepeatPassword}>{focusInputRepeatPassword ? focusInputRepeatMessage : null}</p>
                                        <style jsx>{`
                                            .input-dasbord-user::placeholder {
                                                color: inherit;
                                                font-family: Arial;
                                                font-size: 12px;
                                            }
                                        `}</style>
                                    </div>
                                    <div style={style.divButtonPassword}>
                                        <button style={style.buttonPassword} type="submit">Change Password</button>
                                        <button style={style.buttonPasswordCancel} onClick={(e) => CancelSubmitChangePassword(e)}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                { ProsesNota && (
                        <div className="container-upload-nota-proses" style={{ minHeight: '80vh'}}>
                            <div className="container-fill-upload-nota-proses">
                                <div style={style.containerHeader}>
                                    <div style={ style.containerHeaderFill }>
                                        <div style={style.redIcon}/>
                                        <h8 style={style.redFont}>Pengajuan Poin Di Tolak</h8>
                                    </div>
                                    <div style={style.containerHeaderFill}>
                                        <div style={style.GreenIcon}/>
                                        <h8 style={style.greenFont}>Sistem Sedang Mengkalkulasi Poin</h8>
                                    </div>
                                    <div style={style.containerHeaderFill}>
                                        <svg style={{marginRight: '10px'}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#dc3545" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                        </svg>
                                        <h8 style={style.redFont}>Tombol Menghapus Pengajuan Poin Yang Di Tolak</h8>
                                    </div>
                                </div>
                                { dataProseNota && dataProseNota.length > 0 ? (
                                    dataProseNota.map((data, index) => (
                                        <div key={index} class={ data.KeteranganNotaCancel.ID === 0 ?  "container-box-upload-nota-proses" : "container-box-upload-nota-proses-trash"} >
                                            <img style={{ width: '8%'}} src={require(`../images/${data.image}`)}/>
                                            <div style={{ marginLeft: '50px', marginTop: 'auto', width: '40%'}}>
                                                { data.KeteranganNotaCancel.ID === 0 ? (
                                                    <>
                                                        <h5>Proses Checking</h5>
                                                        <p style={{ textAlign: 'start'}}>Tunggu sampai sistem menghitung poin anda</p> 
                                                    </>
                                                ): (
                                                    <>
                                                        <h5>Process Rejected</h5>
                                                        <p style={{ maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'start'}}>{ data.KeteranganNotaCancel.desc }</p> 
                                                    </>
                                                )}
                                                
                                            </div>
                                            <p style={{ margin: 'auto', opacity: '0.3', width: '20%', textAlign:'center'}}>{new Date(data.CreatedAt).toLocaleString()}</p>
                                            <div style={{ display: 'flex', alignItems: 'center'}}>
                                                { data.KeteranganNotaCancel.ID === 0 ? (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#006664" class="bi bi-check-circle-fill" viewBox="0 0 16 16" >
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                                        </svg>
                                                    </>
                                                ) : (
                                                    <>
                                                    <a className="button-icon-trash" onClick={() => handleRemoveNotaNotValid(data.ID)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#dc3545" class="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                        </svg>
                                                    </a>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                        <div className="container-fill-upload-nota-proses" style={{ border: '0.5px solid rgba(0, 0, 0, 0.105)', borderRadius: '10px', textAlign: 'center', paddingTop: '1rem',color: ''}}>
                                            <p>Silahkan Upload Nota Belanja Anda</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                )}
                { ProsesHadiah && ( 
                    <div className="container-upload-nota-proses" style={{ minHeight: '80vh' }}>
                        <div className="container-fill-upload-nota-proses">
                            <div style={style.containerHeader}>
                                <div style={style.containerHeaderFill}>
                                    <div style={style.redIcon}/>
                                    <h8 style={style.redFont}>Hadiah Sedang Di Siapkan</h8>
                                </div>
                                <div style={style.containerHeaderFill}>
                                    <div style={style.GreenIcon}/>
                                    <h8 style={style.greenFont}>Hadiah Sudah Siap Silahkan Hambil Di Toko Kami</h8>
                                </div>
                            </div>
                            { dataProsesHadiah && dataProsesHadiah.length > 0 ? (    
                                        dataProsesHadiah.map((data, _) => (
                                        <div className="container-box-upload-nota-proses" style={ data.GiftsArrive === "" || data.GiftsArrive === "NO" ? {backgroundColor: '#dc354530', border: '1px solid red', boxShadow: '8px 8px 4px 0 rgb(0, 0, 0, 0.6)'} : {backgroundColor: '#19875430', border: '1px solid green', boxShadow: '8px 8px 4px 0  rgb(0, 0, 0, 0.6)'}}>
                                            <img style={{ width: '75px', height: '75px'}} src={require(`../images/${ data.Hadiah.image }`)}/>
                                                { data.GiftsArrive === "" || data.GiftsArrive === "NO" ? (
                                                    <div style={{ marginLeft: '50px', marginTop: 'auto'}}>
                                                        <h5>Hadiah Sedang Disiapkan</h5>
                                                        <p>Tunggu sampai Kami mengirim email Kepada Anda</p>
                                                        <p style={{ textAlign: 'start', marginTop: '-1.25rem', fontSize: '15px' }}>{ data.Hadiah.nama_barang }</p>
                                                    </div>
                                                ) : (
                                                    <div style={{ marginLeft: '50px', marginTop: 'auto'}}>
                                                        <h5>Hadiah Sudah Siap</h5>
                                                        <p>Ambil Hadiah Anda Di Toko Bangunan Berkah Jaya</p>
                                                        <p style={{ textAlign: 'start', marginTop: '-1.25rem', fontSize: '15px' }}>{ data.Hadiah.nama_barang }</p>
                                                    </div>
                                                )}
                                            <p style={{ margin: 'auto', opacity: '0.3'}}>{ new Date(data.CreatedAt).toLocaleString() }</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#006664" style={{ marginLeft: 'auto', marginTop: '20px'}} class="bi bi-gift-fill" viewBox="0 0 16 16">
                                            <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A3 3 0 0 1 3 2.506zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43zM9 3h2.932l.023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0zm6 4v7.5a1.5 1.5 0 0 1-1.5 1.5H9V7zM2.5 16A1.5 1.5 0 0 1 1 14.5V7h6v9z"/>
                                            </svg>
                                        </div>
                                ))
                            ): (
                                <div className="container-fill-upload-nota-proses" style={{ border: '0.5px solid rgba(0, 0, 0, 0.105)', borderRadius: '10px', textAlign: 'center', paddingTop: '1rem',color: ''}}>
                                    <p>Silahkan Tukar Poin Anda dengan Hadiah</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            { alertSuccesChangePassword && (
                <div class="alert alert-success d-flex align-items-center" role="alert" style={{ position: 'fixed', top: '2rem', zIndex: '1000', width: '100%', textAlign: "center",left: '50%', transform: 'translateX(-50%)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16" style={{marginRight: '1rem'}}>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                    <div>
                        {alertMessageChangePassword}
                    </div>
              </div>
            )}
            <Footer/>
        </div>

    )
}

export default DasbordUser;
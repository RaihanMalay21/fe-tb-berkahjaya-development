import React, { useEffect, useRef, useState } from "react";
import SideBare from "../sideBare";
import Navbar from "../../component/navbar";
import axios from "axios";

function ProsesHadiah() {
    const [ hadiahUser, setHadiahUser ] = useState([]);
    const [ totalHadiah, setTotalHadiah ] = useState(0);
    const [ waitingGift, setWaitingGift ] = useState(0);
    const [ takeGift, setTakeGift ] = useState(0);
    const [ modalGiftArrive, setModalGiftArrive ] = useState(false);
    const [ modalGiftFineshed, setModalGiftFineshed ] = useState(false);
    const [ dataGiftArrive, setDataGiftArrive ] = useState();
    const [ dataFineshed, setDataFineshed ] = useState();
    const [ spinners, setSpinners ] = useState(false);
    const [ prosesFailed, setProsesFailed ] = useState(false);
    // mengabil data hadiah users from server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/berkahjaya/adminside/pengajuan/hadiah", { withCredentials: true})
                setHadiahUser(response.data);
                console.log(response.data);
            } catch(error) {
                console.error(error.response);
            }
        }
        fetchData();
    }, [])

    // mengatur information details hadiah users
    useEffect(() => {
        const totalData = hadiahUser.length;
        setTotalHadiah(totalData);
    
        let waitingCount = 0;
        let takeCount = 0;
    
        hadiahUser.forEach(usersGift => {
            if (usersGift && (usersGift.GiftsArrive === "NO" || usersGift.GiftsArrive === "")) {
                waitingCount += 1;
            } else {
                takeCount += 1;
            }
        });
    
        setWaitingGift(waitingCount);
        setTakeGift(takeCount);
    }, [hadiahUser])

    // handle hadiah telah tiba dan mengirim email ke users tersebut
    const handleGifthaveArrive = async () => {
        try{
            const config = {
                header: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }

            const data = {
                UserID: dataGiftArrive.UserID, 
                HadiahID: dataGiftArrive.HadiahID,
                Hadiah: {
                    ID: dataGiftArrive.Hadiah.ID, 
                    CreatedAt: dataGiftArrive.Hadiah.CreatedAt, 
                    UpdatedAt: dataGiftArrive.Hadiah.UpdatedAt,
                    nama_barang: dataGiftArrive.Hadiah.nama_barang, 
                    poin: dataGiftArrive.Hadiah.poin,
                    image: dataGiftArrive.image,
                    desc: dataGiftArrive.desc,
                },
                Status: dataGiftArrive.Status, 
                CreatedAt: dataGiftArrive.CreatedAt,
            }
            setModalGiftArrive(false);
            setSpinners(true);
            const response = await axios.post("http://localhost:8080/berkahjaya/adminside/pengajuan/poin/sendmsgggiftsarrive", data, config)
            console.log(response.data);
            window.location.reload();
        } catch(error) {
            console.error(error.response);
            setSpinners(false);
            setProsesFailed(true);
            setTimeout(() => {
                setProsesFailed(false);
            }, 2000);
        }
    } 

    // handle proses pengajuan fineshed
    const handlePengajuanFineshed = async () => {
        try {
            const config = {
                header: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            };

            const data = {
                UserID: dataFineshed.UserID,
                HadiahID: dataFineshed.HadiahID,
                Hadiah: {
                    ID: dataFineshed.Hadiah.ID, 
                    CreatedAt: dataFineshed.Hadiah.CreatedAt,
                    UpdatedAt: dataFineshed.Hadiah.UpdatedAt,
                    nama_barang: dataFineshed.Hadiah.nama_barang, 
                    poin: dataFineshed.Hadiah.poin,
                    image: dataFineshed.Hadiah.image,
                    desc: dataFineshed.Hadiah.desc,
                },
                Status: dataFineshed.Status,
                GiftsArrive: dataFineshed.GiftsArrive,
                CreatedAt: dataFineshed.CreatedAt,
            }
            setModalGiftFineshed(false);
            setSpinners(true);
            const response = await axios.post("http://localhost:8080/berkahjaya/adminside/pengajuan/poin/finished", data, config)
            console.log(response.data);
            window.location.reload();
        } catch(error) {
            console.error(error.response);
            setSpinners(false);
            setProsesFailed(true);
            setTimeout(() => {
                setProsesFailed(false);
            }, 2000);
        }
    } 

    // modal untuk ensure hadiah telah tiba
    const handleModalGiftArrive = (UserID, HadiahID, IDHadiah, hadiahCreatedAt, hadiahUpdatedAt, hadiahNamaBarang, hadiahPoin, hadiahImage, hadiahDesc, Status, CreatedAt) => {
        setModalGiftArrive(true);
        setDataGiftArrive({
            UserID: UserID, 
            HadiahID: HadiahID,
            Hadiah: {
                ID: IDHadiah, 
                CreatedAt: hadiahCreatedAt, 
                UpdatedAt: hadiahUpdatedAt,
                nama_barang: hadiahNamaBarang, 
                poin: hadiahPoin,
                image: hadiahImage,
                desc: hadiahDesc,
            },
            Status: Status, 
            CreatedAt: CreatedAt,
        })
    }

    const handleCloseModal = () => {
        setModalGiftArrive(false);
        setModalGiftFineshed(false);
        setDataGiftArrive();
        setDataFineshed();
    }

    // modal untuk ensure proses pengajuan telah selesau
    const handleModalFineshed = (UserID, HadiahID, IDHadiah, hadiahCreatedAt, hadiahUpdatedAt, hadiahNamaBarang, hadiahPoin, hadiahImage, hadiahDesc, Status, GiftsArrive, CreatedAt) => {
        setModalGiftFineshed(true);
        setDataFineshed({
            UserID: UserID,
            HadiahID: HadiahID,
            Hadiah: {
                ID: IDHadiah, 
                CreatedAt: hadiahCreatedAt,
                UpdatedAt: hadiahUpdatedAt,
                nama_barang: hadiahNamaBarang, 
                poin: hadiahPoin,
                image: hadiahImage,
                desc: hadiahDesc,
            },
            Status: Status,
            GiftsArrive: GiftsArrive,
            CreatedAt: CreatedAt,
        })
    }


    const style = {
        container: {
            display: 'flex'
        },
        containerTable: {
            width: '100%',
            paddingLeft: '18%',
            fontFamily: 'arial, sans-serif',
        },
        containerBox: {
            display: 'flex'
        },
        containerBoxIMG: {
            width: '40px',
            height: '40px',
        },
        containerHadiahUsersWaitingGifts : {
            display: 'flex', 
            justifyContent: 'space-between', 
            boxShadow: '6px 6px 4px 0 rgb(220, 53, 69, 0.8)', 
            borderRadius: '10px', 
            padding: '10px 40px', 
            zIndex: '9999', 
            border: '1px solid red',
            backgroundColor: '#dc354550'
        },
        containerHadiahUsersTakeGift : {
            display: 'flex', 
            justifyContent: 'space-between', 
            boxShadow: '6px 6px 4px 0 rgba(var(--bs-success-rgb), 0.8)', 
            borderRadius: '10px', 
            padding: '10px 40px', 
            zIndex: '9999', 
            border: '1px solid green',
            backgroundColor: '#19875450'
        },
        informationHadiah: {
            textAlign: 'start',
            marginLeft: '20px'
        },
        modalGiftArrive: {
            position: 'fixed',
            top: '37%', 
            left: '40%',  
            minWidth: '30%', 
            textAlign: 'center', 
            zIndex: '9999', 
            boxShadow: '0 0 15px 0 rgb(220, 53, 69, 0.8)',
            border: '1px solid white',
            borderRadius: '5px',
            color: 'white'
        },
        modalGiftFineshed: {
            boxShadow: '0 0 15px 0 rgba(25, 135, 84, 0.9)',
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9998
        },
        spinnerContainer: {
            position: 'fixed',
            transform: 'translate(-50%, -50%)'
        },
    }

    return(
        <div style={style.container}>
            <SideBare/>
            <div style={style.containerTable}>
                <Navbar judulNav={"Custemers Hadiah"}/>
                    <div className="container-main">
                        { prosesFailed && (
                            <div class="alert alert-danger d-flex align-items-center" role="alert">
                            <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"></svg>
                            <div>
                              Proses gagal, Silahkan Coba lagi Nanti!
                            </div>
                          </div>
                          
                        )}
                        { spinners && (
                            <div style={style.overlay}>
                                <div style={style.spinnerContainer}>
                                    <div class="spinner-border" role="status" style={{ color: 'white'}}>
                                    <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        { modalGiftArrive && (
                            <div style={style.overlay}>
                                <div style={ style.modalGiftArrive }>
                                    <div style={{  borderBottom: '1px solid white', padding: '20px 0', borderTopRightRadius: '5px', borderTopLeftRadius: '5px'}} class="bg-danger">
                                        <h4 style={{ fontFamily: 'constania'}}>Hadiah Tiba</h4>
                                    </div>
                                    <div class="bg-danger" style={{ padding: '30px 40px', color: 'white'}}>
                                        <h8>Pastikan Hadiah Sudah Datang Dan Siap Di Ambil Oleh Pembeli</h8>
                                    </div>
                                    <div style={{ borderTop: '1px solid white', padding: '15px 0', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px'}} class="bg-danger">
                                        <button onClick={handleGifthaveArrive} class="btn btn-warning" style={{ padding: '7px 25px', color: 'white', marginRight: '20px'}}>Submit</button>
                                        <button class="btn btn-secondary" style={{ padding: '7px 25px'}} onClick={handleCloseModal}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        )} 
                        { 
                            modalGiftFineshed && (
                                <div style={style.overlay}>
                                <div style={{ ...style.modalGiftArrive, ...style.modalGiftFineshed }}>
                                    <div style={{  borderBottom: '1px solid white', padding: '20px 0', borderTopRightRadius: '5px', borderTopLeftRadius: '5px'}} class="bg-success">
                                        <h4 style={{ fontFamily: 'constania'}}>Fineshed</h4>
                                    </div>
                                    <div class="bg-success" style={{ padding: '30px 40px', color: 'white'}}>
                                        <h8>Pastikan Pembeli Sudah Mengambil Hadiah</h8>
                                    </div>
                                    <div style={{ borderTop: '1px solid white', padding: '15px 0', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px'}} class="bg-success">
                                        <button onClick={handlePengajuanFineshed} class="btn btn-light" style={{ padding: '7px 25px', marginRight: '20px'}}>Submit</button>
                                        <button class="btn btn-danger" style={{ padding: '7px 25px'}} onClick={handleCloseModal}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                            )
                        }
                        <div style={{ padding: '3rem 0 0 0', width: '95%', margin: '0 auto'}}>
                            <div style={{ display: 'block', backgroundColor: 'white', zIndex: '9999', padding: '15px 50px 0 50px', borderRadius: '10px', boxShadow: '6px 12px 6px 0 rgb(0, 0, 0, 0.7)'}}>
                                <div style={{ display: 'block' }}>                                    
                                    <div style={{ display: 'flex', justifyContent: 'start', marginBottom: '15px'}}>
                                        <div style={{ marginRight: '100px', display: 'flex'}}>
                                            <div class="bg-danger" style={{ width: '15px', height: '15px', borderRadius: '15px', marginRight: '10px'}}/>
                                            <h8 style={{ fontSize: '15px'}} class="text-danger">Memberitahu Pengguna Hadiah Sudah Tiba</h8>
                                        </div>
                                        <div style={{ display: 'flex'}}>   
                                            <div style={{ backgroundColor: '#006664', width: '15px', height: '15px', borderRadius: '15px', marginRight: '10px'}}/>
                                            <h8 style={{ fontSize: '15px', color: '#006664'}}>Pembeli Telah Mengambil Hadiah</h8>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between'}}> 
                                        <div style={style.containerBox}>
                                            <div>
                                                <img style={{ width: '35px', height: '35px '}} src={require("../../images/Total_Hadiah.png")}/>
                                            </div>
                                            <div style={style.informationHadiah}>
                                                <h8>Total Hadiah</h8>
                                                <p style={{ textAlign: 'start'}}>{ totalHadiah }</p>
                                            </div>
                                        </div>
                                        <div style={ style.containerBox }>
                                            <div>
                                                <img style={{ width: '45px', height: '42px '}} src={require("../../images/menungguHadiah.png")}/>
                                            </div>
                                            <div style={style.informationHadiah}>
                                                <h8>Menunggu Hadiah Datang</h8>
                                                <p style={{ textAlign: 'start'}}>{ waitingGift }</p>
                                            </div>
                                        </div>
                                        <div style={ style.containerBox }>
                                            <div>
                                                <img style={{ width: '40px', height: '40px '}} src={require("../../images/hadiahTinggalAmbil.png")}/>
                                            </div>
                                            <div style={style.informationHadiah}>
                                                <h8>Hadiah Tinggal Di Ambil</h8>
                                                <p style={{ textAlign: 'start'}}>{ takeGift }</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: '2rem'}}>
                                { hadiahUser.map((data, _) => (
                                    <div style={ data.GiftsArrive === "" || data.GiftsArrive === "NO" ? style.containerHadiahUsersWaitingGifts : style.containerHadiahUsersTakeGift } class="container-box-upload-nota-proses">
                                        <img style={{ width: '80px', height: '80px'}} src={require(`../../images/${data.Hadiah.image}`)} />
                                        <div style={{ margin: 'auto 0'}}>
                                            { data.GiftsArrive === "" || data.GiftsArrive === "NO" ? (
                                                <div>
                                                    <button class="btn btn-danger" onClick={() => handleModalGiftArrive(data.UserID, data.HadiahID, data.HadiahID, data.Hadiah.CreatedAt, data.Hadiah.UpdatedAt, data.Hadiah.nama_barang, data.Hadiah.poin, data.Hadiah.image, data.Hadiah.desc, data.Status, data.UpdatedAt)} style={{ padding: '10px 20px', width: '140px'}}>Hadiah Tiba</button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <button class="btn" onClick={() => handleModalFineshed(data.UserID, data.HadiahID, data.HadiahID, data.Hadiah.CreatedAt, data.Hadiah.UpdatedAt, data.Hadiah.nama_barang, data.Hadiah.poin, data.Hadiah.image, data.Hadiah.desc, data.Status, data.GiftsArrive, data.CreatedAt)} style={{ padding: '10px 20px', width: '140px', backgroundColor: '#006664', color: 'white'}}>Selesai</button>
                                                </div>
                                            )}
                                        </div>
                                        <div style={{ display: 'flex',  width: '35%' }}>
                                            <div style={{ marginRight: '5rem', fontWeight: 'bold'}}>
                                                <div>USERNAME</div>
                                                <div>EMAIL</div>
                                                <div>WHATSHAPP</div>
                                            </div>
                                            <div>
                                                <div>{ data.User.username }</div>
                                                <div>{ data.User.email }</div>
                                                <div>{ data.User.whatshapp }</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', width: '35%' }}>
                                            <div style={{ marginRight: '5rem', fontWeight: 'bold'}}>
                                                <div>HADIAH</div>
                                                <div>POIN</div>
                                                <div>PENGAJUAN</div>
                                            </div>
                                            <div>
                                                <div style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{ data.Hadiah.nama_barang }</div>
                                                <div>{ data.Hadiah.poin }</div>
                                                <div>{ new Date(data.CreatedAt).toLocaleString() }</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default ProsesHadiah;
import React, { useEffect, useState } from "react";
import SideBare from "../sideBare";
import { useLinkClickHandler, useLocation, useNavigate } from "react-router-dom";
import "../../App.css";
import axios from "axios";

function VerificationPoin() {
    const navigate = useNavigate();
    const location = useLocation();
    const {ID, CreatedAt, UpdatedAt, userid, username, email, tanggal_pembelian, total_harga, total_keuntungan, image, keterangan} = location.state;
    const [ KeteranganTolak, setKeteranganTolak ] = useState('');
    const [ searchbarang, setSearchBarang ] = useState([]);
    const [ keySearch, setKeySearch ] = useState('');
    const [ searchNotAvailable, setSearchNotAvailable ] = useState(false); 
    const [ barang, setBarang ] = useState([]);
    const [ modalJumalhBarang, setModalJumlahBarang ] = useState(false);
    // tempory field data barang before insert to barang
    const [ dataItemAmountBarang, setDataItemAmountBarang ] = useState({ 
        barangID: null,
        nama_barang: '',
        harga_barang: null,
        jumlah_barang: null, 
        total_harga: null,
    });
    const [ jumlahBarang, setJumlahBarang ] = useState(1);
    const [ totalHargaPerItem, setTotalHargaPerItem ] = useState(0);
    const [ tanggalPembelian, setTanggalPembelian ] = useState('');
    const [ amountPrice, setAmountPrice ] = useState(0);
    const [ dateRequired, setDateRequired ] = useState(false);
    const [ itemRequired, setItemRequired ] = useState(false);
    const [ alertFails, setAlertFails ] = useState(false);

    const handleSearchBarangPembelian = async () => {
        try{
            const config = {
                headers: {
                    "Content-type": 'multipart/form-data',
                },
                withCredentials: true,
            };
            const formData = new FormData();
            formData.append('key', keySearch);
            const response = await axios.post("http://localhost:8080/admin/berkahjaya/adminside/barang/search", formData, config);
            console.log(response.data);
            setSearchBarang(response.data);

            if (response.data.length === 0) {
                setSearchNotAvailable(true);
            } else {
                setSearchNotAvailable(false); // Pastikan untuk mengembalikan ke false jika data ditemukan
            }
        }catch(error) {
            console.error('Error:', error);
        }
    }

    const handleSearch = (event) => {
        setKeySearch(event.target.value);
    }

    const handleSubmitSearch = (event) => {
        event.preventDefault();
        handleSearchBarangPembelian();
    }


    // useEffect untuk menghitung total harga per barang
    useEffect(() => {
        const hasil = jumlahBarang * dataItemAmountBarang.harga_barang;
        setTotalHargaPerItem(hasil);
    }, [jumlahBarang, totalHargaPerItem]);

    // useEffect untuk menghitung total harga semua barang
    useEffect(() => {
        if (barang.length !== 0) {
            let amountPrice = 0;
            for (let i = 0; i < barang.length; i++) {
                amountPrice += barang[i].total_harga;
            }
            setAmountPrice(amountPrice);
        } 
    }, [barang])


    // useEffect untuk input date background red hilang sesudah input telah terisi
    useEffect(() => {
        if(tanggalPembelian !== '') {
            setDateRequired(false);
        }
        if( barang.length !== 0) {
            setItemRequired(false);
        }
    }, [tanggalPembelian, barang]);

    const handleTambahJumlahBarang = () => {
        setJumlahBarang(jumlahBarang + 1);
    }

    const handleKurangJumlahBarang = () => {
        if (jumlahBarang === 1) {
            setJumlahBarang(1);
            return;
        }
        setJumlahBarang(jumlahBarang - 1);
    }

    const handleCloseModalAmountItem = () => {
        setModalJumlahBarang(false);
        setJumlahBarang(1);
        setTotalHargaPerItem(0);
        setDataItemAmountBarang({
            barangID: null,
            nama_barang: '',
            harga_barang: null,
            image: '',
            total_harga: null,
        })
    }

    const handleInputSearchBarangToBarang = () => {
        const newBarang = {
            barangID: dataItemAmountBarang.barangID,
            nama_barang: dataItemAmountBarang.nama_barang,
            harga_barang: dataItemAmountBarang.harga_barang,
            jumlah_barang: jumlahBarang, 
            total_harga: totalHargaPerItem,
        }

        setBarang(prevBarang => [...prevBarang, newBarang]);
    }

    const handleSubmitInputSearchBarangToBarang = () => {
        handleInputSearchBarangToBarang();
        handleCloseModalAmountItem();
    }


    const handleOpenModalAmountItem = (barangID, nama_barang, harga_barang, image) => {
        setTotalHargaPerItem(0);
        setJumlahBarang(1);
        setModalJumlahBarang(true);
        setTotalHargaPerItem(harga_barang);
        setDataItemAmountBarang({
            barangID: barangID,
            nama_barang: nama_barang,
            harga_barang: harga_barang,
            image: image,
            total_harga: totalHargaPerItem
        })
    }

    // usestate cancel nota
    const [ modalComment, setModalComment ] = useState(false);

    const handleChangeComment = (event) => {
        setKeteranganTolak(event.target.value);
    }

    console.log(barang);

    const handleSubmitCancelNota = () => {
        if (KeteranganTolak === '') {
            setModalComment(true);
            return;
        }

        const data = {
            ID: ID,
            CreatedAt: CreatedAt,
            UpdatedAt: UpdatedAt,
            userid: userid,
            username: username,
            email: email,
            tanggal_pembelian: tanggal_pembelian,
            total_harga: total_harga,
            total_keuntungan: total_keuntungan,
            image: image,
            keterangan: KeteranganTolak,
        }

        const config ={
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        };

        axios.post('http://localhost:8080/admin/berkahjaya/adminside/pengajuan/poin/verify/cancel', data, config)
        .then(response => {
            console.log('Response:', response.data);
            navigate("/berkahjaya/adminside/poin");
        })
        .catch (error => {
            console.error("Error:", error);
            // Penanganan kesalahan khusus
            if (error.response && error.response.status === 401) {
                // Menavigasi ke halaman login jika tidak terotorisasi
                navigate('/login');
                return; // Menghentikan eksekusi kode selanjutnya
            }
        })
    }

    const handleChangeDate = (event) => {
        setTanggalPembelian(event.target.value);
    }

    const handleSuccesNota = async () => {
        if (tanggalPembelian === '') {
            setDateRequired(true);
            return;
        } else if ( barang.length === 0) {
            setItemRequired(true);
            return;
        }

        try {
            const data = {
                ID : ID, 
                CreatedAt: CreatedAt, 
                UpdatedAt: CreatedAt,
                userid: userid, 
                tanggal_pembelian: tanggalPembelian,
                image: image,
                pembelian_per_item: barang,
                total_harga: amountPrice
            }

            console.log(data);

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            };

            const response = await axios.post('http://localhost:8080/admin/berkahjaya/adminside/pengajuan/poin/verify', data, config);
            console.log(response.data);
            navigate("/berkahjaya/adminside/poin")
        } catch(error) {
            console.error("Error:", error.response);
            setAlertFails(true);
            setTimeout(() => {
                setAlertFails(false);
            }, 2000);

            if (error.response && error.response.status == 401) {
                navigate("/login");
                return;
            }
        }
    }

    const style = {
        labelTop: {
            width: '100%',
            color: 'white',
            padding: '15px 0',
            textAlign: 'center',
            color: 'white',
            zIndex: '9999',
            backgroundColor: 'rgba(0, 102, 100, 1)',
            fontFamily : 'constania',
            borderTopLeftRadius : '9px',
            borderTopRightRadius: '9px'
        },
        buttonVerify: {
            padding: '10px 50px',
            backgroundColor: '#006664',
            color: 'white',
        },
        containerSearchBarang: {
            backgroundColor: 'rgba(172, 255, 47, 0.185)',
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
            marginBottom: '1rem'
        },
        modalTotalBarang: {
            position: 'fixed',
            top: '25%',
            left: '47%',
            backgroundColor: 'white',
            width: '400px',
            padding: '2rem 4rem',
            borderRadius: '10px',
            zIndex: '9999',
            border: '1px solid rgba(172, 255, 47, 0.185)',
            boxShadow: '0 4px 8px 0 white, 0 6px 10px 0 white'
        },
        buttonPlusAndMinus: {
            borderRadius: '5px',
            backgroundColor: 'white',
            width: '25px',
            height: '30px'
        },
        requiredDate: {
            border: '1px solid red'
        }
    }

    return(
        <div className="containerPoin">
            <SideBare/>
            <div className="containerVerificationPoin">
                <div className="containerMainVerificationPoin">
                    <h2 style={style.labelTop}>Nota Verification</h2>
                    <div className="containerInputVerificationPoin">
                        { modalJumalhBarang && (
                            <div style={style.modalTotalBarang}>
                                <button type="button" onClick={handleCloseModalAmountItem} class="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{position: 'absolute', top: '0', right: '0', padding: '10px'}}></button>
                                <h5>Total Per Barang Dibeli</h5>
                                <div style={{ margin: '2rem'}}>
                                    <img style={{ height: '60px', width: '60px'}} src={require(`../../images/${dataItemAmountBarang.image}`)}/>
                                    <tr style={{ display: 'flex', justifyContent: 'space-between'}}>
                                        <td>{dataItemAmountBarang.nama_barang}</td>
                                        <td>{dataItemAmountBarang.harga_barang}</td>
                                    </tr>
                                </div>
                                <p>Total Harga: {totalHargaPerItem}</p>
                                <div style={{ margin: '1rem 0'}}>
                                    <span><button style={style.buttonPlusAndMinus} onClick={handleKurangJumlahBarang}>-</button></span>
                                    <span style={{ margin: '0 1rem'}}>{jumlahBarang}</span>
                                    <span><button style={style.buttonPlusAndMinus} onClick={handleTambahJumlahBarang}>+</button></span>
                                </div>
                                <button type="button" class="btn btn-success" onClick={handleSubmitInputSearchBarangToBarang} style={style.buttonVerify}>Submit</button>
                            </div>
                        )}
                        { alertFails && (
                            <div class="alert alert-danger" role="alert" style={{ position: 'fixed', top: '25%', left: '50%', width: '300px'}}>
                                Gagal submit verifikasi nota!
                        </div>
                        )}
                        <div>
                            <img className="containerImageVerificationPoin" src={require(`../../images/${image}`)}/>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <input className="containerDateVerificationPoin" onChange={handleChangeDate} type="date" placeholder="Tanggal Pembelian" required style={dateRequired ? style.requiredDate : {}}></input>
                            {dateRequired && (<p style={{color: 'red', textAlign: 'start', fontSize: '12.5px'}}>Tanggal Tidak Boleh Kosong</p>)}
                        </div>
                        <div>
                            <form class="d-flex" role="search" onSubmit={handleSubmitSearch}> 
                                <input  class="containerMainSearchBarangVerificationPoin" onChange={handleSearch} type="search" placeholder="Search..." aria-label="Search"/>
                                <button style={{ padding: '10px', borderRadius: '5px', width: '15%', backgroundColor: '#006664', color: 'white'}} class="btn" type="submit">Search</button>
                            </form>
                        </div>
                        <div style={style.containerSearchBarang}>
                            <table class="" style={{ width: '100%'}}>
                                <tbody>  
                                    {searchbarang.length > 0 && (
                                        searchbarang.map((data, index) => (
                                            <tr key={index} style={{ borderBottom: '1.5px solid white'}}>
                                            <button onClick={() => handleOpenModalAmountItem(data.id, data.nama_barang, data.harga_barang, data.image)} style={{ padding: '5px 30px', display: 'flex', textAlign: 'start', borderRadius: '0', width: '100%', border: 'none', background: 'none'}}>
                                                <th scope="row" style={{ width: '10%' }}><img style={{ height: '40px', width: '40px'}} src={require(`../../images/${data.image}`)}/></th>
                                                <td style={{ width: '22.5%' }}>{data.nama_barang}</td>
                                                <td style={{ width: '22.5%' }}>{data.harga_barang}</td>
                                                <td style={{ width: '22.5%' }}>{data.harga_beli}</td>
                                                <td style={{ width: '22.5%' }}>{data.kode}</td>
                                            </button>
                                            </tr>
                                        ))
                                    )}
                                    {searchNotAvailable && (
                                        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px auto',}}>  
                                            <td colSpan="5">No data available</td>
                                        </div>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="containerMainDataBarangVerificationPoin">
                            <table class="table table-bordered rounded" style={ itemRequired ? {border: '1px solid red'} : {}}>
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nama Barang</th>
                                    <th scope="col">Harga Barang</th>
                                    <th scope="col">Jumlah Barang</th>
                                    <th scope="col">Total Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {barang.length > 0 && (
                                        barang.map((data, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{data.nama_barang}</td>
                                                <td>{data.harga_barang}</td>
                                                <td>{data.jumlah_barang}</td>
                                                <td>{data.total_harga}</td>
                                            </tr>
                                        ))
                                    )}
                                    { itemRequired && (
                                        <tr style={{ border: '1px solid red'}}>
                                            <td colSpan="5">
                                                <p style={{ fontSize: '12.5px', color: 'red' }}>Barang Tidak Boleh Kosong</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            { modalComment && (
                                <textarea className="containerKeteranganVerificationPoin" id="exampleFormControlTextarea1" rows="3" name="desc" required placeholder="Keterangan" value={KeteranganTolak} onChange={handleChangeComment}></textarea>
                            )}
                        </div>
                        <div className="containerMainButtonVerificationPoin" style={{ marginTop: '3rem'}}>
                            <button type="button" class="btn" onClick={handleSuccesNota} style={style.buttonVerify}>Success</button>
                            <button onClick={handleSubmitCancelNota} type="button" class="btn btn-danger" style={{padding: '10px 50px', marginLeft: '50px'}}>Tolak</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerificationPoin;
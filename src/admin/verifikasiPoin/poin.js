import { useNavigate } from "react-router-dom";
import Navbar from "../../component/navbar";
import SideBare from "../sideBare";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from 'date-fns';

function Poin() {
    const navigate = useNavigate()
    const [value, setValue] = useState([]);

    useEffect(() => {
        if (value && value.length === 0) {
            const fetchData = async () => {
                try {
                    // mengatur axios untuk selalu mengirim cookie
                    axios.defaults.withCredentials = true;

                    const response = await axios.get("http://localhost:8080/admin/berkahjaya/adminside/pengajuan/poin");

                    setValue(response.data);
                    console.log("Succesfully fetched data");
                } catch(error) {
                    console.error(error);
                    if (error.response && error.response.status === 401) {
                        navigate("/login");
                        return;
                    }
                }
            };
            fetchData();
        }
    }, []);
    console.log(value);

    const handleNavigateVerifyPoin = (ID, CreatedAt, UpdatedAt, userid, username, email, tanggal_pembelian, total_harga, total_keuntungan, image, keterangan) => {
        navigate("/berkahjaya/adminside/poin/verify", {
            state: {
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
                keterangan: keterangan,
            }
        })
    } 

    const style = {
        container: {
            display: 'flex',
            backgroundColor : 'rgba(128, 128, 128, 0.10)',
            minHeight: '100vh',
        },
        containerTable: {
            width: '100%',
            paddingLeft: '18%',
            fontFamily: 'arial, sans-serif',
        },
        containerBodyTable: {
            width: '96%',
            margin: '0 auto',
            backgroundColor: 'white',
            padding: '10px',
            marginTop: '2rem',
            borderRadius: '5px',
            paddingTop: '2rem',
            zIndex: '9999',
            border: '2px solid white',
            boxShadow: '1.5px 3px 10px 0 rgb(0, 0, 0, 0.7'
        },
        tableImage: {
            width: '75px',
            height: '100px'
        },
        userIDColumn: {
            textAlign: 'center'
        } 
    }

    return (
        <div style={style.container}>
            <SideBare/>
            <div style={style.containerTable}>
                <Navbar judulNav={'Verification Poin'}/>
                <div style={style.containerBodyTable}>
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">USERNAME</th>
                            <th scope="col">UPLOAD</th>
                            <th scope="col">GAMBAR</th>
                            <th scope="col">VERIFIKASI</th>
                            </tr>
                        </thead>
                        <tbody>
                            { value ? (value.map((data, index) => (
                                <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{data.User.username}</td>
                                <td>{ format(new Date(data.CreatedAt), "yyyy-mm-dd") }</td>
                                <td><img style={style.tableImage} src={require(`../../images/${data.image}`)}/></td>
                                <td><button onClick={() => handleNavigateVerifyPoin(data.ID, data.CreatedAt, data.UpdatedAt, data.userid, data.User.username, data.User.email, data.tanggal_pembelian, data.total_harga, data.total_keuntungan, data.image, data.keterangan)} class="btn" style={{ backgroundColor: '#006664', color: 'white' }}>Verifikasi</button></td>
                                </tr>
                            ))) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem 0'}}>Data Not available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Poin;
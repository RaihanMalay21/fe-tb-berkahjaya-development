import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import "../../App.css"
import { useNavigate } from "react-router-dom";
import SideBare from "../sideBare";
import Navbar from "../../component/navbar";

function Barang() {
    // fungsi redirect to update barang
    const navigate = useNavigate();
    // useState untuk menyimpan data
    const [value, setValue] = useState([]);

   
    useEffect(() => {
        // cek apakah value awalnya kosong dan result adalah null atau undefined
        if (value && value.length === 0) {
            const fetchData = async () => {
                try {
                    
                    // mengatur axios untuk selalu mengirim cookie
                    axios.defaults.withCredentials = true;

                    // Make the GET request to the server with authorization headers
                    const response = await axios.get("http://localhost:8080/berkahjaya/adminside/barang");

                    // Update the state with the response data
                    setValue(response.data);
                    console.log("Successfully fetched data");
                } catch(error) {
                    console.error(error);
                     // Penanganan kesalahan khusus
                    if (error.response && error.response.status === 401) {
                        // Menavigasi ke halaman login jika tidak terotorisasi
                        navigate('/login');
                        return; // Menghentikan eksekusi kode selanjutnya
                    }
                }
            };
            fetchData();
        } 
    }, []); 
    

    const handleUpdate = (id, nama_barang, harga_barang, harga_beli, image, kode) => {
        navigate('/berkahjaya/adminside/barang/update', {
            state: {
                id: id,
                nama_barang: nama_barang,  
                harga_barang: harga_barang,
                harga_beli: harga_beli,
                image: image,
                kode: kode
            }
        });
    };

    // search
    const handleSearch = async (searchTerm) => {
        try {
          const formData = new FormData();
          formData.append('key', searchTerm);
          const response = await axios.post("http://localhost:8080/berkahjaya/adminside/barang", formData);
          console.log(response.data);
          setValue(response.data); // Menyimpan hasil pencarian ke dalam state
        } catch(error) {
          console.error(error);
        }
    };

    // handle menghapus barang
    const handleDeleteItems = (id, nama_barang, harga_barang, harga_beli, image, kode) => {

        const data = {
            id: id, 
            nama_barang: nama_barang,
            harga_barang: harga_barang, 
            harga_beli: harga_beli,
            image: image, 
            kode: kode,
        };

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };

        axios.post('http://localhost:8080/berkahjaya/adminside/barang/deletebarang', data, config)
        .then(response => {
            console.log('Response:', response.data);
            window.location.reload();
          })
          .catch (error => {
            console.error('Error:', error);
    
            // Penanganan kesalahan khusus
            if (error.response && error.response.status === 401) {
                // Menavigasi ke halaman login jika tidak terotorisasi
                navigate('/login');
                return; // Menghentikan eksekusi kode selanjutnya
            }
          });
    };

      const style = {
        container: {
            display: 'flex'
        },
        containerBarang: {
            width: '100%',
            display: 'block',
            paddingLeft: '18%'
        },
        containerBodyBarang: {
            width: '96%',
            margin: '0 auto',
            padding: '10px',
            backgroundColor: 'white',
            borderRadius: '5px',
            zIndex: '9999',
            boxShadow: '2px 4px 10px 0 rgba(0, 0, 0, 0.7)',
        }
      }

    return (
        <div style={style.container}>
            <SideBare/>
            <div style={style.containerBarang}>
                <Navbar onSearch={handleSearch} judulNav={'Barang'}/>
                <div className="container-main" style={{ padding: '2rem 0'}}>
                    <div style={style.containerBodyBarang}>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Nama Barang</th>
                                    <th scope="col">Harga Barang</th>
                                    <th scope="col">Harga Beli</th>
                                    <th scope="col">Gambar</th>
                                    <th scope="col">Kode</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {value && value.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data.nama_barang}</td>
                                        <td>{data.harga_barang}</td>
                                        <td>{data.harga_beli}</td>
                                        <td>
                                            {data.image && <img className="image" src={require(`../../images/${data.image}`)} alt={data.nama_barang} />}
                                        </td>
                                        <td>{data.kode}</td>
                                        <td></td>
                                        <td>
                                            <td><button onClick={() => handleUpdate(data.id, data.nama_barang, data.harga_barang, data.harga_beli, data.image, data.kode)} class="btn me-4" style={{backgroundColor: '#006664', color: 'white'}}>Update</button></td>
                                            <td><button onClick={() => handleDeleteItems(data.id, data.nama_barang, data.harga_barang, data.harga_beli, data.image, data.kode)} type="button" class="btn btn-danger">Hapus</button></td>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>  
    )
};

export default Barang;
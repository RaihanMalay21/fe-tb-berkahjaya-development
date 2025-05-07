import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import "../../App.css"
import { useNavigate } from "react-router-dom";
import SideBare from "../sideBare";
import Navbar from "../../component/navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminBarang } from "../../actions/actionsGet";
import { postSearchBarang, postDeleteBarang } from "../../actions/actionsPost";

function Barang() {
    // fungsi redirect to update barang
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // useState untuk menyimpan data
    const [value, setValue] = useState([]);

    const { barang, errorBarang, responseStatus, loadingBarang } = useSelector((state) => state.adminBarangState);

    useEffect(() => {
        dispatch(fetchAdminBarang());
    }, [dispatch]);

    // handle response dari get data barang 
    useEffect(() => {
        if (barang) {
            setValue(barang);
        };
        if (errorBarang) {
            console.log(errorBarang);
            if (responseStatus === 401) {
                navigate('/login');
            };
        }
    }, [barang, errorBarang, responseStatus]);
    

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
    const { dataBarang, error } = useSelector((state) => state.searchBarangState);

    const handleSearch = async (searchTerm) => {
          const formData = new FormData();
          formData.append('key', searchTerm);
          dispatch(postSearchBarang(formData));
    };

    // handle setelah request search dari redux 
    useEffect(() => {
        if (dataBarang) {
            setValue(dataBarang);
        };
        if (error) {
            console.log(error);
        };
    }, [dataBarang, error]);
    
    // handle menghapus barang
    const {response, errorDB, statusCode} = useSelector((state) => state.deleteBarangState);
    const handleDeleteItems = async (id, nama_barang, harga_barang, harga_beli, image, kode) => {
        const data = {
            id: id, 
            nama_barang: nama_barang,
            harga_barang: harga_barang, 
            harga_beli: harga_beli,
            image: image, 
            kode: kode,
        };
        dispatch(postDeleteBarang(data));
        window.location.reload();
    };

    useEffect (() => {
        if (response) {
            window.location.reload();
        };
        if (errorDB) {
            console.error("Error delete hadiah:", errorDB);
            if (statusCode === 401) {
                navigate('/login');
            } 
        }
    }, [response, statusCode]);

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
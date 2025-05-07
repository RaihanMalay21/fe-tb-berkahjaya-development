import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "../../App.css";
import Navbar from '../../component/navbar';
import SideBare from '../sideBare';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminHadiah } from "../../actions/actionsGet";
import { postSearchHadiah, postDeleteHadiah } from "../../actions/actionsPost";


function Hadiah() {
    const [datalist, setDataList] = useState([]);
    const dispatch = useDispatch();

    const {data, error, statusErr, loadingHadiah} = useSelector((state) => state.hadiahAdminState);

    useEffect(() => {
      dispatch(fetchAdminHadiah());
      // if (datalist && datalist.length === 0) {
        // const fetchData = async () => {
        //   try {
        //     axios.defaults.withCredentials = true;
        //     const response = await axios.get("http://localhost:8080/admin/berkahjaya/adminside/hadiah");
        //     setDataList(response.data);
        //   } catch (error) {
        //     console.error("Error fetching data:", error);
        //     // Penanganan kesalahan khusus
        //     if (error.response && error.response.status === 401) {
        //         // Menavigasi ke halaman login jika tidak terotorisasi
        //         navigate('/login');
        //         return; // Menghentikan eksekusi kode selanjutnya
        //     }
        //   } 
        // };
        // fetchData();
      // }
    }, [dispatch]);
    console.log(datalist)
    
    useEffect(() => {
      if (data) {
        setDataList(data);
      }
      if (error) {
        console.error("Error fetching data:", error);
        if (statusErr === 401) {
              navigate('/login');
              return; 
          }
      }
    }, [data, error, statusErr])
  
    // navigasi atau redirect ke path lainnya
    const navigate = useNavigate()
    const handleUpdate = (ID, image, nama_barang, harga_hadiah, poin, deskripsi) => {
      navigate('/berkahjaya/adminside/hadiah/update', {
        state: {
          ID: ID,
          image: image, 
          nama_barang: nama_barang, 
          harga_hadiah: harga_hadiah,
          poin: poin,
          deskripsi: deskripsi
        }
      });
    };

    // component menangani pencarian 
    const {dataSH, errorSH} = useSelector((state) => state.searchHadiahState);

    const handleSeacrh = async (searcTerm) => {
      const formData = new FormData();
      formData.append('key', searcTerm);
      dispatch(postSearchHadiah(formData));
      // try {
      //   const formdata = new FormData();
      //   formdata.append('key', searcTerm);
      //   const response = await axios.post('http://localhost:8080/admin/berkahjaya/adminside/hadiah', formdata);
      //   setDataList((await response).data);
      // } catch(error) {
      //   console.error(error);
      // }
    };

    useEffect(() => {
      if (dataSH) {
        setDataList(dataSH);
      };
      if (errorSH) {
        console.error(errorSH);
      };
      if (dataSH && dataSH.length === 0) {
        setDataList(data);
      }
    }, [dataSH, errorSH])

    // handle menghapus hadiah 
    const {successDH, errorDH, statusDH} = useSelector((state) => state.deleteHadiahState);

    useEffect(() => {
      if (successDH) {
        console.log("response delate hadiah", successDH);
        window.location.reload();
      }
      if (errorDH) {
        console.log(errorDH);
        if (statusDH === 401) {
          navigate('/login');
        }
      }
    }, [successDH, errorDH, statusDH])
    
    const handleDeleteHadiah = (ID, image, nama_barang, harga_hadiah, poin, desc) => {
      const data = {
        ID: ID,
        image: image,
        nama_barang: nama_barang, 
        harga_hadiah: harga_hadiah,
        poin: poin,
        desc: desc,
      }
      dispatch(postDeleteHadiah(data));
      // const config = {
      //   headers : {
      //     'Content-Type' : 'application/json',
      //   },
      //   withCredentials: true,
      // }

      // axios.post('http://localhost:8080/admin/berkahjaya/adminside/hadiah/deletehadiah', data, config)
      // .then(response => {
      //   console.log('Response:', response.data);
      //   window.location.reload();
      // })
      // .catch (error => {
      //   console.error('Error:', error);

      //   // Penanganan kesalahan khusus
      //   if (error.response && error.response.status === 401) {
      //       // Menavigasi ke halaman login jika tidak terotorisasi
      //       navigate('/login');
      //       return; // Menghentikan eksekusi kode selanjutnya
      //   }
      // });
    };

    const style = {
      container: {
        display: 'flex'
      },
      containerHadiah: {
        width: '100%',
        display: 'block',
        paddingLeft: '18%',

      },
      containerBodyTable: {
        width: '96%',
        padding: '10px',
        margin: '0 auto',
        borderRadius: '5px',
        backgroundColor: 'white',
        zIndex: '9999',
        boxShadow: '2px 4px 10px 0 rgba(0, 0, 0, 0.7)',
      }
    }
  
    return (
      <div style={style.container}>
        <SideBare/>
        <div style={style.containerHadiah}>
          <Navbar onSearch={handleSeacrh} judulNav={'Hadiah'}/>
          <div className='container-main' style={{ padding: '2rem 0'}}>
            <div style={style.containerBodyTable}>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nama Barang</th>
                    <th scope="col">Harga</th>
                    <th scope="col">Poin</th>
                    <th scope="col">Gambar</th>
                    <th scope='col'>Deskripsi</th>
                    <th scope='col'></th>
                    <th scope='col'></th>
                  </tr>
                </thead>
                <tbody>
                  {datalist.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.nama_barang}</td>
                    <td>{data.harga_hadiah}</td>
                    <td>{data.poin}</td>
                    <td>
                      {data.image && <img className="image" src={require(`../../images/${data.image}`)} alt={data.nama_barang} />}  
                    </td>
                    <td>{data.desc}</td>
                    <td><button type="button" onClick={() => handleUpdate(data.ID, data.image, data.nama_barang, data.harga_hadiah, data.poin, data.desc)} class="btn" style={{backgroundColor: '#006664', color: 'white'}}>Update</button></td>
                    <td><button onClick={() => handleDeleteHadiah(data.ID, data.image, data.nama_barang, data.harga_hadiah, data.poin, data.desc)} type="button" class="btn btn-danger">Hapus</button></td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Hadiah;
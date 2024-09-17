import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Hadiah  from './admin/hadiah/hadiah';
import InputHadiah from './admin/hadiah/inputhadiah';
import UpdateHadiah from './admin/hadiah/updatehadiah';
import Barang from './admin/Barang/barang';
import InputBarang from './admin/Barang/inputbarang';
import UpdateBarang from './admin/Barang/updatebarang';
import Login from './registration/login';
import SignUp from './registration/signup';
import ForgotPassword from './registration/forgotPassword';
import Home from './main/home';
import DasbordUser from './main/userdasbord';
import ProsesHadiah from './admin/verifikasiHadiah/prosesHadiah';
import ScrollToTop from './helper/ScrollToTop';
import Poin from './admin/verifikasiPoin/poin';
import VerificationPoin from './admin/verifikasiPoin/verify';
import React, { useState, useEffect, createContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './actions/actionsGet';


// const apiCustonerUrl = import.meta.env.VITE_API_CUSTOMER_URLL;
export const ValueContext = createContext(); 

function App() {
  // const [ dataUser, setDataUser ] = useState(null);
  const dispatch = useDispatch();
  const [ onLogin, setOnLogin ] = useState(true);

  const { users, loading, error, errorStatusCode, source } = useSelector((state) => state.usersState); 

  // Memanggil fetchUsers sekali saat komponen pertama kali di-mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Cek error 401 ketika error berubah
  useEffect(() => {
    if (errorStatusCode === 401) {  // status kecil, bukan Status
      setOnLogin(false);
    }
  }, [errorStatusCode]);
 
  // console.log(source);
  // console.log(error);
  // console.log(errorStatusCode)
  // useEffect(() => {
  //   dispatch(fetchUsers());
  //   console.log(error);
  //   if (error && error.Status === 401) {
  //     setOnLogin(false);
  //   }
  // }, [dispatch, error, loading])
  // get data user form server
  // useEffect(() => {
  //   const fetchData = async () =>  {
  //       try {
  //           const response = await axios.get(`http://localhost:8080/customer/berkahjaya/users/data`, { withCredentials : true })
  //           setDataUser(response.data)
  //       } catch(error) {
  //           console.error(error.response);
  //           if (error.response && error.response.status === 401) {
  //               setOnLogin(false);
  //           }
  //       }
  //   }
  //   fetchData();
  // }, []);

  return (
    <Router>
      <div>
        <ScrollToTop/>
        < ValueContext.Provider value={{ users, onLogin }}>
          <Routes>
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/berkahjaya/forgot/password' element={<ForgotPassword/>} />

            <Route path='/berkahjaya/adminside/barang' element={<Barang/>} />
            <Route path='/berkahjaya/adminside/barang/input' element={<InputBarang/>} />
            <Route path='/berkahjaya/adminside/barang/update' element={<UpdateBarang/>} /> 

            <Route path="/berkahjaya/adminside/hadiah" element={<Hadiah/>} />
            <Route path="/berkahjaya/adminside/hadiah/input" element={<InputHadiah/>} />
            <Route path="/berkahjaya/adminside/hadiah/update" element={<UpdateHadiah/>} />

            <Route path='/berkahjaya/adminside/poin' element={<Poin/>} />
            <Route path='/berkahjaya/adminside/poin/verify' element={<VerificationPoin/>} />

            <Route path='/berkahjaya/adminside/hadiah/users' element={<ProsesHadiah/>} />

          
            <Route path='/berkahjaya' element={<Home/>} />
            <Route path='/berkahjaya/user/dasbord' element={<DasbordUser/>} />
          </Routes>
        </ ValueContext.Provider >
      </div>
    </Router>
  );
}


export default App;

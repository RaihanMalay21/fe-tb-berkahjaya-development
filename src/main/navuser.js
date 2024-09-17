import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useContext} from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { ValueContext } from "../App";
import { ButtonLoginActiveContext } from "./home";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Logout, fetchHadiahsHasExchange } from "../actions/actionsGet";


const NavbarUser = ({ onUploadNota }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [ isDasbor, setIsDasbor ] = useState(false);
    const [ beforeLogin, setBeforeLogin ] = useState(false);
    const context = useContext(ValueContext);
    const { users, onLogin } = context || {};
    const contextLoginActive = useContext(ButtonLoginActiveContext);
    const buttonLoginActive = contextLoginActive;
    const [ showLogin, setShowLogin ] = useState(false);
    const dispatch = useDispatch()

    // mengatur button login, signup, dan logout supaya tidak di render sebelum
    // data sudah sudah tersedia 
    setTimeout(() => {
        setShowLogin(true)
    }, 300)
    // const [ dataUser, setDataUser ] = useState(null);

    // close div container-fill-nav-usersdata saat berada di user dasbord
    useEffect(() => {
        if (location.pathname === "/berkahjaya/user/dasbord") {
            setIsDasbor(true);
        } else {
            setIsDasbor(false);
        }
    })

    // navigate to login
    const handleLoginClick = (e) => {
        e.preventDefault(); // mencegah default action dari achor tag
        navigate('/login'); // menggunkan navigate untuk berpindah halaman
    };
        
    // navigate signup
    const handleSignUpClick = (e) => {
        e.preventDefault();
        navigate('/signup')
    }
    
    // navigate to main page
    const handleHomePageClick = () => {
        navigate('/berkahjaya', {replace: true});
        window.scrollTo(0, 0);
    };

    // navigate to user dasbord
    const handleDasborUserClick = (username, email, whatshapp, poin) => {
        navigate('/berkahjaya/user/dasbord', {
            state: {
                username, 
                email,
                whatshapp,
                poin
            }
        });
    };

    // handle log Out
    const { message, error } = useSelector((state) => state.logoutState);

    const handleLogOut = async () => {
        try {
            await dispatch(Logout());  // unwrap untuk menangani error jika ada
            console.log(message);
            setTimeout(() => {
                window.location.reload();
            }, 1)
            navigate("/berkahjaya");
        } catch(error) {
            console.error("Logout failed", error);
        }
    }

    // set tampilkan container-fill-nav-usersdata jika user telah login
    useEffect(() => {
        if (onLogin) {
            setBeforeLogin(true);
        }
    }, [users]);

    const style = {
        navbuttondaftar: {
            border: "1px solid rgba(0, 0, 0, 0.105)",
            color: 'black',
            marginRight: '7.5px',
            ...(isDasbor? { marginRight: '2rem'} : {})
        },
        navLogoSvg: {
            height: '65px', 
            width: '65px', 
            float: 'left', 
            marginRight: '5px', 
            fontWeight: "bold", 
            marginBottom: "10px",
            marginRight: '1.5rem',
            marginTop: '5px',
            borderRadius: '5px'
            // ...(isDasbor? { marginRight: '1.5rem'}: {})
        },
        logoUnderNavsvg: {
            marginRight: "5px",
        }
    }


    return(
        // <ValueContext.Provider value={dataUser}>
            <nav>
                <div class="container-nav">
                    <div class="container-fill-nav">
                        <div class="logo-nav">
                            <a onClick={() => handleHomePageClick()} style={{ display: "flex"}}>
                            <img src={require("../images/logo_toko.png")} style={style.navLogoSvg} />
                                <div style={{ textAlign: "center", color: "#006664", margin: "auto"}}> 
                                    <h3 style={{ fontWeight: "bold"}}>BerkahJaya</h3>
                                </div>
                            </a>
                        </div>
                        {/* {!isDasbor && (
                            <div class="search-bar-nav">
                                <form style={{ display: "flex"}}>
                                    <input class="form-control me-2" type="search" placeholder="Search Hadiah" aria-label="Search" style={{ maxWidth: "60%"}}/>
                                    <button class="btn" type="submit" style={{ width: '5rem', backgroundColor: "#006664", color: "white"}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        )} */}
                        { showLogin && (
                            <div>
                                { !onLogin ? (
                                    <div class="navbar-registrations">
                                        <div class="button-registrations-navbar">
                                            <button class="link" onClick={handleSignUpClick} style={style.navbuttondaftar}>Daftar</button>
                                        </div>
                                        <div class="button-registrations-navbar">
                                            <button class="link" onClick={handleLoginClick} style={ buttonLoginActive ? { backgroundColor: 'rgb(15, 195, 15)', color: 'white', border: '1px solid rgb(15, 195, 15)'} : { backgroundColor: "#006664", color: "white", border: 'none'}}>Log In</button>
                                        </div>
                                    </div>
                                ) :  (
                                    <div class="button-registrations-navbar">
                                        <button class="btn btn-danger" style={{ padding: '7.2px 25px' }} onClick={handleLogOut}>Logout</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    { onLogin && !isDasbor && (
                        <div class="container-fill-nav-usersdata">
                            <div onClick={() => handleDasborUserClick(users.username, users.email, users.whatshapp, users.poin)} className="nav-username" style={{ display: "flex"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#006664" class="bi bi-person" viewBox="0 0 16 16" style={style.logoUnderNavsvg}>
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                </svg>
                                { users.username }
                            </div>
                            <div onClick={onUploadNota} className="nav-upload" style={{ display: "flex"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#006664" class="bi bi-box-arrow-in-down" viewBox="0 0 16 16" style={style.logoUnderNavsvg}>
                                <path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1z"/>
                                <path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                                </svg>
                                Upload Nota
                            </div>
                            <div className="nav-poin" style={{ display: "flex"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="rgb(251, 251, 0)" class="bi bi-coin" viewBox="0 0 16 16" style={style.logoUnderNavsvg}>
                                <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z"/>
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/>
                                </svg>
                                { users.poin }
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        // </ValueContext.Provider>
    )
}

export default NavbarUser;




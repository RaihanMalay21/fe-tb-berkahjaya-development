import 'bootstrap/dist/css/bootstrap.min.css';
// import React,{useState, useEffect} from "react"
import "../App.css";
import { useAsyncError, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postSignup } from '../actions/actionsPost';
import { signupSlice } from '../reducers/reducers';

function SignUp() {
    const navigate = useNavigate();
    // usestate untuk daftar
    const [ data, setData ] = useState({
        username: '',
        email: '',
        whatshapp: '',
        password: '',
    })

    // usestate untuk repeat password
    const [ passwordRepeat, setPasswordRepeat ] = useState('');

    // handle authentikasi password
    const handlePasswordRepeat = (e) => {
        const { value} = e.target;
        setPasswordRepeat(value);
    }
    // usestate placeholder
    const [ placeholdername, setPlaceHoldername ] = useState('username');
    const [ isFocusedname, setIsFocusedname ] = useState(false);
    const [ placeHolderEmail, setPlaceHolderEmail ] = useState('Email');
    const [ isFocusedEmail, setIsFocusedEmail ] = useState(false);
    const [ placeholderpass, setPlaceHolderpass ] = useState('password');
    const [ isFocusedpass, setIsFocusedpass ] = useState(false);
    const [ repeatPass, setRepeatPass ] = useState(false);
    const [ placeHolderPassRepeat, setPlaceHolderpassRepeat ] = useState('ulangi password');
    const [ isFocusedpassRepeat, setIsFocusedpassRepeat ] = useState(false);
    const [ alertSuccess, setAlertSuccess ] = useState(false);
    const [ messageResponse, setMessageResponse ] = useState(null);
    const [ errEmail, setErrEmail ] = useState(null);
    const [ errUsername, setErrUsername ] = useState(null);
    const [ errPhone, setErrPhone ] = useState(null);
    const [ errPass, setErrPass ] = useState(null);
    const dispatch = useDispatch();
  
    // handle placeholder username
    const handleUsernameFocus = () => {
        setPlaceHoldername('harus terdapat number');
        setIsFocusedname(true);
    };

    const handleUsernameBlur = () => {
        setPlaceHoldername("username");
        setIsFocusedname(false);
    };

    // handle placeholder password
    const handlePasswordFocus = () => {
        setPlaceHolderpass('huruf dan angka minimal 6 karakter');
        setIsFocusedpass(true);
    };

    const handlePasswordBlur = () => {
        setPlaceHolderpass('password');
        setIsFocusedpass(false);
    };

    const handleEmailFocus = () => {
        setPlaceHolderEmail('Format harus berupa email');
        setIsFocusedEmail(true);
    }

    const handleEmailBlur = () => {
        setPlaceHolderEmail('Email');
        setIsFocusedEmail(false);
    }

    // useEffect memunculkan input ulangi password setelah password di isi
    useEffect(() => {
        if (data.password !== '') {
            setRepeatPass(true);
        };
    }, [data.password]);

    // handle placeholder password repeat
    const handlePasswordRepeatFocus = () => {
        setPlaceHolderpassRepeat('ulangi password seperti sebelumnya');
        setIsFocusedpassRepeat(true);
    };

    const handlePasswordRepeatBlur = () => {
        setPlaceHolderpassRepeat('ulangi password');
        setIsFocusedpassRepeat(false);
    };

    const handleInput = (e) => {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    // handle login have a account
    const handleLoginClick = (e) => {
        e.preventDefault();
        navigate('/login');
    }

    // handle kosongkan semua useState 
    const handleEmptyState = () => {
        setErrEmail(null);
        setErrPass(null);
        setErrPhone(null);
        setErrUsername(null);
        setRepeatPass(false);
        setPasswordRepeat('');
    } 

    // handle submit signup
    const { successSign, error, errorObject } = useSelector((state) => state.signupState);
    const { resetPostSignup } = signupSlice.actions;
    const submit = async (e) => {
        e.preventDefault();
        if (data.password !== passwordRepeat) {
            setPlaceHolderpassRepeat('password tidak sesuai');
            setIsFocusedpassRepeat(true);
            setPasswordRepeat('');
            return;
        }
        dispatch(postSignup(data));
    }

    useEffect(() => {
        if(successSign) {
            console.log(successSign);
            setMessageResponse(successSign);
            setAlertSuccess(true);
            setData({
                username: '',
                email: '',
                whatshapp: '',
                password: '',
            });
            handleEmptyState();
            
            const timer = setTimeout(() => {
                setAlertSuccess(false);
                dispatch(resetPostSignup());
            }, 3000);

            return () => clearTimeout(timer)
        }
        if(error) {
            console.log(error);
            setErrEmail(errorObject['User.Email']);
            setErrUsername(errorObject['User.UserName']);
            setErrPhone(errorObject['User.NoWhatshapp']);
            setErrPass(errorObject['User.Password']);
            setPasswordRepeat('');
            setRepeatPass(false);
        }
    }, [successSign, error]);

    // const submit = async (e) => {
    //     e.preventDefault();

    //     if (data.password !== passwordRepeat) {
    //         setPlaceHolderpassRepeat('password tidak sesuai');
    //         setIsFocusedpassRepeat(true);
    //         setPasswordRepeat('');
    //         return;
    //     }

    //     try{
    //         const response = await fetch('http://localhost:8080/access/berkahjaya/signup', {
    //             method: 'POST',
    //             headers: {'Content-Type': 'application/json'},
    //             body: JSON.stringify({
    //                 ...data
    //             }),
    //         });

    //         if (!response.ok) {
    //             // Jika respons tidak sukses, ambil pesan kesalahan dari respons
    //             const error = await response.json();
    //             console.log(error);
    //         }
    
    //         // Gunakan metode json() pada respons untuk menguraikan konten respons menjadi format JSON
    //         const responseData = await response.json();
    
    //         // Lakukan sesuatu dengan data respons yang telah diurai
    //         console.log(responseData);

    //     } catch(error) {
    //         // Tangani kesalahan jika ada
    //         console.error('Ada kesalahan:', error.message);
    //     }
    // }

    const style = {
        alertSuccess: {
            position: 'absolute',
            zIndex: '999999',
            color: 'white',
            top: '0px',
            padding: '10px 20px'
        },
        errorPlaceHolder: {
            border: '1px solid red',
        },
        fontErr: {
            color: 'red',
            textAlign: 'start', 
            fontSize: '12.5px',
            marginLeft: '20px',
            marginTop: '-15px'
        }
    }


    return (
        <div class="login-form" style={{  margin: 'auto'}}>
            { alertSuccess && (
                <div class="alert alert-success d-flex align-items-center" role="alert" style={style.alertSuccess}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" class="bi bi-check-circle-fill" viewBox="0 0 16 16" style={{ marginRight: '10px'}}>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                    <div>
                        { messageResponse }
                    </div>
                </div>
            )}
            <div class="container">
                <div class="main">
                    <div class="content">
                        <h2 style={{ color: '#006664'}}>Daftar</h2>
                        <form action="" method="post" onSubmit={submit}>
                            <input style={errUsername ? style.errorPlaceHolder : null} className={isFocusedname ? 'focused' : ''} onChange={handleInput} value={data.username} type="text" name="username" placeholder={placeholdername} required onFocus={handleUsernameFocus} onBlur={handleUsernameBlur}/>
                            { errUsername && (
                                <p style={style.fontErr}>{errUsername}</p>
                            )}
                            <input style={ errEmail ? style.errorPlaceHolder : null} className={isFocusedEmail ? 'focused' : ''} type="email" onChange={handleInput} value={data.email} name="email" placeholder={placeHolderEmail} onFocus={handleEmailFocus} onBlur={handleEmailBlur} required autoFocus="" />
                            { errEmail && (
                                <p style={style.fontErr}>{errEmail}</p>
                            )}
                            <input style={ errPhone ? style.errorPlaceHolder : null} type="number" onChange={handleInput} value={data.whatshapp} name="whatshapp" placeholder="Whatshap" required autoFocus="" />
                            { errPhone && (
                                <p style={style.fontErr}>{errPhone}</p>
                            ) }
                            <input style={ errPass ? style.errorPlaceHolder : null} className={isFocusedpass ? 'focused' : ''} value={data.password} onChange={handleInput} type="password" name="password" placeholder={placeholderpass} required onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} autoFocus="" />
                            {errPass && (
                                <p style={style.fontErr}>{errPass}</p>
                            )}
                            { repeatPass && (
                                <input className={isFocusedpassRepeat ? 'focused' : ''} value={passwordRepeat} onChange={handlePasswordRepeat} type="password" name="passwordRepeat" placeholder={placeHolderPassRepeat} onFocus={handlePasswordRepeatFocus} onBlur={handlePasswordRepeatBlur} required autoFocus="" />
                            )}
                            <button class="btn-login" type="submit" style={{ backgroundColor: '#006664'}}>
                                Daftar
                            </button> 
                        </form>
                        <p class="account">You Have an Account <a onClick={handleLoginClick} style={{ color: '#006664'}}>Login</a></p>
                    </div>
                    <div class="form-img">
                            <img src={ require(`../images/bg.png`)} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default SignUp
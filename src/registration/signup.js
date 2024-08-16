import 'bootstrap/dist/css/bootstrap.min.css';
// import React,{useState, useEffect} from "react"
import "../App.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


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
    const [ placeholderpass, setPlaceHolderpass ] = useState('password');
    const [ isFocusedpass, setIsFocusedpass ] = useState(false);
    const [ placeHolderPassRepeat, setPlaceHolderpassRepeat ] = useState('password');
    const [ isFocusedpassRepeat, setIsFocusedpassRepeat ] = useState(false);

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

    // handle placeholder password repeat
    const handlePasswordRepeatFocus = () => {
        setPlaceHolderpassRepeat('ulangi password');
        setIsFocusedpassRepeat(true);
    };

    const handlePasswordRepeatBlur = () => {
        setPlaceHolderpassRepeat('password');
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

    const submit = async (e) => {
        e.preventDefault();

        if (data.password !== passwordRepeat) {
            setPlaceHolderpassRepeat('password tidak sesuai');
            setIsFocusedpassRepeat(true);
            setPasswordRepeat('');
            return;
        }

        try{
            const response = await fetch('https://server-registry-tb-berkah-jaya-igcfjdj5fa-uc.a.run.app/berkahjaya/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    ...data
                }),
            });

            if (!response.ok) {
                // Jika respons tidak sukses, ambil pesan kesalahan dari respons
                const errorResponseData = await response.json();
                console.log(errorResponseData);
            }
    
            // Gunakan metode json() pada respons untuk menguraikan konten respons menjadi format JSON
            const responseData = await response.json();
    
            // Lakukan sesuatu dengan data respons yang telah diurai
            console.log(responseData);

        } catch(error) {
            // Tangani kesalahan jika ada
            console.error('Ada kesalahan:', error.message);
        }
    }


    return (
        <div class="login-form" style={{ height: '105vh', margin: 'auto'}}>
            <div class="container">
                <div class="main">
                    <div class="content">
                        <h2 style={{ color: '#006664'}}>Daftar</h2>
                        <form action="" method="post" onSubmit={submit}>
                            <input className={isFocusedname ? 'focused' : ''} onChange={handleInput} value={data.username} type="text" name="username" placeholder={placeholdername} required onFocus={handleUsernameFocus} onBlur={handleUsernameBlur}/>
                            <input type="email" onChange={handleInput} value={data.email} name="email" placeholder="Email" required autoFocus="" />
                            <input type="number" onChange={handleInput} value={data.whatshapp} name="whatshapp" placeholder="Whatshap" required autoFocus="" />
                            <input className={isFocusedpass ? 'focused' : ''} value={data.password} onChange={handleInput} type="password" name="password" placeholder={placeholderpass} required onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} autoFocus="" />
                            <input className={isFocusedpassRepeat ? 'focused' : ''} value={passwordRepeat} onChange={handlePasswordRepeat} type="password" name="passwordRepeat" placeholder={placeHolderPassRepeat} onFocus={handlePasswordRepeatFocus} onBlur={handlePasswordRepeatBlur} required autoFocus="" />
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
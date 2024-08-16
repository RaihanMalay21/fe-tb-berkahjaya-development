import 'bootstrap/dist/css/bootstrap.min.css';
import React,{ useState } from "react"
import { useNavigate } from 'react-router-dom';
import "../App.css";


function Login() {
    // inialisai function rediarect
    const navigate = useNavigate();
    const [errorAlert, setErrorAlert] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
        usernameORemail : '',
        password: '',
    });

    const HandleInput = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const submit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('https://server-registry-tb-berkah-jaya-igcfjdj5fa-uc.a.run.app/berkahjaya/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    usernameORemail: formData.usernameORemail,
                    password: formData.password
                })
            });
    
            if (!response.ok) {
                // Jika respons tidak sukses, ambil pesan kesalahan dari respons
                const errorResponseData = await response.json();
                throw new Error(errorResponseData.message || 'Ada masalah dengan permintaan.');
            }
            
            // Gunakan metode json() pada respons untuk menguraikan konten respons menjadi format JSON
            const responseData = await response.json();
    
            // Lakukan sesuatu dengan data respons yang telah diurai
            console.log(response);
            setTimeout(() => {
                window.location.reload();
            }, 10)
            // navigate to home screen
            navigate('/berkahjaya');
        } catch (error) {
            // Tangani kesalahan jika ada
            console.error('Ada kesalahan:', error.message);
            // error message on the alert
            setErrorMessage(error.message);
            setErrorAlert(true);
            // hide alert after 2.5 second
            setTimeout(() => {
                setErrorAlert(false);
            }, 2500);
        }
    };  

    // handle register
    const handleSignUpClick = (e) => {
        e.preventDefault();
        navigate('/signup');
    }

    // handle reset password
    const handleResetPass = (e) => {
        e.preventDefault();
        navigate('/berkahjaya/forgot/password');
    }

    return(
            <div class="login-form">
                <div className="alert-container">
                    {errorAlert && (
                        <div className="alert alert-danger d-flex align-items-center justify-content-center me-3" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16" style={{ transform: 'scale(1.25)', marginRight: '7.5px'}}>
                            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
                            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                            </svg>
                            <div>
                                {errorMessage}
                            </div>
                        </div>
                    )}
                </div>
                <h1>Login</h1>
                    <div class="container">
                        <div class="main">
                            <div class="content">
                                <h2 style={{ color: '#006664'}}>Log In</h2>
                                <form action="" method="post" onSubmit={submit}>
                                    <input type="text" name="usernameORemail" placeholder="Username atau Password" required autoFocus="" onChange={HandleInput}/>
                                    <input type="password" name="password" placeholder="Password" required autoFocus="" onChange={HandleInput}/>
                                    <button class="btn-login" type="submit" style={{ backgroundColor: '#006664'}}>
                                        Login
                                    </button> 
                                </form>
                                <p class="account">Don't Have An Account <a href="#" onClick={handleSignUpClick} style={{ color: '#006664'}}>Register</a></p>
                                <p class="account" style={{ marginTop: '-15px'}}>Lupa Password?<a href="#" onClick={handleResetPass} style={{ color: '#006664'}}>Reset</a></p>
                            </div>
                            <div class="form-img">
                                <img src={ require(`../images/bg.png`)} alt=""/>
                            </div>
                        </div>
                    </div>
            </div>
    )

}

export default Login;
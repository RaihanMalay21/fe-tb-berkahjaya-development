import 'bootstrap/dist/css/bootstrap.min.css';
import React,{ useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import "../App.css";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { postLogin } from '../actions/actionsPost';


function Login() {
    // inialisai function rediarect
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email : '',
        password: '',
    });

    const HandleInput = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const { messageLoginSuccess, errorLogin, loadingLogin,  statusCodeSuccess, errPass, errUsername } = useSelector((state) => state.loginState);
    const submit = async (e) => {
        e.preventDefault();
        dispatch(postLogin(formData));
    } 

    // useEffect untuk memonitor perubahan statusCodeSuccess dan errorLogin
    useEffect(() => {
        if (statusCodeSuccess === 200) {
            setTimeout(() => {
                window.location.reload();
            }, 1);
            navigate("/berkahjaya");
        } 
    }, [statusCodeSuccess]);


    // handle reset password
    const handleResetPass = (e) => {
        e.preventDefault();
        navigate('/berkahjaya/forgot/password');
    }

    const style = {
        messageErrorField : {
            color: "red",
            fontSize: '15px',
            marginTop: '-15px',
            marginLeft: '15px'
        }
    }

    return(
            <div class="login-form">
                <h1>Login</h1>
                    <div class="container">
                        <div class="main">
                            <div class="content">
                                <h2 style={{ color: '#006664'}}>Log In</h2>
                                <form onSubmit={submit}>
                                    <input require type="text" name="usernameORemail" placeholder="Username atau Password" required autoFocus="" onChange={HandleInput} style={{ border : errUsername ? "1px solid red" : ""}}/>
                                    { errUsername && (
                                        <div style={style.messageErrorField}>{errUsername}</div>
                                    )}
                                    <input require type="password" name="password" placeholder="Password" required autoFocus="" onChange={HandleInput} style={{ border : errPass ? "1px solid red" : ""}}/>
                                    { errPass && ( 
                                        <div style={style.messageErrorField}>{errPass}</div>
                                    )}
                                    <button class="btn-login" type="submit" style={{ backgroundColor: '#006664'}}>
                                        Login
                                    </button> 
                                </form>
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
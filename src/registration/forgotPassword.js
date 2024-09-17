import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [form, setFrom] = useState({ emailOrUsername : ''});
  const [loadSpinners, setLoadSpinners] = useState(false);
  const [alertSuccess, setAlertSucces] = useState(false);
  const [messageSucces, setMessageSucces] = useState('');
  const [messageFeals, setMessageFeals] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFrom({
      ...form,
      [name] : value
    })
  }

  useEffect(() => {
    if (form.emailOrUsername != '') {
      setMessageFeals('');
    }
  })

  const submit = async (e) => {
    e.preventDefault();
    setLoadSpinners(true);
   
    try {
      const response = await fetch('http://localhost:8080/access/berkahjaya/forgot/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          emailOrUsername: form.emailOrUsername,
        }).toString(),
      });
  
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      setFrom({emailOrUsername: ''});
      const data = await response.json();
      setMessageSucces(data.message);
      setAlertSucces(true);
      setTimeout(() => {
        setAlertSucces(false);
      }, 3000)
      console.log(data.message);
    } catch (error) {
      console.error('Error:', error.message);
      setMessageFeals(error.message);
      setFrom({emailOrUsername: ''});
    } finally {
      setLoadSpinners(false);
    }
  };

  const handleNavigate = () => {
    navigate('/signup');
  }
  
  const style = {
    alert: {
      position: 'fixed',
      zIndex: '1000',
      border: '1px solid white',
      color: 'white'
    }
  }

  return(
    <div>
      { alertSuccess && (
        <div class="alert-success d-flex align-items-center" role="alert" style={style.alert}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22.5" height="22.5" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16" style={{marginRight: '10px'}}>
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg>
            <div>
            {messageSucces}
            </div>
        </div>
      )}
      <div className="container-forgot-password">
          <div className="container-fill-forgot-password">
            <p style={{ textAlign: "start"}}>Masukkan email atau username yang terkait dengan akun Anda dan kami akan mengirimkan tautan email untuk mengatur ulang kata sandi Anda.</p> 
            <div style={{ margin: '-10px 0 -20px 0'}}>
              <h5>Email or username</h5>
              <form onSubmit={submit}>  
                <input type="text" name="emailOrUsername" value={form.emailOrUsername} onChange={handleChange} style={ messageFeals ? {border: 'none', boxShadow: '0 0 5px rgba(255, 0, 0, 0.7)' } : { display: 'block' }}/>
                { messageFeals && (
                  <p style={{color: 'red', fontSize: '12.5px', textAlign: 'start'}}>{messageFeals}</p>
                )}
                <button type="submit">Continue</button>
              </form>
            </div> 
            <p>Don't have an account? <a href="#" onClick={handleNavigate}>Sign up</a></p>
          </div>
      </div>
      { loadSpinners && (
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword;
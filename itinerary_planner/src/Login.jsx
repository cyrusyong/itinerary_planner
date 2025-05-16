import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './style.css'

function Login() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Login</h1>
      <div className="login">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Log In</button>
      </div>
      <div className="card">
        <button onClick={() => {
          navigate("/")
        }}>
          Go back to Home
        </button>
      </div>
    </>
  )
}

export default Login
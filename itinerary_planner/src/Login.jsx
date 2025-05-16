import { useState } from 'react';
import './style.css'

function Login() {

  return (
    <>
      <h1>Login</h1>
      <div className="login">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Log In</button>
      </div>
    </>
  )
}

export default Login
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const navigate = useNavigate()

  return (
    <>
      <h1>Login</h1>
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
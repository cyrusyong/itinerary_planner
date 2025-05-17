import { Link } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar"

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');

    const handleRegistration = async () => {
        if (!(password === confirm)) {
            setMessage('Passwords do not match');
            return;
        }
        setMessage('Success!') // placeholder
    };

    return (
        <>
          <NavBar />
          <div className='container'>

            <h1>Register to save plans</h1>
            {/* registration box */}
            <div className="auth">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <button onClick={handleRegistration}>Register</button>
          </div>
          {message && <p>{message}</p>}
          </div>
        </>
    )
}

export default Register
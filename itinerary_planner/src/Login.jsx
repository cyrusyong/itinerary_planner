import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './style.css'

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Response data:', data);
      if (data.success) {
        setMessage('Login successful!');
      } else {
        setMessage(data.message); // to be fixed
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Server error');
    }
  };

  return (
    <>
      <h1>Sign in to access lists</h1>

      {/* login box */}
      <div className="login">
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
        <button onClick={handleLogin}>Log In</button>
      </div>
      {message && <p>{message}</p>}

      {/* return box */}
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
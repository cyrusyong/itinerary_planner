import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Response data:', data); // to be removed
      if (data.success) {
        setMessage('Login successful!');
        setTimeout(() => {
          navigate('/app');
        }, 1500);
      } else {
        setMessage(data.message || "Login error"); // to be fixed
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Server error');
    }
  };

  return (
    <>
      <title>Login</title>

      <div className='container'>

        <h1>Sign in to access lists</h1>
        {/* login box */}
        <div className="auth">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin;
          }}
        >
        <input
          type="text"
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
        </form>

      </div>
      {message && <p>{message}</p>}
      </div>
    </>
  )
}

export default Login
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleRegistration = async () => {
    if (!email || !password) {
      return;
    } else if (!email.includes('@')) {
      setMessage('Invalid email');
      return;
    } else if (password !== confirm) {
      setMessage('Passwords do not match');
      return;
    } // could add special char / number reqs to password

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Registration successful!');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setMessage(data.message || "Bug");
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('Server error');
    }
  };

  return (
    <>
      <title>Register</title>
      
      <div className='container'>

        <h1>Register to save plans</h1>
        {/* registration box */}
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
          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button onClick={handleRegistration}>Register</button>
          </form>

        </div>
        {message && <p>{message}</p>}
        </div>

      </>
  )
}

export default Register
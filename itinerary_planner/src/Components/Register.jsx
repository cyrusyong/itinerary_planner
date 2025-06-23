import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/Register.module.css";
import SpotlightCard from "./SpotlightCard/SpotlightCard";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  const [emailFocus, setEmailFocus] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false)

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

      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1 className={styles.mainText}>Begin Your Guided Journey</h1>
          <h1 className={styles.mainText}><span className={styles.highlight}>Register Now</span></h1>
        </div>
        {/* registration box */}
        <div className={styles.auth}>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin;
            }}
          >
            <label className={emailFocus ? [styles.inputContainer, styles.highlight].join(" ") : styles.inputContainer}>
              Email
              <input
                className={styles.input}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => {
                  setEmailFocus(true)
                }}
                onBlur={() => {
                  setEmailFocus(false)
                }}
              />
            </label>

            <label className={passwordFocus ? [styles.inputContainer, styles.highlight].join(" ") : styles.inputContainer}>
              Password
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => {
                  setPasswordFocus(true)
                }}
                onBlur={() => setPasswordFocus(false)}
              />
            </label>

            <label className={confirmPasswordFocus ? [styles.inputContainer, styles.highlight].join(" ") : styles.inputContainer}>
              Confirm Password
              <input
                className={styles.input}
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onFocus={() => setConfirmPasswordFocus(true)}
                onBlur={() => setConfirmPasswordFocus(false)}
              />
            </label>

            <button onClick={handleRegistration} className={styles.registerButton}>
              <SpotlightCard spotlightColor="rgb(229, 229, 229)" className={styles.spotlightCard}>
                <h3 className={styles.registerText}>Register</h3>
              </SpotlightCard>
            </button>
          </form>

        </div>
        {message && <p>{message}</p>}
      </div>

    </>
  )
}

export default Register
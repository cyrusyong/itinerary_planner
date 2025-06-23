import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/Login.module.css";
import SpotlightCard from "./SpotlightCard/SpotlightCard";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [loginFocus, setLoginFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Response data:", data); // to be removed
      if (data.success) {
        setMessage("Login successful!");
        setTimeout(() => {
          navigate("/app");
        }, 1500);
      } else {
        setMessage(data.message || "Login error"); // to be fixed
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Server error");
    }
  };

  return (
    <>
      <title>Login</title>

      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1 className={styles.signinText}>Your Journey,</h1>
          <h1 className={styles.signinText} id={styles.indent}><span className={styles.highlight}>Expertly Guided</span>: Sign In</h1>
        </div>

        <div className={styles.auth}>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin;
            }}
          >
            <label className={loginFocus ? [styles.inputContainer, styles.highlight].join(" ") : styles.inputContainer}>
              Email
              <input
                type="text"
                value={email}
                className={styles.input}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => {
                  setLoginFocus(true)
                }}
                onBlur={() => {
                  setLoginFocus(false)
                }}
              />
            </label>

            <label className={passwordFocus ? [styles.inputContainer, styles.highlight].join(" ") : styles.inputContainer}>
              Password
              <input
                type="password"
                value={password}
                className={styles.input}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => {
                  setPasswordFocus(true)
                }}
                onBlur={() => {
                  setPasswordFocus(false)
                }}
              />
            </label>

            <button className={styles.loginButton} onClick={handleLogin}>
              <SpotlightCard
                spotlightColor="rgb(229, 229, 229)"
                className={styles.spotlightCard}
              >
                <h3 className={styles.loginText}>Log In</h3>
              </SpotlightCard>
            </button>
          </form>
        </div>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}

export default Login;

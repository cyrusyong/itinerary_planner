import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { doSignInWithEmailAndPassword } from "../../firebase/auth.js";
import { useAuth } from "../../contexts/authContexts"
import SpotlightCard from "../spotlight-card/SpotlightCard.jsx";

function Login() {
  const { userLoggedIn } = useAuth();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [loginFocus, setLoginFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  useEffect(() => {
    document.title = "Login";
  }, []);
  
  useEffect(() => {
    if (userLoggedIn) {
      navigate("/app");
    }
  }, [userLoggedIn, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    try {
      await doSignInWithEmailAndPassword(email, password);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setMessage("Invalid email!");
          break;
        case "auth/invalid-credential":
          setMessage("Incorrect username or password!")
          break;
        default:
          setMessage(error.message);
      }
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1 className={styles.signinText}>Your Journey,</h1>
          <h1 className={styles.signinText} id={styles.indent}><span className={styles.highlight}>Expertly Guided</span>: Sign In</h1>
        </div>

        <div className={styles.auth}>
          <form
            className={styles.form}
            onSubmit={onSubmit}
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
              {message &&
                <p style={{
                  position: "absolute",
                  marginTop: "70px",
                  color: "#ff0000",
                  fontSize: "0.9rem"
                }}
                >
                  {message}
                </p>
              }
            </label>

            <button type="submit" className={styles.loginButton}>
              <SpotlightCard
                spotlightColor="rgb(229, 229, 229)"
                className={styles.spotlightCard}
              >
                <h3 className={styles.loginText}>Log In</h3>
              </SpotlightCard>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

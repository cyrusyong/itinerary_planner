import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../contexts/authContexts";
import SpotlightCard from "../spotlight-card/SpotlightCard";

function Register() {
  const { userLoggedIn } = useAuth();

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  const [emailFocus, setEmailFocus] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false)

  useEffect(() => {
    document.title = "Register";
  })

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/app");
    }
  }, [userLoggedIn, navigate]);

  // handle registration
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirm) {
      return;
    } else if (password != confirm) {
      setMessage("Passwords do not match!");
    } else {
      try {
        // create new user using Firebase authentication
        const registered = await doCreateUserWithEmailAndPassword(email, password)
        const user = registered.user;
        // add blank user doc to Firestore database
        await setDoc(doc(db, "users", user.uid), {
          email: email,
          plans: null
        });
      } catch (error) {
        switch (error.code) {
          case "auth/invalid-email":
            setMessage("Invalid email!");
            break;
          case "auth/weak-password":
            setMessage("Password should be at least 6 characters!")
            break;
          case "auth/email-already-in-use":
            setMessage("Email already in use!")
            break;
          default:
            setMessage(error.message);
        }
      }
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1 className={styles.mainText}>Begin Your Guided Journey</h1>
          <h1 className={styles.mainText}><span className={styles.highlight}>Register Now</span></h1>
        </div>
        {/* registration box */}
        <div className={styles.auth}>
          <form
            className={styles.form}
            onSubmit={onSubmit}
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

            <button type="submit" className={styles.registerButton}>
              <SpotlightCard spotlightColor="rgb(229, 229, 229)" className={styles.spotlightCard}>
                <h3 className={styles.registerText}>Register</h3>
              </SpotlightCard>
            </button>
          </form>

        </div>
      </div>

    </>
  )
}

export default Register
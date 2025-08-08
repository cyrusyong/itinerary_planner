import { Link, useNavigate } from 'react-router-dom'
import SpotlightCard from '../spotlight-card/SpotlightCard.jsx'
import styles from "./Navbar.module.css"
import { useAuth } from '../../contexts/authContexts/index.jsx'
import { doSignOut } from '../../firebase/auth.js';

function NavBar() {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <Link to={"/"} viewTransition>
        <img src="/shepherd_logo.png" alt="Logo" className={styles.logo} />
      </Link>

      { userLoggedIn
        ?
        <div className={styles.buttonContainer}>
          <button className={styles.spotlightButton} onClick={() => { doSignOut().then(() => { navigate("/") }) }}>
            <SpotlightCard className={styles.spotlightCard}>
              <h4 className={styles.spotlightText}>Log Out</h4>
            </SpotlightCard>
          </button>
        </div>
        :
        <div className={styles.buttonContainer}>
          <Link to={"/login"} viewTransition>
            <button className={styles.spotlightButton}>
              <SpotlightCard className={styles.spotlightCard}>
                <h4 className={styles.spotlightText}>Login</h4>
              </SpotlightCard>
            </button>
          </Link>

          <Link to={"/register"} viewTransition>
            <button className={styles.spotlightButton}>
              <SpotlightCard className={styles.spotlightCard}>
                <h4 className={styles.spotlightText}>Register</h4>
              </SpotlightCard>
            </button>
          </Link>
        </div>
      }
    </nav>
  )
}

export default NavBar
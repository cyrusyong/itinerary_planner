import { Link } from 'react-router-dom'
import SpotlightCard from '../SpotlightCard/SpotlightCard'
import styles from "./Navbar.module.css"

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <Link to={"/"} viewTransition>
        <img src="/baby.svg" alt="Logo" className={styles.logo} />
      </Link>
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
    </nav>
  )
}

export default NavBar
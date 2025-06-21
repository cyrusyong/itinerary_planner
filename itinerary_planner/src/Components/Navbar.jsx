import { Link } from 'react-router-dom'
import '../Styles/index.css'
import SpotlightCard from './SpotlightCard/SpotlightCard'
import styles from "../Styles/Navbar.module.css"

function NavBar() {
  return (
    <nav className='navbar'>
      <Link to={"/"}>
        <img src="/baby.svg" alt="Logo" className="logo" />
      </Link>
      <div className={styles.buttonContainer}>
        <Link to={"/login"}>
          <button className={styles.spotlightButton}>
            <SpotlightCard className={styles.spotlightCard}>
              <h4 className={styles.spotlightText}>Login</h4>
            </SpotlightCard>
          </button>
        </Link>

        <Link to={"/register"}>
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
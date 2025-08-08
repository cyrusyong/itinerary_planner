import { Link, useNavigate } from 'react-router-dom'
import SpotlightCard from '../spotlight-card/SpotlightCard.jsx'
import styles from "./Navbar.module.css"
import { useAuth } from '../../contexts/authContexts/index.jsx'
import { doSignOut } from '../../firebase/auth.js';
import { useState } from 'react';

function NavBar() {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <Link to={"/"} viewTransition>
        <img src="/shepherd_logo.png" alt="Logo" className={styles.logo} />
      </Link>

      { userLoggedIn ? <LoggedIn navigate={navigate} /> : <LoggedOut /> }
    </nav>
  )
}

function LoggedIn({ navigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(prev => !prev);
  const closeDropdown = () => setIsOpen(false);
  return (
    <div className={styles.dropdown}>
      <img
        src="/user.png"
        className={styles.icon}
        onClick={toggleDropdown}
      />

      { isOpen && (
        <div className={styles.content} onMouseLeave={ closeDropdown }>
          <Link to="/app" onClick={closeDropdown}>App</Link>
          <Link to="/login" onClick={closeDropdown}>Plans</Link>
          <Link
            to="/register"
            onClick={(e) => {
              e.preventDefault();
              doSignOut().then(() => {
                closeDropdown();
                navigate("/");
              });
            }}
          >
            Log Out
          </Link>
        </div>
      )}
    </div>
  )
}

function LoggedOut() {
  return (
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
  )
}

export default NavBar
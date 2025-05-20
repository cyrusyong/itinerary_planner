import { Link } from 'react-router-dom'
import { useState } from 'react'
import '../Styles/index.css'

function NavBar_LO() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(prev => !prev);
  const closeDropdown = () => setIsOpen(false);

  return (
    <nav className='navbar'>
      <Link to={"/"}>
        <img src="/logo.svg" alt="Logo" className="logo" />
      </Link>

      <div className='dropdown'>
        <img
          src="/navbar/hamburger.png" /* placeholder icon */
          className="icon"
          onClick={toggleDropdown}
        />

        { isOpen && (
          <div className='content' onMouseLeave={ closeDropdown }>
            <Link to="/login" onClick={closeDropdown}>Login</Link>
            <Link to="/register" onClick={closeDropdown}>Register</Link>
          </div>
        )}

      </div>

    </nav>
  )
}

export default NavBar_LO
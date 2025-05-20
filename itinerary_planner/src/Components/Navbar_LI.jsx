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
          src="/navbar/user.png" /* placeholder icon */
          className="icon"
          onClick={toggleDropdown}
        />

        { isOpen && (
          <div className='content' onMouseLeave={ closeDropdown }>
            <Link to="/app" onClick={closeDropdown}>App</Link>
            <Link to="/login" onClick={closeDropdown}>Plans</Link>
            <Link to="/register" onClick={closeDropdown}>Log Out</Link> {/* placeholder, switch LI status and refresh on click */}
          </div>
        )}

      </div>

    </nav>
  )
}

export default NavBar_LO
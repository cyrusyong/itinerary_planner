import { Link } from 'react-router-dom'
import '../Styles/index.css'

function NavBar() {
    return (
        <nav className='navbar'>
            <Link to={"/"}>
              <div className='logo'>LOGO</div>
            </Link>
            <div>
                <Link to={"/login"}>
                    <button>Login</button>
                </Link>

                <Link to={"/register"}>
                    <button>Register</button>
                </Link>
            </div>
        </nav>
    )
}

export default NavBar
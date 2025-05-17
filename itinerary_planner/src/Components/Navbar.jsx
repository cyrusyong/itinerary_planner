import { Link } from 'react-router-dom'
import '../Styles/index.css'

function NavBar() {
    return (
        <nav className='navbar'>
            <div>
                <Link to={"/login"}>
                    <button>Login</button>
                </Link>

                <Link to={"/signup"}>
                    <button>Signup</button>
                </Link>
            </div>
        </nav>
    )
}

export default NavBar
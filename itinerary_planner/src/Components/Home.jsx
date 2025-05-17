import '../Styles/index.css'
import { Link } from 'react-router-dom'
import NavBar from './Navbar'

function Home() {

  return (
    <>
      <NavBar />

      <div className='welcome-container'>
        <h1>Welcome to the Planner</h1>

        <Link to={"./app"}>
          <button>
            Launch app
          </button>
        </Link>

      </div>

    </>
  )
}

export default Home

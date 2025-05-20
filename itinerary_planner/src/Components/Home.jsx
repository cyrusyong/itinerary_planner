import '../Styles/index.css'
import { Link } from 'react-router-dom'
import NavBar_LO from "./Navbar_LO";
import Footer from "./Footer";

function Home() {

  return (
    <>
      <NavBar_LO />

      <div className='container'>
        <h1>Welcome to Shepherd</h1>

        <Link to={"./app"}>
          <button>
            Launch app
          </button>
        </Link>

      </div>

      <Footer />
    </>
  )
}

export default Home

import '../Styles/index.css'
import { Link } from 'react-router-dom'
import NavBar from "./Navbar";
import Footer from "./Footer";

function Home() {

  return (
    <>
      <NavBar />

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

import '../Styles/index.css'
import { Link } from 'react-router-dom'

function Home() {

  return (
    <>
      <div className='container'>
        <h1>Welcome to Shepherd</h1>

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

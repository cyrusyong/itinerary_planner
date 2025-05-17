import { useState } from 'react'
import '../Styles/index.css'
import { useNavigate } from 'react-router-dom'
import NavBar from './Navbar'

function Home() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  return (
    <>
      <NavBar/>
      <h1>Welcome to the Planner</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button onClick={() => {
          navigate('/login')
        }}>
          Go to Login Page
        </button>
      </div>
    </>
  )
}

export default Home

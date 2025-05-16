import { useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  return (
    <>
      <h1>Welcome</h1>
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

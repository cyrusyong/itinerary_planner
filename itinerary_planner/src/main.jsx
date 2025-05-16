import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import Home from './Home.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)

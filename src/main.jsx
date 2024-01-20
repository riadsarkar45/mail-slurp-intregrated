import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from './authProvider/AuthProvider.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './Components/Login.jsx'

const router = createBrowserRouter([
  {
    path: "/:email",
    element: <App></App>,
    loader: ({params}) => fetch(`http://localhost:5000/users/${params.email}`)
  },
  {
    path: "/login",
    element: <Login></Login>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)

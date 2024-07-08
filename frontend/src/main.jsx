import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Soccer from'./components/Soccer/index.jsx'
import List from './components/List/index.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Soccer />
  },
  {
    path: '/list',
    element: <List />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

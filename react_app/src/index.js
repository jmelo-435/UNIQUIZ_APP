import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './app/components/Main/Main'
import Ranking from './app/components/Ranking/Ranking'


const router = createBrowserRouter([
  {
    path: '/',
    element: < Main/>
  },
  {
    path: '/ranking',
    element: < Ranking/>
  },

])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

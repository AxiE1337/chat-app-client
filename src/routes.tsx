import App from './pages/App'
import Auth from './pages/Auth'
import Layout from './pages/Layout'

const routes = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/login', element: <Auth /> },
    ],
  },
]

export default routes

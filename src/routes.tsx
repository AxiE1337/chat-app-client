import App from './pages/App'
import SingIn from './pages/SingIn'
import Layout from './pages/Layout'
import SignUp from './pages/SignUp'

const routes = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/signin', element: <SingIn /> },
      { path: '/signup', element: <SignUp /> },
    ],
  },
]

export default routes

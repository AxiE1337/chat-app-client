import App from './pages/App'
import SingIn from './pages/SingIn'
import Layout from './pages/Layout'
import SignUp from './pages/SignUp'
import Error from './pages/Error'

const routes = [
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <App /> },
      { path: '/signin', element: <SingIn /> },
      { path: '/signup', element: <SignUp /> },
    ],
  },
]

export default routes

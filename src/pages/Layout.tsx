import { Outlet } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { userAuth } from '../utils/api'
import SideBar from '../components/SideBar'

const Layout = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery('auth', userAuth, {
    onSettled(data) {
      const isLoggedIn = !!data?.user.id
      if (!isLoggedIn) {
        return navigate('/login', {
          replace: true,
        })
      } else {
        return navigate('/', {
          replace: true,
        })
      }
    },
  })

  if (isLoading) {
    return (
      <h1 className='flex flex-col min-h-screen items-center justify-center'>
        Loading...
      </h1>
    )
  }

  return (
    <main className='flex'>
      {data?.user.id && <SideBar />}
      <Outlet />
    </main>
  )
}

export default Layout

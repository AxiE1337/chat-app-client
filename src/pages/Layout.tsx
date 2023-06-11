import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { userAuth } from '../utils/api'
import SideBar from '../components/SideBar'

const Layout = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState<string>('')
  const { pathname } = useLocation()
  const { data, isLoading } = useQuery('auth', userAuth, {
    onSettled(data) {
      const isLoggedIn = !!data?.user.id
      if (!isLoggedIn) {
        if (pathname === '/signup') {
          return navigate('/signup', {
            replace: true,
          })
        }
        return navigate('/signin', {
          replace: true,
        })
      } else {
        return navigate('/', {
          replace: true,
        })
      }
    },
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage(
        'You will probably need to wait for a minute for backend to spin up.'
      )
    }, 2000)
    return () => {
      setMessage('')
      clearTimeout(timeout)
    }
  }, [])

  if (isLoading) {
    return (
      <div className='flex flex-col min-h-screen items-center justify-center'>
        <span className='loading loading-ring loading-lg'></span>
        <p>{message}</p>
      </div>
    )
  }

  return (
    <main className='flex'>
      {!!data?.user.id && <SideBar />}
      <Outlet />
    </main>
  )
}

export default Layout

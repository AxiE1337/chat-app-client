import { useState } from 'react'
import { logIn } from '../utils/api'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (username.length < 2 || password.length < 2) return
    const user = await logIn({ username: username, password: password })
    if (user?.token) {
      navigate('/', { replace: true })
      window.location.reload()
    }
  }

  return (
    <div className='flex flex-col min-h-screen w-full items-center justify-center'>
      <p>john123 password</p>
      <p>alex123 password</p>
      <form onSubmit={(e) => handleLogin(e)}>
        <input
          type='text'
          placeholder='username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>log in</button>
      </form>
    </div>
  )
}

export default Auth

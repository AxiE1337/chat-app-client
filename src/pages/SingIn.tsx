import { useState } from 'react'
import { signin } from '../utils/api'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'

const Auth = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (username.length < 2 || password.length < 2) return
    const user = await signin({ username: username, password: password })
    if (user?.token) {
      navigate('/', { replace: true })
      window.location.reload()
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen w-full'>
      <p>john123 password</p>
      <p>alex123 password</p>
      <form
        className='p-6 bg-white shadow-md rounded-md my-5'
        onSubmit={handleSubmit}
      >
        <h2 className='text-2xl font-bold mb-4'>Sign in</h2>
        <div className='mb-4'>
          <TextField
            type='text'
            variant='outlined'
            label='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <TextField
            type='password'
            variant='outlined'
            label='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type='submit' variant='outlined' className='w-full'>
          Sign In
        </Button>
      </form>
      <Button variant='outlined' onClick={() => navigate('/signup')}>
        Sign up
      </Button>
    </div>
  )
}

export default Auth

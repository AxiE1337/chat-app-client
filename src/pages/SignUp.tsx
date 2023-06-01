import { useState } from 'react'
import { signin, signup } from '../utils/api'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'

const SignUp = () => {
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.length < 2 || password.length < 4 || username.length < 2) return
    try {
      await signup({ password, username, name })
      setName('')
      setUsername('')
      setPassword('')
      await signin({ password, username })
      navigate('/', { replace: true })
      window.location.reload()
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className='flex flex-col justify-center items-center h-screen w-full'>
      <form
        className='p-6 bg-white shadow-md rounded-md my-5'
        onSubmit={handleSubmit}
      >
        <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>
        <div className='mb-4'>
          <TextField
            type='text'
            variant='outlined'
            label='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <Button type='submit' className='w-full'>
          Sign Up
        </Button>
      </form>
      <Button variant='outlined' onClick={() => navigate('/signup')}>
        Sign in
      </Button>
    </div>
  )
}

export default SignUp

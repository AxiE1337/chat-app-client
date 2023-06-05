import { useState } from 'react'
import { signin } from '../utils/api'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (username.length < 2 || password.length < 2) {
        return setError('fields shouldnt be empty!')
      }
      const user = await signin({ username: username, password: password })
      if (user?.token) {
        navigate('/', { replace: true })
        window.location.reload()
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message)
      }
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
          <input
            className='input bg-gray-200'
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <input
            className='input bg-gray-200'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='btn w-full' type='submit'>
          Sign In
        </button>
        <p className='p-1 mt-2 text-center'>{error}</p>
      </form>
      <button className='btn' onClick={() => navigate('/signup')}>
        Sign up
      </button>
    </div>
  )
}

export default Auth

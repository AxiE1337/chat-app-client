import { useState } from 'react'
import { signin, signup } from '../utils/api'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.length < 2 || password.length < 4 || username.length < 2) {
      return setError('fields shouldnt be empty!')
    }
    try {
      await signup({ password, username, name })
      setName('')
      setUsername('')
      setPassword('')
      await signin({ password, username })
      navigate('/', { replace: true })
      window.location.reload()
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message)
      }
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
          <input
            className='input bg-gray-200'
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <button type='submit' className='btn w-full'>
          Sign Up
        </button>
        <p className='p-1 mt-2 text-center'>{error}</p>
      </form>
      <button className='btn' onClick={() => navigate('/signin')}>
        Sign in
      </button>
    </div>
  )
}

export default SignUp

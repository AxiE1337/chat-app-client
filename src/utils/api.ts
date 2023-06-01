import { ILogIn, IUser } from '../types'

const baseUrl = import.meta.env.VITE_BASE_FETCH_URL

export const userAuth = async (): Promise<IUser | undefined> => {
  try {
    const res = await fetch(baseUrl + '/user/get', {
      credentials: 'include',
      cache: 'no-cache',
    })
    if (res.ok) {
      const data = await res.json()
      return data
    }
  } catch (e) {
    console.error(e)
  }
}

export const signin = async ({
  password,
  username,
}: {
  password: string
  username: string
}): Promise<ILogIn | undefined> => {
  const res = await fetch(import.meta.env.VITE_BASE_FETCH_URL + '/auth/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
  if (!res.ok) {
    throw new Error('Wrong password or username!')
  }
  if (res.ok) {
    const data = await res.json()
    return data
  }
}

export const signup = async ({
  password,
  username,
  name,
}: {
  password: string
  username: string
  name: string
}) => {
  const res = await fetch(baseUrl + '/auth/register', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
      name: name,
    }),
  })
  if (!res.ok) {
    const { message } = await res.json()
    throw new Error(message || 'Couldnt register you:(')
  }
  const data = await res.json()
  return data
}

export const logout = async () => {
  const res = await fetch(baseUrl + '/auth/logout', {
    credentials: 'include',
    method: 'GET',
  })
  if (!res.ok) {
    throw new Error('Couldnt log out:(')
  }
  return
}

export const searchUsers = async (username: string) => {
  const res = await fetch(baseUrl + `/user/search?username=${username}`, {
    credentials: 'include',
  })
  if (!res.ok) {
    throw new Error('Something went wrong:(')
  }
  const data = await res.json()

  return data
}

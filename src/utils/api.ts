import { ILogIn, IUser } from '../types'

const baseUrl = import.meta.env.VITE_BASE_FETCH_URL

export const userAuth = async (): Promise<IUser | undefined> => {
  try {
    const res = await fetch(baseUrl + '/user/get', {
      credentials: 'include',
    })
    if (res.ok) {
      const data = await res.json()
      return data
    }
  } catch (e) {
    console.error(e)
  }
}

export const logIn = async ({
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
  if (res.ok) {
    const data = await res.json()
    return data
  }
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

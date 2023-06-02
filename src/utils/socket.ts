import { io } from 'socket.io-client'

const URL = import.meta.env.PROD
  ? import.meta.env.VITE_BASE_FETCH_URL
  : 'http://localhost:3001'

export const socket = io(URL as string, {
  withCredentials: true,
})

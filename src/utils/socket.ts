import { io } from 'socket.io-client'

const URL = import.meta.env.PROD ? undefined : 'http://localhost:3001'

export const socket = io(URL as string, {
  withCredentials: true,
})

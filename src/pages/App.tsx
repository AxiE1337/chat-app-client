import { useQuery } from 'react-query'
import { userAuth } from '../utils/api'
import { useEffect, useState } from 'react'
import { socket } from '../utils/socket'
import Chat from '../components/Chat'

const App = () => {
  const { data } = useQuery('auth', userAuth)
  const [roomId, setRoomId] = useState<string>('')

  useEffect(() => {
    socket.on('joined_room', ({ roomId }: { roomId: string }) => {
      setRoomId(roomId)
    })
    return () => {
      socket.off('joined_room')
    }
  }, [])

  return (
    <main className='flex flex-col min-h-screen w-full items-center justify-center'>
      {roomId && (
        <Chat
          roomId={roomId}
          userId={data?.user.id}
          username={data?.user.username}
        />
      )}
    </main>
  )
}

export default App

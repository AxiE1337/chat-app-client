import { useQuery } from 'react-query'
import { userAuth } from '../utils/api'
import { useEffect, useState } from 'react'
import { socket } from '../utils/socket'
import { IMessage } from '../types'
import Chat from '../components/Chat'

const App = () => {
  const { data } = useQuery('auth', userAuth)
  const [messages, setMessages] = useState<IMessage[]>([])
  const [roomName, setRoomName] = useState<string[]>([])
  const [roomId, setRoomId] = useState<string>('')

  useEffect(() => {
    socket.on(
      'joined_room',
      ({
        messages,
        roomId,
        roomName,
      }: {
        messages: IMessage[]
        roomId: string
        roomName: string[]
      }) => {
        setMessages(messages)
        setRoomName(roomName)
        setRoomId(roomId)
      }
    )
    socket.on('receive_message', (message: IMessage) => {
      setMessages((prev) => [...prev, message])
    })

    return () => {
      socket.off('joined_room')
      socket.off('receive_message')
    }
  }, [])

  const handleMessage = () => {
    if (!data?.user || !roomId) return
    const message: IMessage = {
      id: (Math.random() * 100).toString(),
      uid: data?.user.id,
      username: data?.user.username,
      roomId: roomId,
      message: 'Hello world!',
      iat: new Date(Date.now()),
    }
    socket.emit('send_message', message)
  }

  return (
    <main className='flex flex-col min-h-screen w-full items-center justify-center'>
      {roomId && (
        <Chat
          messages={messages}
          handleMessage={handleMessage}
          roomId={roomId}
          roomName={roomName}
        />
      )}
    </main>
  )
}

export default App

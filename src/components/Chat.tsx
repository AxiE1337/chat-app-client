import { useEffect, useState, memo } from 'react'
import { IMessage } from '../types'
import { socket } from '../utils/socket'
import { Button } from '@mui/material'

const Chat = ({ roomId, userId, username }: IChat) => {
  const [messages, setMessages] = useState<IMessage[]>([])

  const handleSendMessage = () => {
    if (!userId || !roomId || !username) return
    const message: IMessage = {
      id: (Math.random() * 100).toString(),
      uid: userId,
      username: username,
      roomId: roomId,
      message: 'Hello world!',
      iat: new Date(Date.now()),
    }
    socket.emit('send_message', message)
  }

  const handleDeleteMessage = (message: IMessage) => {
    socket.emit('delete_message', message, userId)
  }

  useEffect(() => {
    socket.emit('get_messages', roomId)
    socket.on('receive_messages', (message: IMessage[]) => {
      setMessages(message)
    })
    socket.on('receive_message', (message: IMessage) => {
      setMessages((prev) => [...prev, message])
    })
    return () => {
      socket.off('receive_message')
      socket.off('receive_messages')
    }
  }, [roomId])

  return (
    <div className='flex flex-col items-center justify-center'>
      {messages.map((message) => (
        <div key={message.id} className='flex flex-col bg-slate-300 p-5'>
          <h1>{message.username + ' sent message'}</h1>
          <h1>{message.message}</h1>
          <p>{JSON.stringify(message.iat)}</p>
          {message.uid === userId && (
            <Button onClick={() => handleDeleteMessage(message)}>delete</Button>
          )}
        </div>
      ))}
      <button onClick={handleSendMessage}>send message</button>
    </div>
  )
}

export default memo(Chat)

interface IChat {
  roomId: string
  userId: string | undefined
  username: string | undefined
}

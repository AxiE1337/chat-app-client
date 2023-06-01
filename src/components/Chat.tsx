import { useEffect, useState, memo } from 'react'
import { IMessage } from '../types'
import { socket } from '../utils/socket'
import Message from './Message'

const Chat = ({ roomId, userId, username }: IChat) => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [inputValue, setInputValue] = useState<string>('')

  const handleSendMessage = () => {
    if (!userId || !roomId || !username || inputValue.length < 1) return
    const message: IMessage = {
      id: (Math.random() * 100).toString(),
      uid: userId,
      username: username,
      roomId: roomId,
      message: inputValue,
      iat: new Date(Date.now()),
    }
    socket.emit('send_message', message)
    setInputValue('')
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
    <div className='flex flex-col items-center justify-center w-3/5'>
      <div className='flex flex-col flex-grow w-full bg-slate-300 shadow-xl rounded-lg overflow-hidden'>
        <div className='flex flex-col flex-grow w-full h-[500px] p-4 overflow-auto'>
          {messages.map((m) => (
            <Message
              message={m}
              isAuthor={m.uid === userId}
              handleDeleteMessage={handleDeleteMessage}
              key={m.id}
            />
          ))}
        </div>

        <div className='flex items-end justify-center bg-gray-300 p-4 join'>
          <input
            className='input w-full max-w-xs join-item'
            type='text'
            placeholder='Type your message…'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className='btn join-item' onClick={handleSendMessage}>
            send
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(Chat)

interface IChat {
  roomId: string
  userId: string | undefined
  username: string | undefined
}

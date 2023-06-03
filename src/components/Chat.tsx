import { useEffect, useState, memo, FormEvent } from 'react'
import { IMessage } from '../types'
import { socket } from '../utils/socket'
import Message from './Message'

const Chat = ({ roomId, userId, username }: IChat) => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [inputValue, setInputValue] = useState<string>('')

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
    <div className='flex flex-col items-center justify-center w-full md:w-full h-screen'>
      <div className='flex flex-col flex-grow w-full bg-gray-800 shadow-xl md:rounded-none overflow-hidden'>
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
        <form
          onSubmit={handleSendMessage}
          className='flex items-end justify-center bg-gray-700 p-4 md:p-0 rounded join'
        >
          <input
            className='input w-full max-w-xs join-item'
            type='text'
            placeholder='Type your message…'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type='submit' className='btn join-item'>
            send
          </button>
        </form>
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

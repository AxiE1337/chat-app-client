import { IMessage } from '../types'

const Chat = ({ messages, handleMessage }: IChat) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      {messages.map((message) => (
        <div key={message.id} className='flex flex-col bg-slate-300 p-5'>
          <h1>{message.username + ' sent message'}</h1>
          <h1>{message.message}</h1>
        </div>
      ))}
      <button onClick={handleMessage}>send message</button>
    </div>
  )
}

export default Chat

interface IChat {
  messages: IMessage[]
  roomId?: string
  roomName?: string[]
  handleMessage: () => void
}

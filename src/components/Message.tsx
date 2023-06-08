import { memo } from 'react'
import { IMessage } from '../types'

const Message = ({ message, handleDeleteMessage, isAuthor }: IMessageProps) => {
  return (
    <div
      className={`flex mb-2 w-2/4 bg-white rounded-sm relative ${
        isAuthor ? 'ml-auto' : 'mr-auto'
      } slide-in-left`}
    >
      <div className='rounded py-2 px-3 w-full'>
        <p className='text-sm text-teal'>
          {isAuthor ? 'You' : message.username}
        </p>
        <p className='mt-1 text-xl break-words'>{message.message}</p>
        <p className='text-right text-xs text-grey-dark mt-1'>
          {message.iat.toString()}
        </p>
      </div>
      {isAuthor && (
        <button
          className='btn btn-circle btn-ghost btn-sm absolute right-0 top-0'
          onClick={() => handleDeleteMessage(message)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24px'
            height='24px'
          >
            <path d='M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z' />
          </svg>
        </button>
      )}
    </div>
  )
}

export default memo(Message)
interface IMessageProps {
  message: IMessage
  isAuthor: boolean
  handleDeleteMessage: (message: any) => void
}

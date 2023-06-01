import { memo, ReactElement } from 'react'

interface IModal {
  children: ReactElement
  open: boolean
  onClose: (value: boolean) => void
}

function Modal({ children, open, onClose }: IModal) {
  return (
    <div
      className={`fixed inset-0 ${
        open ? 'flex' : 'hidden'
      } items-center justify-center z-10`}
    >
      <div
        onClick={() => onClose(false)}
        className='fixed inset-0 bg-gray-500 bg-opacity-75'
      ></div>
      <div className='flex flex-col items-center justify-center p-1 h-fit w-fit rounded-md bg-white z-10'>
        {children}
      </div>
    </div>
  )
}

export default memo(Modal)

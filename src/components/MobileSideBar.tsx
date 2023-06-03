import { useState } from 'react'
import Modal from './ui/Modal'
import BurgerBtn from './ui/BurgerBtn'

const MobileSideBar = ({ children }: IMobileSideBar) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className='hidden md:block'>
      <BurgerBtn
        value={open ? 'off' : 'on'}
        onChange={(value) => setOpen(value === 'off' ? true : false)}
      />
      <Modal open={open} onClose={() => setOpen(false)}>
        {children}
      </Modal>
    </div>
  )
}

export default MobileSideBar

interface IMobileSideBar {
  children: React.ReactElement
}

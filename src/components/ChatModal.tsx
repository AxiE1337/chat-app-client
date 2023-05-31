import { useState, memo, useMemo } from 'react'
import { Button, Modal, TextField } from '@mui/material'
import { IRoom, IUserSearch } from '../types'
import { socket } from '../utils/socket'
import { searchUsers, userAuth } from '../utils/api'
import { useQuery } from 'react-query'
import User from './User'
import findUserIds from '../utils/findUserIds'

const ChatModal = ({ rooms }: IChatModal) => {
  const [open, setOpen] = useState<boolean>(false)
  const [users, setUsers] = useState<IUserSearch[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const { data } = useQuery('auth', userAuth)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleCreateRoom = async ({
    username,
    userId,
  }: {
    username: string
    userId: string
  }) => {
    if (!username || !userId) return
    const room: IRoom = {
      id: (Math.random() * 100).toString(),
      roomName: [data?.user.username as string, username],
      usersId: [data?.user.id as string, userId],
    }
    socket.emit('create_room', { room: room, userId: data?.user.id })
    setUsers([])
    handleClose()
  }
  const handleSearchUsers = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.length < 2) return
    const { users: data } = await searchUsers(inputValue)
    setUsers(data)
    setInputValue('')
  }

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>
        Start a chat
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <section className='absolute flex flex-col gap-5 top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 p-4 bg-slate-500 w-[400px]'>
          <h2 className='text-center'>Find someone whom to message</h2>
          <form
            onSubmit={(e) => handleSearchUsers(e)}
            className='flex gap-5 items-center justify-center'
          >
            <TextField
              variant='standard'
              value={inputValue}
              placeholder='Search by usernames'
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              disabled={inputValue.length < 2}
              type='submit'
              variant='contained'
            >
              search
            </Button>
          </form>
          {users.map((user, index) => (
            <User
              key={index}
              user={user}
              handleCreateRoom={handleCreateRoom}
              isDisabled={() =>
                useMemo(() => findUserIds(rooms, user.id), [users])
              }
            />
          ))}
        </section>
      </Modal>
    </div>
  )
}

export default memo(ChatModal)

interface IChatModal {
  rooms: IRoom[]
}

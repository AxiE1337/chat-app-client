import { useEffect, useState } from 'react'
import { logout, userAuth } from '../utils/api'
import { useQuery } from 'react-query'
import { socket } from '../utils/socket'
import { IRoom } from '../types'
import NewChatModal from './NewChatModal'

const SideBar = () => {
  const { data } = useQuery('auth', userAuth)
  const [selectedRoomId, setSelectedRoomId] = useState<string>('')
  const [rooms, setRooms] = useState<IRoom[]>([])

  const handleJoinRoom = (roomId: string) => {
    socket.emit('join_room', roomId)
    setSelectedRoomId(roomId)
  }

  const handleLogout = async () => {
    try {
      await logout()
      window.location.reload()
    } catch (e) {
      if (e instanceof Error) console.log(e.message)
    }
  }

  useEffect(() => {
    socket.emit('get_rooms', data?.user.id)
    socket.on('receive_rooms', (rooms: IRoom[]) => {
      setRooms(rooms)
    })
    return () => {
      socket.off('receive_rooms', () => setRooms([]))
    }
  }, [])

  return (
    <header className='flex flex-col gap-4 items-center bg-gray-800 w-[300px] md:w-[100px] min-h-screen'>
      <div className='flex w-full justify-between items-center p-4 md:p-1 md:flex-col'>
        <h1 className='text-center text-white'>{data?.user.name}</h1>
        {data?.user.id && (
          <button
            className='btn btn-ghost btn-xs text-white'
            onClick={handleLogout}
          >
            log out
          </button>
        )}
      </div>
      <NewChatModal rooms={rooms} />
      {rooms.map((room) => (
        <div
          key={room.id}
          onClick={() => handleJoinRoom(room.id)}
          className={`${
            room.id === selectedRoomId ? 'bg-gray-500' : 'bg-gray-600'
          } p-10 mt-1 md:p-5 rounded cursor-pointer`}
        >
          <h2 className='text-white select-none'>
            {room.roomName.filter((n) => n !== data?.user.username)}
          </h2>
        </div>
      ))}
    </header>
  )
}

export default SideBar

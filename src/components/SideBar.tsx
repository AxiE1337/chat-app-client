import { useEffect, useState } from 'react'
import { logout, userAuth } from '../utils/api'
import { useQuery } from 'react-query'
import { socket } from '../utils/socket'
import { IRoom } from '../types'
import ChatModal from './ChatModal'

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
    <header className='flex flex-col bg-slate-400 w-1/4 min-h-screen'>
      <h1 className='text-center'>{data?.user.name}</h1>
      {rooms.map((room) => (
        <div
          key={room.id}
          className={`${
            room.id === selectedRoomId ? 'bg-green-600' : 'bg-green-400'
          } p-10 mt-1`}
        >
          <button onClick={() => handleJoinRoom(room.id)}>
            {room.roomName}
          </button>
        </div>
      ))}
      <ChatModal rooms={rooms} />
      {data?.user.id && <button onClick={handleLogout}>log out</button>}
    </header>
  )
}

export default SideBar

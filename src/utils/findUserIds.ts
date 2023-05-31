import { IRoom } from '../types'

const findUserIds = (rooms: IRoom[], userId: string): boolean => {
  for (let room of rooms) {
    for (let id of room.usersId) {
      if (userId === id) {
        return true
      }
    }
  }
  return false
}

export default findUserIds

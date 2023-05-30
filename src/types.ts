export interface IUser {
  user: { name: string; id: string; username: string }
}
export interface ILogIn {
  token: string
}

export interface IMessage {
  id: string
  uid: string
  username: string
  roomId: string
  message: string
  iat: Date
}
export interface IRoom {
  id: string
  roomName: string[]
  usersId: string[]
  messages: IMessage[]
}

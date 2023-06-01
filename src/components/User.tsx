import { memo } from 'react'
import { IUserSearch } from '../types'

const User = ({ user, handleCreateRoom, isDisabled }: IUserProps) => {
  return (
    <div className='flex gap-5 items-center justify-between bg-slate-900 py-2 px-5 rounderd'>
      <h2 className='text-white'>{user.username}</h2>
      <button
        className='btn btn-outline btn-sm text-white'
        disabled={isDisabled()}
        onClick={() =>
          handleCreateRoom({ username: user.username, userId: user.id })
        }
      >{`Text ${user.name}`}</button>
    </div>
  )
}

export default memo(User)

interface IUserProps {
  user: IUserSearch
  isDisabled: () => boolean
  handleCreateRoom: ({
    username,
    userId,
  }: {
    username: string
    userId: string
  }) => void
}

import { memo } from 'react'
import { IUserSearch } from '../types'
import { Button } from '@mui/material'

const User = ({ user, handleCreateRoom, isDisabled }: IUserProps) => {
  return (
    <div className='flex gap-5 items-center justify-center'>
      <h2>{user.username}</h2>
      <Button
        variant='contained'
        disabled={isDisabled()}
        onClick={() =>
          handleCreateRoom({ username: user.username, userId: user.id })
        }
      >{`Text ${user.name}`}</Button>
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

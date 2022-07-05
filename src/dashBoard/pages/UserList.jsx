import React from 'react'
import { TableUsers } from '../components/TableUsers'
import { DashBoardLayaout } from '../layaout/DashBoardLayaout'

export const UserList = () => {
  return (
    <DashBoardLayaout>
      <TableUsers />
    </DashBoardLayaout>
  )
}

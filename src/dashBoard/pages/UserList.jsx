import React from 'react'
import { DashBoardLayaout } from '../../dashBoardUser/layaout/DashBoardLayaout'
import { TableUsers } from '../components/TableUsers'

export const UserList = () => {
  return (
    <DashBoardLayaout>
      <TableUsers />
    </DashBoardLayaout>
  )
}

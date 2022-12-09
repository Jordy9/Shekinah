import React from 'react'
import { DashBoardLayaout } from '../../dashBoardUser/layaout/DashBoardLayaout'
import { TableQuestion } from '../components/TableQuestion'

export const QuestionList = () => {
  return (
    <DashBoardLayaout>
      <TableQuestion />
    </DashBoardLayaout>
  )
}

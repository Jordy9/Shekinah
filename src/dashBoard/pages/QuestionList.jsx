import React from 'react'
import { TableQuestion } from '../components/TableQuestion'
import { DashBoardLayaout } from '../layaout/DashBoardLayaout'

export const QuestionList = () => {
  return (
    <DashBoardLayaout>
        <TableQuestion />
    </DashBoardLayaout>
  )
}

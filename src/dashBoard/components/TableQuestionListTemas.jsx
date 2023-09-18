import React from 'react'
import { useSelector } from 'react-redux'
import { QuestionListTema } from './QuestionListTema'

export const TableQuestionListTemas = () => {
    const { temas } = useSelector(state => state.tm)
    return (
        <>
            {
                (temas)
                    &&
                    temas?.map(temas => {
                        return (
                            <QuestionListTema key = {temas._id} {...temas} />
                        )
                    })
            }
        </>
    )
}

import React from 'react'
import { useSelector } from 'react-redux'
import { QuestionList } from './QuestionList'

export const TableQuestionList = () => {
    const {preguntas} = useSelector(state => state.pg)
    return (
        <>
            {
                (preguntas)
                    &&
                    preguntas?.map(pregunta => {
                        return (
                            <QuestionList key = {pregunta._id} {...pregunta} />
                        )
                    })
            }
        </>
    )
}

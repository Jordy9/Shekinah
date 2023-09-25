import React from 'react'
import { useSelector } from 'react-redux'
import { QuestionListPreguntasParaTema } from './QuestionListPreguntasParaTema'

export const TableQuestionListPreguntasParaTema = () => {
    const { preguntas } = useSelector(state => state.pgt)
    return (
        <>
            {
                (preguntas)
                    &&
                    preguntas?.map(preguntas => {
                        return (
                            <QuestionListPreguntasParaTema key = {preguntas._id} {...preguntas} />
                        )
                    })
            }
        </>
    )
}

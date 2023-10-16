import React from 'react'
import { useSelector } from 'react-redux'
import { TableContent } from './TableContent'

export const TablaSpreedList = () => {

    const { top10 } = useSelector(state => state.auth)
    
    return (
        <>
            {
                    top10?.map(usuario => {
                        return (
                            <TableContent key = {usuario?.id} {...usuario} />
                        )
                    })
            }
        </>
    )
}

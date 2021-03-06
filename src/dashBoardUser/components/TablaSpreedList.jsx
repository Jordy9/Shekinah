import React from 'react'
import { useSelector } from 'react-redux'
import { TableContent } from './TableContent'

export const TablaSpreedList = () => {
    const { usuarios } = useSelector(state => state.auth)

    return (
        <>
            {
                (usuarios)
                    &&
                    usuarios?.map(usuario => {
                        return (
                            <TableContent key = {usuario?.id} {...usuario} />
                        )
                    })
            }
        </>
    )
}

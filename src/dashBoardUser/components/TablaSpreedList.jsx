import React from 'react'
import { useSelector } from 'react-redux'
import { TableContent } from './TableContent'

export const TablaSpreedList = () => {
    const { usuarios } = useSelector(state => state.auth)

    const usuariosTop = () => {
        const usuariosOrdenados = usuarios?.map(usuarios => usuarios).sort((a, b) => a - b)

        return usuariosOrdenados.slice(0, 10)
    }

    return (
        <>
            {
                (usuarios)
                    &&
                    usuariosTop()?.map(usuario => {
                        return (
                            <TableContent key = {usuario?.id} {...usuario} />
                        )
                    })
            }
        </>
    )
}

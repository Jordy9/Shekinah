import React from 'react'
import { useSelector } from 'react-redux';
import { TableUsersContent } from './TableUsersContent';

export const TableUsersSpreed = () => {

    const { usuarios } = useSelector(state => state.auth);

  return (
    <>
            {
                (usuarios)
                    &&
                    usuarios?.map(usuario => {
                        return (
                            <TableUsersContent key = {usuario?.id} {...usuario} />
                        )
                    })
            }
        </>
  )
}

import React from 'react'
import user from '../../heroes/user.webp'

export const TableContent = (props) => {

    const { name, juego } = props

  return (
    <tr style={{cursor: 'pointer'}}>
        <td className='d-flex justify-content-center'>
            <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                <img src={user} className='img-fluid' alt="" />
            </div>
        </td>
        <td>{name}</td>
        <td>{juego?.puntos || 0}</td>
    </tr>
  )
}

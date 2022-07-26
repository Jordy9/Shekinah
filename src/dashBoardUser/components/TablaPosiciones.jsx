import React from 'react'
import user from '../../heroes/user.webp'

export const TablaPosiciones = () => {
  return (
    <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-8 col-xxl-8 mx-auto">

            <div className='table-responsive shadow p-4' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: '500px', backgroundColor: 'white'}}>
                <div style={{justifyContent: 'space-between', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                    <h4 className='text-center text-black'>Top 10</h4>
                    <h4 className='text-center text-black'>Jordy</h4>
                </div>
                <table className="table borderless">
                    <thead>
                        <tr>
                            <th scope="col">Imagen</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Puntos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{cursor: 'pointer'}}>
                            <td className='d-flex justify-content-center'>
                                <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                    <img src={user} className='img-fluid' alt="" />
                                </div>
                            </td>
                            <td>Jordy</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td className='d-flex justify-content-center'>
                                <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                    <img src={user} className='img-fluid' alt="" />
                                </div>
                            </td>
                            <td>Jordy</td>
                            <td>90</td>
                        </tr>
                        <tr>
                            <td className='d-flex justify-content-center'>
                                <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                    <img src={user} className='img-fluid' alt="" />
                                </div>
                            </td>
                            <td>Jordy</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td className='d-flex justify-content-center'>
                                <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                    <img src={user} className='img-fluid' alt="" />
                                </div>
                            </td>
                            <td>Jordy</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td className='d-flex justify-content-center'>
                                <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                    <img src={user} className='img-fluid' alt="" />
                                </div>
                            </td>
                            <td>Jordy</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td className='d-flex justify-content-center'>
                                <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                    <img src={user} className='img-fluid' alt="" />
                                </div>
                            </td>
                            <td>Jordy</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td className='d-flex justify-content-center'>
                                <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                    <img src={user} className='img-fluid' alt="" />
                                </div>
                            </td>
                            <td>Jordy</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td className='d-flex justify-content-center'>
                                <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                    <img src={user} className='img-fluid' alt="" />
                                </div>
                            </td>
                            <td>Jordy</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td className='d-flex justify-content-center'>
                                <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                    <img src={user} className='img-fluid' alt="" />
                                </div>
                            </td>
                            <td>Jordy</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td className='d-flex justify-content-center'>
                                <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                    <img src={user} className='img-fluid' alt="" />
                                </div>
                            </td>
                            <td>Jordy</td>
                            <td>100</td>
                        </tr>
                    </tbody>
                </table>
                    {/* <div className="row">
                        <div className="col-12" style={{bottom: 0}}>
                            <button className='btn'>Hola</button>
                            <button className='btn'>Hola</button>
                            <button className='btn'>Hola</button>
                            <button className='btn'>Hola</button>
                        </div>
                    </div> */}
            </div>
        </div>
    </div>
  )
}

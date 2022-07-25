import React, { Fragment } from 'react'
import { Modal, Button } from 'react-bootstrap'

export const ModalBibleContent = ({ShowModalContent, setShowModalContent, content, capitulo, libro, inicio, fin}) => {

    const handleClose = () => {
        setShowModalContent(false)
    }

  return (
    <Modal size='lg' show={ShowModalContent} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{libro} {Number(capitulo) + 1}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                content?.map((contenido, index) => {
                    return (
                        <Fragment key={contenido + index}>
                            <h6>{index + Number(inicio) + 1}. {contenido}</h6>
                        </Fragment>
                    ) 
                })
            }
        </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor: 'rgba(33,93,59,255)'}} onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

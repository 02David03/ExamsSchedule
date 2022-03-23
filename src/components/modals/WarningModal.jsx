import React from "react";
import { Modal, Button } from "react-bootstrap";
  
export default function WarningModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header className="ModalHeader">
        <Modal.Title className="modalTitle"> <h1 className="BlueH1"> {props.title} </h1></Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <p> {props.mensage} </p>
      </Modal.Body>
      <Modal.Footer className="ModalFooter">
        <Button className="ModalCloseButton" variant="outline-secondary" onClick={props.handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

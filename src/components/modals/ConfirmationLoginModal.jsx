import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

export default function ConfirmationLoginModal(props) {
  let navigate = useNavigate();

  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header className="ModalHeader">
        <Modal.Title> <h1 className="BlueH1">Cadastro completo </h1> </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Sua conta foi criada, agora você poderá agendar seus exames
        tranquilamente.
      </Modal.Body>
      <Modal.Footer className="ModalFooter">
        <Button
          className="ModalAccertButton"
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            navigate('/schedules');
            props.handleClose();
          }}
        >
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

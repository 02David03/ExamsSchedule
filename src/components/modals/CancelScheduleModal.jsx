import React from "react";
import { Modal, Button } from "react-bootstrap";
import { cancelSchedule } from "../../requests/Schedule";

export default function CancelScheduleModal(props) {

  const cancel = async () => {
    cancelSchedule(props.data);
  };

  const cancelCall = async () => {
    await cancel();
    window.location.reload();
    props.handleClose();
  };

  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header className="ModalHeader">
        <Modal.Title>
          {" "}
          <h1 className="BlueH1">Cancelamento de agendamento</h1>{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Tem certeza que deseja cancelar esse agendamento? Saiba que essa é uma
        ação irreversível.
      </Modal.Body>
      <Modal.Footer className="ModalFooter" style={{alignItems: "center"}}>
        <Button
          className="ModalCancelButton"
          variant="danger"
          onClick={(e) => {
            e.preventDefault();
            cancelCall();
          }}
        >
          Cancelar agendamento
        </Button>
        <Button
          className="ModalCloseButton"
          variant="outline-secondary"
          onClick={props.handleClose}
        >
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

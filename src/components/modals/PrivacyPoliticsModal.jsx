import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function PrivacyPoliticsModal(props) {
  return (
    <Modal show={props.show} size="lg" onHide={props.handleClose} centered>
      <Modal.Header className="ModalHeader">
        <Modal.Title> <h1 className="BlueH1"> Termos e Política de privacidade </h1></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
        ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
        elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
        aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
        est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
        sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
        justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
        takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
      </Modal.Body>
      <Modal.Footer className="ModalFooter">
        <Button className="ModalCloseButton" variant="outline-secondary" onClick={props.handleClose}>
          <p style={{marginBottom: 0}}> Fechar </p>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

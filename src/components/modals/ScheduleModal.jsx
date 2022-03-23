import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { cancelSchedule } from "../../requests/Schedule";

export default function ScheduleModal(props) {

  const cancel = async () => {
    cancelSchedule({ ...props.data, location: null });
  };

  const cancelCall = async () => {
    await cancel();
    window.location.reload();
    props.handleClose();
  };

  const capitalize = (string) => {
    return string.charAt(0) + string.slice(1).toLowerCase();
  };

  return (
    <Modal show={props.show} onHide={props.handleClose} size="lg" centered>
      <Modal.Header style={{ padding: "4%" }} className="ModalHeader">
        <Modal.Title>
          <h1 className="BlueH1"> Comprovante de agendamento </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "4%" }}>
        <Row>
          <Col xs="auto">
            <h1>{ props.date } - {props.data ? props.data.hora : ""} </h1>
          </Col>
          <Col>
            <h3 className="GreenH3">
              {props.data ? capitalize(props.data.status) : ""}{" "}
            </h3>
          </Col>
        </Row>
        <h4> Orientações </h4>
        <ul className="UlRed">
          <li>
            Caso sejam informados dados falsos relacionados ao seu agendamento,
            ele poderá ser cancelado a critério do vacinador ou supervisor da
            sala de vacina (Art. 299 - Código Penal)
          </li>
          <li>
            Você poderá cancelar seu agendamento com até 24h de antecedência. Em
            caso de não comparecimento, um novo agendamento será permitido após
            48h do agendamento anterior.
          </li>
          <li>
            O horário de agendamento poderá sofrer alterações, caso surjam
            problemas logísticos identificados pelo supervisor da sala de vacina
          </li>
        </ul>
        <div className="Separator" />
        <Row>
          <Col xs="auto">
            <h4> Cidadão: </h4>
          </Col>
          <Col>
            <p style={{ margin: 0 }}> {localStorage.getItem("userName")} </p>
          </Col>
        </Row>
        <Row>
          <Col xs="auto">
            <h4> Localização: </h4>
          </Col>
          <Col>
            <p style={{ margin: 0 }}>
              {" "}
              {props.data ? props.data.location : ""}{" "}
            </p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer style={{ padding: "4%" }} className="ModalFooter">
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

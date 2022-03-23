import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Figure, Button, Row, Col } from "react-bootstrap";
import { ReactComponent as Calendar } from "../assets/svg/Icon-calendar.svg";
import ufrn from "../assets/svg/Icon-ufrn.svg";
import lais from "../assets/svg/Icon-lais.svg";

export default function SideBanner() {
  let navigate = useNavigate();
  return (
    <Container className="SideBarContainer">
      <Row style={{ marginTop: "auto" }}>
        <Calendar stroke="#fff" />
        <h2 className="WhiteH2">Agendamento online</h2>
        <p className="WhiteP">Rápido e seguro</p>
        <Container className="bottomText">
          <p className="WhiteP">
            Evite filas e aglomeração. <br /> O seu bem é o bem de todos
          </p>
        </Container>
        <div className="d-grid gap-2">
          <Button
            size="lg"
            className="TransparencyButton"
            onClick={() => navigate("/transparency")}
          >
            <h3 className="ButtonWhiteText">Transparência</h3>
          </Button>
        </div>
      </Row>
      <Row className="logos" style={{ marginTop: "auto" }}>
        <Col md={6}>
          <Figure>
            <Figure.Image src={lais} />
          </Figure>
        </Col>
        <Col md={6}>
          <Figure id="ufrnFigure" style={{ height: "90px" }}>
            <Figure.Image src={ufrn} />
          </Figure>
        </Col>
      </Row>
    </Container>
  );
}

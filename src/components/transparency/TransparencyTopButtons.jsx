import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";

export default function TransparencyTopButtons(props) {
  const navigate = useNavigate();

  return (
    <Row style={{ paddingLeft: "8%", marginTop: "2%" }}>
      <Col xl={9} lg={7} xs={12} style={{ marginTop: "0.65%" }}>
        <h2> Transparência </h2>
      </Col>
      <Col xl={3} lg={5} xs={10} style={{ display:"flex", alignItems: "end", textAlign:"end" }}>
        <Col >
          <Button className="NavButton" onClick={() => props.setShowFilter(true)}>
            <p className="WhiteP" style={{ margin: 0 }}>
              Filtrar
            </p>
          </Button>
        </Col>
        <Col>
          <Button  className="NavButton" onClick={() => navigate(-1)}>
            <p className="WhiteP" style={{ margin: 0 }}>
              Voltar
            </p>
          </Button>
        </Col>
      </Col>
    </Row>
  );
}

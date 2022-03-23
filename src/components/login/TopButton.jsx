import React from "react";
import userIcon from "../../assets/svg/Icon-user.svg";
import { Link } from "react-router-dom";
import { Row, Col, Button, Figure } from "react-bootstrap";

export default function TopButton(props) {
  return props.haveAccount ? (
    <Row style={{ justifyContent: "end", padding: 0, marginTop: 20 }}>
      <Col xs={10} style={{ marginTop: "0.65%" }}>
        <p> Não tem uma conta?</p>
      </Col>
      <Col xs="auto">
        <Link to={"/register"}>
          <Button className="NavButton">
            <Figure className="userIcon" style={{ marginBottom: "0px" }}>
              <Figure.Image src={userIcon} />
            </Figure>{" "}
            Criar uma
          </Button>
        </Link>
      </Col>
    </Row>
  ) : (
    <Row style={{ justifyContent: "end", padding: 0, marginTop: 20 }}>
      <Col xs={10} style={{ marginTop: "0.65%" }}>
        <p> Já tem uma conta?</p>
      </Col>
      <Col xs="auto">
        <Link to={"/"}>
          <Button className="NavButton">
            <Figure className="userIcon" style={{ marginBottom: "0px" }}>
              <Figure.Image src={userIcon} />
            </Figure>{" "}
            Entrar
          </Button>
        </Link>
      </Col>
    </Row>
  );
}

import React from "react";
import userIcon from "../../../assets/svg/Icon-user.svg";
import { ReactComponent as Calendar } from "../../../assets/svg/Icon-calendar.svg";
import { Link } from "react-router-dom";
import { Row, Col, Button, Figure } from "react-bootstrap";

export default function TopInfos(props) {
  return props.haveAccount ? (
    <Row style={{ padding: 0, marginTop: 30, alignItems:"center" }}>
      <Col>
      <Calendar style={{width: 60}} stroke="#fff" />
      </Col>
      <Col>
        <Link to={"/register"}>
          <Button className="NavButton">
            <Figure className="userIcon" style={{ marginBottom: 0 }}>
              <Figure.Image src={userIcon} />
            </Figure>{" "}
            Criar Conta
          </Button>
        </Link>
      </Col>
    </Row>
  ) : (
    <Row style={{ padding: 0, marginTop: 30, alignItems:"center" }}>
      <Col>
      <Calendar style={{width: 60}} stroke="#fff" />
      </Col>
      <Col>
        <Link to={"/"}>
          <Button className="NavButton">
            <Figure className="userIcon" style={{ marginBottom: 0 }}>
              <Figure.Image src={userIcon} />
            </Figure>{" "}
            Entrar
          </Button>
        </Link>
      </Col>
    </Row>
  );
}

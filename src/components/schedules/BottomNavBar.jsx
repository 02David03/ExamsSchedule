import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Row,
  Col,
  Figure,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Pencil } from "../../assets/svg/Icon-pencil.svg";
import { ReactComponent as Folder } from "../../assets/svg/Icon-folder.svg";

export default function BottomNavBar(props) {
  let navigate = useNavigate();

  return (
    <Navbar
      fixed="bottom"
      style={{ padding: 0 }}
      collapseOnSelect
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              style={{ marginRight: "2%" }}
              onClick={() => navigate("/schedules")}
            >
              <Col style={{ alignItems: "center" }}>
                <Row>
                  <Folder fill={props.schedules ? "#0F5AEF" : "#FFFFFF"} />
                </Row>
                <Row style={{ padding: 0 }}>
                  <p
                    className={!props.schedules ? "WhiteP" : "BlueP"}
                    style={{ marginBottom: 0, marginTop: 5 }}
                  >
                    Agendamentos
                  </p>
                </Row>
              </Col>
            </Nav.Link>
          </Nav>
          <Nav className="me-auto" style={{justifyContent: "end"}}>
            <Nav.Link onClick={() => navigate("/newSchedule")}>
              <Container>
                <Col style={{ alignItems: "center"}}>
                  <Row>
                    <Pencil fill={props.schedules ? "#FFFFFF" : "#0F5AEF"} />
                  </Row>
                  <Row style={{ padding: 0 }}>
                    <p
                      className={!props.schedules ? "BlueP" : "WhiteP"}
                      style={{ marginBottom: 0, marginTop: 5 }}
                    >
                      Agendar
                    </p>
                  </Row>
                </Col>
              </Container>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

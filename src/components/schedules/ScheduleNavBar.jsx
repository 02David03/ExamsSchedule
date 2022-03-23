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
import { ReactComponent as Calendar } from "../../assets/svg/Icon-calendar.svg";
import { ReactComponent as Pencil } from "../../assets/svg/Icon-pencil.svg";
import { ReactComponent as Folder } from "../../assets/svg/Icon-folder.svg";
import profile from "../../assets/png/Profile.png";

export default function SchedulesNavBar(props) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 750);
  let navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 750) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    navigate("/");
  }

  return (
    <Navbar
      fixed="top"
      style={{ padding: 0 }}
      collapseOnSelect
      variant="primary"
    >
      <div className="NavBarContainer">
        <Navbar.Brand style={{ marginRight: "4%" }}>
          <Row style={{ alignItems: "center" }}>
            <Col>
              <Calendar
                stroke="#000"
                style={{
                  width: isMobile ? 30 : 45,
                  height: isMobile ? 35 : 50,
                }}
              />
            </Col>
            <Col>
              <h5 style={{ marginTop: 5, marginBottom: 0 }}>
                Agendamento {!isMobile ? <br /> : null} online
              </h5>
            </Col>
          </Row>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {!isMobile ? (
            <>
              <Nav style={{ width: "65%" }} className="me-auto" variant="pills">
                <Nav.Link
                  style={{ minWidth: "25%", marginRight: "2%" }}
                  onClick={() => navigate("/schedules")}
                >
                  <Container
                    className="NavItemContainer"
                    style={{
                      backgroundColor: props.schedules ? "#0F5AEF" : "#FFFFFF",
                    }}
                  >
                    <Row style={{ alignItems: "center" }}>
                      <Col xs="auto">
                        <Folder
                          fill={props.schedules ? "#FFFFFF" : "#0F5AEF"}
                        />
                      </Col>
                      <Col style={{ padding: 0 }}>
                        <p
                          className={!props.schedules ? "" : "WhiteP"}
                          style={{ marginBottom: 0, marginTop: 5 }}
                        >
                          Meus agendamentos{" "}
                        </p>
                      </Col>
                    </Row>
                  </Container>
                </Nav.Link>
                <Nav.Link
                  style={{ minWidth: "25%" }}
                  onClick={() => navigate("/newSchedule")}
                >
                  <Container
                    className="NavItemContainer"
                    style={{
                      backgroundColor: props.schedules ? "#FFFFFF" : "#0F5AEF",
                    }}
                  >
                    <Row style={{ alignItems: "center" }}>
                      <Col xs="auto">
                        <Pencil
                          fill={props.schedules ? "#0F5AEF" : "#FFFFFF"}
                        />
                      </Col>
                      <Col style={{ padding: 0 }}>
                        {" "}
                        <p
                          className={!props.schedules ? "WhiteP" : ""}
                          style={{ marginBottom: 0, marginTop: 5 }}
                        >
                          {" "}
                          Agendar{" "}
                        </p>
                      </Col>
                    </Row>
                  </Container>
                </Nav.Link>
              </Nav>
            </>
          ) : null}

          <Row style={{ alignItems: "center", marginLeft: isMobile ? "auto" : 0, marginRight: isMobile ? 50 : 0 }}>
            <Col style={{ padding: 0 }} xs="auto">
            <Figure style={{ margin: 0, width: isMobile? 38: "auto" }}>
                <Figure.Image style={{ margin: 0 }} src={profile} />
              </Figure>
            </Col>
            <Col style={{ padding: 0  }}>
              <NavDropdown
                className="BlueH5"
                style={{ justifyContent: !isMobile ? "end" : "start" }}
                title={!isMobile ? localStorage.getItem("userName") : ""}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item onClick={() => logOut()}>Sair</NavDropdown.Item>
              </NavDropdown>
            </Col>
          </Row>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

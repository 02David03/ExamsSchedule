import React, { useState, useEffect } from "react";
import { Container, Row, Col, Figure } from "react-bootstrap";
import RegisterBox from "../components/login/RegisterBox";
import SideBanner from "../components/SideBanner";
import TopButton from "../components/login/TopButton";
import TopInfos from "../components/login/mobile/TopInfos";
import ufrnBlue from "../assets/svg/Icon-blue-ufrn.svg";
import laisBlue from "../assets/svg/Icon-blue-lais.svg";

export default function RegisterPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 515);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 515) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const renderContent = () => {
    if (isMobile) {
      return <MobileRegister />;
    } else {
      return <DesktopRegister />;
    }
  };

  return renderContent();
  
}

const DesktopRegister = () => {
  return (
    <Container fluid>
      <Row>
        <Col xl={3} lg={4} md={4} xs={6} style={{ padding: "0px"}}>
          <SideBanner />
        </Col>
        <Col style={{marginLeft: "auto"}} className="LoginRight" xl={9} md={8} xs={6}>
          <Row className="LoginTop">
            <TopButton haveAccount={false} />
          </Row>
          <Row className="LoginBottom">
            <RegisterBox />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

const MobileRegister = (props) => {
  return (
    <Container style={{ position: "relative", textAlign: "center" }}>
      <Row className="TopWithImage">
        <TopInfos haveAccount={false} />
      </Row>
      <Row className="MobileRegisterBox">
        <RegisterBox />
      </Row>
      <Row
        className="logos"
        style={{ marginTop: "auto", alignItems: "center" }}
      >
        <Col>
          <Figure>
            <Figure.Image src={laisBlue} />
          </Figure>
        </Col>
        <Col>
          <Figure id="ufrnFigure" style={{ height: "90px" }}>
            <Figure.Image src={ufrnBlue} />
          </Figure>
        </Col>
      </Row>
    </Container>
  );
};

import React, { useState, useEffect } from "react";
import { Row, Col, Container, Figure } from "react-bootstrap";
import SideBanner from "../components/SideBanner";
import SignInBox from "../components/login/SignInBox";
import TopButton from "../components/login/TopButton";
import TopInfos from "../components/login/mobile/TopInfos";
import LoginForm from "../components/login/mobile/SignInForm";
import ufrn from "../assets/svg/Icon-ufrn.svg";
import lais from "../assets/svg/Icon-lais.svg";

export default function LoginPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 515)

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  },[]);

  const handleResize = () => {
    if (window.innerWidth < 515) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
  }  

  const renderContent = () => {
    if(isMobile) {
      return(<MobileLogin />)
    }
    else {
      return(<DesktopLogin />)
    }
  }
  
  return renderContent();

};

const DesktopLogin = () => {
  return (
    <Container fluid>
      <Row>
        <Col xl={3} lg={4} md={4} xs={6} style={{ padding: "0px" }}>
          <SideBanner />
        </Col>
        <Col className="LoginRight" xl={9} md={8} xs={6}>
          <Row className="LoginTop" >
            <TopButton haveAccount={true} />
          </Row>
          <Row className="LoginBottom" >
            <SignInBox />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

const MobileLogin = () => {
  return (
    <Container className="MobileLoginContainer">
      <Row> <TopInfos haveAccount={true} /> </Row>
      <Row style={{ marginTop: "auto"}}> <LoginForm /> </Row>
      <Row className="logos" style={{ marginTop: "auto" }}>
        <Col>
          <Figure>
            <Figure.Image src={lais} />
          </Figure>
        </Col>
        <Col>
          <Figure id="ufrnFigure" style={{ height: "90px" }}>
            <Figure.Image src={ufrn} />
          </Figure>
        </Col>
      </Row>
    </Container>
  )
}

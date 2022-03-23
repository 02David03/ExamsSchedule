import {React, useState, useEffect} from "react";
import SchedulesNavBar from "../components/schedules/ScheduleNavBar";
import { Col, Row } from "react-bootstrap";
import NewScheduleBox from "../components/schedules/NewScheduleBox";
import BottomNavBar from "../components/schedules/BottomNavBar";


export default function NewSchedulePage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 750);

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
  
  return (
    <>
    <SchedulesNavBar schedules={false} />
      <div className="NewScheduleDiv">
        <h2 style={{margin: "135px 0px 0px 70px" }}> Agendar </h2>
        <Row>
          <Col>
          <NewScheduleBox isMobile={isMobile} />
          </Col>
        </Row>
        {isMobile ? <BottomNavBar schedules={false} /> : null}
      </div>
    </>   
  );
}


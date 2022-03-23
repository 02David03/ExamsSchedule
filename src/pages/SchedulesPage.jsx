import { React, useState, useEffect } from "react";
import SchedulesNavBar from "../components/schedules/ScheduleNavBar";
import { Row, Col } from "react-bootstrap";
import ListOfSchedules from "../components/schedules/ListOfSchedules";
import BottomNavBar from "../components/schedules/BottomNavBar";

export default function SchedulesPage() {
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
      <SchedulesNavBar schedules={true} />
      <div className="SchedulesDiv">
        <h2> Meus agendamentos </h2>
        <div className="Separator" style={{ maxWidth: "70%" }} />
        <Row>
          <Col>
            <ListOfSchedules isMobile={isMobile} />
          </Col>
        </Row>
        {isMobile ? <BottomNavBar schedules={true} /> : null}
      </div>
    </>
  );
}

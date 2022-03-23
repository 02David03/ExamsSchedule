import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import SideBanner from "../components/SideBanner";
import {
  getAllActiveSchedules,
  getAllActiveSchedulesByInsitute,
} from "../requests/Schedule";
import ShowGraphics from "../components/transparency/ShowGraphics";
import TransparencyFilter from "../components/transparency/TransparencyFilter";
import TransparencyTopButtons from "../components/transparency/TransparencyTopButtons";

export default function TransparencyPage() {
  const [activeSchedules, setActiveSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [location, setLocation] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    let isMounted = false;
    const fetchData = async () => {
      if (!isMounted) {
        const allActiveSchedules = await getAllActiveSchedules();
        let filteredSchedules;
        if (location !== []) {
          filteredSchedules = await getAllActiveSchedulesByInsitute(location);
        }
        setActiveSchedules(allActiveSchedules);
        setFilteredSchedules(filteredSchedules);
      }
    };
    fetchData();
    return () => (isMounted = true);
  }, [location]);

  return (
    <Container fluid>
      <Row>
        <Col
          xl={3}
          lg={4}
          md={4}
          xs={6}
          style={{ padding: "0px", position: "fixed" }}
        >
          <SideBanner />
        </Col>
        <Col
          className="LoginRight"
          style={{ marginLeft: "auto", marginRight: showFilter ? "auto" : null }}
          xl={showFilter ? 5 : 9}
          md={showFilter ? 4 : 7}
          xs={showFilter ? 4 : 6}
        >
          {!showFilter ? (
            <Row>
              <TransparencyTopButtons setShowFilter={setShowFilter} />
            </Row>
          ) : <h2 style={{margin: "5% 3%"}}> Transparência </h2>  }
          <Row>
            <ShowGraphics
              activeSchedules={
                filteredSchedules ? filteredSchedules : activeSchedules
              }
              showFilter={showFilter}
            />
          </Row>
        </Col>
        {showFilter ? (
          <Col xs="auto" className="FilterCol" >
            <TransparencyFilter
              activeSchedules={activeSchedules}
              setLocation={setLocation}
              setShowFilter={setShowFilter}
            />
          </Col>
        ) : null}
      </Row>
    </Container>
  );
}

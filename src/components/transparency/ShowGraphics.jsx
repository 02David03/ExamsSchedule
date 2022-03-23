import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { getAllAttendancyGroup } from "../../requests/AttendancyGroup";
import { getAllExamsType } from "../../requests/ExamType";
import BarGraphic from "../graphics/BarGraphic";
import PieGraphic from "../graphics/PieGraphic";

export default function ShowGraphics(props) {
  const [attendancyGroups, setAttendancyGroups] = useState([]);
  const [examsType, setExamsType] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = false;
    const fetchData = async () => {
      setLoading(true);
      if (!isMounted) {
        const listExamsType = await getAllExamsType();
        const listAttendancyGoups = await getAllAttendancyGroup();
        for (let schedule of props.activeSchedules) {
          setOccurrences(
            listExamsType,
            schedule.tipo_exame_id,
            props.activeSchedules.length
          );
          setOccurrences(
            listAttendancyGoups,
            schedule.grupo_atendimento_id,
            props.activeSchedules.length
          );
        }
        setExamsType(listExamsType);
        setAttendancyGroups(listAttendancyGoups);
        
      }
      setLoading(false);
    };
    fetchData();
    return () => {
      isMounted = true;
    };
  }, [props]);

  const setOccurrences = (list, comparation, size) => {
    list.map((value) => {
      if (!value.usages) {
        value.usages = 0;
      }
      if (value.id === comparation) {
        value.usages += 1;
      } else {
        value.usages += 0;
      }
      value.label = `${
        value.usages !== 0 ? (size / value.usages) * 100 : 0
      }% ${value.nome}`;
    });
  };

  return loading ? (
    <Container className="Spinner">
      <Spinner animation="border" variant="dark" />
    </Container>
  ) : (
    <Container>
      <Row style={{justifyContent: "space-between", marginTop: "5%"}}>
        <Col xs={props.showFilter || props.isMobile? 12 : null} className="GraphicBox" >
          <BarGraphic isMobile={props.isMobile} attendancyGroups={attendancyGroups} />
        </Col>
        <Col xs={props.showFilter || props.isMobile? 12 : null} className="GraphicBox" >
          <PieGraphic isMobile={props.isMobile} examsType={examsType} />
        </Col>
      </Row>
    </Container>
  );
}

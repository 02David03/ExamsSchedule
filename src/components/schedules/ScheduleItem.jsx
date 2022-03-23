import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import ScheduleModal from "../modals/ScheduleModal";
import CancelScheduleModal from "../modals/CancelScheduleModal";
import { ReactComponent as IconCallendar } from "../../assets/svg/Icon-callendar2.svg";
import { ReactComponent as IconClock } from "../../assets/svg/Icon-clock.svg";
import { ReactComponent as IconGps } from "../../assets/svg/Icon-gps.svg";
import { ReactComponent as IconSyringue } from "../../assets/svg/Icon-syringue.svg";
import { getExamTypeById } from "../../requests/ExamType";
import { getHealthInstitutesByInstitute } from "../../requests/HealthInstitute";

export default function ScheduleItem(props) {
  const [showModal, setShowModal] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [examTypeName, setExameTypeName] = useState("");
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    let isMounted = false;
    const attData = async () => {
      if (!isMounted) {
        const examType = await getExamTypeById(props.data.tipo_exame_id);
        const location = await getHealthInstitutesByInstitute(
          props.data.estabelecimento_cnes
        );
        setExameTypeName(examType[0].nome);
        setLocationName(location[0].nom_estab);
      }
    };
    attData();
    return () => (isMounted = true);
  }, [props]);

  useEffect(() => {
    if (props.data.status === "AGENDADO") {
      setIsCanceled(false);
    } else {
      setIsCanceled(true);
    }
  }, [props]);

  const capitalize = (string) => {
    return string.charAt(0) + string.slice(1).toLowerCase();
  };

  return (
    <>
      <Container className="ScheduleItem">
        <Row style={{ alignItems: "center", padding: "10px 20px" }}>
          <Col style={{ padding: 0 }} xs="auto">
            <IconSyringue />
          </Col>
          <Col xs={6} style={{ padding: 0 }}>
            <Row>
              <h5 className="BlueH5" style={{ margin: 0, flexWrap: "nowrap" }}>
                Tipo de exame
              </h5>
            </Row>
            <Row>
              <p style={{ margin: 0 }}>{examTypeName}</p>
            </Row>
          </Col>
          <Col>
            <p className={isCanceled ? "RedH5" : "GreenH5"}>
              {" "}
              {capitalize(props.data.status)}
            </p>
          </Col>
        </Row>
        <div style={{ marginLeft: "5%", width: "90%" }} className="Separator" />
        <Row style={{ alignItems: "center", padding: "10px 20px" }}>
          <Col style={{ paddingRight: 0 }} xs="auto">
            <IconGps />
          </Col>
          <Col>
            <h6 style={{ margin: 0 }}> {capitalize(locationName)} </h6>
          </Col>
        </Row>
        <Row style={{ justifyContent: "space-around", padding: "10px 20px" }}>
          <Col style={{ paddingRight: 0 }} xs="auto">
            <IconCallendar />
          </Col>
          <Col>
            <h6> {props.data.data} </h6>{" "}
          </Col>
          <Col xs={{ span: "auto", offset: 2 }} style={{ paddingRight: 0 }}>
            <IconClock />
          </Col>
          <Col>
            {" "}
            <h6> {props.data.hora} </h6>
          </Col>
        </Row>
        {!isCanceled ? (
          <Row style={{ marginTop: "auto" }}>
            <ButtonGroup>
              <Button
                className="ButtonBottomBlue"
                onClick={() => setShowModal(true)}
              >
                <h3 className="ButtonWhiteText">Detalhes </h3>
              </Button>
              <Button className="ButtonBottomRed" onClick={() => setShowCancelModal(true)}>
                <h3 className="ButtonWhiteText">Cancelar </h3>
              </Button>
            </ButtonGroup>
          </Row>
        ) : null}
      </Container>
      <ScheduleModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        navigate={true}
        data={{ ...props.data, location: locationName }}
        date={props.data.data}
      />
      <CancelScheduleModal
        show={showCancelModal}
        handleClose={() => setShowCancelModal(false)}
        data={{ ...props.data }}
        date={props.data.data}
      />
    </>
  );
}

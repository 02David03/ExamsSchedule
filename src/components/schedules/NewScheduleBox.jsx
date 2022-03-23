import React, { useEffect, useState } from "react";
import { Button, Form, Container, Row, Col, Spinner } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { ReactComponent as ArrowRight } from "../../assets/svg/Icon-arrow-right.svg";
import { getAllCampaigns } from "../../requests/Campaign";
import { getAllAttendancyGroup } from "../../requests/AttendancyGroup";
import { getAllScheduleDisponible } from "../../requests/ScheduleDisponibility";
import { getAllHealthInstitutes } from "../../requests/HealthInstitute";
import { getAllExamsType } from "../../requests/ExamType";
import DisponibleSchedules from "./DisponibleSchedules";

export default function NewScheduleBox(props) {
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [campaign, setCampaign] = useState({});
  const [healthInstitutes, setHealthInstitutes] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [city, setCity] = useState("");
  const [date, setDate] = useState(new Date());
  const [attendancyGroups, setAttendancyGroups] = useState([{}]);
  const [attendancyGroup, setAttendancyGroup] = useState({});
  const [examType, setExamType] = useState("");
  const [examsType, setExamsType] = useState([]);
  const [disponibleProps, setDisponibleProps] = useState();

  useEffect(() => {
    let isMounted = false;
  
    const setData = async () => {
      if (!isMounted) {
        const campaignRes = await getAllCampaigns();
        const attendancyGroupRes = await getAllAttendancyGroup();
        const disponibleRes = await getAllScheduleDisponible();
        const healthInstitutes = await getAllHealthInstitutes();
        const examsTypeRes = await getAllExamsType();
        setExamsType(examsTypeRes);
        setCampaigns(campaignRes);
        setCampaign(campaignRes[0].id);
        filterCities(disponibleRes, healthInstitutes);
        setAttendancyGroups(attendancyGroupRes);
        setAttendancyGroup(attendancyGroupRes[0].id);
      }
      setLoading(false);
    };
    setData();
    return () => (isMounted = true);
  }, []);

  useEffect(() => {
    if (campaign && city && date && attendancyGroup && examType) {
      setCompleted(true);
    }
  }, [campaign, city, date, attendancyGroup, examType]);

  const filterCities = (disponibles, institutes) => {
    let filteredStabelishment = [];
    disponibles.forEach((item) => {
      if (!filteredStabelishment.includes(item.estabelecimento_cnes)) {
        filteredStabelishment.push(item.estabelecimento_cnes);
      }
    });
    let healthInstitutes = [];
    filteredStabelishment.forEach((instituteDisponible) => {
      for (let institute of institutes) {
        if (instituteDisponible === institute.cod_cnes) {
          if (!healthInstitutes.includes(institute)) {
            let canPush = true;
            healthInstitutes.forEach((item) => {
              if (item.dsc_cidade === institute.dsc_cidade) {
                canPush = false;
                return;
              }
            });
            if (canPush) {
              healthInstitutes.push(institute);
            }
          }
        }
      }
    });
    setHealthInstitutes(healthInstitutes);
    setCity(healthInstitutes[0].cod_munic);
  };

  return loading ? (
    <Container className="Spinner" fluid style={{ height: "70vh" }}>
      <Spinner animation="border" variant="dark" />
    </Container>
  ) : (
    <>
      <Row style={{ alignItems: "center" }}>
        <Col className="ToScheduleBox" xs={12} md={5} lg={4} xl={3}>
          <Container>
            <Form
              className="ToScheduleForm"
              onSubmit={(e) => {
                e.preventDefault();
                setDisponibleProps({
                  date: date,
                  campaign: campaign,
                  examType: examType,
                  city: city,
                  attendancyGroup: attendancyGroup,
                });
              }}
            >
              <Form.Group className="mb-2">
                <Form.Label>Campanha</Form.Label>
                <Form.Select
                  className="ToScheduleInput"
                  defaultValue={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                >
                  {campaigns.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Município</Form.Label>
                <Form.Select
                  className="ToScheduleInput"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                >
                  {healthInstitutes.map((value) => (
                    <option key={value.dsc_cidade} value={value.cod_munic}>
                      {value.dsc_cidade}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Grupo de atendimento</Form.Label>
                <Form.Select
                  className="ToScheduleInput"
                  defaultValue={attendancyGroup}
                  onChange={(e) => setAttendancyGroup(e.target.value)}
                >
                  {attendancyGroups.map((item) => (
                    <option
                      key={item.id}
                      value={item.id }
                    >
                      {item.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <p style={{ marginBottom: 0 }}>Data</p>
              <Form.Group className="mb-2">
                <DatePicker
                  id="dataPicker"
                  className="DateInput"
                  clearIcon={null}
                  dayPlaceholder="dd"
                  monthPlaceholder="mm"
                  yearPlaceholder="aaaa"
                  onChange={(value) => setDate(value)}
                  value={date}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Tipo de Exame</Form.Label>
                {examsType.map((value) => (
                  <Form.Check
                    key={value.id}
                    name="examType"
                    type="radio"
                    id={value.id}
                    label={value.nome}
                    onChange={() => setExamType(value.id)}
                  />
                ))}
              </Form.Group>

              <Form.Group className="d-grid gap-2" controlId="formButton">
                <Button
                  id="registerButton"
                  className="mb-3"
                  type="submit"
                  size="lg"
                  disabled={!completed}
                >
                <h2 className="ButtonWhiteText"> Procurar </h2>
                </Button>
              </Form.Group>
            </Form>
          </Container>
        </Col>
        <Col md={"auto"} className="arrowCol">
          {disponibleProps && !(props.isMobile) ? <ArrowRight /> : null}
        </Col>
        <Col xs={11} md={5} lg={6} xl={7} className="DisponiblesBox">
          {disponibleProps ? (
            <DisponibleSchedules {...disponibleProps} isMobile={props.isMobile} />
          ) : null}
        </Col>
      </Row>
    </>
  );
}

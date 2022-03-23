import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import {
  getAllSchedulesByUserId,
  getAllSchedulesByInstitute,
} from "../../requests/Schedule";
import ShowGraphics from "../transparency/ShowGraphics";
import ScheduleItem from "./ScheduleItem";
import { getAllHealthInstitutes } from "../../requests/HealthInstitute";
import { ReactComponent as IconFilter } from "../../assets/svg/Icon-filter.svg";

import PaginationComponent from "../Pagination";

export default function ListOfSchedules(props) {
  const [loading, setLoading] = useState(true);
  const [healthInstitutes, setHealthInstitutes] = useState([]);
  const [healthInstitute, setHealthInstitute] = useState();
  const [schedules, setSchedules] = useState([]);
  const [schedulesPagineted, setSchedulesPagineted] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getSchedules = async () => {
      setLoading(true);
      let schedules = await getAllSchedulesByUserId();
      if (schedules.length !== 0) {
        const healthInstitutes = await getAllHealthInstitutes();
        filterIntitutes(schedules, healthInstitutes);
        if (healthInstitute) {
          schedules = await getAllSchedulesByInstitute(healthInstitute);
        }
        setSchedules(schedules);
      } else {
        setSchedules(schedules);
      }
      setLoading(false);
    };
    return getSchedules();
  }, [healthInstitute]);

  useEffect(() => {
    let aux = [];
    for (
      let index = 4 * page - 4;
      index < schedules.length && index < 4 * page;
      index++
    ) {
      aux.push(schedules[index]);
    }
    setSchedulesPagineted(aux);
  }, [schedules, page]);

  const filterIntitutes = (schedules, institutes) => {
    let filteredStabelishment = [];
    schedules.forEach((item) => {
      if (!filteredStabelishment.includes(item.estabelecimento_cnes)) {
        filteredStabelishment.push(item.estabelecimento_cnes);
      }
    });
    let healthInstitutes = [];
    filteredStabelishment.forEach((stabelishment) => {
      for (let institute of institutes) {
        if (stabelishment === institute.cod_cnes) {
          if (!healthInstitutes.includes(institute)) {
            healthInstitutes.push(institute);
          }
        }
      }
    });
    setHealthInstitutes(healthInstitutes);
  };

  const hasDataComparation = () => {
    if (schedules.length !== 0) {
      return (
        <div className="ListOfSchedules">
          <Row>
            <HealthInstituteSelect
              setHealthInstitute={setHealthInstitute}
              healthInstitutes={healthInstitutes}
            />
          </Row>
          <Row>
            {schedulesPagineted.map((value) => {
              return (
                <Col key={value.id}>
                  <ScheduleItem data={value} />
                </Col>
              );
            })}
          </Row>
          <Row>
            <PaginationComponent
              itemsCount={schedules.length}
              itemsPerPage={4}
              justifyContent="center"
              currentPage={page}
              setCurrentPage={setPage}
            />
          </Row>
          {props.isMobile ? (
          <Row>
            <ShowGraphics activeSchedules={schedules} isMobile={true} />
          </Row>
        ) : null}
        </div>
      );
    } else {
      return (
        <>
          <h4 style={{textAlign: "center", marginTop: 50}}>Não há nenhum agendamento marcado ainda!</h4>
        </>
      );
    }
  };

  return loading ? (
    <Container className="Spinner" fluid style={{ height: "70vh" }}>
      <Spinner animation="border" variant="dark" />
    </Container>
  ) : (
    hasDataComparation()
  );
}

const HealthInstituteSelect = (props) => {
  return (
    <Col>
      <Row>
        <p>Filtrar agendamento</p>
      </Row>
      <Row>
        <Col xs="auto">
          <IconFilter />
        </Col>
        <Col xs={6} sm={4} md={3} xl={2}>
          <Form.Select
            onChange={(e) => {
              props.setHealthInstitute(e.target.value);
            }}
          >
            <option value=""> Local de exame </option>
            {props.healthInstitutes.map((value) => (
              <option key={value.cod_cnes} value={value.cod_cnes}>
                {value.nom_estab}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </Col>
  );
};

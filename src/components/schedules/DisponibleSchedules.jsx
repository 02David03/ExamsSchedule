import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { getHealthInstitutesByCity } from "../../requests/HealthInstitute";
import { setSchedule } from "../../requests/Schedule";
import { getAllScheduleFiltered } from "../../requests/ScheduleDisponibility";
import ScheduleModal from "../modals/ScheduleModal";
import Pagination from "../Pagination";

export default function DisponibleSchedules(props) {
  const [loading, setLoading] = useState(true);
  const [disponibles, setDisponibles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [formatedDate, setFormatedDate] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [createdSchedule, setCreatedSchedule] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getDisponible = async () => {
      setLoading(true);
      let date = props.date.toISOString().split("T")[0].split("-");
      let dateToUse = date[2] + "/" + date[1] + "/" + date[0];
      setFormatedDate(dateToUse);
      const res = await getAllScheduleFiltered(dateToUse);
      const healthInstitutes = await getHealthInstitutesByCity(props.city);
      filterByCity(res, healthInstitutes);
      setLoading(false);
    };
    return getDisponible();
  }, [props]);

  useEffect(() => {
    if (selectedItem !== []) {
      setIsDisabled(false);
    }
  }, [selectedItem]);

  useEffect(() => {
    let aux = [];
    for (
      let index = 3 * page - 3;
      index < filtered.length && index < 3 * page;
      index++
    ) {
      aux.push(filtered[index]);
    }
    setDisponibles(aux);
  }, [filtered, page]);

  const filterByCity = (disponibles, healthInstitutes) => {
    let auxArr = [];
    for (let disponible of disponibles) {
      for (let healthInstitute of healthInstitutes) {
        if (disponible.estabelecimento_cnes === healthInstitute.cod_cnes) {
          auxArr.push({ ...disponible, location: healthInstitute.nom_estab });
          break;
        }
      }
    }
    setFiltered(auxArr);
  };

  const postSchedule = async () => {
    let selected = disponibles.find(
      (element) => element.id === selectedItem[0]
    );
    let schedule = {
      usuario_id: localStorage.getItem('userId'),
      campanha_id: Number(props.campaign),
      grupo_atendimento_id: Number(props.attendancyGroup),
      estabelecimento_cnes: selected.estabelecimento_cnes,
      status: "AGENDADO",
      hora: selectedItem[1],
      tipo_exame_id: props.examType,
      data: selected.data,
    };
    const res = await setSchedule(schedule);
    setCreatedSchedule({...res, location: selected.location });
    setShowModal(true);
  };

  return (
    <>
      <DisponiblesBox
        loading={loading}
        disponibles={disponibles}
        selectedItem={selectedItem}
        formatedDate={formatedDate}
        setSelectedItem={setSelectedItem}
        examType={props.examType}
        page={page}
        setPage={setPage}
        isDisabled={isDisabled}
        postSchedule={postSchedule}
        filtered={filtered}
        isMobile={props.isMobile}
      />
      <ScheduleModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        date={formatedDate}
        data={createdSchedule}
      />
    </>
  );
}

const DisponiblesBox = (props) => {
  if (props.loading) {
    return (
      <Container className="Spinner" fluid style={{ height: "70vh" }}>
        <Spinner animation="border" variant="dark" />
      </Container>
    );
  } else {
    return props.disponibles && props.disponibles.length !== 0 ? (
      <Container className="DisponibleTimeBox">
        <h2>
          {`Locais de Exame - ${props.formatedDate}`}
        </h2>
        {props.disponibles.map((value) => (
          <Location
            key={value.id}
            {...{
              parentId: value.id,
              select: props.selectedItem,
              selectFunc: props.setSelectedItem,
              location: value.location,
              examType: props.examType,
              disponibilities: value.vagas,
              periody: `${Object.keys(value.vagas)[0]} às ${
                Object.keys(value.vagas)[Object.keys(value.vagas).length - 1]
              }`,
            }}
          />
        ))}
        <Row style={{marginTop: 32}}>
          <Col className={ props.isMobile? "d-grid gap-2" : ""} xs={props.isMobile ? 12 : null}>
            <Button
              id="LoginButton"
              disabled={props.isDisabled}
              className="mb-3"
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                props.postSchedule();
              }}
            >
              <h3 className="ButtonWhiteText"> Confirmar </h3>
            </Button>
          </Col>
          <Col xs={props.isMobile ? 12 : null}>
            <Pagination
              itemsCount={props.filtered.length}
              itemsPerPage={3}
              currentPage={props.page}
              setCurrentPage={props.setPage}
              justifyContent={props.isMobile ? "center" : null}
            />
          </Col>
        </Row>
      </Container>
    ) : (
      <p style={{marginLeft: "5%"}}> Não há nenhuma disponibilidade para essa data </p>
    );
  }
};

const Location = (props) => {
  return (
    <>
      <h5>{`${props.location} | ${props.examType} | ${props.periody}`}</h5>
      <Row lg={5} xs={3} md={4}>
        {Object.keys(props.disponibilities).map((key, item) => (
          <Col key={item.id} style={{margin: 10}} lg={2}>
            <Disponibility
              {...{
                id: key,
                parentId: props.parentId,
                select: props.select,
                selectFunc: props.selectFunc,
                selected: props.selected,
                time: key,
                vacancies: props.disponibilities[key],
              }}
            />
          </Col>
        ))}
      </Row>
      <div className="Separator" />
    </>
  );
};

const Disponibility = (props) => {
  let selected = false;
  if (props.parentId === props.select[0] && props.id === props.select[1]) {
    selected = true;
  }

  return (
    <>
      <Row
        className={selected ? "SelectedRow" : "UnselectedRow"}
        onClick={(e) => {
          e.preventDefault();
          props.selectFunc([props.parentId, props.id]);
        }}
      >
        <Col className={selected ? "SelectedCol1" : "UnselectedCol1"}>
          {props.time}
        </Col>
        <Col xs={7} className={selected ? "SelectedCol2" : "UnselectedCol2"}>
          {props.vacancies} {props.vacancies > 1 ? "vagas" : "vaga"}
        </Col>
      </Row>
    </>
  );
};

import React, { useState, useEffect } from "react";
import { getAllHealthInstitutes } from "../../requests/HealthInstitute";
import { Container, Form, Col, Button, Row } from "react-bootstrap";

export default function TransparencyFilter(props) {
  const [searchLocation, setSearchLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    let isMounted = false;
    const setData = async () => {
      if (!isMounted) {
        const healthInstitutes = await getAllHealthInstitutes();
        filterInstitutes(props.activeSchedules, healthInstitutes);
      }
    };
    setData();
    return () => (isMounted = true);
  }, [props.activeSchedules]);

  const filterInstitutes = (schedules, institutes) => {
    let filteredStabelishment = [];
    schedules.forEach((item) => {
      if (!filteredStabelishment.includes(item.estabelecimento_cnes)) {
        filteredStabelishment.push(item.estabelecimento_cnes);
      }
    });
    let healthInstitutes = [];
    filteredStabelishment.forEach((instituteDisponible) => {
      for (let institute of institutes) {
        if (instituteDisponible === institute.cod_cnes) {
          if (!healthInstitutes.includes(institute)) {
            healthInstitutes.push(institute);
          }
        }
      }
    });
    setLocations(healthInstitutes);
  };

  const arrayRemove = (arr, value) => { 
    return arr.filter(function(element){ 
        return element !== value; 
    });
}

  return (
    <Container className="FilterBox">
      <h3 className="WhiteH3"> Filtros</h3>
      <Form.Group className="mb-2" controlId="formText">
        <Form.Control
          type="text"
          defaultValue={searchLocation}
          placeholder="Pesquise aqui"
          size="lg"
          onChange={(e) => {
            setSearchLocation(e.target.value);
          }}
        />
      </Form.Group>

      <Container className="BlueContorn">
        <p style={{margin: 0}} className="WhiteP">Estabelecimento</p>
      </Container>

      <Form.Group className="mb-3">
        {locations.map((value) => (
          <Form.Check
            className="WhiteLabel"
            key={value.cod_cnes}
            name="location"
            type="checkbox"
            id={value.cod_cnes}
            label={value.nom_estab}
            onChange={() => {
              if(location.includes(value.cod_cnes)) {
                setLocation(arrayRemove(location, value.cod_cnes));
              } else {
                setLocation([...location, value.cod_cnes]);
              }
            }}
          />
        ))}
      </Form.Group>
      <Row className="logos" style={{marginTop: "auto"}}>
        <Col>
          <Button className="ButtonFilterCancel" onClick={() => props.setShowFilter(false)}>
            <p style={{ margin: 0 }}>Cancelar</p>
          </Button>
        </Col>
        <Col>
          <Button className="ButtonFilter" onClick={() => props.setLocation(location)}>
            <p style={{ margin: 0 }}>Filtrar</p>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

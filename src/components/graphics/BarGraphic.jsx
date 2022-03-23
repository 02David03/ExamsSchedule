import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Container } from "react-bootstrap";

export default function BarGraphic(props) {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const series = [
      {
        name: "Grupos de atendimento",
        colorByPoint: true,
      },
    ];
    let data = [];
    props.attendancyGroups.forEach((element) => {
      let dataElement = {
        name: element.nome,
        y: element.usages,
      };
      data.push(dataElement);
    });
    series[0].data = data;
    setSeries(series);
  }, [props.attendancyGroups]);

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: null,
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y}",
        },
      },
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        `<span>{point.name}</span>: <b>{point.y}</b><br/>`,
    },
    series: series,
  }

  return (
    <Container style={{ alignItems: "center", justifyContent: "center" }}>
      <p style={{ textAlign: "center", marginTop: "3%" }}>
        {props.isMobile ? `Todos os exames por grupo de atendimento - ${localStorage.getItem("userName")}` : "Exames agendados - Gerais"}
      </p>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Container>
  );
}

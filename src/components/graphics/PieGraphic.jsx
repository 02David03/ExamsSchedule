import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Container } from "react-bootstrap";

export default function PieGraphic(props) {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const series = [
      {
        name: "Tipos de Exame",
        colorByPoint: true,
      },
    ];
    let data = [];
    props.examsType.forEach((element) => {
      let dataElement = {
        name: element.nome,
        y: element.usages,
      };
      data.push(dataElement);
    });
    series[0].data = data;
    setSeries(series);
  }, [props.examsType]);

  const options = {
  chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: ''
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
      }
  },
  series: series
  }

  return (
    <Container style={{alignItems: "center"}}>
       <p style={{ textAlign: "center", marginTop: "3%" }}>
       {props.isMobile ? `Tipos de Exame - ${localStorage.getItem("userName")}` : "Tipo de exames - Gerais"}
        
      </p>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Container>
  );
}

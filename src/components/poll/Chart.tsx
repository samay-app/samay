import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { ChartDataArgs } from "../../models/poll";

const Chart = (props: { ChartData: ChartDataArgs }): JSX.Element => {
  const { ChartData } = props;

  const [width, setWidth] = useState(window.innerWidth);
  const [font, setFont] = useState(window.innerWidth < 500 ? 8 : 12);
  const [position, setPosition] = useState(
    window.innerWidth < 500 ? "bottom" : "right"
  );

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      if (width < 500) {
        setFont(8);
        setPosition("bottom");
      } else {
        setFont(12);
        setPosition("right");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const options = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem: any, data: any) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var meta = dataset._meta[Object.keys(dataset._meta)[0]];
          var total = meta.total;
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = parseFloat(
            ((currentValue / total) * 100).toFixed(1)
          );
          return currentValue + " (" + percentage + "%)";
        },
        title: function (tooltipItem: any, data: any) {
          return data.labels[tooltipItem[0].index];
        },
      },
    },
    legend: {
      display: true,
      labels: {
        fontSize: font,
      },
      position: ChartData.labels.length > 10 ? "bottom" : position,
      onHover: function (e: any) {
        e.target.style.cursor = "pointer";
      },
    },
    onHover: (event: any, chartElement: any) => {
      event.target.style.cursor = chartElement[0] ? "pointer" : "default";
    },
  };

  return (
    <div className="chart">
      <Pie data={ChartData} options={options} />
    </div>
  );
};

export default Chart;

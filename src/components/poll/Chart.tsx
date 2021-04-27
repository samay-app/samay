import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { ChartDataArgs, ChartTooltipItem } from "../../models/poll";

const Chart = (props: { ChartData: ChartDataArgs }): JSX.Element => {
  const { ChartData } = props;

  const [width, setWidth] = useState(window.innerWidth);
  const [fontSize, setfontSize] = useState(window.innerWidth < 500 ? 8 : 12);
  const [fontPosition, setFontPosition] = useState(
    window.innerWidth < 500 ? "bottom" : "right"
  );
  useEffect(() => {
    const handleResize = (): void => {
      let size = 12;
      let position = "right";
      setWidth(window.innerWidth);
      if (width < 500) {
        size = 8;
        position = "bottom";
      }
      setfontSize(size);
      setFontPosition(position);
    };
    window.addEventListener("resize", handleResize);
    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem: ChartTooltipItem, data: any): string => {
          let dataset = data.datasets[tooltipItem.datasetIndex];
          let meta = dataset._meta[Object.keys(dataset._meta)[0]];
          let { total } = meta;
          let currentValue = dataset.data[tooltipItem.index];
          let percentage = parseFloat(
            ((currentValue / total) * 100).toFixed(1)
          );
          let newCurrentValue = `${currentValue} ( ${percentage} %)`;
          return newCurrentValue;
        },
        title: (
          tooltipItem: ChartTooltipItem[],
          data: ChartDataArgs
        ): string => {
          return data.labels[tooltipItem[0].index];
        },
      },
    },
    legend: {
      display: true,
      labels: {
        fontSize,
      },
      position: ChartData.labels.length > 10 ? "bottom" : fontPosition,
      onHover: (e: any): void => {
        e.target.style.cursor = "pointer";
      },
    },
    onHover: (event: any, chartElement: any): void => {
      // eslint-disable-next-line no-param-reassign
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

import React from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import './chart.css';

const DUMMYCHART = [
  {
    date: 'NOV 15',
    value: 8,
  },
  {
    date: 'NOV 22',
    value: 10,
  },
  {
    date: 'NOV 29',
    value: 12,
  },
  {
    date: 'DEC 05',
    value: 14,
  },
  {
    date: 'DEC12',
    value: 15,
  },
];
let labelArr = [];
let dataArr = [];
for (let i = 0; i < DUMMYCHART.length; i++) {
  dataArr.push(DUMMYCHART[i].value);
  labelArr.push(DUMMYCHART[i].date);
}

const data = {
  labels: labelArr,

  datasets: [
    {
      tension: 0.1,
      borderWidth: 1,
      pointRadius: 1,
      fill: true,
      label: 'Body Fat Percentage',
      data: dataArr,
      backgroundColor: ['#a000bc31'],
      borderColor: ['#a000bc'],
    },
  ],
};

const ClientFatChart = () => {
  return (
    <div className="chart-wrapper">
      <Line
      data={data}
      options = {{

        scales: {
          xAxes: {
            ticks: {
              display: false,
            },
          },
        },
      }}



      />
    </div>
  );
};

export default ClientFatChart;

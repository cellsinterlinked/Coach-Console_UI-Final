import React from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import './chart.css';

const DUMMYLEAN = [
  {
    date: 'NOV 15',
    value: 140,
    weight: 160,
    fat: 20
  },
  {
    date: 'NOV 22',
    value: 141,
    weight: 162,
    fat: 22
  },
  {
    date: 'NOV 29',
    value: 142,
    weight: 163,
    fat: 22
  },
  {
    date: 'DEC 05',
    value: 145,
    weight: 165,
    fat: 23
  },
  {
    date: 'DEC12',
    value: 145,
    weight: 167,
    fat: 24
  },
];
let labelLean = [];
let dataLean = [];
let dataWeight = []
let fatData = []
for (let i = 0; i < DUMMYLEAN.length; i++) {
  dataLean.push(DUMMYLEAN[i].value);
  labelLean.push(DUMMYLEAN[i].date);
  dataWeight.push(DUMMYLEAN[i].weight)
  fatData.push(DUMMYLEAN[i].fat)
}



const data = {
  labels: labelLean,

  datasets: [
    {
      tension: 0.1,
      borderWidth: 1,
      pointRadius: 1,
      fill: true,
      label: 'Lean Body Mass',
      data: dataLean,
      backgroundColor: '#2eceff31',
      borderColor: '#2eceff',
    },
    {
      tension: 0.1,
      borderWidth: 1,
      pointRadius: 1,
      fill: true,
      label: 'Weight',
      data: dataWeight,
      backgroundColor: '#2effee2c',
      borderColor: '#0ee2d0',
    },
    // {
    //   tension: 0.1,
    //   borderWidth: 2,
    //   pointRadius: 2,
    //   fill: false,
    //   label: 'Weight',
    //   data: fatData,
    //   // backgroundColor: '#d52eff32',
    //   borderColor: '#d52eff',
    // },
  ],
};

const ClientMuscleChart = () => {
  return (
    <div className="chart-wrapper">
      <Line
        data={data}
        options={{
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

export default ClientMuscleChart;

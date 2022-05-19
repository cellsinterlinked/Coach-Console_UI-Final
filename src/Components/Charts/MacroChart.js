import React from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import './chart.css';

const DUMMYMACROS = [
  {
    date: 'NOV 15',
    protein: 250,
    carbs: 290,
    fat: 85,
  },
  {
    date: 'NOV 22',
    protein: 250,
    carbs: 300,
    fat: 85,
  },
  {
    date: 'NOV 29',
    protein: 250,
    carbs: 320,
    fat: 90,
  },
  {
    date: 'DEC 05',
    protein: 250,
    carbs: 320,
    fat: 90,
  },
  {
    date: 'DEC12',
    protein: 250,
    carbs: 340,
    fat: 95,
  },
];
let labelMacro = [];
let dataPro = [];
let dataCarb = [];
let dataFat = [];
for (let i = 0; i < DUMMYMACROS.length; i++) {
  dataPro.push(DUMMYMACROS[i].protein);
  dataCarb.push(DUMMYMACROS[i].carbs);
  dataFat.push(DUMMYMACROS[i].fat);
  labelMacro.push(DUMMYMACROS[i].date);
}

const data = {
  labels: labelMacro,

  datasets: [
    {
      tension: 0.1,
      borderWidth: 1,
      pointRadius: 1,
      fill: true,
      label: 'Protein',
      data: dataPro,
      backgroundColor: '#2eceff31',
      borderColor: '#2eceff',
    },
    {
      tension: 0.1,
      borderWidth: 1,
      pointRadius: 1,
      fill: true,
      label: 'Carbs',
      data: dataCarb,
      backgroundColor: '#2effee2c',
      borderColor: '#0ee2d0',
    },
    {
      tension: 0.1,
      borderWidth: 1,
      pointRadius: 1,
      fill: true,
      label: 'Fat',
      data: dataFat,
      backgroundColor: '#d52eff32',
      borderColor: '#d52eff',
    },
  ],
};

const MacroChart = () => {
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

export default MacroChart;

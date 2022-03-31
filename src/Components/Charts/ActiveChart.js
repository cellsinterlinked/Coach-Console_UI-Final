import React from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import './chart.css'

const data = {
  labels: ['January', '', '', '', 'May', ],

  datasets: [
    {
      tension: .1,
      borderWidth: 1,
      pointRadius: 1,
      fill: true,
      label: "Checkins",
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        'rgba(0, 188, 177, .2)',
        'rgba(0, 188, 177, .2)',
        'rgba(0, 188, 177, .2)',
        'rgba(0, 188, 177, .2)',
        'rgba(0, 188, 177, .2)',
      ],
      borderColor: [
        'rgba(0, 188, 177, .5)',
        'rgba(0, 188, 177, .5)',
        'rgba(0, 188, 177, .5)',
        'rgba(0, 188, 177, .5)',
        'rgba(0, 188, 177, .5)',
      ],
      options: {
        scales: {
            xAxes: [{
                ticks: {
                    autoSkip: false,

                    minRotation: 50
                }
            }]
        }
    }
    },
  ],
};

const ActiveChart = () => {
  return (
    <div className="chart-wrapper">
      <Line data={data} />
    </div>
  );
};

export default ActiveChart;

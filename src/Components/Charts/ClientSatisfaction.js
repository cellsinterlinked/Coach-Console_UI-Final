import React from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import './chart.css';

const data = {
  labels: ['January', '', '', '', 'May'],

  datasets: [
    {
      tension: 0.1,
      borderWidth: 1,
      pointRadius: 1,
      fill: true,
      label: 'Client Workout Satisfaction',
      data: [8, 8.2, 8.5, 9, 7.1],
      backgroundColor: ['#0067bc7e', 'r#0067bc7e', 'r#0067bc7e', 'r#0067bc7e', 'r#0067bc7e'],
      borderColor: ['#0067bc', '#0067bc', '#0067bc', '#0067bc', '#0067bc'],
      options: {
        scales: {
          xAxes: [
            {
              ticks: {
                autoSkip: false,

                minRotation: 50,
              },
            },
          ],
        },
      },
    },
  ],
};

const ClientSatisfaction = () => {
  return (
    <div className="chart-wrapper">
      <Line data={data} />
    </div>
  );
};

export default ClientSatisfaction;

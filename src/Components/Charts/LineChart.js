import React from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import './chart.css';

const ClientFatChart = ({ label, data, color, background }) => {
  let labelArr = [];
  let dataArr = [];
  for (let i = 0; i < data.length; i++) {
    dataArr.push(data[i].value);
    labelArr.push(data[i].date);
  }

  return (
    <div className="chart-wrapper">
      <Line
        data={{
          labels: labelArr,

          datasets: [
            {
              tension: 0.1,
              borderWidth: 1,
              pointRadius: 1,
              fill: true,
              label: label,
              data: dataArr,
              backgroundColor: background,
              borderColor: color,
            },
          ],
        }}
        options={{

            plugins: {
              legend: {
                labels: {
                  font: {

                  }
                }
              }
            },

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

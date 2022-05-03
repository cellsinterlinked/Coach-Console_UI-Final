import React from 'react'

const cardioColumns = [
  {
    title: 'Type',
    field: 'type',
    cellStyle: {
      backgroundColor: 'transparent',
      color: '828282',
      fontSize: '.9rem',
    },
    headerStyle: {
      background:
        'linear-gradient(266.26deg, #00bcb1 0%, rgba(0, 188, 177, 0) 173.86%)',
      color: 'white',
      fontWeight: 'bold',
    },
    width: '30%',
  },

  {
    title: 'Time(minutes)',
    field: 'time',
    width: '25%',
    cellStyle: {
      backgroundColor: 'transparent',
      color: '828282',
      fontSize: '.9rem',
    },
    headerStyle: {
      backgroundColor: '#828282',
      color: 'white',
      fontWeight: 'bold',
    },
  },
  {
    title: 'Calories Burned',
    field: 'cals',
    width: '25%',
    cellStyle: {
      backgroundColor: 'transparent',
      color: '828282',
      fontSize: '.9rem',
    },
    headerStyle: {
      backgroundColor: '#828282',
      color: 'white',
      fontWeight: 'bold',
    },
  },
];

export {cardioColumns}
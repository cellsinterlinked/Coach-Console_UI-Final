import React from 'react'

const cardioColumns = [
  {
    title: 'Day',
    field: 'day',
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
    width: '20%',
  },
  {
    title: 'Type',
    field: 'type',
    width: '20%',
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
    title: 'Time(minutes)',
    field: 'time',
    width: '20%',
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
    width: '20%',
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
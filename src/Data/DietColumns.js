import React from 'react'

const columns = [

  {
    title: 'Food',
    field: 'food',
    cellStyle: {
      backgroundColor: 'transparent',
      color: '828282',
      fontSize: ".9rem"
    },
    headerStyle: {
      background:
        'linear-gradient(266.26deg, #00bcb1 0%, rgba(0, 188, 177, 0) 173.86%)',
      color: 'white',
      fontWeight: "bold"
    },
    width: "30%",
  },

  {
    title: 'Cals',
    field: 'cals',

    cellStyle: {
      backgroundColor: 'transparent',
      color: '828282',
      fontSize: ".9rem"

    },
    headerStyle: {
      backgroundColor: '#828282',
      color: 'white',
      fontWeight: "bold"
    },
  },
  { title: 'Pro', field: 'pro',
  cellStyle: {
    backgroundColor: 'transparent',
    color: '828282',
    fontSize: ".9rem"
  },
  headerStyle: {
    backgroundColor: '#828282',
    color: 'white',
    fontWeight: "bold"
  },
},
{ title: 'Fat', field: 'fat',
cellStyle: {
  backgroundColor: 'transparent',
  color: '828282',
  fontSize: ".9rem"
},
headerStyle: {
  backgroundColor: '#828282',
  color: 'white',
  fontWeight: "bold"
},
},
{ title: 'Carb', field: 'carb',
cellStyle: {
backgroundColor: 'transparent',
color: '828282',
fontSize: ".9rem"
},
headerStyle: {
backgroundColor: '#828282',
color: 'white',
fontWeight: "bold"
},
},

];

export {columns}
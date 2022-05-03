import React from 'react';
import MaterialTable from 'material-table';
import { alpha } from '@material-ui/core/styles';
import Axios from 'axios';

const CardioTable = ({
  cardioData,
  loadedWorkout,
  cardioNum,
  userId,
  setCardioData,
  setError,
  cardioColumns,
  selectedRow,
  setSelectedRow,
}) => {

  console.log(cardioData, cardioNum)

  return (
    <MaterialTable
      components={{
        Groupbar: (props) => <div style={{ width: '0px' }}></div>,
        Grouprow: (props) => <div style={{ width: '0px' }}></div>,
      }}
      editable={{
        onRowAdd: (newRow) =>
          new Promise((resolve, reject) => {
            let tempTable = [...cardioData, newRow];
            let tempData = loadedWorkout.cardioData;
            tempData[cardioNum].data = tempTable;
            const sendUpdate = async () => {
              console.log('triggering add row')
              let results;
              try {
                results = await Axios.patch(
                  'http://localhost:5000/api/workouts/edit/',
                  {
                    userId: userId,
                    workoutId: loadedWorkout.id,
                    cardioData: tempData,
                    weightData: loadedWorkout.weightData,
                  }
                );
              } catch (err) {
                setError(err);
                return;
              }
            };
            sendUpdate();

            setCardioData([...cardioData, newRow]);
            setTimeout(() => resolve(), 500);
          }),

        onRowUpdate: (newRow, oldRow) =>
          new Promise((resolve, reject) => {
            let updatedData = [...cardioData];
            updatedData[oldRow.cardioData.id] = newRow;
            let tempData = loadedWorkout.cardioData;
            tempData[cardioNum].data = updatedData;

            const sendUpdate = async () => {
              console.log('triggering update')
              let results;
              try {
                results = await Axios.patch(
                  'http://localhost:5000/api/workouts/edit/',
                  {
                    userId: userId,
                    workoutId: loadedWorkout.id,
                    cardioData: tempData,
                    weightData: loadedWorkout.weightData,
                  }
                );
              } catch (err) {
                setError(err);
                return;
              }
            };
            sendUpdate();
            setCardioData(updatedData);

            setTimeout(() => resolve(), 500);
          }),

        onRowDelete: (selectedRow) =>
          new Promise((resolve, reject) => {
            let updatedData = [...cardioData];
            updatedData.splice(selectedRow.cardioData.id, 1);
            let tempData = loadedWorkout.cardioData;
            tempData[cardioNum].data = updatedData;

            const sendUpdate = async () => {
              console.log('triggering delete')
              let results;
              try {
                results = await Axios.patch(
                  'http://localhost:5000/api/workouts/edit/',
                  {
                    userId: userId,
                    workoutId: loadedWorkout.id,
                    cardioData: tempData,
                    weightData: loadedWorkout.weightData,
                  }
                );
              } catch (err) {
                setError(err);
                return;
              }
            };
            sendUpdate();
            setCardioData(updatedData);
            setTimeout(() => resolve(), 500);
          }),

        onBulkUpdate: (selectedRows) =>
          new Promise((resolve, reject) => {
            const rows = Object.values(selectedRows);
            const updatedRows = [...cardioData];
            let index;
            rows.map((emp) => {
              index = emp.oldData.cardioData.id;
              updatedRows[index] = emp.newData;
            });

            let tempData = loadedWorkout.cardioData;
            tempData[cardioNum].data = updatedRows;

            const sendUpdate = async () => {
              let results;
              try {
                results = await Axios.patch(
                  'http://localhost:5000/api/workouts/edit/',
                  {
                    userId: userId,
                    workoutId: loadedWorkout.id,
                    cardioData: tempData,
                    weightData: loadedWorkout.weightData,
                  }
                );
              } catch (err) {
                setError(err);
                return;
              }
            };
            sendUpdate();

            setTimeout(() => {
              setCardioData(updatedRows);
              resolve();
            }, 500);
          }),
      }}
      title={`${loadedWorkout.cardioData[cardioNum].name} Cardio`}
      columns={cardioColumns}
      data={cardioData}
      onRowClick={(evt, selectedRow) =>
        setSelectedRow(selectedRow.cardioData.id)
      }
      options={{
        // fixedColumns: {
        //   left: 1,
        //   right: 0,
        // },
        exportAllData: true,
        exportFileName: 'CardioData',
        addRowPosition: 'last',
        actionsColumnIndex: -1,
        search: false,
        paging: false,
        exportButton: true,
        headerStyle: {
          backgroundColor: '#828282',
          color: 'white',
          fontWeight: 'bold',
        },
        // grouping: true,
        rowStyle: (rowData) => ({
          backgroundColor:
            selectedRow === rowData.tableData.id ? '#EEE' : '#FFF',
        }),
        tableLayout: 'fixed',
      }}
    />
  );
};

export default CardioTable;

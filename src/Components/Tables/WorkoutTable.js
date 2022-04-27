import React from 'react';
import MaterialTable from 'material-table';
import { alpha } from '@material-ui/core/styles';
import Axios from 'axios';




const WorkoutTable = ({
  tableData,
  loadedWorkout,
  workoutNum,
  userId,
  setTableData,
  setError,
  columns,
  selectedRow,
  setSelectedRow,
}) => {

  return (
    <MaterialTable
      components={{
        Groupbar: (props) => <div style={{ width: '0px' }}></div>,
        Grouprow: (props) => <div style={{ width: '0px' }}></div>,
      }}
      editable={{
        onRowAdd: (newRow) =>
          new Promise((resolve, reject) => {
            let tempTable = [...tableData, newRow];
            let tempData = loadedWorkout.weightData;
            tempData[workoutNum].data = tempTable;
            const sendUpdate = async () => {
              let results;
              try {
                results = await Axios.patch(
                  'http://localhost:5000/api/workouts/edit/',
                  {
                    userId: userId,
                    workoutId: loadedWorkout.id,
                    cardioData: loadedWorkout.cardioData,
                    weightData: tempData,
                  }
                );
              } catch (err) {
                setError(err);
                return;
              }
            };
            sendUpdate();

            setTableData([...tableData, newRow]);
            setTimeout(() => resolve(), 500);
          }),

        onRowUpdate: (newRow, oldRow) =>
          new Promise((resolve, reject) => {
            let updatedData = [...tableData];
            updatedData[oldRow.tableData.id] = newRow;
            let tempData = loadedWorkout.weightData;
            tempData[workoutNum].data = updatedData;
            const sendUpdate = async () => {
              let results;
              try {
                results = await Axios.patch(
                  'http://localhost:5000/api/workouts/edit/',
                  {
                    userId: userId,
                    workoutId: loadedWorkout.id,
                    cardioData: loadedWorkout.cardioData,
                    weightData: tempData,
                  }
                );
              } catch (err) {
                setError(err);
                return;
              }
            };
            sendUpdate();

            setTableData(updatedData);

            setTimeout(() => resolve(), 500);
          }),

        onRowDelete: (selectedRow) =>
          new Promise((resolve, reject) => {
            let updatedData = [...tableData];
            updatedData.splice(selectedRow.tableData.id, 1);
            let tempData = loadedWorkout.weightData;
            tempData[workoutNum].data = updatedData;

            const sendUpdate = async () => {
              let results;
              try {
                results = await Axios.patch(
                  'http://localhost:5000/api/workouts/edit/',
                  {
                    userId: userId,
                    workoutId: loadedWorkout.id,
                    cardioData: loadedWorkout.cardioData,
                    weightData: tempData,
                  }
                );
              } catch (err) {
                setError(err);
                return;
              }
            };
            sendUpdate();
            setTableData(updatedData);
            setTimeout(() => resolve(), 500);
          }),

        onBulkUpdate: (selectedRows) =>
          new Promise((resolve, reject) => {
            const rows = Object.values(selectedRows);
            const updatedRows = [...tableData];
            let index;
            rows.map((emp) => {
              index = emp.oldData.tableData.id;
              updatedRows[index] = emp.newData;
            });

            let tempData = loadedWorkout.weightData;
            tempData[workoutNum].data = updatedRows;

            const sendUpdate = async () => {
              let results;
              try {
                results = await Axios.patch(
                  'http://localhost:5000/api/workouts/edit/',
                  {
                    userId: userId,
                    workoutId: loadedWorkout.id,
                    cardioData: loadedWorkout.cardioData,
                    weightData: tempData,
                  }
                );
              } catch (err) {
                setError(err);
                return;
              }
            };
            sendUpdate();

            setTimeout(() => {
              setTableData(updatedRows);
              resolve();
            }, 500);
          }),
      }}
      title={loadedWorkout.weightData[workoutNum].name}
      columns={columns}
      data={tableData}
      onRowClick={(evt, selectedRow) =>
        setSelectedRow(selectedRow.tableData.id)
      }
      options={{
        // fixedColumns: {
        //   left: 1,
        //   right: 0,
        // },
        exportAllData: true,
        exportFileName: 'TableData',
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

export default WorkoutTable;

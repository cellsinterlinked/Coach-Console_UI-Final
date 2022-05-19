import React, { useContext } from 'react';
import MaterialTable from 'material-table';

import Axios from 'axios';
import { AuthContext } from '../../Context/auth-context';

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
  const auth = useContext(AuthContext);

  return (
    <MaterialTable
      components={{
        Groupbar: (props) => <div style={{ width: '0px' }}></div>,
        Grouprow: (props) => <div style={{ width: '0px' }}></div>,
      }}
      editable={{
        onRowAdd: (newRow) =>
          new Promise((resolve, reject) => {
            let tempTable = [...loadedWorkout.weightData[workoutNum].data, newRow];
            let tempData = loadedWorkout.weightData;
            tempData[workoutNum].data = tempTable;
            const sendUpdate = async () => {
              try {
                await Axios.patch(
                  process.env.REACT_APP_BACKEND_URL + '/workouts/edit/',
                  {
                    userId: userId,
                    workoutId: loadedWorkout.id,
                    cardioData: loadedWorkout.cardioData,
                    weightData: tempData,
                  },
                  { headers: { Authorization: 'Bearer ' + auth.token } },
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
            let updatedData = [...loadedWorkout.weightData[workoutNum].data];
            updatedData[oldRow.tableData.id] = newRow;
            let tempData = loadedWorkout.weightData;
            tempData[workoutNum].data = updatedData;
            const sendUpdate = async () => {
              try {
                await Axios.patch(
                  process.env.REACT_APP_BACKEND_URL + '/workouts/edit/',
                  {
                    userId: userId,
                    workoutId: loadedWorkout.id,
                    cardioData: loadedWorkout.cardioData,
                    weightData: tempData,
                  },
                  { headers: { Authorization: 'Bearer ' + auth.token } },
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
            let updatedData = [...loadedWorkout.weightData[workoutNum].data];
            updatedData.splice(selectedRow.tableData.id, 1);
            let tempData = loadedWorkout.weightData;
            tempData[workoutNum].data = updatedData;

            const sendUpdate = async () => {
              try {
                await Axios.patch(
                  process.env.REACT_APP_BACKEND_URL + '/workouts/edit/',
                  {
                    userId: userId,
                    workoutId: loadedWorkout.id,
                    cardioData: loadedWorkout.cardioData,
                    weightData: tempData,
                  },
                  { headers: { Authorization: 'Bearer ' + auth.token } },
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

        /// this isn't working yet

        onBulkUpdate: (selectedRows) =>
          new Promise((resolve, reject) => {
            const rows = Object.values(selectedRows);
            const updatedRows = [...loadedWorkout.weightData[workoutNum].data];
            let index;
            rows.map((emp) => {
              index = emp.oldData.tableData.id;
              updatedRows[index] = emp.newData;
            });

            let tempData = loadedWorkout.weightData;
            tempData[workoutNum].data = updatedRows;

            const sendUpdate = async () => {
              try {
                await Axios.patch(
                  process.env.REACT_APP_BACKEND_URL + '/workouts/edit/',
                  {
                    userId: userId,
                    workoutId: loadedWorkout.id,
                    cardioData: loadedWorkout.cardioData,
                    weightData: tempData,
                  },
                  { headers: { Authorization: 'Bearer ' + auth.token } },
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
      onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow.tableData.id)}
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
          backgroundColor: selectedRow === rowData.tableData.id ? '#EEE' : '#FFF',
        }),
        tableLayout: 'fixed',
      }}
    />
  );
};

export default WorkoutTable;

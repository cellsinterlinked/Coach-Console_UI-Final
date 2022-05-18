import React, { useContext } from 'react';
import MaterialTable from 'material-table';
import Axios from 'axios';
import { AuthContext } from '../../Context/auth-context';

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
            let tempTable = [
              ...loadedWorkout.cardioData[cardioNum].data,
              newRow,
            ];
            let tempData = loadedWorkout.cardioData;
            tempData[cardioNum].data = tempTable;
            const sendUpdate = async () => {
              try {
                await Axios.patch(
                  process.env.REACT_APP_BACKEND_URL + '/workouts/edit/',
                  {
                    userId: userId,
                    workoutId: loadedWorkout.id,
                    cardioData: tempData,
                    weightData: loadedWorkout.weightData,
                  },
                  { headers: { Authorization: 'Bearer ' + auth.token } }
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
            let updatedData = [...loadedWorkout.cardioData[cardioNum].data];
            updatedData[oldRow.tableData.id] = newRow;
            let tempData = loadedWorkout.cardioData;
            tempData[cardioNum].data = updatedData;

            const sendUpdate = async () => {
              try {
                await Axios.patch(
                  process.env.REACT_APP_BACKEND_URL + '/workouts/edit/',
                  {
                    userId: userId,
                    workoutId: loadedWorkout.id,
                    cardioData: tempData,
                    weightData: loadedWorkout.weightData,
                  },
                  { headers: { Authorization: 'Bearer ' + auth.token } }
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
            let updatedData = [...loadedWorkout.cardioData[cardioNum].data];
            updatedData.splice(selectedRow.tableData.id, 1);
            let tempData = loadedWorkout.cardioData;
            tempData[cardioNum].data = updatedData;

            const sendUpdate = async () => {
              try {
                await Axios.patch(
                  process.env.REACT_APP_BACKEND_URL + '/workouts/edit/',
                  {
                    userId: userId,
                    workoutId: loadedWorkout.id,
                    cardioData: tempData,
                    weightData: loadedWorkout.weightData,
                  },
                  { headers: { Authorization: 'Bearer ' + auth.token } }
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

        //this isnt working yet

        onBulkUpdate: (selectedRows) =>
          new Promise((resolve, reject) => {
            const rows = Object.values(selectedRows);
            const updatedRows = [...loadedWorkout.cardioData[cardioNum].data];
            let index;
            rows.map((emp) => {
              index = emp.oldData.cardioData.id;
              updatedRows[index] = emp.newData;

            });

            let tempData = loadedWorkout.cardioData;
            tempData[cardioNum].data = updatedRows;

            const sendUpdate = async () => {
              try {
                await Axios.patch(
                  process.env.REACT_APP_BACKEND_URL + '/workouts/edit/',
                  {
                    userId: userId,
                    workoutId: loadedWorkout.id,
                    cardioData: tempData,
                    weightData: loadedWorkout.weightData,
                  },
                  { headers: { Authorization: 'Bearer ' + auth.token } }
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
        setSelectedRow(selectedRow.tableData.id)
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

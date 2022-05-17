import React, { useContext } from 'react';
import MaterialTable from 'material-table';
import { alpha } from '@material-ui/core/styles';
import Axios from 'axios';
import { AuthContext } from '../../Context/auth-context';

const DietTable = ({
  tableData,
  selectedDiet,
  dietNum,
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
            let tempTable = [...selectedDiet.food[dietNum].data, newRow];
            let tempData = selectedDiet.food;
            tempData[dietNum].data = tempTable;

            const sendUpdate = async () => {
              console.log('sendAddFire')
              let results;
              try {
                results = await Axios.patch(
                  'http://localhost:5000/api/diets/edit/',
                  {
                    userId: userId,
                    food: tempData,
                    dietId: selectedDiet.id,
                  },
                  { headers: { Authorization: 'Bearer ' + auth.token } }
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
            let updatedData = [...selectedDiet.food[dietNum].data];
            updatedData[oldRow.tableData.id] = newRow;
            let tempData = selectedDiet.food;
            tempData[dietNum].data = updatedData;

            const sendUpdate = async () => {
              console.log('sendUpdateFire')
              let results;
              try {
                results = await Axios.patch(
                  'http://localhost:5000/api/diets/edit/',
                  {
                    userId: userId,
                    dietId: selectedDiet.id,
                    food: tempData,
                  },
                  { headers: { Authorization: 'Bearer ' + auth.token } }
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
            let updatedData = [...selectedDiet.food[dietNum].data];
            updatedData.splice(selectedRow.tableData.id, 1);
            let tempData = selectedDiet.food;
            tempData[dietNum].data = updatedData;
            const sendUpdate = async () => {
              console.log('sendDeleteFire')
              let results;
              try {
                results = await Axios.patch(
                  'http://localhost:5000/api/diets/edit/',
                  {
                    userId: userId,
                    dietId: selectedDiet.id,
                    food: tempData,
                  },
                  { headers: { Authorization: 'Bearer ' + auth.token } }
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
            let rows = Object.values(selectedRows);
            let updatedRows = [...selectedDiet.food[dietNum].data];
            let index;
            rows.map((emp) => {
              index = emp.oldData.tableData.id;
              updatedRows[index] = emp.newData;
            });

            let tempData = selectedDiet.food;
            tempData[dietNum].data = updatedRows;
            const sendUpdate = async () => {
              console.log('bulkUpdateFire')
              let results;
              try {
                results = await Axios.patch(
                  'http://localhost:5000/api/diets/edit/',
                  {
                    userId: userId,
                    dietId: selectedDiet.id,
                    food: tempData,
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
              setTableData(updatedRows);
              resolve();
            }, 500);
          }),
      }}
      title={selectedDiet.food[dietNum].name}
      columns={columns}
      data={tableData}
      onRowClick={(evt, selectedRow) => {
        console.log('selectingRowFire')
        setSelectedRow(selectedRow.tableData.id)
      }
      }
      options={{
        exportAllData: true,
        exportFileName: 'TableData',
        addRowPosition: 'last',
        actionsColumnIndex: -1,
        tableLayout: 'fixed',
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

        // padding: "dense",
      }}
    />
  );
};

export default DietTable;

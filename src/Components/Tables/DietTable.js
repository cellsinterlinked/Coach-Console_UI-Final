import React from 'react'
import MaterialTable from 'material-table';
import { alpha } from '@material-ui/core/styles';
import Axios from 'axios'

const DietTable = ({tableData, selectedDiet, dietNum, userId, setTableData, setError, columns, selectedRow, setSelectedRow}) => {
return (
<MaterialTable
              components={{
                Groupbar: props => (
                  <div style={{width: "0px"}}></div>
                ),
                Grouprow: props => (
                  <div style={{width: "0px"}}></div>
                )

              }}
              editable={{
                onRowAdd:(newRow) =>new Promise((resolve, reject) => {
                  let tempTable = [...tableData, newRow];
                  let tempData = selectedDiet.food
                  tempData[dietNum].data = tempTable

                  const sendUpdate = async () => {
                    let results;
                    try {
                      results = await Axios.patch(
                        'http://localhost:5000/api/diets/edit/',
                        {
                          userId: userId,
                          food: tempData,
                          dietId: selectedDiet.id
                        }
                      );
                    } catch (err) {
                      setError(err);
                      return;
                    }
                  };
                  sendUpdate();


                  setTableData([...tableData, newRow])
                  setTimeout(()=>resolve(), 500)
                }),
                onRowUpdate:(newRow,oldRow)=> new Promise((resolve, reject) => {
                  let updatedData = [...tableData]
                  updatedData[oldRow.tableData.id] = newRow
                  let tempData = selectedDiet.food
                  tempData[dietNum].data = updatedData
                  const sendUpdate = async () => {
                    let results;
                    try {
                      results = await Axios.patch(
                        'http://localhost:5000/api/workouts/edit/',
                        {
                          userId: userId,
                          dietId: selectedDiet.id,
                          food: tempData
                        }
                      );
                    } catch (err) {
                      setError(err);
                      return;
                    }
                  };
                  sendUpdate();
                  setTableData(updatedData)
                  setTimeout(()=>resolve(), 500)
                }),




                onRowDelete:(selectedRow)=> new Promise((resolve, reject)=> {
                  let updatedData=[...tableData]
                  updatedData.splice(selectedRow.tableData.id, 1)
                  let tempData = selectedDiet.food;
                  tempData[dietNum].data = updatedData
                  const sendUpdate = async () => {
                    let results;
                    try {
                      results = await Axios.patch(
                        'http://localhost:5000/api/workouts/edit/',
                        {
                          userId: userId,
                          dietId: selectedDiet.id,
                          food: tempData
                        }
                      );
                    } catch (err) {
                      setError(err);
                      return;
                    }
                  };
                  sendUpdate();


                  setTableData(updatedData)
                  setTimeout(()=>resolve(), 500)
                }),


                onBulkUpdate: selectedRows => new Promise((resolve, reject)=> {
                  let rows = Object.values(selectedRows)
                  let updatedRows=[...tableData]
                  let index;
                  rows.map(emp => {
                    index = emp.oldData.tableData.id
                    updatedRows[index]=emp.newData
                  })

                  let tempData = selectedDiet.food;
                  tempData[dietNum].data = updatedRows
                  const sendUpdate = async () => {
                    let results;
                    try {
                      results = await Axios.patch(
                        'http://localhost:5000/api/workouts/edit/',
                        {
                          userId: userId,
                          dietId: selectedDiet.id,
                          food: tempData
                        }
                      );
                    } catch (err) {
                      setError(err);
                      return;
                    }
                  };
                  sendUpdate();


                  setTimeout(() => {
                    setTableData(updatedRows)
                    resolve()
                  }, 500)

                })

              }}

              title={selectedDiet.food[dietNum].name}
              columns={columns}
              data={tableData}
              onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
              options={{
                exportAllData: true, exportFileName: "TableData", addRowPosition: "last", actionsColumnIndex: -1,
                tableLayout: 'fixed',
                search: false,
                paging: false,
                exportButton: true,
                headerStyle: { backgroundColor: "#828282", color: "white", fontWeight: "bold" },
                // grouping: true,
                rowStyle: rowData => ({
                  backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                })



                // padding: "dense",

              }}
            />
)
}

export default DietTable;
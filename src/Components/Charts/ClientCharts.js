import React from 'react';
import LineChart from './LineChart';



const ClientCharts = ({checkinChartData, chartSelect}) => {
  return (
    <div className="chart-group">
                    {chartSelect.fatMass === true && (
                      <LineChart
                        data={checkinChartData.totals.ltFatMass}
                        color={'#0ee2d0'}
                        background={'#0ee2d044'}
                        label={'Fat Mass'}
                      />
                    )}
                    {chartSelect.bodyFat === true && (
                      <LineChart
                        data={checkinChartData.totals.ltBodyFat}
                        color={'#c532ff'}
                        background={'#c532ff31'}
                        label={'Body Fat Percentage'}
                      />
                    )}
                    {chartSelect.leanBodyMass === true && (
                      <LineChart
                        data={checkinChartData.totals.ltLeanBodyMass}
                        color={'#2a9fff'}
                        background={'#2a9fff44'}
                        label={'Lean Body Mass'}
                      />
                    )}
                    {chartSelect.weight === true && (
                      <LineChart
                        data={checkinChartData.totals.ltWeight}
                        color={'#ff2a8d'}
                        background={'#ff2a8d44'}
                        label={'Weight'}
                      />
                    )}
                    {chartSelect.calories === true && (
                      <LineChart
                        data={checkinChartData.totals.ltTotalCals}
                        color={'#0ee2d0'}
                        background={'#0ee2d044'}
                        label={'Weekly Calories'}
                      />
                    )}
                    {chartSelect.carbs === true && (
                      <LineChart
                        data={checkinChartData.totals.ltTotalCarb}
                        color={'#c532ff'}
                        background={'#c532ff31'}
                        label={'Weekly Carbs'}
                      />
                    )}
                    {chartSelect.fats === true && (
                      <LineChart
                        data={checkinChartData.totals.ltTotalFat}
                        color={'#2a9fff'}
                        background={'#2a9fff44'}
                        label={'Weekly Fats'}
                      />
                    )}
                    {chartSelect.protein === true && (
                      <LineChart
                        data={checkinChartData.totals.ltTotalPro}
                        color={'#ff2a8d'}
                        background={'#ff2a8d44'}
                        label={'Weekly Protein'}
                      />
                    )}
                    {chartSelect.workoutQuality === true && (
                      <LineChart
                        data={checkinChartData.totals.ltWorkoutQuality}
                        color={'#0ee2d0'}
                        background={'#0ee2d044'}
                        label={'Weekly Workout Quality'}
                      />
                    )}
                    {chartSelect.measurements === true && (
                      <LineChart
                        data={checkinChartData.totals.ltMeasurementTotal}
                        color={'#c532ff'}
                        background={'#c532ff31'}
                        label={'Total Measurements'}
                      />
                    )}
                    {chartSelect.volume === true && (
                      <LineChart
                        data={checkinChartData.totals.ltTotalSets}
                        color={'#2a9fff'}
                        background={'#2a9fff44'}
                        label={'Training Volume(work sets)'}
                      />
                    )}
                    {chartSelect.cardioTime === true && (
                      <LineChart
                        data={checkinChartData.totals.ltCardioTime}
                        color={'#ff2a8d'}
                        background={'#ff2a8d44'}
                        label={'Total Cardio Time'}
                      />
                    )}
                    {chartSelect.cardioCals === true && (
                      <LineChart
                        data={checkinChartData.totals.ltCardioCals}
                        color={'#0ee2d0'}
                        background={'#0ee2d044'}
                        label={'Total Cardio Cals'}
                      />
                    )}
                    {chartSelect.sleepTime === true && (
                      <LineChart
                        data={checkinChartData.totals.ltSleepAvg}
                        color={'#c532ff'}
                        background={'#c532ff31'}
                        label={'Average Hrs of Sleep'}
                      />
                    )}
                  </div>
  )

}

export default ClientCharts;
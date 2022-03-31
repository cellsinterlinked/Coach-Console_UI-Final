import React, { useState, useEffect } from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { RiUserAddLine } from 'react-icons/ri';
import { GoSearch } from 'react-icons/go';
import './Clients.css';
import './CoachUniversal.css';
import '../Dashboard.css';
import Input from '../../Forms/InputFront';
import Button from '../../Buttons/Button';
import { IoAddSharp, IoTrash } from 'react-icons/io5';
import { IoTrashOutline } from 'react-icons/io5';

import DrawerRight from '../../Nav/DrawerRight';
import DrawerBottom from '../../Nav/DrawerBottom';

import CheckinButton from '../../Buttons/CheckinButton';
import CheckinMobile from '../../Forms/CheckinMobile';
import LineChart from '../../Charts/LineChart';
import ChartDrop from '../../DropDowns/ChartDrop';
import Axios from 'axios'

const Trainee = ({ DUMMYCHECKINS, navToggle, workouts, diets, fullUserData, currentClient, userId, userRole }) => {


  const [error, setError] = useState('');
  const [current, setCurrent] = useState(true);
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(false)
  const [checkMode, setCheckMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const [checkinChartData, setCheckinChartData] = useState()

  const [chartSelect, setChartSelect] = useState({
    fatMass: true,
    bodyFat: true,
    leanBodyMass: true,
    weight: true,
    calories: true,
    carbs: true,
    fats: true,
    protein: true,
    workoutQuality: true,
    measurements: true,
    volume: true,
    cardioTime: true,
    cardioCals: true,
    sleepTime: true,
  });

  console.log(currentClient)


  useEffect(() => {
    const getClientData = async () => {
      setLoading(true)
      let result;
      try {
        result = await Axios.get(`http://localhost:5000/api/checkins/${currentClient.id}`)
      } catch (err) {
        alert(err)
        setLoading(false)

        return
      }
      setCheckinChartData(result.data)
      console.log(result.data)
      setLoading(false)
    }
    getClientData()
  },[currentClient.id])

  const addCheckinToggle = () => {
    setAdd(!add);
    console.log(add)
  };




  return (
    <>
    { (loading === false && fullUserData) ? <>
      <DrawerRight
        show={current === false}
        name="drawer-right-partial"
        children={
          <>
            {checkinChartData && <div className="chart-group">
            {chartSelect.fatMass === true && <LineChart
            data={checkinChartData.totals.ltFatMass}
            color={'#0ee2d0'}
            background={'#0ee2d044'}
            label={'Fat Mass'}
          />}
           {chartSelect.bodyFat === true && <LineChart
            data={checkinChartData.totals.ltBodyFat}
            color={'#c532ff'}
            background={'#c532ff31'}
            label={'Body Fat Percentage'}
          />}
           {chartSelect.leanBodyMass === true && <LineChart
            data={checkinChartData.totals.ltLeanBodyMass}
            color={'#2a9fff'}
            background={'#2a9fff44'}
            label={'Lean Body Mass'}
          />}
           {chartSelect.weight === true && <LineChart
            data={checkinChartData.totals.ltWeight}
            color={'#ff2a8d'}
            background={'#ff2a8d44'}
            label={'Weight'}
          />}
          {chartSelect.calories === true && <LineChart
            data={checkinChartData.totals.ltTotalCals}
            color={'#0ee2d0'}
            background={'#0ee2d044'}
            label={'Weekly Calories'}
          />}
           {chartSelect.carbs === true && <LineChart
            data={checkinChartData.totals.ltTotalCarb}
            color={'#c532ff'}
            background={'#c532ff31'}
            label={'Weekly Carbs'}
          />}
           {chartSelect.fats === true && <LineChart
            data={checkinChartData.totals.ltTotalFat}
            color={'#2a9fff'}
            background={'#2a9fff44'}
            label={'Weekly Fats'}
          />}
           {chartSelect.protein === true && <LineChart
            data={checkinChartData.totals.ltTotalPro}
            color={'#ff2a8d'}
            background={'#ff2a8d44'}
            label={'Weekly Protein'}
          />}
          {chartSelect.workoutQuality === true && <LineChart
            data={checkinChartData.totals.ltWorkoutQuality}
            color={'#0ee2d0'}
            background={'#0ee2d044'}
            label={'Weekly Workout Quality'}
          />}
           {chartSelect.measurements === true && <LineChart
            data={checkinChartData.totals.ltMeasurementTotal}
            color={'#c532ff'}
            background={'#c532ff31'}
            label={'Total Measurements'}
          />}
           {chartSelect.volume === true && <LineChart
            data={checkinChartData.totals.ltTotalSets}
            color={'#2a9fff'}
            background={'#2a9fff44'}
            label={'Training Volume(work sets)'}
          />}
           {chartSelect.cardioTime === true && <LineChart
            data={checkinChartData.totals.ltCardioTime}
            color={'#ff2a8d'}
            background={'#ff2a8d44'}
            label={'Total Cardio Time'}
          />}
          {chartSelect.cardioCals === true && <LineChart
            data={checkinChartData.totals.ltCardioCals}
            color={'#0ee2d0'}
            background={'#0ee2d044'}
            label={'Total Cardio Cals'}
          />}
           {chartSelect.sleepTime === true && <LineChart
            data={checkinChartData.totals.ltSleepAvg}
            color={'#c532ff'}
            background={'#c532ff31'}
            label={'Average Hrs of Sleep'}
          />}

           </div>}

          </>
        }
      />

      <DrawerBottom
        show={add === true}
        name="drawer-bottom-partial"
        children={<CheckinMobile workouts={fullUserData.workouts} diets={fullUserData.diets} currentClient={currentClient} userId={userId} userRole={userRole} />}
      />

      <header className="dash-head">
        <HiOutlineMenuAlt2 className="mobile-menu" onClick={navToggle} />
        {add !== true ? <h1>Check-Ins</h1> : <h1>New Check-In</h1>}
        {current === true && <RiUserAddLine className="add-user-mobile" onClick={addCheckinToggle} />}
        {current === false &&  <div className="chart-drop-container">
              <ChartDrop
                selection={chartSelect}
                setSelection={setChartSelect}
              />
            </div>}
      <div className="mobile-select1">
        <div
          className={current ? 'select1 select-green' : 'select1'}
          onClick={() => setCurrent(true)}
        >
          <p>Check-Ins</p>
        </div>
        <div
          className={current ? 'select2' : 'select2 select-green'}
          onClick={() => setCurrent(false)}
        >
          <p>{userRole === 'coach' ? 'Client Analytics' : 'My Analyics'}</p>
        </div>
      </div>
      </header>

      <div className="desk-center">
        <div className="dash-search-container">
          <Input name="search-input" placeholder={'Search Check-Ins'} />
          <Button
            name="search-button"
            contents={<GoSearch className="magnify" />}
          />
        </div>

        <div className="client-list-container">
          <div className="client-desk-menu">
            {checkMode !== true ? <h3>Check-Ins</h3> : <h3>New Check-In</h3>}
            <IoAddSharp
              className="add-desk-icon"
              onClick={() => setCheckMode(!checkMode)}
            />
            {checkMode === false && (
              <IoTrashOutline
                className="desk-trash-icon"
                onClick={() => setDeleteMode(!deleteMode)}
              />
            )}
          </div>
          {checkMode === false ? (
            <div className="absurd-box">
              {userRole === 'coach' && fullUserData.checkins.filter(checkin => checkin.client === currentClient.id).map((client, index) => (
                <CheckinButton
                  name={client.name}
                  key={index}
                  image={currentClient.image}
                  date={"fake date"}
                  firstCheckin={"fake date"}
                />
              ))}
               {userRole === 'client' && fullUserData.userCheckins.map((checkin, index) => (
                <CheckinButton
                  name={checkin.name}
                  key={index}
                  image={checkin.images[0] || currentClient.image}
                  date={`${checkin.date.monthString} ${checkin.date.day} ${checkin.date.year}`}
                  firstCheckin={`${fullUserData.userCheckins[0].date.monthString} ${fullUserData.userCheckins[0].date.day} ${fullUserData.userCheckins[0].date.year}`}
                />
              ))}
            </div>
          ) : (
            <div className="absurd-box">
              <CheckinMobile workouts={fullUserData.workouts} diets={fullUserData.diets} currentClient={currentClient} userId={userId} userRole={userRole} />
            </div>
          )}
        </div>
      </div>

      <div className="right-sector-desk">
        <div className="right-bar-desk">
          <div className="analytics-deskHead">
            <div className="chart-drop-container">
              <ChartDrop
                selection={chartSelect}
                setSelection={setChartSelect}
              />
            </div>
            <h3>{userRole === 'coach' ? "Client Analytics" : "My Analytics"}</h3>
          </div>
          {checkinChartData && <div className="chart-group">
          {chartSelect.fatMass === true && <LineChart
            data={checkinChartData.totals.ltFatMass}
            color={'#0ee2d0'}
            background={'#0ee2d044'}
            label={'Fat Mass'}
          />}
           {chartSelect.bodyFat === true && <LineChart
            data={checkinChartData.totals.ltBodyFat}
            color={'#c532ff'}
            background={'#c532ff31'}
            label={'Body Fat Percentage'}
          />}
           {chartSelect.leanBodyMass === true && <LineChart
            data={checkinChartData.totals.ltLeanBodyMass}
            color={'#2a9fff'}
            background={'#2a9fff44'}
            label={'Lean Body Mass'}
          />}
           {chartSelect.weight === true && <LineChart
            data={checkinChartData.totals.ltWeight}
            color={'#ff2a8d'}
            background={'#ff2a8d44'}
            label={'Weight'}
          />}
          {chartSelect.calories === true && <LineChart
            data={checkinChartData.totals.ltTotalCals}
            color={'#0ee2d0'}
            background={'#0ee2d044'}
            label={'Weekly Calories'}
          />}
           {chartSelect.carbs === true && <LineChart
            data={checkinChartData.totals.ltTotalCarb}
            color={'#c532ff'}
            background={'#c532ff31'}
            label={'Weekly Carbs'}
          />}
           {chartSelect.fats === true && <LineChart
            data={checkinChartData.totals.ltTotalFat}
            color={'#2a9fff'}
            background={'#2a9fff44'}
            label={'Weekly Fats'}
          />}
           {chartSelect.protein === true && <LineChart
            data={checkinChartData.totals.ltTotalPro}
            color={'#ff2a8d'}
            background={'#ff2a8d44'}
            label={'Weekly Protein'}
          />}
          {chartSelect.workoutQuality === true && <LineChart
            data={checkinChartData.totals.ltWorkoutQuality}
            color={'#0ee2d0'}
            background={'#0ee2d044'}
            label={'Weekly Workout Quality'}
          />}
           {chartSelect.measurements === true && <LineChart
            data={checkinChartData.totals.ltMeasurementTotal}
            color={'#c532ff'}
            background={'#c532ff31'}
            label={'Total Measurements'}
          />}
           {chartSelect.volume === true && <LineChart
            data={checkinChartData.totals.ltTotalSets}
            color={'#2a9fff'}
            background={'#2a9fff44'}
            label={'Training Volume(work sets)'}
          />}
           {chartSelect.cardioTime === true && <LineChart
            data={checkinChartData.totals.ltCardioTime}
            color={'#ff2a8d'}
            background={'#ff2a8d44'}
            label={'Total Cardio Time'}
          />}
          {chartSelect.cardioCals === true && <LineChart
            data={checkinChartData.totals.ltCardioCals}
            color={'#0ee2d0'}
            background={'#0ee2d044'}
            label={'Total Cardio Cals'}
          />}
           {chartSelect.sleepTime === true && <LineChart
            data={checkinChartData.totals.ltSleepAvg}
            color={'#c532ff'}
            background={'#c532ff31'}
            label={'Average Hrs of Sleep'}
          />}

           </div>}

        </div>
      </div>
    </> : <div>Loading</div>}
    </>
  );
};

export default Trainee;

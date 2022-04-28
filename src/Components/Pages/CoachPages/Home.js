import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiOutlineMenuAlt2 } from 'react-icons/hi';
import { RiUserAddLine } from 'react-icons/ri';
import { GoSearch } from 'react-icons/go';
import './Clients.css';
import './CoachUniversal.css';
import '../Dashboard.css';
import Input from '../../Forms/InputFront';
import Button from '../../Buttons/Button';
import { IoAddSharp, IoTrash } from 'react-icons/io5';
import { IoTrashOutline } from 'react-icons/io5';
import { HiOutlineChevronLeft } from 'react-icons/hi';

import DrawerRight from '../../Nav/DrawerRight';
import DrawerBottom from '../../Nav/DrawerBottom';
import TotalDisplay from '../../CheckinDisplays/TotalDisplay';
import CheckinButton from '../../Buttons/CheckinButton';
import CheckinMobile from '../../Forms/CheckinMobile';
import ChartDrop from '../../DropDowns/ChartDrop';
import Axios from 'axios';
import Modal from '../../Modals/Modal';
import ClientCharts from '../../Charts/ClientCharts';
import LoadingDots from '../../Animations/LoadingDots';

const Home = ({
  navToggle,
  currentClient,
  userId,
  userRole,
}) => {
  const [error, setError] = useState('');
  const [current, setCurrent] = useState(true);
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkMode, setCheckMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [query, setQuery] = useState('');
  const [searchList, setSearchList] = useState();
  const [checkinChartData, setCheckinChartData] = useState();
  const [checkinList, setCheckinList] = useState();
  const [checkinDisplay, setCheckinDisplay] = useState();
  const [clients, setClients] = useState();
  const [fullUserData, setFullUserData] = useState();
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

  useEffect(() => {
    console.log('this is the current client', currentClient);
    const getClientData = async () => {
      setLoading(true);
      let result;
      try {
        result = await Axios.get(
          `http://localhost:5000/api/checkins/${currentClient.id}`
        );
      } catch (err) {
        alert(err);
        setLoading(false);
        return;
      }
      let results;
      try {
        results = await Axios.get(
          `http://localhost:5000/api/users/all/${userId}`
        );
      } catch (err) {
        alert(`couldn't get info from database ${err}`);
        setError("Couldn't fetch from the database");
        setLoading(false);
        return;
      }

      setFullUserData(results.data);
      setCheckinChartData(result.data);
      setCheckinList(result.data.checkins);
      console.log('this is the result', result.data);
      setLoading(false);
    };

    getClientData();
  }, [currentClient, currentClient.id]);

  useEffect(() => {
    if (userRole === 'client') {
      if (query && checkinList && checkinList.length > 0) {
        setSearchList(
          checkinList.filter(
            (checkin) =>
              checkin.date.monthString
                .toLowerCase()
                .includes(query.toLowerCase()) ||
              checkin.date.day.toString().includes(query) ||
              checkin.date.year.toString().includes(query)
          )
        );
      }
    }


      if (query && checkinList && checkinList.length > 0) {
        setSearchList(
          checkinList
            .filter((checkin) => checkin.client === currentClient.id)
            .filter(
              (checkin) =>
                checkin.date.monthString
                  .toLowerCase()
                  .includes(query.toLowerCase()) ||
                checkin.date.day.toString().includes(query) ||
                checkin.date.year.toString().includes(query)
            )
        );
      }

  }, [checkinList, query, userRole, currentClient.id]);

  const updateClientData = async () => {
    setLoading(true);
    let result;
    try {
      result = await Axios.get(
        `http://localhost:5000/api/checkins/${currentClient.id}`
      );
    } catch (err) {
      alert(err);
      setLoading(false);

      return;
    }
    console.log('its working strangely');
    setCheckinChartData(result.data);
    setCheckinList(result.data.checkins);
    setLoading(false);
  };

  const addCheckinToggle = () => {
    setAdd(!add);
    setCheckinDisplay();
    console.log(add);
  };

  const deleteHandler = (id) => {
    // alert(`${id} is checkin we are deleting`)
    setDeleteId(id);
    setConfirmDelete(true);
  };

  const selectHandler = (checkin) => {
    setCheckinDisplay(checkin);
    setQuery('');
    setSearchList();
  };

  const backHandler = () => {
    setCheckinDisplay();
  };

  const deleteCheckinHandler = async () => {
    setConfirmDelete(false);
    console.log(deleteId);
    let results;

    try {
      results = await Axios.delete(
        `http://localhost:5000/api/checkins/${deleteId.id}`
      );
    } catch (err) {
      setError(`Couldnt delete this check-in.${err}`);
      return;
    }
    setError('Check-in Deleted');
    updateClientData();
    setDeleteMode(false);
  };

  const queryHandler = (e) => {
    setQuery(e.target.value);
    console.log(query);
  };

  console.log(checkinChartData);

  return (
    <>
      <Modal
        show={confirmDelete === true}
        onCancel={() => setConfirmDelete(false)}
        children={
          <div className="error-modal-container">
            <h3>Are you sure you want to delete this checkin permanently?</h3>
            <Button
              name="auth-button-danger"
              contents="YES"
              click={() => {
                deleteCheckinHandler();
              }}
            />
            <Button
              name="auth-button-secondary button-top-margin-gone "
              contents="NO"
              click={() => {
                setConfirmDelete(false);
              }}
            />
          </div>
        }
      />

      <Modal
        show={error}
        onCancel={() => setError()}
        children={
          <div className="error-modal-container">
            <h3>{error}</h3>
            <Button
              name="auth-button-primary"
              contents="GOT IT!"
              click={() => setError()}
            />
          </div>
        }
      />

      {loading && <LoadingDots />}

      {!loading && fullUserData && (
        <>
          <DrawerRight
            show={current === false}
            name="drawer-right-partial_trainee"
            children={
              <>
                {checkinChartData && (
                  <ClientCharts
                    checkinChartData={checkinChartData}
                    chartSelect={chartSelect}
                  />
                )}
              </>
            }
          />

          <DrawerBottom
            show={add === true}
            name="drawer-bottom-partial"
            children={
              <CheckinMobile
                workouts={fullUserData.workouts}
                //this may be a problem ^
                diets={fullUserData.diets}
                //as well as this
                currentClient={currentClient}
                userId={userId}
                userRole={userRole}
                updateClientData={updateClientData}
                setAdd={setAdd}
                setCheckMode={setCheckMode}
              />
            }
          />

          {/* header if not checkin display this is only desktop */}

          {!checkinDisplay && (
            <header className="dash-head">
              <HiOutlineMenuAlt2 className="mobile-menu" onClick={navToggle} />
              {add !== true ? <h1>Check-Ins</h1> : <h1>New Check-In</h1>}
              {current === true && (
                <RiUserAddLine
                  className="add-user-mobile"
                  onClick={addCheckinToggle}
                />
              )}
              {current === false && (
                <div className="chart-drop-container">
                  <ChartDrop
                    selection={chartSelect}
                    setSelection={setChartSelect}
                  />
                </div>
              )}
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
                  <p>
                    {userRole === 'coach' ? 'Client Analytics' : 'My Analyics'}
                  </p>
                </div>
              </div>
            </header>
          )}



             { checkinDisplay && <header className="dash-head">
              {add === true && (
                <HiOutlineMenuAlt2
                  className="mobile-menu"
                  onClick={navToggle}
                />
              )}
              {add !== true && (
                <HiChevronLeft
                  className="mobile-menu"
                  onClick={() => setCheckinDisplay()}
                />
              )}
              {add !== true ? (
                <h1>{currentClient.name}</h1>
              ) : (
                <h1>New Check-In</h1>
              )}
              {current === true && (
                <RiUserAddLine
                  className="add-user-mobile"
                  onClick={addCheckinToggle}
                />
              )}

              <div className="mobile-select1">
                <h3 className="mobile-checkin-date">{`${checkinDisplay.date.monthString} ${checkinDisplay.date.day} ${checkinDisplay.date.year}`}</h3>
              </div>
            </header>}


          {/* end header */}

          {/* this is the search bar both desktop and mobile*/}

          <div className="desk-center">
            {current === true && (
              <div className="dash-search-container">
                <Input
                  parentClass="parent-auto"
                  name="search-input"
                  placeholder={'Search Check-Ins'}
                  onChange={queryHandler}
                  value={query}
                  clear={() => setQuery('')}
                  clearable={true}
                />
                <Button
                  name="search-button"
                  contents={<GoSearch className="magnify" />}
                />
                <Button
                  name="search-button-mobile"
                  contents={<IoTrashOutline className="magnify" />}
                  click={() => setDeleteMode(!deleteMode)}
                />

                {query &&
                  query !== '' &&
                  searchList &&
                  searchList.length > 0 &&
                  userRole === 'client' && (
                    <div className="search-drop-broken">
                      {searchList.map((checkin, index) => (
                        <CheckinButton
                          checkin={checkin}
                          click={selectHandler}
                          id={checkin.id}
                          name={checkin.name}
                          key={index}
                          image={checkin.images[0] || currentClient.image}
                          date={`${checkin.date.monthString} ${checkin.date.day} ${checkin.date.year}`}
                          firstCheckin={`${fullUserData.userCheckins[0].date.monthString} ${fullUserData.userCheckins[0].date.day} ${fullUserData.userCheckins[0].date.year}`}
                        />
                      ))}
                    </div>
                  )}
              </div>
            )}
            {/* end search bar */}

            {/* display of checkin mobile and desktop */}

            {checkinDisplay && (
              <TotalDisplay
                currentClient={currentClient}
                checkinDisplay={checkinDisplay}
                setCheckinDisplay={setCheckinDisplay}
              />
            )}

            {/* end display of checkin */}

            {/* desktop header for checkin list and create new checkin */}
            {/* this entire block is for if there is checkinChart data and its not checkinDisplay */}
            {checkinChartData && (
              <div className="client-list-container">
                <div className="client-desk-menu">
                  {checkMode !== true ? (
                    <h3>Check-Ins</h3>
                  ) : (
                    <h3>New Check-In</h3>
                  )}
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
                {/* end header for checkin list and create new checkin */}

                {/* add checkin page desktop */}
                {currentClient && checkMode === true && (
                  <div className="absurd-box">
                    <CheckinMobile
                      workouts={fullUserData.workouts}
                      //this may be a problem ^
                      diets={fullUserData.diets}
                      //as well as this
                      currentClient={currentClient}
                      userId={userId}
                      userRole={userRole}
                      updateClientData={updateClientData}
                      setAdd={setAdd}
                      setCheckMode={setCheckMode}
                    />
                  </div>
                )}
                {/* end add checkin page for desktop */}

                {checkMode === false && current === true && !checkinDisplay && (
                  <div className="absurd-box">
                    {/* checkins list if there are checkins */}
                    {checkinChartData.checkins &&
                      checkinChartData.checkins !== [] &&
                      checkinChartData.checkins.map((checkin, index) => (
                        <CheckinButton
                          checkin={checkin}
                          id={checkin.id}
                          name={checkin.name}
                          key={index}
                          image={checkin.images[0] || currentClient.image}
                          date={`${checkin.date.monthString} ${checkin.date.day} ${checkin.date.year}`}
                          firstCheckin={`${fullUserData.userCheckins[0].date.monthString} ${fullUserData.userCheckins[0].date.day} ${fullUserData.userCheckins[0].date.year}`}
                          deleteMode={deleteMode}
                          click={
                            deleteMode === true ? deleteHandler : selectHandler
                          }
                        />
                      ))}
                    {/* end checkins list if there are checkins */}

                    {/* checkin list if there are no checkins */}
                    {checkinChartData.checkins &&
                      checkinChartData.checkins.length === 0 && (
                        <div className="absurd-box">
                          <h3 className="no-data-title">
                            Oops! You have no checkins. Click the + button on
                            the top right to get started!
                          </h3>
                        </div>
                      )}
                    {/* end checkin list if there are no checkins */}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* right hand side analytics */}

          <div className="right-sector-desk">
            <div className="right-bar-desk">
              <div className="analytics-deskHead">
                <div className="chart-drop-container">
                  <ChartDrop
                    selection={chartSelect}
                    setSelection={setChartSelect}
                  />
                </div>
                <h3>My Analytics</h3>
              </div>
              {checkinChartData && (
                <ClientCharts
                  checkinChartData={checkinChartData}
                  chartSelect={chartSelect}
                />
              )}
            </div>
          </div>
          {/*
          end right side analytics */}
        </>
      )}
    </>
  );
};

export default Home;

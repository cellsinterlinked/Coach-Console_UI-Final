import React, { useState, useEffect, useContext } from 'react';
import { HiChevronLeft, HiOutlineMenuAlt2 } from 'react-icons/hi';
import { GoSearch } from 'react-icons/go';
import './Clients.css';
import './CoachUniversal.css';
import '../Dashboard.css';
import Input from '../../Forms/InputFront';
import Button from '../../Buttons/Button';
import { IoAddSharp } from 'react-icons/io5';
import { IoTrashOutline } from 'react-icons/io5';
import TotalDisplay from '../../CheckinDisplays/TotalDisplay';
import DrawerRight from '../../Nav/DrawerRight';
import DrawerBottom from '../../Nav/DrawerBottom';
import CheckinButton from '../../Buttons/CheckinButton';
import CheckinMobile from '../../Forms/CheckinMobile';
import ChartDrop from '../../DropDowns/ChartDrop';
import Axios from 'axios';
import Modal from '../../Modals/Modal';
import ClientCharts from '../../Charts/ClientCharts';
import LoadingDots from '../../Animations/LoadingDots';
import { AuthContext } from '../../../Context/auth-context';
import {RiUserAddLine} from 'react-icons/ri';

const Trainee = ({
  navToggle,
  workouts,
  diets,
  fullUserData,
  currentClient,
  userId,
  userRole,
  setFullUserData,
  hack,
  setHack,
}) => {
  const auth = useContext(AuthContext);
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
    const getClientData = async () => {
      setLoading(true);
      let result;
      try {
        result = await Axios.get(
          process.env.REACT_APP_BACKEND_URL + `/checkins/${currentClient.id}`,
          { headers: { Authorization: 'Bearer ' + auth.token } }
        );
      } catch (err) {
        setError(err);
        setLoading(false);

        return;
      }
      setCheckinChartData(result.data);
      setCheckinList(result.data.checkins.reverse());
      setLoading(false);
    };
    getClientData();
  }, [currentClient.id]);

  useEffect(() => {
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
  }, [checkinList, query, userRole]);

  const updateClientData = async () => {
    setLoading(true);
    let result;
    try {
      result = await Axios.get(
        process.env.REACT_APP_BACKEND_URL + `/checkins/${currentClient.id}`,
        { headers: { Authorization: 'Bearer ' + auth.token } }
      );
    } catch (err) {
      setError(err);
      setLoading(false);
      return;
    }
    setCheckinChartData(result.data);
    setCheckinList(result.data.checkins);
    setLoading(false);
  };

  const addCheckinToggle = () => {
    setAdd(!add);
    setCheckinDisplay();
  };

  const deleteHandler = (id) => {
    setDeleteId(id);
    setConfirmDelete(true);
  };

  const selectHandler = async (checkin) => {
    setLoading(true);
    let newData = fullUserData;

    try {
      await Axios.patch(
        process.env.REACT_APP_BACKEND_URL + `/users/notifications/${userId}`,
        { checkin: checkin.id },
        { headers: { Authorization: 'Bearer ' + auth.token } }
      );
    } catch (err) {
      setError(err);
      setLoading(false);
      return;
    }

    newData.notifications.checkins = newData.notifications.checkins.filter(
      (item) => item !== checkin.id
    );

    setCheckinDisplay(checkin);
    setFullUserData(newData);
    setQuery('');
    setSearchList();
    setLoading(false);
    setHack(!hack);
  };

  const deleteCheckinHandler = async () => {
    setConfirmDelete(false);

    try {
      await Axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/checkins/${deleteId}`,
        { headers: { Authorization: 'Bearer ' + auth.token } }
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
  };

  return (
    <>
      {/* CONFIRM DELETE MODAL */}
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
      {/* END CONFIRM DELETE MODAL */}

      {/* ERROR MODAL */}
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

      {/* END ERROR MODAL */}

      {loading && <LoadingDots />}
      {loading === false && fullUserData && (
        <>
          <DrawerRight
            show={current === false}
            name="drawer-right-partial-trainee"
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
                fullUserData={fullUserData}
                workouts={fullUserData.workouts}
                //this may be a problem ^
                diets={fullUserData.diets}
                //as well as this
                currentClient={currentClient}
                userId={userId}
                userRole={userRole}
                updateClientData={updateClientData}
                setAdd={setAdd}
              />
            }
          />

          {/* if not checkin display  */}

          {!checkinDisplay && (
            <header className="dash-head">
              <HiOutlineMenuAlt2 className="mobile-menu" onClick={navToggle} />
              {add !== true ? (
                <div className="circle-name-container">
                  <div className="client-page-circle">
                    <img src={currentClient.image} alt="" />
                  </div>
                  <h2>{currentClient.name}</h2>
                </div>
              ) : (
                <h1>New Check-In</h1>
              )}
              {current === true && (
                <RiUserAddLine
                  className="add-user-mobile"
                  onClick={addCheckinToggle}
                />
              )}

              {current === false && (
                <>
                  <div style={{ height: '2rem', width: '3rem' }}></div>
                  <div className="chart-drop-container">
                    <ChartDrop
                      selection={chartSelect}
                      setSelection={setChartSelect}
                    />
                  </div>
                </>
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
                  onClick={() => {
                    setQuery('');
                    setCurrent(false);
                  }}
                >
                  <p>
                    {userRole === 'coach' ? 'Client Analytics' : 'My Analyics'}
                  </p>
                </div>
              </div>
            </header>
          )}

          {checkinDisplay && (
            <header className="dash-head">
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
              {current === false && (
                <div className="chart-drop-container">
                  <ChartDrop
                    selection={chartSelect}
                    setSelection={setChartSelect}
                  />
                </div>
              )}
              <div className="mobile-select1">
                <h3 className="mobile-checkin-date">{`${checkinDisplay.date.monthString} ${checkinDisplay.date.day} ${checkinDisplay.date.year}`}</h3>
              </div>
            </header>
          )}

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

                {query && query !== '' && searchList && searchList.length > 0 && (
                  <div
                    className={
                      checkinDisplay
                        ? 'search-drop-broken-checkin'
                        : 'search-drop-checkin'
                    }
                  >
                    {searchList.map((checkin, index) => (
                      <CheckinButton
                        notifications={fullUserData.notifications.checkins.includes(
                          checkin.id
                        )}
                        checkin={checkin}
                        click={selectHandler}
                        id={checkin.id}
                        name={checkin.name}
                        key={index}
                        image={checkin.images[0] || currentClient.image}
                        date={`${checkin.date.monthString} ${checkin.date.day} ${checkin.date.year}`}
                        firstCheckin={`${checkinList[0].date.monthString} ${checkinList[0].date.day} ${checkinList[0].date.year}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {checkinDisplay && (
              <TotalDisplay
                currentClient={currentClient}
                checkinDisplay={checkinDisplay}
                setCheckinDisplay={setCheckinDisplay}
              />
            )}

            {checkinChartData && (
              <div className="client-list-container">
                <div className="client-desk-menu">
                  {checkMode !== true ? (
                    <div>
                      <div className="circle-name-container">
                        <div className="client-page-circle">
                          <img src={currentClient.image} alt="" />
                        </div>
                        <h2 className="desk-client-name">{`${currentClient.name} Check-Ins`}</h2>
                      </div>
                    </div>
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

                {currentClient && checkMode === true && (
                  <div className="absurd-box">
                    <CheckinMobile
                      fullUserData={fullUserData}
                      workouts={fullUserData.workouts}
                      //this may be a problem ^
                      diets={fullUserData.diets}
                      //as well as this
                      currentClient={currentClient}
                      userId={userId}
                      userRole={userRole}
                      updateClientData={updateClientData}
                      setAdd={setAdd}
                    />
                  </div>
                )}

                {checkMode === false && current === true && !checkinDisplay && (
                  <div className="list-scroll-container-lg">
                    {userRole === 'coach' &&
                      checkinChartData.checkins &&
                      checkinChartData.checkins !== [] &&
                      checkinChartData.checkins
                        .filter(
                          (checkin) => checkin.client === currentClient.id
                        )
                        .map((checkin, index) => (
                          <CheckinButton
                            notifications={fullUserData.notifications.checkins.includes(
                              checkin.id
                            )}
                            checkin={checkin}
                            id={checkin.id}
                            name={checkin.name}
                            key={index}
                            image={checkin.images[0] || currentClient.image}
                            date={`${checkin.date.monthString} ${checkin.date.day} ${checkin.date.year}`}
                            firstCheckin={`${currentClient.dateJoined.monthString} ${currentClient.dateJoined.day} ${currentClient.dateJoined.year}`}
                            deleteMode={deleteMode}
                            click={
                              deleteMode === true
                                ? deleteHandler
                                : selectHandler
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

          <div className="right-sector-desk">
            <div className="right-bar-desk">
              <div className="analytics-deskHead">
                <div className="chart-drop-container">
                  <ChartDrop
                    selection={chartSelect}
                    setSelection={setChartSelect}
                  />
                </div>
                <h3>Client Analytics</h3>
              </div>
              {checkinChartData && (
                <ClientCharts
                  checkinChartData={checkinChartData}
                  chartSelect={chartSelect}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Trainee;

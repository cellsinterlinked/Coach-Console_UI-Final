import React, { useEffect, useState, useContext } from 'react';
import './CoachUniversal.css';
import './CoachWorkouts.css';
import DrawerRight from '../../Nav/DrawerRight';
import DrawerBottom from '../../Nav/DrawerBottom';
import Input from '../../Forms/InputFront';
import Button from '../../Buttons/Button';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { GoSearch } from 'react-icons/go';
import { MdOutlinePostAdd } from 'react-icons/md';

import WorkoutButton from '../../Buttons/WorkoutButton';
import { FaRunning } from 'react-icons/fa';
import { FaDumbbell } from 'react-icons/fa';
import { IoAddSharp } from 'react-icons/io5';
import { IoTrashOutline } from 'react-icons/io5';
import NewWorkout from '../../Forms/NewWorkout';
import { RiUserShared2Line } from 'react-icons/ri';
import Axios from 'axios';
import Modal from '../../Modals/Modal';
import { columns } from '../../../Data/WorkoutColumns';
import { cardioColumns } from '../../../Data/CardioColumns';
import WorkoutTable from '../../Tables/WorkoutTable';
import CardioTable from '../../Tables/CardioTable';
import LoadingDots from '../../Animations/LoadingDots';
import { AuthContext } from '../../../Context/auth-context';

const CoachWorkouts = ({
  navToggle,
  fullUserData,
  userId,
  userRole,
  setFullUserData,
  setHack,
  hack,
}) => {
  const auth = useContext(AuthContext);
  const [workoutNum, setWorkoutNum] = useState(0);
  const [cardioNum, setCardioNum] = useState(0);
  const [cardioDisplay, setCardioDisplay] = useState(false);

  const [newMode, setNewMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const [loadedWorkout, setLoadedWorkout] = useState(fullUserData.workouts[0] || null);
  const [percent, setPercent] = useState(
    fullUserData.workouts.length > 0 ? 100 / fullUserData.workouts[0].weightData.length : 0,
  );
  const [cardioPercent, setCardioPercent] = useState(
    fullUserData.workouts.length > 0 ? 100 / fullUserData.workouts[0].cardioData.length : 0,
  );
  const [error, setError] = useState();
  const [current, setCurrent] = useState(true);
  const [add, setAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [tableData, setTableData] = useState(
    loadedWorkout && loadedWorkout.weightData[workoutNum].data
      ? loadedWorkout.weightData[workoutNum].data
      : null,
  );

  const [cardioData, setCardioData] = useState(
    loadedWorkout && loadedWorkout.cardioData[cardioNum].data
      ? loadedWorkout.cardioData[cardioNum].data
      : null,
  );

  const [share, setShare] = useState(false);

  const [selectedShare, setSelectedShare] = useState();

  const [query, setQuery] = useState('');

  const [searchList, setSearchList] = useState();

  const [workoutList, setWorkoutList] = useState();
  // conditional rendering to require this

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getWorkoutsHandler = async () => {
      let results;
      try {
        results = await Axios.get(process.env.REACT_APP_BACKEND_URL + `/workouts/${userId}`, {
          headers: { Authorization: 'Bearer ' + auth.token },
        });
      } catch (err) {
        setError('Could not fetch workouts');
        setLoading(false);
        return;
      }
      setWorkoutList(results.data.workouts.reverse());
      if (results.data.workouts.length < 1) {
        setAdd(true);
        setNewMode(true);
      }
      setLoading(false);
    };
    getWorkoutsHandler();
  }, [userId, auth.token]);

  useEffect(() => {
    if (loadedWorkout && loadedWorkout.weightData[workoutNum].data) {
      setTableData(loadedWorkout.weightData[workoutNum].data);
    }

    if (loadedWorkout && loadedWorkout.cardioData[cardioNum].data) {
      setCardioData(loadedWorkout.cardioData[cardioNum].data);
    }
  }, [loadedWorkout, workoutNum, cardioNum]);

  useEffect(() => {
    if (loadedWorkout && loadedWorkout.weightData && loadedWorkout.cardioData) {
      setPercent(100 / loadedWorkout.weightData.length);
      setCardioPercent(100 / loadedWorkout.cardioData.length);
    }
  }, [loadedWorkout]);

  useEffect(() => {
    if (workoutList && workoutList.length > 0 && query) {
      setSearchList(
        workoutList.filter((workout) => workout.name.toLowerCase().includes(query.toLowerCase())),
      );
    }
  }, [workoutList, query]);

  const updateWorkoutsHandler = async () => {
    let results;
    try {
      results = await Axios.get(process.env.REACT_APP_BACKEND_URL + `/workouts/${userId}`, {
        headers: { Authorization: 'Bearer ' + auth.token },
      });
    } catch (err) {
      setError('Could not fetch workouts');
      return;
    }
    setWorkoutList(results.data.workouts.reverse());
  };

  const addWorkoutToggle = () => {
    setAdd(!add);
  };

  const workoutDeleteHandler = async () => {
    setDeleteMode(false);
    try {
      await Axios.delete(process.env.REACT_APP_BACKEND_URL + `/workouts/${loadedWorkout.id}`, {
        headers: { Authorization: 'Bearer ' + auth.token },
      });
    } catch (err) {
      setError(err);
      return;
    }
    updateWorkoutsHandler();
    setError('Workout Deleted');
    setLoadedWorkout(workoutList[0]);
  };

  const shareWorkoutHandler = async (client) => {
    setShare(false);
    setSelectedShare();
    setLoading(true);

    try {
      await Axios.patch(
        process.env.REACT_APP_BACKEND_URL + '/workouts/send',
        {
          userId: userId,
          clientId: client.id,
          workoutId: loadedWorkout.id,
        },
        { headers: { Authorization: 'Bearer ' + auth.token } },
      );
    } catch (err) {
      setShare(false);
      setSelectedShare();
      setError('They either already have this workout or something else went wrong!');
      setLoading(false);
      return;
    }
    setLoading(false);
    setError('Successfully shared this workout.');
  };

  const queryHandler = (e) => {
    setQuery(e.target.value);
  };

  const selectHandler = async (workout) => {
    setLoading(true);
    let newData = fullUserData;

    try {
      await Axios.patch(
        process.env.REACT_APP_BACKEND_URL + `/users/notifications/${userId}`,
        { workout: workout.id },
        { headers: { Authorization: 'Bearer ' + auth.token } },
      );
    } catch (err) {
      setError(err);
      setLoading(false);
      return;
    }

    newData.notifications.workouts = newData.notifications.workouts.filter(
      (item) => item !== workout.id,
    );

    setLoadedWorkout(workout);
    setCurrent(true);
    setFullUserData(newData);
    setQuery('');
    setSearchList();
    setLoading(false);
    setHack(!hack);
    return;
  };

  return (
    <>
      {selectedShare && loadedWorkout && (
        <Modal
          show={selectedShare !== null}
          onCancel={() => {
            setSelectedShare();
            setShare(false);
          }}
          children={
            <div className="error-modal-container">
              <h3>{`Send ${loadedWorkout.name} to ${selectedShare.name}? `}</h3>
              <Button
                name="auth-button-primary"
                contents="YES"
                click={() => {
                  shareWorkoutHandler(selectedShare);
                }}
              />
              <Button
                name="auth-button-secondary button-top-margin-gone "
                contents="NO"
                click={() => {
                  setSelectedShare();
                  setShare(false);
                }}
              />
            </div>
          }
        />
      )}
      <Modal
        show={error}
        onCancel={() => setError()}
        children={
          <div className="error-modal-container">
            <h3>{error}</h3>
            <Button name="auth-button-primary" contents="GOT IT!" click={() => setError()} />
          </div>
        }
      />

      <Modal
        show={deleteMode === true}
        onCancel={() => setDeleteMode(false)}
        children={
          <div className="error-modal-container">
            <h3>Are you sure you want to delete this workout permanently?</h3>
            <Button
              name="auth-button-danger"
              contents="YES"
              click={() => {
                workoutDeleteHandler();
              }}
            />
            <Button
              name="auth-button-secondary button-top-margin-gone "
              contents="NO"
              click={() => {
                setDeleteMode(false);
              }}
            />
          </div>
        }
      />

      {workoutList && workoutList.length > 0 ? (
        <DrawerRight
          show={current === false}
          name="drawer-right-partial"
          children={workoutList.map((workout, index) => (
            <WorkoutButton
              workout={workout}
              notifications={fullUserData.notifications.workouts.includes(workout.id)}
              click={selectHandler}
              key={index}
              name={workout.name}
              description={workout.description}
              dateAdded={`${workout.dateAdded.monthString} ${workout.dateAdded.day} ${workout.dateAdded.year}`}
            />
          ))}
        />
      ) : (
        <DrawerRight
          show={current === false}
          name="drawer-right-partial"
          children={
            <h3 className="no-data-title">
              Press add workout button in top right corner to add a new workout...
            </h3>
          }
        />
      )}

      <DrawerBottom
        show={add === true}
        name="drawer-bottom-partial"
        children={
          <NewWorkout
            userId={userId}
            setLoadedWorkout={setLoadedWorkout}
            setParentError={setError}
            setNewMode={setNewMode}
            updateWorkoutsHandler={updateWorkoutsHandler}
          />
        }
      />

      <header className="dash-head">
        <HiOutlineMenuAlt2 className="mobile-menu" onClick={navToggle} />
        {add === false ? <h1>Workouts</h1> : <h1>Create Workout</h1>}
        <MdOutlinePostAdd className="add-user-mobile" onClick={addWorkoutToggle} />
      </header>
      <div className="mobile-select1">
        <div
          className={current ? 'select1 select-green' : 'select1'}
          onClick={() => setCurrent(true)}
        >
          <p>Edit Workout</p>
        </div>
        <div
          className={current ? 'select2' : 'select2 select-green'}
          onClick={() => setCurrent(false)}
        >
          <p>Existing Workouts</p>
        </div>
      </div>

      <div className="desk-center">
        {loadedWorkout && (
          <div className="mobile-head-option-container onlySmall">
            {userRole === 'coach' && (
              <div
                className={
                  share === true ? 'share-drop-container' : 'share-drop-container share-null'
                }
              >
                {fullUserData.clients.map((client, index) => (
                  <div
                    onClick={() => setSelectedShare(client)}
                    key={index}
                    className={
                      share === true ? 'share-user-select' : 'share-user-select share-null'
                    }
                  >
                    <div className="share-user-image">
                      <img src={client.image} alt="" />
                    </div>
                    <p>{client.name}</p>
                  </div>
                ))}
              </div>
            )}

            {userRole === 'client' && (
              <div
                className={
                  share === true ? 'share-drop-container' : 'share-drop-container share-null'
                }
              >
                <div
                  onClick={() => setSelectedShare(fullUserData.coach)}
                  className={share === true ? 'share-user-select' : 'share-user-select share-null'}
                >
                  <div className="share-user-image">
                    <img src={fullUserData.coach.image} alt="" />
                  </div>
                  <p>{fullUserData.coach.name}</p>
                </div>
              </div>
            )}

            {loadedWorkout && <h3 className="mobile-options-title">{loadedWorkout.name}</h3>}

            <FaRunning
              onClick={() => setCardioDisplay(true)}
              className={
                cardioDisplay === true ? 'cardio-desk-icon icon-active' : 'cardio-desk-icon'
              }
            />
            <FaDumbbell
              onClick={() => setCardioDisplay(false)}
              className={
                cardioDisplay === false ? 'weight-desk-icon icon-active' : 'weight-desk-icon'
              }
            />

            <IoTrashOutline
              className="desk-trash-icon"
              onClick={() => setDeleteMode(!deleteMode)}
            />

            <RiUserShared2Line className="share-desk-icon" onClick={() => setShare(!share)} />
          </div>
        )}

        <div className="dash-search-container onlyLarge">
          <Input
            name="search-input"
            parentClass="parent-auto"
            placeholder={'Search Workouts'}
            onChange={queryHandler}
            value={query}
            clear={() => setQuery('')}
            clearable={true}
          ></Input>
          <Button name="search-button" contents={<GoSearch className="magnify" />} />
          {query && query !== '' && searchList && searchList.length > 0 && (
            <div className="search-drop-broken">
              {searchList.map((workout, index) => (
                <WorkoutButton
                  workout={workout}
                  notifications={fullUserData.notifications.workouts.includes(workout.id)}
                  click={selectHandler}
                  key={index}
                  name={workout.name}
                  description={workout.description}
                  dateAdded={`${workout.dateAdded.monthString} ${workout.dateAdded.day} ${workout.dateAdded.year}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="client-list-container">
          <div className="client-desk-menu">
            {/* <div
              className={
                share === true
                  ? 'share-drop-container'
                  : 'share-drop-container share-null'
              }
            >
              {fullUserData.clients.map((client, index) => (
                <div
                  onClick={() => setSelectedShare(client)}
                  key={index}
                  className={
                    share === true
                      ? 'share-user-select'
                      : 'share-user-select share-null'
                  }
                >
                  <div className="share-user-image">
                    <img src={client.image} alt="" />
                  </div>
                  <p>{client.name}</p>
                </div>
              ))}
            </div> */}

            {userRole === 'coach' && (
              <div
                className={
                  share === true ? 'share-drop-container' : 'share-drop-container share-null'
                }
              >
                {fullUserData.clients.map((client, index) => (
                  <div
                    onClick={() => setSelectedShare(client)}
                    key={index}
                    className={
                      share === true ? 'share-user-select' : 'share-user-select share-null'
                    }
                  >
                    <div className="share-user-image">
                      <img src={client.image} alt="" />
                    </div>
                    <p>{client.name}</p>
                  </div>
                ))}
              </div>
            )}

            {userRole === 'client' && (
              <div
                className={
                  share === true ? 'share-drop-container' : 'share-drop-container share-null'
                }
              >
                <div
                  onClick={() => setSelectedShare(fullUserData.coach)}
                  className={share === true ? 'share-user-select' : 'share-user-select share-null'}
                >
                  <div className="share-user-image">
                    <img src={fullUserData.coach.image} alt="" />
                  </div>
                  <p>{fullUserData.coach.name}</p>
                </div>
              </div>
            )}

            {newMode === false && loadedWorkout && (
              <FaRunning
                onClick={() => setCardioDisplay(true)}
                className={
                  cardioDisplay === true ? 'cardio-desk-icon icon-active' : 'cardio-desk-icon'
                }
              />
            )}
            {newMode === false && loadedWorkout && (
              <FaDumbbell
                onClick={() => setCardioDisplay(false)}
                className={
                  cardioDisplay === false ? 'weight-desk-icon icon-active' : 'weight-desk-icon'
                }
              />
            )}

            {newMode === false && loadedWorkout ? (
              <h3>{loadedWorkout.name}</h3>
            ) : (
              <h3>Create New Workout</h3>
            )}
            <IoAddSharp className="add-desk-icon" onClick={() => setNewMode(!newMode)} />

            {newMode === false && loadedWorkout && (
              <IoTrashOutline
                className="desk-trash-icon"
                onClick={() => setDeleteMode(!deleteMode)}
              />
            )}
            {newMode === false && loadedWorkout && (
              <RiUserShared2Line className="share-desk-icon" onClick={() => setShare(!share)} />
            )}
          </div>

          {newMode === false && loadedWorkout && loadedWorkout.weightData && workoutList && (
            <div className="absurd-box absurd-workout">
              {cardioDisplay === false && (
                <div className="day-changer-container">
                  <div className="day-title-container">
                    {loadedWorkout.weightData.map((w, index) => (
                      <div
                        key={index}
                        style={{
                          color: workoutNum === index ? '#00ded1' : '#a5a5a5',
                          width: `${percent}%`,
                        }}
                        onClick={() => setWorkoutNum(index)}
                        className="day-title-box"
                      >{`D${index + 1}`}</div>
                    ))}
                  </div>
                  <div className="day-change-line">
                    <div
                      className="moving-line"
                      style={{
                        width: `${percent}%`,
                        left: `${percent * workoutNum}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {cardioDisplay === true && (
                <div className="day-changer-container">
                  <div className="day-title-container">
                    {loadedWorkout.cardioData.map((w, index) => (
                      <div
                        key={index}
                        style={{
                          color: cardioNum === index ? '#00ded1' : '#a5a5a5',
                          width: `${cardioPercent}%`,
                        }}
                        onClick={() => setCardioNum(index)}
                        className="day-title-box"
                      >{`D${index + 1}`}</div>
                    ))}
                  </div>
                  <div className="day-change-line">
                    <div
                      className="moving-line"
                      style={{
                        width: `${cardioPercent}%`,
                        left: `${cardioPercent * cardioNum}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}

               {loading && <LoadingDots />}

              {cardioDisplay === false && (loadedWorkout === null) && !loading && (
                <div>Your workout Will be displayed here.</div>
              )}

              {cardioDisplay === false && loadedWorkout && (
                <div className="list-scroll-container">
                  <WorkoutTable
                    tableData={tableData}
                    loadedWorkout={loadedWorkout}
                    workoutNum={workoutNum}
                    userId={userId}
                    setTableData={setTableData}
                    setError={setError}
                    columns={columns}
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}
                  />
                </div>
              )}

              {cardioDisplay === true && loadedWorkout && (
                <div className="list-scroll-container">
                  <CardioTable
                    cardioData={cardioData}
                    loadedWorkout={loadedWorkout}
                    cardioNum={cardioNum}
                    userId={userId}
                    setCardioData={setCardioData}
                    setError={setError}
                    cardioColumns={cardioColumns}
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}
                  />
                </div>
              )}
            </div>
          )}

          {newMode === true && (
            <div className-="absurd-box">
              <div className="desktop-only">
                <NewWorkout
                  userId={userId}
                  setLoadedWorkout={setLoadedWorkout}
                  setParentError={setError}
                  setNewMode={setNewMode}
                  updateWorkoutsHandler={updateWorkoutsHandler}
                />
              </div>
            </div>
          )}
          {/* {newMode === false && !loadedWorkout && (
            <div className="absurd-box">
            <h3>Click the add workout button in the top right corner to get started</h3>
            </div>
          )} */}
        </div>
      </div>

      <div className="right-sector-desk">
        <div className="right-bar-desk">
          <div className="analytics-deskHead">
            <h3>Workout Library</h3>
          </div>
          <div className="list-scroll-container">
            {workoutList && workoutList.length > 0 && (
              <>
                {workoutList.map((workout, index) => (
                  <WorkoutButton
                    workout={workout}
                    notifications={fullUserData.notifications.workouts.includes(workout.id)}
                    click={selectHandler}
                    key={index}
                    name={workout.name}
                    description={workout.description}
                    dateAdded={`${workout.dateAdded.monthString} ${workout.dateAdded.day} ${workout.dateAdded.year}`}
                  />
                ))}
              </>
            )}
          </div>

          {workoutList && workoutList.length < 1 && <div></div>}
        </div>
      </div>
    </>
  );
};

export default CoachWorkouts;

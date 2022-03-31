import React, { useEffect, useState } from 'react';
import './CoachUniversal.css';
import './CoachWorkouts.css';
import DrawerRight from '../../Nav/DrawerRight';
import DrawerBottom from '../../Nav/DrawerBottom';
import Input from '../../Forms/InputFront';
import Button from '../../Buttons/Button';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { GoSearch } from 'react-icons/go';
import { MdOutlinePostAdd } from 'react-icons/md';
import MaterialTable from 'material-table';
import { alpha } from '@material-ui/core/styles';
import WorkoutButton from '../../Buttons/WorkoutButton';
import { FaRunning } from 'react-icons/fa';
import { FaDumbbell } from 'react-icons/fa';
import { IoAddSharp, IoTrash } from 'react-icons/io5';
import { IoTrashOutline } from 'react-icons/io5';
import NewWorkout from '../../Forms/NewWorkout';
import { RiUserShared2Line } from 'react-icons/ri';
import Axios from 'axios';
import Modal from '../../Modals/Modal';
import { columns } from '../../../Data/WorkoutColumns';
import { cardioColumns } from '../../../Data/CardioColumns';
import WorkoutTable from '../../Tables/WorkoutTable';
import CardioTable from '../../Tables/CardioTable';

const CoachWorkouts = ({ navToggle, fullUserData, userId }) => {
  const [workoutNum, setWorkoutNum] = useState(0);
  const [cardioDisplay, setCardioDisplay] = useState(false);

  const [newMode, setNewMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const [loadedWorkout, setLoadedWorkout] = useState(fullUserData.workouts[0]);
  const [percent, setPercent] = useState(
    100 / fullUserData.workouts[0].weightData.length
  );
  const [error, setError] = useState();
  const [current, setCurrent] = useState(true);
  const [add, setAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [tableData, setTableData] = useState(
    loadedWorkout.weightData[workoutNum].data
  );

  const [cardioData, setCardioData] = useState([loadedWorkout.cardioData.data]);

  const [share, setShare] = useState(false);

  const [selectedShare, setSelectedShare] = useState()

  console.log('am i rerendering?');

  useEffect(() => {
    console.log('im firing');
    setTableData(loadedWorkout.weightData[workoutNum].data);
    setCardioData(loadedWorkout.cardioData.data);
  }, [loadedWorkout, workoutNum]);

  useEffect(() => {
    console.log('second firing');
    setPercent(100 / loadedWorkout.weightData.length);
  }, [loadedWorkout]);

  const addWorkoutToggle = () => {
    setAdd(!add);
  };

  const workoutDeleteHandler = async () => {
    let results;
    setDeleteMode(false);
    console.log(loadedWorkout.id);
    try {
      results = await Axios.delete(
        `http://localhost:5000/api/workouts/${loadedWorkout.id}`
      );
    } catch (err) {
      setError(err);
      return;
    }
    alert('Workout Deleted');
  };

  const shareWorkoutHandler = async(client) => {
    setShare(false)

    let results
    try {
      results = await Axios.patch('http://localhost:5000/api/workouts/send', {userId: userId, clientId:client.id, workoutId: loadedWorkout.id })
    } catch (err) {
      setShare(false)
      setSelectedShare()
      setError("They either already have this workout or something else went wrong!")


      return
    }
    setSelectedShare()
    setShare(false)
    alert("success!")
  }

  return (
    <>

{selectedShare && <Modal
        show={selectedShare}
        onCancel={() => {
          setSelectedShare()
          setShare(false)
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
                setShare(false)
              }}
            />
          </div>
        }
      />}
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

      <DrawerRight
        show={current === false}
        name="drawer-right-partial"
        children={fullUserData.workouts.map((workout, index) => (
          <WorkoutButton
            click={() => {
              setLoadedWorkout(workout);
              setCurrent(true);
            }}
            key={index}
            name={workout.name}
            description={workout.description}
            dateAdded={`${workout.dateAdded.monthString} ${workout.dateAdded.day} ${workout.dateAdded.year}`}
          />
        ))}
      />

      <DrawerBottom
        show={add === true}
        name="drawer-bottom-partial"
        children={<NewWorkout userId={userId} />}
      />

      <header className="dash-head">
        <HiOutlineMenuAlt2 className="mobile-menu" onClick={navToggle} />
        {add === false ? <h1>Workouts</h1> : <h1>Create Workout</h1>}
        <MdOutlinePostAdd
          className="add-user-mobile"
          onClick={addWorkoutToggle}
        />
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
        <div className="mobile-head-option-container onlySmall">
        <div
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
            </div>
          {loadedWorkout && (
            <h3 className="mobile-options-title">{loadedWorkout.name}</h3>
          )}

          <FaRunning
            onClick={() => setCardioDisplay(true)}
            className={
              cardioDisplay === true
                ? 'cardio-desk-icon icon-active'
                : 'cardio-desk-icon'
            }
          />
          <FaDumbbell
            onClick={() => setCardioDisplay(false)}
            className={
              cardioDisplay === false
                ? 'weight-desk-icon icon-active'
                : 'weight-desk-icon'
            }
          />

          <IoTrashOutline
            className="desk-trash-icon"
            onClick={() => setDeleteMode(!deleteMode)}
          />

          <RiUserShared2Line
          className="share-desk-icon"
          onClick={() => setShare(!share)}
          />

        </div>

        <div className="dash-search-container onlyLarge">
          <Input name="search-input" placeholder={'Search Workouts'} />
          <Button
            name="search-button"
            contents={<GoSearch className="magnify" />}
          />
        </div>

        <div className="client-list-container">
          <div className="client-desk-menu">
            <div
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
            </div>

            <FaRunning
              onClick={() => setCardioDisplay(true)}
              className={
                cardioDisplay === true
                  ? 'cardio-desk-icon icon-active'
                  : 'cardio-desk-icon'
              }
            />
            <FaDumbbell
              onClick={() => setCardioDisplay(false)}
              className={
                cardioDisplay === false
                  ? 'weight-desk-icon icon-active'
                  : 'weight-desk-icon'
              }
            />

            {newMode === false ? (
              <h3>{loadedWorkout.name}</h3>
            ) : (
              <h3>Create New Workout</h3>
            )}
            <IoAddSharp
              className="add-desk-icon"
              onClick={() => setNewMode(!newMode)}
            />

            <IoTrashOutline
              className="desk-trash-icon"
              onClick={() => setDeleteMode(!deleteMode)}
            />
            {newMode === false && (
              <RiUserShared2Line
                className="share-desk-icon"
                onClick={() => setShare(!share)}
              />
            )}
          </div>

          {newMode === false && (
            <div className="absurd-box">
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

              {cardioDisplay === false ? (
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
              ) : (
                <CardioTable
                  cardioData={cardioData}
                  loadedWorkout={loadedWorkout}
                  workoutNum={workoutNum}
                  userId={userId}
                  setCardioData={setCardioData}
                  setError={setError}
                  cardioColumns={cardioColumns}
                  selectedRow={selectedRow}
                  setSelectedRow={setSelectedRow}
                />
              )}
            </div>
          )}

          {newMode === true && (
            <div className-="absurd-box">
              <NewWorkout userId={userId} />
            </div>
          )}
        </div>
      </div>

      <div className="right-sector-desk">
        <div className="right-bar-desk">
          <div className="analytics-deskHead">
            <h3>Workout Library</h3>
          </div>
          {fullUserData.workouts.map((workout, index) => (
            <WorkoutButton
              click={() => setLoadedWorkout(workout)}
              key={index}
              name={workout.name}
              description={workout.description}
              dateAdded={`${workout.dateAdded.monthString} ${workout.dateAdded.day} ${workout.dateAdded.year}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CoachWorkouts;

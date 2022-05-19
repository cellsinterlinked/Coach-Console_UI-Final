import React, { useState, useContext } from 'react';
import Input from '../Forms/InputFront';
import './CheckinMobile.css';
import { FiChevronDown } from 'react-icons/fi';
import Dropdown from '../DropDowns/Dropdown';
import ImageUpload from './ImageUpload';
import WorkoutButton from '../Buttons/WorkoutButton';
import DietButton from '../Buttons/DietButton';
import Button from '../Buttons/Button';
import Axios from 'axios';
import Modal from '../Modals/Modal';
import LoadingDots from '../Animations/LoadingDots';
import { AuthContext } from '../../Context/auth-context';

const CheckinMobile = ({
  workouts,
  diets,
  currentClient,
  userId,
  updateClientData,
  setCheckMode,
  userRole,
  fullUserData,
}) => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState('');
  const [location, setLocation] = useState();
  const [bfState, setBfState] = useState(false);
  const [measureState, setMeasureState] = useState(false);
  const [notesState, setNotesState] = useState(false);
  const [picState, setPicState] = useState(false);
  const [weightState, setWeightState] = useState(false);

  const [workoutState, setWorkoutState] = useState({ name: 'none' });
  const [dietState, setDietState] = useState({ name: 'none' });
  const [imageArray, setImageArray] = useState([]);

  const [bodyFat, setBodyFat] = useState({
    chest: '',
    axilla: '',
    tricep: '',
    subscapular: '',
    abdominal: '',
    suprailiac: '',
    thigh: '',
    valid: false,
  });
  const [measurements, setMeasurements] = useState({
    neck: '',
    bicep: '',
    forearm: '',
    chest: '',
    waist: '',
    hips: '',
    thigh: '',
    calf: '',
    valid: false,
  });
  const [sleep, setSleep] = useState({
    mon: '',
    tue: '',
    wed: '',
    thu: '',
    fri: '',
    sat: '',
    sun: '',
    valid: false,
  });
  const [workoutQual, setWorkoutQual] = useState({ valid: false });
  const [notes, setNotes] = useState('');
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(false);

  const sendCheckin = async (data) => {
    try {
      await Axios.post(process.env.REACT_APP_BACKEND_URL + '/checkins/', data, {
        headers: { Authorization: 'Bearer ' + auth.token },
      });
    } catch (err) {
      setError(`Couldnt post the checkin ${err}`);
      return;
    }
    setError('Successfully added check-in!');
    updateClientData();
    setCheckMode(false);
    setLoading(false);
  };

  const inputValidate = (obj, location) => {
    let reg = /([0-9])/g;
    let arr = Object.values(obj);
    var matches = arr.some((e) => reg.test(e));
    if (arr.indexOf('') === -1) {
      return true;
    } else if (arr.indexOf('') > -1 && matches === true) {
      setLoading(false);
      setLocation(location);
      setError(`Please fill out all ${location} criteria or none.`);
      return 'error';
    } else {
      return false;
    }
  };

  const submitCheckinHandler = async () => {
    setLoading(true);

    let bodyFatVal = inputValidate(bodyFat, 'bodyfat');
    let measurementVal = inputValidate(measurements, 'Measurements');
    let workoutVal = inputValidate(workoutQual, 'workout');
    let sleepVal = inputValidate(sleep, 'sleep');

    if ((bodyFatVal || measurementVal || workoutVal || sleepVal) === 'error') {
      return;
    }

    let qualityArr = [];
    Object.values(workoutQual).forEach((item) => {
      if (item !== false) {
        qualityArr.push(parseInt(item));
      }
    });

    let coach;

    if (userRole === 'coach') {
      coach = userId;
    }

    if (userRole === 'client') {
      coach = fullUserData.user.coach[0];
    }

    let data = {
      role: userRole,
      coachId: coach,
      clientId: currentClient.id,
      weight: parseInt(weight),
      images: imageArray,
    };

    if (bodyFatVal === true) {
      data = {
        ...data,
        bfChest: parseInt(bodyFat.chest),
        bfAxilla: parseInt(bodyFat.axilla),
        bfTricep: parseInt(bodyFat.tricep),
        bfSubscapular: parseInt(bodyFat.subscapular),
        bfAbdominal: parseInt(bodyFat.abdominal),
        bfSuprailiac: parseInt(bodyFat.suprailiac),
        bfThigh: parseInt(bodyFat.thigh),
      };
    }

    if (measurementVal === true) {
      data = {
        ...data,
        neck: parseInt(measurements.neck),
        bicep: parseInt(measurements.bicep),
        forearm: parseInt(measurements.forearm),
        chest: parseInt(measurements.chest),
        waist: parseInt(measurements.waist),
        hips: parseInt(measurements.hips),
        thigh: parseInt(measurements.thigh),
        calf: parseInt(measurements.calf),
      };
    }

    if (sleepVal === true) {
      data = {
        ...data,
        monSleep: parseInt(sleep.mon),
        tueSleep: parseInt(sleep.tue),
        wedSleep: parseInt(sleep.wed),
        thuSleep: parseInt(sleep.thu),
        friSleep: parseInt(sleep.fri),
        satSleep: parseInt(sleep.sat),
        sunSleep: parseInt(sleep.sun),
      };
    }

    if (workoutVal === true) {
      if (qualityArr.length > 0) {
        data = { ...data, workoutQuality: qualityArr };
      }
    }
    if (notes !== '') {
      data = { ...data, notes: notes };
    }
    if (workoutState.name !== 'none') {
      data = { ...data, workoutId: workoutState.id };
    }
    if (dietState.name !== 'none') {
      data = { ...data, dietId: dietState.id };
    }

    setTimeout(function () {
      sendCheckin(data);
    }, 4000);
  };

  return (
    <div className="checkin-mobile-wrapper">
      {loading && <LoadingDots />}
      <Modal
        show={error}
        onCancel={() => setError('')}
        children={
          <div className="error-modal-container">
            <h3>{error}</h3>
            <Button name="auth-button-primary" contents="GOT IT!" click={() => setError('')} />
          </div>
        }
      />
      <div className="check-section-mobile-wrap">
        <header
          onClick={() => setWeightState(!weightState)}
          className={
            weightState === true
              ? 'bf-mobile-header center header-active'
              : 'bf-mobile-header center'
          }
        >
          <FiChevronDown
            className={
              weightState === true ? 'checkin-mobile-expand upside-down' : 'checkin-mobile-expand'
            }
            onClick={() => setWeightState(!weightState)}
          />
          <h3>Weight</h3>
        </header>
        <div className={weightState === true ? 'input-expand' : 'input-expand input-close'}>
          <Input
            type="number"
            name="check-input-sm"
            placeholder="Weight(lbs)..."
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
      </div>

      <div className="check-section-mobile-wrap">
        <header
          onClick={() => setBfState(!bfState)}
          className={
            bfState === true ? 'bf-mobile-header center header-active' : 'bf-mobile-header center'
          }
        >
          <FiChevronDown
            className={
              bfState === true ? 'checkin-mobile-expand upside-down' : 'checkin-mobile-expand'
            }
            onClick={() => setBfState(!bfState)}
          />
          <h3>Body Fat Measurements</h3>
        </header>
        <div className={bfState === true ? 'input-expand' : 'input-expand input-close'}>
          <Input
            parentClass="parent-auto"
            name={
              location === 'bodyfat' && bodyFat.chest === ''
                ? 'check-input-sm-danger'
                : 'check-input-sm'
            }
            type="number"
            placeholder="Chest"
            value={bodyFat.chest}
            onChange={(e) => setBodyFat({ ...bodyFat, chest: e.target.value })}
          />
          <Input
            parentClass="parent-auto"
            name={
              location === 'bodyfat' && bodyFat.axilla === ''
                ? 'check-input-sm-danger'
                : 'check-input-sm'
            }
            type="number"
            placeholder="Axilla"
            value={bodyFat.axilla}
            onChange={(e) => setBodyFat({ ...bodyFat, axilla: e.target.value })}
          />
          <Input
            parentClass="parent-auto"
            name={
              location === 'bodyfat' && bodyFat.tricep === ''
                ? 'check-input-sm-danger'
                : 'check-input-sm'
            }
            type="number"
            placeholder="Tricep"
            value={bodyFat.tricep}
            onChange={(e) => setBodyFat({ ...bodyFat, tricep: e.target.value })}
          />
          <Input
            parentClass="parent-auto"
            name={
              location === 'bodyfat' && bodyFat.subscapular === ''
                ? 'check-input-sm-danger'
                : 'check-input-sm'
            }
            type="number"
            placeholder="Subscapular"
            value={bodyFat.subscapular}
            onChange={(e) => setBodyFat({ ...bodyFat, subscapular: e.target.value })}
          />
          <Input
            parentClass="parent-auto"
            name={
              location === 'bodyfat' && bodyFat.abdominal === ''
                ? 'check-input-sm-danger'
                : 'check-input-sm'
            }
            type="number"
            placeholder="Abdominal"
            value={bodyFat.abdominal}
            onChange={(e) => setBodyFat({ ...bodyFat, abdominal: e.target.value })}
          />
          <Input
            parentClass="parent-auto"
            name={
              location === 'bodyfat' && bodyFat.suprailiac === ''
                ? 'check-input-sm-danger'
                : 'check-input-sm'
            }
            type="number"
            placeholder="Suprailiac"
            value={bodyFat.suprailiac}
            onChange={(e) => setBodyFat({ ...bodyFat, suprailiac: e.target.value })}
          />
          <Input
            parentClass="parent-auto"
            name={
              location === 'bodyfat' && bodyFat.thigh === ''
                ? 'check-input-sm-danger'
                : 'check-input-sm'
            }
            type="number"
            placeholder="Thigh"
            value={bodyFat.thigh}
            onChange={(e) => setBodyFat({ ...bodyFat, thigh: e.target.value })}
          />
        </div>
      </div>

      <div>
        <header
          onClick={() => setPicState(!picState)}
          className={
            picState === true ? 'bf-mobile-header center header-active' : 'bf-mobile-header center'
          }
        >
          <h3>Progress Pictures</h3>
          <FiChevronDown
            className={
              picState === true ? 'checkin-mobile-expand upside-down' : 'checkin-mobile-expand'
            }
            onClick={() => setPicState(!picState)}
          />
        </header>
        <div
          className={picState === true ? 'mobile-image-input' : 'mobile-image-input input-close'}
        >
          <ImageUpload imageArray={imageArray} setImageArray={setImageArray} maxImage={6} />
        </div>
      </div>

      <div>
        <header
          onClick={() => setMeasureState(!measureState)}
          className={
            measureState === true
              ? 'bf-mobile-header center header-active'
              : 'bf-mobile-header center'
          }
        >
          <h3>Measurements</h3>
          <FiChevronDown
            className={
              measureState === true ? 'checkin-mobile-expand upside-down' : 'checkin-mobile-expand'
            }
            onClick={() => setMeasureState(!measureState)}
          />
        </header>
        <div className={measureState === true ? 'input-expand' : 'input-expand input-close'}>
          <Input
            parentClass="parent-auto"
            name={
              location === 'measurements' && measurements.neck === ''
                ? 'check-input-sm-danger'
                : 'check-input-sm'
            }
            type="number"
            placeholder="Neck"
            value={measurements.neck}
            onChange={(e) => setMeasurements({ ...measurements, neck: e.target.value })}
          />
          <Input
            parentClass="parent-auto"
            name={
              location === 'measurements' && measurements.bicep === ''
                ? 'check-input-sm-danger'
                : 'check-input-sm'
            }
            type="number"
            placeholder="Bicep"
            value={measurements.bicep}
            onChange={(e) => setMeasurements({ ...measurements, bicep: e.target.value })}
          />
          <Input
            parentClass="parent-auto"
            name={
              location === 'measurements' && measurements.forearm === ''
                ? 'check-input-sm-danger'
                : 'check-input-sm'
            }
            type="number"
            placeholder="Forearm"
            value={measurements.forearm}
            onChange={(e) => setMeasurements({ ...measurements, forearm: e.target.value })}
          />
          <Input
            parentClass="parent-auto"
            name={
              location === 'measurements' && measurements.chest === ''
                ? 'check-input-sm-danger'
                : 'check-input-sm'
            }
            type="number"
            placeholder="Chest"
            value={measurements.chest}
            onChange={(e) => setMeasurements({ ...measurements, chest: e.target.value })}
          />
          <Input
            parentClass="parent-auto"
            name={
              location === 'measurements' && measurements.waist === ''
                ? 'check-input-sm-danger'
                : 'check-input-sm'
            }
            type="number"
            placeholder="Waist"
            value={measurements.waist}
            onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
          />
          <Input
            parentClass="parent-auto"
            name={
              location === 'measurements' && measurements.hips === ''
                ? 'check-input-sm-danger'
                : 'check-input-sm'
            }
            type="number"
            placeholder="Hips"
            value={measurements.hips}
            onChange={(e) => setMeasurements({ ...measurements, hips: e.target.value })}
          />
          <Input
            parentClass="parent-auto"
            name={
              location === 'measurements' && measurements.thigh === ''
                ? 'check-input-sm-danger'
                : 'check-input-sm'
            }
            type="number"
            placeholder="Thigh"
            value={measurements.thigh}
            onChange={(e) => setMeasurements({ ...measurements, thigh: e.target.value })}
          />
          <Input
            parentClass="parent-auto"
            name={
              location === 'measurements' && measurements.calf === ''
                ? 'check-input-sm-danger'
                : 'check-input-sm'
            }
            type="number"
            placeholder="Calf"
            value={measurements.calf}
            onChange={(e) => setMeasurements({ ...measurements, calf: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Dropdown list={diets} selection={dietState} setSelection={setDietState} title="Diet" />
        {dietState.name !== 'none' && (
          <DietButton
            name={dietState.name}
            dateAdded={`${dietState.dateAdded.monthString} ${dietState.dateAdded.day} ${dietState.dateAdded.year} `}
            description={dietState.description}
          />
        )}
      </div>

      <div>
        <Dropdown
          list={workouts}
          selection={workoutState}
          setSelection={setWorkoutState}
          title="Workout"
        />
        {workoutState.name !== 'none' && (
          <WorkoutButton
            name={workoutState.name}
            dateAdded={`${workoutState.dateAdded.monthString} ${workoutState.dateAdded.day} ${workoutState.dateAdded.year} `}
            description={workoutState.description}
          />
        )}
      </div>

      <div>
        <header
          className={
            notesState === true
              ? 'bf-mobile-header center header-active'
              : 'bf-mobile-header center'
          }
          onClick={() => setNotesState(!notesState)}
        >
          <h3>Notes</h3>
          <FiChevronDown
            className={
              notesState === true ? 'checkin-mobile-expand upside-down' : 'checkin-mobile-expand'
            }
            onClick={() => setNotesState(!notesState)}
          />
        </header>
        <div className={notesState === true ? 'input-expand tall' : 'input-expand input-close'}>
          <p className="check-section-head">Hrs of Sleep</p>
          <Input
            parentClass="parent-auto"
            type="number"
            name={
              location === 'sleep' && sleep.mon === ''
                ? 'check-input-tny-danger'
                : 'check-input-tny'
            }
            placeholder="Mon"
            value={sleep.mon}
            onChange={(e) => setSleep({ ...sleep, mon: e.target.value })}
          />
          <Input
            parentClass="parent-auto"
            type="number"
            name={
              location === 'sleep' && sleep.tue === ''
                ? 'check-input-tny-danger'
                : 'check-input-tny'
            }
            placeholder="Tue"
            value={sleep.tue}
            onChange={(e) => setSleep({ ...sleep, tue: e.target.value })}
          />
          <Input
            parentClass="parent-auto"
            type="number"
            name={
              location === 'sleep' && sleep.wed === ''
                ? 'check-input-tny-danger'
                : 'check-input-tny'
            }
            placeholder="Wed"
            value={sleep.wed}
            onChange={(e) => setSleep({ ...sleep, wed: e.target.value })}
          />
          <Input
            parentClass="parent-auto"
            type="number"
            name={
              location === 'sleep' && sleep.thu === ''
                ? 'check-input-tny-danger'
                : 'check-input-tny'
            }
            placeholder="Thu"
            value={sleep.thu}
            onChange={(e) => setSleep({ ...sleep, thu: e.target.value })}
          />
          <Input
            parentClass="parent-auto"
            type="number"
            name={
              location === 'sleep' && sleep.fri === ''
                ? 'check-input-tny-danger'
                : 'check-input-tny'
            }
            placeholder="Fri"
            value={sleep.fri}
            onChange={(e) => setSleep({ ...sleep, fri: e.target.value })}
          />
          <Input
            parentClass="parent-auto"
            type="number"
            name={
              location === 'sleep' && sleep.sat === ''
                ? 'check-input-tny-danger'
                : 'check-input-tny'
            }
            placeholder="Sat"
            value={sleep.sat}
            onChange={(e) => setSleep({ ...sleep, sat: e.target.value })}
          />
          <Input
            parentClass="parent-auto"
            type="number"
            name={
              location === 'sleep' && sleep.sun === ''
                ? 'check-input-tny-danger'
                : 'check-input-tny'
            }
            placeholder="Sun"
            value={sleep.sun}
            onChange={(e) => setSleep({ ...sleep, sun: e.target.value })}
          />
          <p className="check-section-head">Workout Quality 1-5 (1 = Bad - 5 = Great)</p>
          {workoutState.name !== 'none' &&
            workoutState.weightData.map((workout, index) => (
              <Input
                parentClass="parent-auto"
                key={index}
                type="number"
                name={
                  location === 'workout' && !workoutQual[index + 1]
                    ? 'check-input-tny-danger'
                    : 'check-input-tny'
                }
                placeholder={`Workout ${index + 1}`}
                value={workoutQual[index + 1]}
                onChange={(e) =>
                  setWorkoutQual({
                    ...workoutQual,
                    [index + 1]: e.target.value,
                  })
                }
              />
            ))}
          <p className="check-section-head">Notes:</p>
          <Input
            name="check-input-area"
            placeholder="Write Notes Here..."
            area="true"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>
      <div className="center" style={{ width: '100%' }}>
        <Button
          name="auth-button-primary center-margin"
          click={submitCheckinHandler}
          contents={'SUBMIT'}
        />
      </div>
    </div>
  );
};

export default CheckinMobile;

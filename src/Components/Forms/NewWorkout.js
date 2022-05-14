import React, { useState, useContext } from 'react';
import Input from './InputFront';
import Axios from 'axios';
import './NewWorkout.css';
import Button from '../Buttons/Button';
import Modal from '../Modals/Modal';
import { AuthContext } from '../../Context/auth-context';

const NewWorkout = ({
  userId,
  setLoadedWorkout,
  setNewMode,
  setParentError,
}) => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState('');

  const [name, setName] = useState('');

  const [description, setDescription] = useState('');

  const [dayNum, setDayNum] = useState(1);

  const [cardioNum, setCardioNum] = useState(0);

  const createWorkoutHandler = async () => {
    let weightData = [];
    let cardioData = [];

    if (description !== '' && name !== '') {
      for (let i = 1; i <= cardioNum; i++) {
        cardioData.push({
          name: `Day ${i}`,
          data: [
            {
              type: 'Run',
              time: 0,
              cals: 0,
            },
          ],
        });
      }

      for (let i = 1; i <= dayNum; i++) {
        weightData.push({
          name: `Day ${i}`,
          data: [
            {
              exercise: 'Exercise 1',
              sets: 1,
              reps: '8-12',
              weight: '1-3 RIR',
            },
            { sets: 'Set 1', reps: 12, weight: 100 },
          ],
        });
      }

      let results;
      try {
        results = await Axios.post(
          'http://localhost:5000/api/workouts/',
          {
            userId: userId,
            name: name,
            description: description,
            weightData: weightData,
            cardioData: cardioData,
          },
          { headers: { Authorization: 'Bearer ' + auth.token } }
        );
      } catch (err) {
        setError('Couldnt submit new workout');
        return;
      }
      setLoadedWorkout(results.data.workout);
      setNewMode(false);
      setParentError('Successfully Started New Workout!');

      // parent components resends request for workouts and rerenders.
    } else {
      setError('Please fill out all criteria before submitting!');
      return;
    }
  };

  return (
    <div className="new-workout-wrapper">
      <Modal
        show={error}
        onCancel={() => setError('')}
        children={
          <div className="error-modal-container">
            <h3>{error}</h3>
            <Button
              name="auth-button-primary"
              contents="GOT IT!"
              click={() => setError('')}
            />
          </div>
        }
      />
      <h3>
        To create a new workout first decide on a name, description and how many
        days the split will be.
      </h3>
      <Input
        placeholder="Workout Name..."
        onChange={(e) => setName(e.target.value)}
        value={name}
        name="front-input"
      />
      <p>WORKOUT SPLIT #DAYS</p>

      <div className="day-box-selector">
        <div
          className={
            dayNum === 1 ? 'day-box-button day-selected' : 'day-box-button'
          }
          onClick={() => setDayNum(1)}
        >
          1 DAY
        </div>
        <div
          className={
            dayNum === 2 ? 'day-box-button day-selected' : 'day-box-button'
          }
          onClick={() => setDayNum(2)}
        >
          2 DAY
        </div>
        <div
          className={
            dayNum === 3 ? 'day-box-button day-selected' : 'day-box-button'
          }
          onClick={() => setDayNum(3)}
        >
          3 DAY
        </div>
        <div
          className={
            dayNum === 4 ? 'day-box-button day-selected' : 'day-box-button'
          }
          onClick={() => setDayNum(4)}
        >
          4 DAY
        </div>
        <div
          className={
            dayNum === 5 ? 'day-box-button day-selected' : 'day-box-button'
          }
          onClick={() => setDayNum(5)}
        >
          5 DAY
        </div>
        <div
          className={
            dayNum === 6 ? 'day-box-button day-selected' : 'day-box-button'
          }
          onClick={() => setDayNum(6)}
        >
          6 DAY
        </div>
        <div
          className={
            dayNum === 7 ? 'day-box-button day-selected' : 'day-box-button'
          }
          onClick={() => setDayNum(7)}
        >
          7 DAY
        </div>
      </div>
      <p>DESCRIPTION:</p>
      <Input
        area={true}
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder={'Write a description of your new workout...'}
        name="desc-area"
      />

      <p>CARDIO #DAYS</p>

      <div className="day-box-selector">
        <div
          className={
            cardioNum === 1 ? 'day-box-button day-selected' : 'day-box-button'
          }
          onClick={() => setCardioNum(1)}
        >
          1 DAY
        </div>
        <div
          className={
            cardioNum === 2 ? 'day-box-button day-selected' : 'day-box-button'
          }
          onClick={() => setCardioNum(2)}
        >
          2 DAY
        </div>
        <div
          className={
            cardioNum === 3 ? 'day-box-button day-selected' : 'day-box-button'
          }
          onClick={() => setCardioNum(3)}
        >
          3 DAY
        </div>
        <div
          className={
            cardioNum === 4 ? 'day-box-button day-selected' : 'day-box-button'
          }
          onClick={() => setCardioNum(4)}
        >
          4 DAY
        </div>
        <div
          className={
            cardioNum === 5 ? 'day-box-button day-selected' : 'day-box-button'
          }
          onClick={() => setCardioNum(5)}
        >
          5 DAY
        </div>
        <div
          className={
            cardioNum === 6 ? 'day-box-button day-selected' : 'day-box-button'
          }
          onClick={() => setCardioNum(6)}
        >
          6 DAY
        </div>
        <div
          className={
            cardioNum === 7 ? 'day-box-button day-selected' : 'day-box-button'
          }
          onClick={() => setCardioNum(7)}
        >
          7 DAY
        </div>
      </div>

      <Button
        click={createWorkoutHandler}
        name="auth-button-primary button-margin-sm button-bottom-margin"
        contents="CREATE WORKOUT"
      />
    </div>
  );
};

export default NewWorkout;

import React, { useState } from 'react';
import Input from './InputFront';
import Axios from 'axios';
import './NewWorkout.css';
import Button from '../Buttons/Button';
import Modal from '../Modals/Modal';

const NewDiet = ({ userId }) => {
  const [error, setError] = useState('');

  const [name, setName] = useState('');

  const [description, setDescription] = useState('');

  const [dayNum, setDayNum] = useState(1);



  const createDietHandler = async () => {
    console.log("im firing")
    let dietData = [];
    let type;
    if(dayNum === 1) {
      type = "single"

    } else {
      type = "multi"
    }

    if (description !== '' && name !== '') {
      for (let i = 1; i <= dayNum; i++) {
        dietData.push({
          name: `Day ${i}`,
          data: [{food: "Meal 1"}, {food:"example food", cals: 170, pro: 10 , fat: 10, carb: 10}]
        });
      }
      console.log({
        userId: userId,
        name: name,
        description: description,
        type: type,
        food: dietData
      })
      let results;
      try {
        results = await Axios.post('http://localhost:5000/api/diets/', {
          userId: userId,
          name: name,
          description: description,
          type: type,
          food: dietData
        });
      } catch (err) {
        console.log('issue creating diet')
        setError('Couldnt submit new workout');
        return;
      }
      console.log('sent')
      alert('success!');

      // parent components resends request for workouts and rerenders.
    } else {
      setError('Please fill out all criteria before submitting!');
      console.log("please fill out all criteria")
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
              contents={"GOT IT!"}
              click={() => setError('')}
            />
          </div>
        }
      />
      <h3>
        To create a new diet first decide on a name, description and if the diet
        will vary by day or if each day the diet will be the same
      </h3>
      <Input
        placeholder="Diet Name..."
        onChange={(e) => setName(e.target.value)}
        value={name}
        name="front-input"
      />
      <p>Each day the same, or varied throughout the week?</p>

      <div className="day-box-selector">
        <div
          className={
            dayNum === 1 ? 'day-box-button day-selected' : 'day-box-button'
          }
          onClick={() => setDayNum(1)}
        >
          STATIC
        </div>
        <div
          className={
            dayNum === 7 ? 'day-box-button day-selected' : 'day-box-button'
          }
          onClick={() => setDayNum(7)}
        >
          VARIED
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

      <Button
        click={createDietHandler}
        name="auth-button-primary button-margin-sm button-bottom-margin"
        contents="CREATE DIET"
      />
    </div>
  );
};

export default NewDiet;

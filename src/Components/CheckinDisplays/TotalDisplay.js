import React from 'react';
import MeasurementDisplay from './MeasurementDisplay';
import NutritionDisplay from './NutritionDisplay';
import BodyFatDisplay from './BodyFatDisplay';
import PictureDisplay from './PictureDisplay';
import SleepDisplay from './SleepDisplay';
import WorkoutDisplay from './WorkoutDisplay';
import '../Pages/CoachPages/Clients.css';
import '../Pages/Dashboard.css';
import '../Pages/CoachPages/CoachUniversal.css';
import Button from '../Buttons/Button';
import { HiChevronLeft } from 'react-icons/hi';

const TotalDisplay = ({ currentClient, checkinDisplay, setCheckinDisplay }) => {
  return (
    <div className="client-list-container flex-center container-flex">
      <div className="client-desk-menu">
        <div className="checkin-desk-header">
          <Button
            click={() => setCheckinDisplay()}
            contents={
              <div className="button-inner-container">
                <HiChevronLeft />
                <p>BACK</p>
              </div>
            }
            name={'back-to-checkins'}
          />
          <div className="check-header-text">
            <h1>{currentClient.name}</h1>
            <h3>
              {`${checkinDisplay.date.monthString} ${checkinDisplay.date.day} ${checkinDisplay.date.year}`}
            </h3>
          </div>
          <div className="mid-convo-head-image">
            <img src={currentClient.image} alt="" />
          </div>
        </div>
      </div>

      <div className="absurd-box absurd-limit">
        {checkinDisplay.images && checkinDisplay.images.length !== 0 && (
          <PictureDisplay checkin={checkinDisplay} />
        )}
        {checkinDisplay.bfTotal && <BodyFatDisplay checkin={checkinDisplay} />}
        {checkinDisplay.weight && (
          <div className="weight-display-box">
            <p>
              Weight: <strong>{checkinDisplay.weight}</strong>
            </p>
          </div>
        )}
        {checkinDisplay.measurementTotal && <MeasurementDisplay checkin={checkinDisplay} />}
        {checkinDisplay.totalCals && <NutritionDisplay checkin={checkinDisplay} />}
        {checkinDisplay.sleepAvg && <SleepDisplay checkin={checkinDisplay} />}
        {checkinDisplay.avgWorkoutQuality && <WorkoutDisplay checkin={checkinDisplay} />}
      </div>
    </div>
  );
};

export default TotalDisplay;

import React from 'react'
import MeasurementDisplay from './MeasurementDisplay';
import NutritionDisplay from './NutritionDisplay';
import BodyFatDisplay from './BodyFatDisplay';
import PictureDisplay from './PictureDisplay';
import SleepDisplay from './SleepDisplay';
import WorkoutDisplay from './WorkoutDisplay';
import '../Pages/CoachPages/Clients.css';
import '../Pages/Dashboard.css';
import '../Pages/CoachPages/CoachUniversal.css';

const TotalDisplay = ({currentClient, checkinDisplay}) => {
  return (
    <div className="client-list-container">
                <div className="client-desk-menu">
                  <h3>{currentClient.name}</h3>
                  <h3
                    style={{ marginLeft: '2rem', fontSize: '.9rem' }}
                  >{`${checkinDisplay.date.monthString} ${checkinDisplay.date.day} ${checkinDisplay.date.year}`}</h3>
                </div>
                <div className="absurd-box">
                  {checkinDisplay.images &&
                    checkinDisplay.images.length !== 0 && (
                      <PictureDisplay checkin={checkinDisplay} />
                    )}
                  {checkinDisplay.bfTotal && (
                    <BodyFatDisplay checkin={checkinDisplay} />
                  )}
                  {checkinDisplay.weight && (
                    <div className="weight-display-box">
                      <p>
                        Weight: <strong>{checkinDisplay.weight}</strong>
                      </p>
                    </div>
                  )}
                  {checkinDisplay.measurementTotal && (
                    <MeasurementDisplay checkin={checkinDisplay} />
                  )}
                  {checkinDisplay.totalCals && (
                    <NutritionDisplay checkin={checkinDisplay} />
                  )}
                  {checkinDisplay.sleepAvg && (
                    <SleepDisplay checkin={checkinDisplay} />
                  )}
                  {checkinDisplay.avgWorkoutQuality && (
                    <WorkoutDisplay checkin={checkinDisplay} />
                  )}
                </div>
              </div>
  )
}

export default TotalDisplay;
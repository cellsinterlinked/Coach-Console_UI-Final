import React from 'react';
import './CheckinDisplays.css';

const WorkoutDisplay = ({ checkin }) => {
  return (
    <div className="display_container">
      <div className="display_head">Workouts</div>
      <div className="display_data_container">
        <div className="data_column">
          <p>
            Total Sets : <strong>{checkin.totalSets}</strong>
          </p>
          <p>
            Cardio Time : <strong>{checkin.cardioTime}</strong>
          </p>
          <p>
            Cardio Cals : <strong>{checkin.cardioCals}</strong>
          </p>
          <p>
            Avg Quality : <strong>{checkin.avgWorkoutQuality}</strong>
          </p>
        </div>

        <div className="data_column">
          {checkin.workoutQuality.map((num, index) => (
            <p>
              {`Day ${index + 1} Quality : `}
              <strong>{num}</strong>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutDisplay;

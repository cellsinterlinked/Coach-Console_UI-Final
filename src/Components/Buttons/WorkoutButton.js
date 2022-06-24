import React from 'react';
import './WorkoutButton.css';


const WorkoutButton = ({ image, name, dateAdded, description, click, notifications, workout }) => {
  const setterFunction = () => {
    click(workout);
  };
  return (
    <button className="wo-button-wrapper" onClick={setterFunction}>
      {notifications && (
        <div className="new-notification-message">
          <p>NEW WORKOUT</p>
        </div>
      )}
      <div className="wo-btn-img">
        {/* <IoDocumentTextSharp  className="wo-icon"/> */}
        <img src={'https://res.cloudinary.com/dbnapmpvm/image/upload/v1656088944/coachProd/workoutphoto_lbahhs.jpg'} alt="" />
      </div>
      <div className="wo-btn-info">
        <div className="wo-btn-info-top">
          <h3>{name}</h3>
          <p>{description.slice(0, 45)}...</p>
        </div>

        <div className="wo-btn-info-bottom">
          <p>Created:</p>
          <p className="grn-btn-text">{dateAdded}</p>
        </div>
      </div>
    </button>
  );
};

export default WorkoutButton;

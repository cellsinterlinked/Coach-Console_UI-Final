import React from 'react';
import './DietButton.css';



const DietButton = ({ image, name, dateAdded, description, click, notifications, diet }) => {
  const setterFunction = () => {
    click(diet);
  };
  return (
    <button className="diet-button-wrapper " onClick={setterFunction}>
      {notifications && (
        <div className="new-notification-message">
          <p>NEW DIET</p>
        </div>
      )}
      <div className="diet-btn-img">
        {/* <IoDocumentTextSharp  className="diet-icon"/> */}
        <img src={'https://res.cloudinary.com/dbnapmpvm/image/upload/v1656088944/coachProd/dietphoto_rypam4.jpg'} alt="" />
      </div>
      <div className="diet-btn-info">
        <div className="diet-btn-info-top">
          <h3>{name}</h3>
          <p>{description.slice(0, 35)}...</p>
        </div>

        <div className="diet-btn-info-bottom">
          <p>Created:</p>
          <p className="grn-btn-text">{dateAdded}</p>
        </div>
      </div>
    </button>
  );
};

export default DietButton;

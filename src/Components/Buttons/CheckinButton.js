import React from 'react';
import './CheckinButton.css';
import { TiDeleteOutline } from 'react-icons/ti';

const CheckinButton = ({
  image,
  name,
  firstCheckin,
  date,
  deleteMode,
  deleteClick,
  selectClick,
  id,
  click,
  checkin,
  notifications,
}) => {
  const setterFunction = () => {
    click(checkin);
  };

  return (
    <button className="check-button-wrapper " onClick={setterFunction}>
      {notifications && (
        <div className="new-notification-message">
          <p>NEW CHECK-IN</p>
        </div>
      )}

      <div
        className={
          deleteMode === true ? 'delete-button-cover' : 'delete-button-cover cover-transparent'
        }
      >
        <TiDeleteOutline className="deleteTrash" />
      </div>
      <div className="check-btn-img">
        <img src={image} alt="" />
      </div>
      <div className="check-btn-info">
        <div className="check-btn-info-top">
          <h3>{name}</h3>
          <p>Client Since {firstCheckin}</p>
        </div>

        <div className="check-btn-info-bottom">
          <p>Check-In Date</p>
          <p className="grn-btn-text">{date}</p>
        </div>
      </div>
    </button>
  );
};

export default CheckinButton;

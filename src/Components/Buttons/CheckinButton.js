import React from 'react'
import './CheckinButton.css';

const CheckinButton = ({image, name, firstCheckin, date}) => {
  return(
    <button className="check-button-wrapper ">
      <div className="check-btn-img">
        <img src={image} alt=""/>
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
  )
}

export default CheckinButton;
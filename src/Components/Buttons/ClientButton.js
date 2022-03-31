import React from 'react'
import './ClientButton.css';

const ClientButton = ({image, name, firstCheckin, lastCheckin, click}) => {
  return(
    <button className="client-button-wrapper " onClick={click}>
      <div className="cl-btn-img">
        <img src={image} alt=""/>
      </div>
      <div className="cl-btn-info">
        <div className="cl-btn-info-top">
          <h3>{name}</h3>
          {firstCheckin && <p>Client Since {firstCheckin}</p>}
        </div>

        {lastCheckin && <div className="cl-btn-info-bottom">
         <p>Last Checkin</p>
         <p className="grn-btn-text">{lastCheckin}</p>

        </div>}

      </div>
    </button>
  )
}

export default ClientButton;
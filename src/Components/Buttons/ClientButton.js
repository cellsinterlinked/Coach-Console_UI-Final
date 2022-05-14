import React from 'react'
import './ClientButton.css';

const ClientButton = ({image, name, firstCheckin, lastCheckin, click, notifications, clientNotification}) => {

  return(
    <button className="client-button-wrapper " onClick={click}>

      {notifications && !clientNotification &&
      <div className="new-notification-message">
        <p>NEW CHECK-IN</p>
      </div>
      }

{clientNotification &&
      <div className="new-notification-message">
        <p>NEW CLIENT</p>
      </div>
      }

      <div className="cl-btn-img">
        <img src={image} alt=""/>
      </div>
      <div className="cl-btn-info">
        <div className="cl-btn-info-top">
          <h3>{name}</h3>
          {firstCheckin && <p>Client Since {firstCheckin}</p>}
        </div>

        {lastCheckin !== null && <div className="cl-btn-info-bottom">
         <p>Total Checkins</p>
         <p className="grn-btn-text">{lastCheckin}</p>

        </div>}

      </div>
    </button>
  )
}

export default ClientButton;
import React from 'react'
import './CheckinDisplays.css'

const MeasurementDisplay = ({checkin}) => {
  return (
    <div className="display_container">
      <div className="display_head">Measurements</div>
      <div className="display_data_container">
        <div className="data_column">

        <p>Total : <strong>{checkin.measurementTotal}</strong></p>
        <p>Neck : <strong>{checkin.neck}</strong></p>
        <p>Bicep : <strong>{checkin.bicep}</strong></p>
        <p>Forearm : <strong>{checkin.forearm}</strong></p>
        <p>Chest : <strong>{checkin.chest}</strong></p>
        </div>

        <div className="data_column">
        <p>Waist : <strong>{checkin.waist}</strong></p>
        <p>Hips : <strong>{checkin.hips}</strong></p>
        <p>Thigh : <strong>{checkin.thigh}</strong></p>
        <p>Calf : <strong>{checkin.calf}</strong></p>


        </div>


      </div>

    </div>
  )
}

export default MeasurementDisplay;
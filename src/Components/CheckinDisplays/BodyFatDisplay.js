import React from 'react'
import './CheckinDisplays.css'

const BodyFatDisplay = ({checkin}) => {
  return (
    <div className="display_container">
      <div className="display_head">BodyFat</div>
      <div className="display_data_container">
        <div className="data_column">

        <p>BodyFat% : <strong>{checkin.bfTotal.toFixed(2)}</strong></p>
        <p>Fat Mass : <strong>{checkin.fatMass.toFixed(2)}</strong></p>
        <p>Lean Mass : <strong>{checkin.leanBodyMass.toFixed(2)}</strong></p>
        <p>Chest : <strong>{checkin.bfChest}</strong></p>
        <p>Axilla : <strong>{checkin.bfAxilla}</strong></p>
        </div>

        <div className="data_column">
        <p>Tricep : <strong>{checkin.bfTricep}</strong></p>
        <p>Subscapular : <strong>{checkin.bfSubscapular}</strong></p>
        <p>Abdominal : <strong>{checkin.bfAbdominal}</strong></p>
        <p>Suprailiac : <strong>{checkin.bfSuprailiac}</strong></p>
        <p>Thigh : <strong>{checkin.bfThigh}</strong></p>

        </div>


      </div>

    </div>
  )
}

export default BodyFatDisplay
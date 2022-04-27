import React from 'react'
import './CheckinDisplays.css'

const SleepDisplay = ({checkin}) => {
  return (
    <div className="display_container">
      <div className="display_head">Sleep (Hours)</div>
      <div className="display_data_container">
        <div className="data_column">

        <p>Total Sleep: <strong>{checkin.sleepTotal}</strong></p>
        <p>Avg Sleep : <strong>{checkin.sleepAvg.toFixed(2)}</strong></p>
        <p>Monday : <strong>{checkin.monSleep}</strong></p>
        <p>Tuesday : <strong>{checkin.tueSleep}</strong></p>
        <p>Wednesday : <strong>{checkin.wedSleep}</strong></p>
        </div>

        <div className="data_column">
        <p>Thursday : <strong>{checkin.thuSleep}</strong></p>
        <p>Friday : <strong>{checkin.friSleep}</strong></p>
        <p>Saturday : <strong>{checkin.satSleep}</strong></p>
        <p>Sunday: <strong>{checkin.sunSleep}</strong></p>


        </div>


      </div>

    </div>
  )
}

export default SleepDisplay
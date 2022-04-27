import React from 'react'
import './CheckinDisplays.css'

const NutritionDisplay = ({checkin}) => {
  return (
    <div className="display_container">
      <div className="display_head">Nutrition</div>
      <div className="display_data_container">
        <div className="data_column">

        <p>WK Cals : <strong>{checkin.totalCals}</strong></p>
        <p>WK Fats : <strong>{checkin.totalFat}</strong></p>
        </div>

        <div className="data_column">
        <p>WK Carbs : <strong>{checkin.totalCarb}</strong></p>
        <p>WK Protein : <strong>{checkin.totalPro}</strong></p>



        </div>


      </div>

    </div>
  )
}

export default NutritionDisplay
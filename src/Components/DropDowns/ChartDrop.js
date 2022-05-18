import React, {useState} from 'react'
import { FiChevronDown } from 'react-icons/fi';
import './Dropdown.css';
import './ChartDrop.css';

import {BsCheck2} from 'react-icons/bs';

const ChartDrop = ({list, selection, title, setSelection }) => {



  const [expand, setExpand] = useState(false);

  const expandHandler = () => {
    setExpand(!expand)
  }

 return  (
    <div className={expand ? "chart-dropdown-wrapper chart-drop-active-back" : "chart-dropdown-wrapper"}
    // onClick={expandHandler}
    >

      <FiChevronDown className={expand === false? "chart-drop-arrow" : "chart-drop-arrow spun"} onClick={expandHandler}/>



      <div className={expand ? "chart-drop-menu-container" : "chart-drop-menu-container chart-drop-shrink"}>

          <div item={selection.fatMass} className={selection.fatMass === true ? 'chart-selectionButton chart-drop-active' : 'chart-selectionButton'} onClick={() => setSelection({...selection, fatMass: !selection.fatMass })}>
            <div className={selection.fatMass === true ? "chart-selected-border" : "chart-selected-border transborder"}></div>
            <div className={selection.fatMass === true ? "drop-check-wrap visible" : "drop-check-wrap invisible"}>
            <BsCheck2 className={selection.fatMass === true ? "drop-check visible" : "drop-check invisible"}/>
            </div>

            Fat Mass
          </div>

          <div item={selection.bodyFat} className={selection.bodyFat === true ? 'chart-selectionButton chart-drop-active' : 'chart-selectionButton'} onClick={() => setSelection({...selection, bodyFat: !selection.bodyFat })}>
            <div className={selection.bodyFat === true ? "chart-selected-border" : "chart-selected-border transborder"}></div>
            <div className={selection.bodyFat === true ? "drop-check-wrap visible" : "drop-check-wrap invisible"}>
            <BsCheck2 className={selection.bodyFat === true ? "drop-check visible" : "drop-check invisible"}/>
            </div>

            Body Fat
          </div>
          <div item={selection.leanBodyMass} className={selection.leanBodyMass === true ? 'chart-selectionButton chart-drop-active' : 'chart-selectionButton'} onClick={() => setSelection({...selection, leanBodyMass: !selection.leanBodyMass })}>
            <div className={selection.leanBodyMass === true ? "chart-selected-border" : "chart-selected-border transborder"}></div>
            <div className={selection.leanBodyMass === true ? "drop-check-wrap visible" : "drop-check-wrap invisible"}>
            <BsCheck2 className={selection.leanBodyMass === true ? "drop-check visible" : "drop-check invisible"}/>
            </div>

            Lean Mass
          </div>
          <div item={selection.weight} className={selection.weight === true ? 'chart-selectionButton chart-drop-active' : 'chart-selectionButton'} onClick={() => setSelection({...selection, weight: !selection.weight })}>
            <div className={selection.weight === true ? "chart-selected-border" : "chart-selected-border transborder"}></div>
            <div className={selection.weight === true ? "drop-check-wrap visible" : "drop-check-wrap invisible"}>
            <BsCheck2 className={selection.weight === true ? "drop-check visible" : "drop-check invisible"}/>
            </div>

            Weight
          </div>
          <div item={selection.calories} className={selection.calories === true ? 'chart-selectionButton chart-drop-active' : 'chart-selectionButton'} onClick={() => setSelection({...selection, calories: !selection.calories })}>
            <div className={selection.calories === true ? "chart-selected-border" : "chart-selected-border transborder"}></div>
            <div className={selection.calories === true ? "drop-check-wrap visible" : "drop-check-wrap invisible"}>
            <BsCheck2 className={selection.calories === true ? "drop-check visible" : "drop-check invisible"}/>
            </div>

            Calories
          </div>
          <div item={selection.carbs} className={selection.carbs === true ? 'chart-selectionButton chart-drop-active' : 'chart-selectionButton'} onClick={() => setSelection({...selection, carbs: !selection.carbs })}>
            <div className={selection.carbs === true ? "chart-selected-border" : "chart-selected-border transborder"}></div>
            <div className={selection.carbs === true ? "drop-check-wrap visible" : "drop-check-wrap invisible"}>
            <BsCheck2 className={selection.carbs === true ? "drop-check visible" : "drop-check invisible"}/>
            </div>

            Carbs
          </div>
          <div item={selection.fats} className={selection.fats === true ? 'chart-selectionButton chart-drop-active' : 'chart-selectionButton'} onClick={() => setSelection({...selection, fats: !selection.fats })}>
            <div className={selection.fats === true ? "chart-selected-border" : "chart-selected-border transborder"}></div>
            <div className={selection.fats === true ? "drop-check-wrap visible" : "drop-check-wrap invisible"}>
            <BsCheck2 className={selection.fats === true ? "drop-check visible" : "drop-check invisible"}/>
            </div>

            Fats
          </div>
          <div item={selection.protein} className={selection.protein === true ? 'chart-selectionButton chart-drop-active' : 'chart-selectionButton'} onClick={() => setSelection({...selection, protein: !selection.protein })}>
            <div className={selection.protein === true ? "chart-selected-border" : "chart-selected-border transborder"}></div>
            <div className={selection.protein === true ? "drop-check-wrap visible" : "drop-check-wrap invisible"}>
            <BsCheck2 className={selection.protein === true ? "drop-check visible" : "drop-check invisible"}/>
            </div>

            Protein
          </div>
          <div item={selection.workoutQuality} className={selection.workoutQuality === true ? 'chart-selectionButton chart-drop-active' : 'chart-selectionButton'} onClick={() => setSelection({...selection, workoutQuality: !selection.workoutQuality })}>
            <div className={selection.workoutQuality === true ? "chart-selected-border" : "chart-selected-border transborder"}></div>
            <div className={selection.workoutQuality === true ? "drop-check-wrap visible" : "drop-check-wrap invisible"}>
            <BsCheck2 className={selection.workoutQuality === true ? "drop-check visible" : "drop-check invisible"}/>
            </div>

            Lift Quality
          </div>
          <div item={selection.measurements} className={selection.measurements === true ? 'chart-selectionButton chart-drop-active' : 'chart-selectionButton'} onClick={() => setSelection({...selection, measurements: !selection.measurements })}>
            <div className={selection.measurements === true ? "chart-selected-border" : "chart-selected-border transborder"}></div>
            <div className={selection.measurements === true ? "drop-check-wrap visible" : "drop-check-wrap invisible"}>
            <BsCheck2 className={selection.measurements === true ? "drop-check visible" : "drop-check invisible"}/>
            </div>

            Measurements
          </div>
          <div item={selection.volume} className={selection.volume === true ? 'chart-selectionButton chart-drop-active' : 'chart-selectionButton'} onClick={() => setSelection({...selection, volume: !selection.volume })}>
            <div className={selection.volume === true ? "chart-selected-border" : "chart-selected-border transborder"}></div>
            <div className={selection.volume === true ? "drop-check-wrap visible" : "drop-check-wrap invisible"}>
            <BsCheck2 className={selection.volume === true ? "drop-check visible" : "drop-check invisible"}/>
            </div>

            Volume
          </div>
          <div item={selection.cardioTime} className={selection.cardioTime === true ? 'chart-selectionButton chart-drop-active' : 'chart-selectionButton'} onClick={() => setSelection({...selection, cardioTime: !selection.cardioTime })}>
            <div className={selection.cardioTime === true ? "chart-selected-border" : "chart-selected-border transborder"}></div>
            <div className={selection.cardioTime === true ? "drop-check-wrap visible" : "drop-check-wrap invisible"}>
            <BsCheck2 className={selection.cardioTime === true ? "drop-check visible" : "drop-check invisible"}/>
            </div>

            Cardio Duration
          </div>
          <div item={selection.cardioCals} className={selection.cardioCals === true ? 'chart-selectionButton chart-drop-active' : 'chart-selectionButton'} onClick={() => setSelection({...selection, cardioCals: !selection.cardioCals })}>
            <div className={selection.cardioCals === true ? "chart-selected-border" : "chart-selected-border transborder"}></div>
            <div className={selection.cardioCals === true ? "drop-check-wrap visible" : "drop-check-wrap invisible"}>
            <BsCheck2 className={selection.cardioCals === true ? "drop-check visible" : "drop-check invisible"}/>
            </div>

           Cardio Cals
          </div>
          <div item={selection.sleepTime} className={selection.sleepTime === true ? 'chart-selectionButton chart-drop-active' : 'chart-selectionButton'} onClick={() => setSelection({...selection, sleepTime: !selection.sleepTime })}>
            <div className={selection.sleepTime === true ? "chart-selected-border" : "chart-selected-border transborder"}></div>
            <div className={selection.sleepTime === true ? "drop-check-wrap visible" : "drop-check-wrap invisible"}>
            <BsCheck2 className={selection.sleepTime === true ? "drop-check visible" : "drop-check invisible"}/>
            </div>

            Sleep Time
          </div>

      </div>
    </div>
 )
}

export default ChartDrop;
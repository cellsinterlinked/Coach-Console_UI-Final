import React from 'react'
import './DietButton.css';
import {IoDocumentTextSharp} from 'react-icons/io5'
import dietPhoto from '../../Resources/dietphoto.jpeg'


const DietButton = ({image, name, dateAdded, description, click}) => {
  return(
    <button className="diet-button-wrapper "
    onClick={click}
    >
      <div className="diet-btn-img">
        {/* <IoDocumentTextSharp  className="diet-icon"/> */}
        <img src={dietPhoto} alt="" />
      </div>
      <div className="diet-btn-info">
        <div className="diet-btn-info-top">
          <h3>{name}</h3>
          <p>{description.slice(0,35)}...</p>
        </div>

        <div className="diet-btn-info-bottom">
         <p>Created:</p>
         <p className="grn-btn-text">{dateAdded}</p>

        </div>

      </div>
    </button>
  )
}

export default DietButton;
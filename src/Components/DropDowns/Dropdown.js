import React, {useState} from 'react'
import { FiChevronDown } from 'react-icons/fi';
import './Dropdown.css';
import {IoDocumentAttachSharp} from 'react-icons/io5';

const Dropdown = ({list, selection, title, setSelection }) => {

  const [expand, setExpand] = useState(false);

  const expandHandler = () => {
    setExpand(!expand)
  }

 return  (
    <div className={expand ? "dropdown-wrapper drop-active-back" : "dropdown-wrapper"}
    onClick={expandHandler}
    >
      {`Pick A ${title}`}

      <FiChevronDown className="drop-arrow"/>



      <div className={expand ? "drop-menu-container" : "drop-menu-container drop-shrink"}>
        {list.map((item, index) =>
          <div key={index} className={item === selection ? 'selectionButton drop-active' : 'selectionButton'} onClick={() => setSelection(item)}>
            <div className={item === selection ? "selected-border" : "selected-border transborder"}></div>
            <IoDocumentAttachSharp className="drop-icon1"/>
            {item.name}
            <p className="button-date">{item.date}</p>
          </div>
        )}
      </div>
    </div>
 )
}

export default Dropdown;


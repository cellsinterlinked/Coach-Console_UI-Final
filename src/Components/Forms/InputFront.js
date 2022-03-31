import React from 'react';
import './InputFront.css';

const InputFront = ({placeholder, onChange, value, name, area, type}) => {
  return (
      <>
      {area ? <textarea
       placeholder={placeholder}
       onChange={onChange}
       value={value}
       className={name}

      /> :
      <input
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={name}
        type={type}
      />

      }
      </>






  )
}

export default InputFront;
import React from 'react';
import './InputFront.css';
import { MdCancel } from 'react-icons/md';

const InputFront = ({
  placeholder,
  onChange,
  value,
  name,
  area,
  type,
  clearable,
  clear,
  parentClass,
}) => {
  const clearHandler = () => {
    clear();
  };

  return (
    <div className={`input-parent ${parentClass}`}>
      {area ? (
        <textarea placeholder={placeholder} onChange={onChange} value={value} className={name} />
      ) : (
        <input
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={name}
          type={type}
        ></input>
      )}
      {clearable && value.length > 0 && (
        <MdCancel className="search-clear" onClick={clearHandler} />
      )}
    </div>
  );
};

export default InputFront;

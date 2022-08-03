import React from 'react';
import './InputFront.css';
import { MdCancel } from 'react-icons/md';
import {FaEyeSlash} from 'react-icons/fa';
import {FaEye} from 'react-icons/fa';

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
  icon,
  iconStatus,
  iconToggle
}) => {
  const clearHandler = () => {
    clear();
  };

  return (
    <div className={`input-parent ${parentClass}`}>
      {icon === "true" && iconStatus === true && <FaEye className="eye-visible" onClick={iconToggle} /> }
      {icon === "true" && iconStatus === false && <FaEyeSlash className="eye-hidden" onClick={iconToggle} />}
      {area ? (
        <textarea placeholder={placeholder} onChange={onChange} value={value} className={name} />
      ) : (
        <>
        <input
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={name}
          type={type}
        ></input>
        </>
      )}
      {clearable && value.length > 0 && (
        <MdCancel className="search-clear" onClick={clearHandler} />
      )}
    </div>
  );
};

export default InputFront;

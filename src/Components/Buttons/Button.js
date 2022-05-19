import React from 'react';
import './Button.css';

const Button = ({ contents, click, name, disabled }) => {
  return (
    <button onClick={click} className={name} disabled={disabled}>
      {contents}
    </button>
  );
};

export default Button;

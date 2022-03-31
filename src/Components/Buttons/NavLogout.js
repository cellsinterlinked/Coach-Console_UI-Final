import React from 'react';
import './NavButton.css';
import { NavLink } from 'react-router-dom';

const NavLogout = ({ name, icon, logoutFunction }) => {
  return (
    <div
      className='nav-button-wrapper'

      onClick={() => {
        logoutFunction()

      }}
    >
      <div className="nav-icon-container">{icon}</div>
      <p>{name}</p>
    </div>
  );
};

export default NavLogout;

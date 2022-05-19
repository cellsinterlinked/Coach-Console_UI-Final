import React from 'react';
import './NavButton.css';

const NavLogout = ({ name, icon, logoutFunction }) => {
  return (
    <div
      className="nav-button-wrapper"
      onClick={() => {
        logoutFunction();
      }}
    >
      <div className="nav-icon-container">{icon}</div>
      <p>{name}</p>
    </div>
  );
};

export default NavLogout;

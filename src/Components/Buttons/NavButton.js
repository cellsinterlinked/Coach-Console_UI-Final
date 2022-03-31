import React from 'react';
import './NavButton.css';

const NavButton = ({ name, setPage, icon, page, navToggle, logout }) => {
  return (
    <div
      className={
        page === name ? 'nav-button-wrapper green-nav' : 'nav-button-wrapper'
      }
      onClick={() => {
        setPage(name)
        navToggle()
      }}
    >
      <div className="nav-icon-container">{icon}</div>
      <p>{name}</p>
    </div>
  );
};

export default NavButton;

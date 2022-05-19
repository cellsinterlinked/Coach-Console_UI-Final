import React from 'react';
import './NavButton.css';
import { FaBell } from 'react-icons/fa';

const NavButton = ({ name, setPage, icon, page, navToggle, logout, notifications }) => {
  // const navHandler = () => {
  //   setPage(name)
  //   navToggle()
  // }

  return (
    <div
      className={page === name ? 'nav-button-wrapper green-nav' : 'nav-button-wrapper'}
      onClick={() => {
        setPage(name);
        if (navToggle) {
          navToggle();
        }
      }}
      // onClick= {navHandler}
    >
      <div className="nav-icon-container">{icon}</div>
      <p>{name}</p>
      {notifications > 0 && (
        <div className="nav-notification-wrapper">
          <div className="notification-inner">
            <p className="notification-number">{notifications}</p>
            <FaBell className="notification-bell" />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavButton;

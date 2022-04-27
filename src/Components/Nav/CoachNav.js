import React from 'react';
import './Nav.css';
import NavButton from '../Buttons/NavButton';
import { IoPerson } from 'react-icons/io5';
import { BiMessageDetail } from 'react-icons/bi';
import { IoPersonAdd } from 'react-icons/io5';
import { MdAddchart } from 'react-icons/md';
import { MdOutlineFitnessCenter } from 'react-icons/md';
import { FaNutritionix } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { BiLogOutCircle } from 'react-icons/bi';
import NavLogout from '../Buttons/NavLogout';
import {GiChickenLeg} from 'react-icons/gi';

const CoachNav = ({
  page,
  setPage,
  navToggle,
  fullUserData,
  logoutFunction,
}) => {
  return (
    <div className="nav-wrapper">
      <div className="nav-top">
        <div className="nav-triangle"></div>
      </div>

      <div className="my-info">
        <div className="my-info-image-wrapper">
          {fullUserData && fullUserData.user.image ? (
            <img alt="" src={fullUserData.user.image} />
          ) : (
            <IoPerson
              style={{ height: '100%', width: 'auto', color: 'grey' }}
            />
          )}
        </div>
        {fullUserData && fullUserData.name ? <p>{fullUserData.name}</p> : <p>Add your name in the "Profile" tab.</p>}
      </div>
      <div className="nav-button-container">
        <NavButton
          name="Clients"
          icon={<IoPerson className="nav-btn-icon" />}
          setPage={setPage}
          page={page}
          navToggle={navToggle}
        />
        <div className="nav-split"></div>
        <NavButton
          name="Messages"
          icon={<BiMessageDetail className="nav-btn-icon" />}
          setPage={setPage}
          page={page}
          navToggle={navToggle}
        />
        <div className="nav-split"></div>
        <NavButton
          name="Client"
          icon={<MdAddchart className="nav-btn-icon" />}
          setPage={setPage}
          page={page}
          navToggle={navToggle}
        />
        <div className="nav-split"></div>
        <NavButton
          name="Workouts"
          icon={<MdOutlineFitnessCenter className="nav-btn-icon" />}
          setPage={setPage}
          page={page}
          navToggle={navToggle}
        />
        <div className="nav-split"></div>
        <NavButton
          name="Nutrition"
          icon={<GiChickenLeg className="nav-btn-icon" />}
          setPage={setPage}
          page={page}
          navToggle={navToggle}
        />
        <div className="nav-split"></div>
        <NavButton
          name="Profile"
          icon={<ImProfile className="nav-btn-icon" />}
          setPage={setPage}
          page={page}
          navToggle={navToggle}
        />

        <div className="nav-split"></div>
        <NavLogout
          name="Logout"
          icon={<BiLogOutCircle className="nav-btn-icon" />}
          logoutFunction={logoutFunction}
        />
        <div className="nav-split"></div>
      </div>
    </div>
  );
};

export default CoachNav;

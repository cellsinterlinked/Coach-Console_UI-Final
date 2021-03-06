import React, { useEffect, useState } from 'react';
import './Nav.css';
import NavButton from '../Buttons/NavButton';
import { IoPerson } from 'react-icons/io5';
import { BiMessageDetail } from 'react-icons/bi';
import { MdAddchart } from 'react-icons/md';
import { MdOutlineFitnessCenter } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import { BiLogOutCircle } from 'react-icons/bi';
import NavLogout from '../Buttons/NavLogout';
import { GiChickenLeg } from 'react-icons/gi';

const CoachNav = ({ page, setPage, navToggle, fullUserData, logoutFunction, hack }) => {
  // eslint-disable-next-line no-unused-vars
  const [something, setSomething] = useState(hack);

  useEffect(() => {
    setSomething(hack);
  }, [hack]);

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
            <IoPerson style={{ height: '100%', width: 'auto', color: 'grey' }} />
          )}
        </div>
        {fullUserData && fullUserData.name ? (
          <p>{fullUserData.name}</p>
        ) : (
          <p>Add your name in the "Profile" tab.</p>
        )}
      </div>
      {fullUserData && (
        <div className="nav-button-container">
          <NavButton
            name="Clients"
            icon={<IoPerson className="nav-btn-icon" />}
            setPage={setPage}
            page={page}
            navToggle={navToggle}
            notifications={fullUserData.notifications.clients.length}
          />
          <div className="nav-split"></div>
          <NavButton
            name="Messages"
            icon={<BiMessageDetail className="nav-btn-icon" />}
            setPage={setPage}
            page={page}
            navToggle={navToggle}
            notifications={fullUserData.notifications.messages.length}
          />
          <div className="nav-split"></div>
          {fullUserData.clients.length > 0 && (
            <NavButton
              name="Client"
              icon={<MdAddchart className="nav-btn-icon" />}
              setPage={setPage}
              page={page}
              navToggle={navToggle}
              notifications={fullUserData.notifications.checkins.length}
            />
          )}
          <div className="nav-split"></div>
          <NavButton
            name="Workouts"
            icon={<MdOutlineFitnessCenter className="nav-btn-icon" />}
            setPage={setPage}
            page={page}
            navToggle={navToggle}
            notifications={fullUserData.notifications.workouts.length}
          />
          <div className="nav-split"></div>
          <NavButton
            name="Nutrition"
            icon={<GiChickenLeg className="nav-btn-icon" />}
            setPage={setPage}
            page={page}
            navToggle={navToggle}
            notifications={fullUserData.notifications.diets.length}
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
      )}
    </div>
  );
};

export default CoachNav;

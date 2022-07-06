import React, { useState, useEffect, useContext } from 'react';

import './Dashboard.css';

import DrawerLeft from '../Nav/DrawerLeft';
import Axios from 'axios';
import Backdrop from '../Nav/Backdrop';
import Clients from './CoachPages/Clients';
import CoachWorkouts from './CoachPages/CoachWorkouts';
import CoachNav from '../Nav/CoachNav';
import ClientNav from '../Nav/ClientNav';
import CoachDiets from './CoachPages/CoachDiets';
import Trainee from './CoachPages/Trainee';
import CoachMessages from './CoachPages/CoachMessages';

import CoachProfile from './CoachPages/CoachProfile';
import { AuthContext } from '../../Context/auth-context';
import LoadingDots from '../Animations/LoadingDots';
import Home from './CoachPages/Home';

const Dashboard = ({ userId, userRole }) => {
  const auth = useContext(AuthContext);
  const [page, setPage] = useState(userRole === 'client' ? 'Home' : 'Clients');

  const [currentClient, setCurrentClient] = useState();

  const [navActive, setNavActive] = useState(false);

  const [fullUserData, setFullUserData] = useState();

  const [reset, setReset] = useState(false);

  const [loading, setLoading] = useState(false);

  const [hack, setHack] = useState(true);

  useEffect(() => {
    const getAll = async () => {
      setLoading(true);
      let res;
      try {
        res = await Axios.get(process.env.REACT_APP_BACKEND_URL + `/users/all/${auth.userId}`, {
          headers: { Authorization: 'Bearer ' + auth.token },
        });
      } catch (err) {
        setLoading(false);
        return;
      }
      let newData = res.data;
      if (newData.name === '' || !newData.name) {
        setPage('Profile');
      }
      if (auth.role === 'coach') {
        setCurrentClient(newData.clients[0] || { name: 'none', id: '0' });
        setFullUserData(newData);
        setPage('Clients');
      }
      if (auth.role === 'client') {
        setCurrentClient(newData.user);
        setFullUserData(newData);
        setPage('Home');
      }

      setLoading(false);
    };
    if (auth.role && auth.userId && auth.token) {
      getAll();
    }
  }, [auth.userId, auth.role, auth.token]);

  const updateAll = async () => {
    setLoading(true);
    let results;
    try {
      results = await Axios.get(process.env.REACT_APP_BACKEND_URL + `/users/all/${userId}`, {
        headers: { Authorization: 'Bearer ' + auth.token },
      });
    } catch (err) {
      alert(`couldn't get info from database ${err}`);
      setLoading(false);
      return;
    }
    let newData = results.data;
    setFullUserData(newData);
    if (userRole === 'coach') {
      setCurrentClient(newData.clients[0] || [{ name: 'none', id: '0' }]);
      setLoading(false);
    }
  };

  const clientSelect = async (client) => {
    setLoading(true);
    let newData = fullUserData;

    try {
      await Axios.patch(
        process.env.REACT_APP_BACKEND_URL + `/users/notifications/${userId}`,
        { client: client.id },
        { headers: { Authorization: 'Bearer ' + auth.token } },
      );
    } catch (err) {
      setLoading(false);
      return;
    }

    newData.notifications.clients = newData.notifications.clients.filter(
      (item) => item !== client.id,
    );

    setCurrentClient(client);
    setFullUserData(newData);
    // setQuery('');
    // setSearchList();
    setLoading(false);
    setHack(!hack);
    setPage('Client');
  };

  const navToggle = () => {
    setNavActive(!navActive);
  };

  const logoutFunction = () => {
    auth.logout();
  };



  return (
    <>
      {userRole === 'coach' && (
        <div className="dash-wrapper">
          {fullUserData && (
            <DrawerLeft
              show={navActive === true}
              name="nav-drawer"
              page={page}
              setPage={setPage}
              children={
                <CoachNav
                  page={page}
                  setPage={setPage}
                  navToggle={navToggle}
                  fullUserData={fullUserData}
                  logoutFunction={logoutFunction}
                  hack={hack}
                />
              }
            />
          )}

          {navActive === true && <Backdrop onClick={navToggle} />}

          <div className="menu-desktop">
            <CoachNav
              page={page}
              setPage={setPage}
              fullUserData={fullUserData}
              logoutFunction={logoutFunction}
              hack={hack}
              // navToggle={navToggle}
            />
          </div>

          {loading && <LoadingDots />}

          {!loading && fullUserData && fullUserData.name === '' && (
            <CoachProfile
              userId={userId}
              navToggle={navToggle}
              fullUserData={fullUserData}
              userRole={userRole}
              updateAll={updateAll}
              setPage={setPage}
              setFullUserData={setFullUserData}
            />
          )}

          {!loading && fullUserData && fullUserData.name !== '' && (
            <>
              {page === 'Clients' && (
                <Clients
                  userId={userId}
                  navToggle={navToggle}
                  currentClient={currentClient}
                  setCurrentClient={setCurrentClient}
                  fullUserData={fullUserData}
                  userRole={userRole}
                  clientSelect={clientSelect}
                  setFullUserData={setFullUserData}
                  hack={hack}
                  setHack={setHack}
                />
              )}
              {page === 'Workouts' && (
                <CoachWorkouts
                  userId={userId}
                  navToggle={navToggle}
                  fullUserData={fullUserData}
                  userRole={userRole}
                  setFullUserData={setFullUserData}
                  hack={hack}
                  setHack={setHack}
                />
              )}
              {page === 'Nutrition' && (
                <CoachDiets
                  userId={userId}
                  navToggle={navToggle}
                  fullUserData={fullUserData}
                  userRole={userRole}
                  setFullUserData={setFullUserData}
                  hack={hack}
                  setHack={setHack}
                />
              )}
              {page === 'Client' && (
                <Trainee
                  userId={userId}
                  currentClient={currentClient}
                  setCurrentClient={setCurrentClient}
                  navToggle={navToggle}
                  fullUserData={fullUserData}
                  userRole={userRole}
                  setFullUserData={setFullUserData}
                  hack={hack}
                  setHack={setHack}
                />
              )}
              {page === 'Messages' && (
                <CoachMessages
                  userId={userId}
                  navToggle={navToggle}
                  fullUserData={fullUserData}
                  userRole={userRole}
                  reset={reset}
                  setReset={setReset}
                  setFullUserData={setFullUserData}
                  hack={hack}
                  setHack={setHack}
                />
              )}
              {page === 'Profile' && (
                <CoachProfile
                  userId={userId}
                  navToggle={navToggle}
                  fullUserData={fullUserData}
                  userRole={userRole}
                  updateAll={updateAll}
                  setPage={setPage}
                  setFullUserData={setFullUserData}
                  hack={hack}
                  setHack={setHack}
                />
              )}
            </>
          )}
        </div>
      )}

      {userRole === 'client' && (
        <div className="dash-wrapper">
          {fullUserData && (
            <DrawerLeft
              show={navActive === true}
              name="nav-drawer"
              page={page}
              setPage={setPage}
              children={
                <ClientNav
                  page={page}
                  setPage={setPage}
                  navToggle={navToggle}
                  fullUserData={fullUserData}
                  logoutFunction={logoutFunction}
                  hack={hack}
                  setHack={setHack}
                />
              }
            />
          )}

          {navActive === true && <Backdrop onClick={navToggle} />}

          {fullUserData && (
            <div className="menu-desktop">
              <ClientNav
                page={page}
                setPage={setPage}
                fullUserData={fullUserData}
                logoutFunction={logoutFunction}
                hack={hack}
                setHack={setHack}
                // navToggle={navToggle}
              />
            </div>
          )}

          {loading && <LoadingDots />}

          {!loading && fullUserData && fullUserData.name === '' && (
            <CoachProfile
              userId={userId}
              navToggle={navToggle}
              fullUserData={fullUserData}
              userRole={userRole}
              updateAll={updateAll}
              setPage={setPage}
              setFullUserData={setFullUserData}
              hack={hack}
              setHack={setHack}
            />
          )}

          {!loading && fullUserData && fullUserData.name !== '' && (
            <>
              {page === 'Loading' && <LoadingDots />}

              {page === 'Workouts' && (
                <CoachWorkouts
                  userId={userId}
                  navToggle={navToggle}
                  fullUserData={fullUserData}
                  userRole={userRole}
                  setFullUserData={setFullUserData}
                  hack={hack}
                  setHack={setHack}
                />
              )}
              {page === 'Nutrition' && (
                <CoachDiets
                  userId={userId}
                  navToggle={navToggle}
                  fullUserData={fullUserData}
                  userRole={userRole}
                  setFullUserData={setFullUserData}
                  hack={hack}
                  setHack={setHack}
                />
              )}
              {page === 'Home' && (
                <Home
                  userId={userId}
                  currentClient={currentClient}
                  setCurrentClient={setCurrentClient}
                  navToggle={navToggle}
                  fullUserData2={fullUserData}
                  userRole={userRole}
                  setFullUserData2={setFullUserData}
                  hack={hack}
                  setHack={setHack}
                />
              )}
              {page === 'Messages' && (
                <CoachMessages
                  userId={userId}
                  navToggle={navToggle}
                  fullUserData={fullUserData}
                  userRole={userRole}
                  reset={reset}
                  setReset={setReset}
                  setFullUserData={setFullUserData}
                  hack={hack}
                  setHack={setHack}
                />
              )}
              {page === 'Profile' && (
                <CoachProfile
                  userId={userId}
                  navToggle={navToggle}
                  fullUserData={fullUserData}
                  setFullUserData={setFullUserData}
                  userRole={userRole}
                  updateAll={updateAll}
                  setPage={setPage}
                  hack={hack}
                  setHack={setHack}
                  currentClient={currentClient}
                />
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;

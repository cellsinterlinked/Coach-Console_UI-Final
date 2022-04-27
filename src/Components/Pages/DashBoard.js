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
import Testing from './CoachPages/Testing';
import CoachProfile from './CoachPages/CoachProfile';
import {AuthContext} from '../../Context/auth-context';
import LoadingDots from '../Animations/LoadingDots';
import Home from './CoachPages/Home';


const Dashboard = () => {



  const userId = '6261a0509dbe2e934b33ccf5'
  const userRole = 'client'

  // const auth = useContext(AuthContext)
  // const userId = auth.userId
  // const userRole = auth.role.toLowerCase()



  const [page, setPage] = useState(userRole === 'client' ? 'Home' : 'Clients');

  // const [page, setPage] = useState('Loading');

  const [currentClient, setCurrentClient] = useState();

  const [navActive, setNavActive] = useState(false);

  const [error, setError] = useState('');

  const [fullUserData, setFullUserData] = useState();

  const [reset, setReset] = useState(false);

  const [loading, setLoading] = useState(true)


  useEffect(() => {

  })


  useEffect(() => {
    const getAll = async () => {
      setLoading(true)
      let results;
      try {
        results = await Axios.get(
          `http://localhost:5000/api/users/all/${userId}`
        );
      } catch (err) {
        alert(`couldn't get info from database ${err}`);
        setError("Couldn't fetch from the database");
        setLoading(false)
        return;
      }
      let newData = results.data
      setFullUserData(newData);
      if (newData.name === "" || !newData.name) {
        setPage('Profile')
      }
      if (userRole === 'coach') {
        setCurrentClient(newData.clients[0] || {name: "none", id: "0"})
      }

      if (userRole === 'client') {
        setCurrentClient(newData.user)
      }

        setLoading(false)
        console.log('fullUserData is ', results.data)
      };
      getAll();
  }, [reset]);


  const updateAll = async () => {
    setLoading(true)
    let results;
    try {
      results = await Axios.get(
        `http://localhost:5000/api/users/all/${userId}`
      );
    } catch (err) {
      alert(`couldn't get info from database ${err}`);
      setError("Couldn't fetch from the database");
      setLoading(false)
      return;
    }
    let newData = results.data
    setFullUserData(newData);
    if (userRole === 'coach') {
      setCurrentClient(newData.clients[0] || [{name: "none", id: "0"}])
      setLoading(false)
      console.log('we got the data');
    };
  }


  const clientSelect = (client) => {
    let fullClient = fullUserData.clients.find(c => c.id === client)
    setCurrentClient(fullClient)
    setPage('Client')
  }

  const navToggle = () => {
    setNavActive(!navActive);
  };

  const logoutFunction = () => {
    // auth.logout()
  }

  return (
    <>
    {userRole === 'coach' && <div className="dash-wrapper">
      {fullUserData && <DrawerLeft
        show={navActive === true}
        name="nav-drawer"
        page={page}
        setPage={setPage}
        children={
          <CoachNav page={page} setPage={setPage} navToggle={navToggle} fullUserData={fullUserData} />
        }
      />}

      {navActive === true && <Backdrop onClick={navToggle} />}

      <div className="menu-desktop">
        <CoachNav page={page} setPage={setPage} fullUserData={fullUserData} logoutFunction={logoutFunction} />
      </div>

      {loading && <LoadingDots />}

      {!loading && <>

      {page === 'Clients' && (
        <Clients
          userId={userId}
          navToggle={navToggle}
          currentClient={currentClient}
          setCurrentClient={setCurrentClient}
          fullUserData={fullUserData}
          userRole={userRole}
          clientSelect={clientSelect}
        />
      )}
      {page === 'Workouts' && (
        <CoachWorkouts
          userId={userId}
          navToggle={navToggle}
          fullUserData={fullUserData}
          userRole={userRole}
        />
      )}
      {page === 'Nutrition' && (
        <CoachDiets
          userId={userId}
          navToggle={navToggle}
          fullUserData={fullUserData}
          userRole={userRole}
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
        />
      )}
      </>}
    </div>}








    {userRole === 'client' && <div className="dash-wrapper">
      {fullUserData && <DrawerLeft
        show={navActive === true}
        name="nav-drawer"
        page={page}
        setPage={setPage}
        children={
          <ClientNav page={page} setPage={setPage} navToggle={navToggle} fullUserData={fullUserData} />
        }
      />}

      {navActive === true && <Backdrop onClick={navToggle} />}

      <div className="menu-desktop">
        <ClientNav page={page} setPage={setPage} fullUserData={fullUserData} logoutFunction={logoutFunction} />
      </div>

      {loading && <LoadingDots />}

      {!loading && <>
        {page === 'Loading' && (
          <LoadingDots />
        )}

      {page === 'Workouts' && (
        <CoachWorkouts
          userId={userId}
          navToggle={navToggle}
          fullUserData={fullUserData}
          userRole={userRole}
        />
      )}
      {page === 'Nutrition' && (
        <CoachDiets
          userId={userId}
          navToggle={navToggle}
          fullUserData={fullUserData}
          userRole={userRole}
        />
      )}
      {page === 'Home' && (
        <Home
          userId={userId}
          currentClient={currentClient}
          setCurrentClient={setCurrentClient}
          navToggle={navToggle}
          fullUserData={fullUserData}
          userRole={userRole}

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
        />
      )}
      </>}
    </div>}
    </>
  );
};

export default Dashboard;

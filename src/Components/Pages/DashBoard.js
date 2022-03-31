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


const Dashboard = () => {
  // const userId = '622280d9bb1f869e9869750f';
  // const userRole = 'coach';
  // const userId = '6224115f4f2f69066744ec23'
  const userRole = 'client'
  const coachId = "";
  const auth = useContext(AuthContext)
  const userId = auth.userId
  // const userRole = auth.role.toLowerCase()

  console.log(auth.role.toLowerCase())

  const [page, setPage] = useState(userRole === 'client' ? 'Home' : 'Clients');

  const [currentClient, setCurrentClient] = useState();

  const [navActive, setNavActive] = useState(false);

  const [error, setError] = useState('');

  const [fullUserData, setFullUserData] = useState();

  const [reset, setReset] = useState(false);

  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const getAll = async () => {
      setLoading(true)
      let results;
      try {
        results = await Axios.get(
          `http://localhost:5000/api/users/all/${auth.userId}`
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
        setCurrentClient(newData.clients[0])

      } else {
        setCurrentClient(newData.user)
      }
      setLoading(false)
      console.log('we got the data');
    };
    getAll();
  }, [reset]);

  const clientSelect = (client) => {
    let fullClient = fullUserData.clients.find(c => c.id === client)
    setCurrentClient(fullClient)
    setPage('Client')
  }

  const navToggle = () => {
    setNavActive(!navActive);
  };

  const logoutFunction = () => {
    auth.logout()
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

      {loading && <div>Loading...</div>}

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

      {loading && <div>Loading...</div>}

      {!loading && <>
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
        />
      )}
      </>}
    </div>}
    </>
  );
};

export default Dashboard;

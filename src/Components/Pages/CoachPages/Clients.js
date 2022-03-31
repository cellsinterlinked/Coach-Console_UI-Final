import React, { useState } from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { RiUserAddLine } from 'react-icons/ri';
import { GoSearch } from 'react-icons/go';
import './Clients.css';
import './CoachUniversal.css';
import '../Dashboard.css';
import Input from '../../Forms/InputFront';
import Button from '../../Buttons/Button';
import ClientButton from '../../Buttons/ClientButton';
import DrawerRight from '../../Nav/DrawerRight';
import DrawerBottom from '../../Nav/DrawerBottom';
import ActiveChart from '../../Charts/ActiveChart';
import ClientFatChart from '../../Charts/ClientFatChart';
import ClientMuscleChart from '../../Charts/ClientMuscleChart';
import ClientSatisfaction from '../../Charts/ClientSatisfaction';
import MacroChart from '../../Charts/MacroChart';
import { IoAddSharp, IoTrash } from 'react-icons/io5';
import { IoTrashOutline } from 'react-icons/io5';
import AddClientMobile from '../../Forms/AddClientMobile';
import LineChart from '../../Charts/LineChart';

const Clients = ({ DUMMYCLIENTS, navToggle, fullUserData, clientSelect }) => {
  const [error, setError] = useState('');
  const [current, setCurrent] = useState(true);
  const [add, setAdd] = useState(false);

  const [addMode, setAddMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  console.log(fullUserData)

  const addClientToggle = () => {
    setAdd(!add);
  };

  return (
    <>
      <DrawerRight
        show={current === false}
        name="drawer-right-partial"
        children={
          <>
            <LineChart />
            <ClientFatChart />
            <ClientMuscleChart />
            {/* <LineChart /> */}
          </>
        }
      />

      <DrawerBottom
        show={add === true}
        name="drawer-bottom-partial"
        children={<AddClientMobile users={DUMMYCLIENTS} />}
      />

      <header className="dash-head">
        <HiOutlineMenuAlt2 className="mobile-menu" onClick={navToggle} />
        {add === false ? <h1>Clients</h1> : <h1>New Client</h1>}
        <RiUserAddLine className="add-user-mobile" onClick={addClientToggle} />
      </header>
      <div className="mobile-select1">
        <div
          className={current ? 'select1 select-green' : 'select1'}
          onClick={() => setCurrent(true)}
        >
          <p>Current Clients</p>
        </div>
        <div
          className={current ? 'select2' : 'select2 select-green'}
          onClick={() => setCurrent(false)}
        >
          <p>Analytics</p>
        </div>
      </div>

      <div className="desk-center">
        <div className="dash-search-container">
          <Input name="search-input" placeholder={'Search Clients'} />
          <Button
            name="search-button"
            contents={<GoSearch className="magnify" />}
          />
        </div>

        <div className="client-list-container">
          <div className="client-desk-menu">
            {addMode === false ? <h3>Clients</h3> : <h3>New Client</h3>}
            <IoAddSharp
              className="add-desk-icon"
              onClick={() => setAddMode(!addMode)}
            />
            {addMode === false && (
              <IoTrashOutline
                className="desk-trash-icon"
                onClick={() => setDeleteMode(!deleteMode)}
              />
            )}
          </div>
          {addMode === false ? (
            <div className="absurd-box">
              {fullUserData.clients.map((client, index) => (
                <ClientButton
                  name={client.name}
                  key={index}
                  image={client.image}
                  lastCheckin={"April 1 2020"}
                  firstCheckin={"July 30 2019"}
                  click={() => clientSelect(client.id)}
                />
              ))}
            </div>
          ) : (
            <div className="absurd-box">
              <AddClientMobile users={DUMMYCLIENTS} />
            </div>
          )}
        </div>
      </div>

      <div className="right-sector-desk">
        <div className="right-bar-desk">
          <div className="analytics-deskHead">
            <h3>Analytics</h3>
          </div>
          <ActiveChart />
          <ClientFatChart />
          <ClientMuscleChart />
          <MacroChart />
        </div>
      </div>
    </>
  );
};

export default Clients;

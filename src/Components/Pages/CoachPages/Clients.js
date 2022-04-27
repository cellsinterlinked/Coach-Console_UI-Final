import React, { useState, useEffect } from 'react';
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
import Axios from 'axios';

const Clients = ({
  DUMMYCLIENTS,
  navToggle,
  fullUserData,
  clientSelect,
  userId,
  currentClient
}) => {
  const [error, setError] = useState('');
  const [current, setCurrent] = useState(true);
  const [add, setAdd] = useState(false);

  const [addMode, setAddMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const [query, setQuery] = useState('');
  const [searchList, setSearchList] = useState();

  const [clients, setClients] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClientsHandler = async () => {
      setLoading(true);
      console.log('hitting the use effect')
      let results;
      try {
        results = await Axios.get(
          `http://localhost:5000/api/users/clients/${userId}`

        );
      } catch (err) {
        setLoading(false);
        console.log({err})
        setError('Couldnt fetch clients');
        return;
      }
      setClients(results.data.clients);
      console.log('you have fucking clients')
      setLoading(false);
    };
    fetchClientsHandler();
  }, [userId]);

  useEffect(() => {
    if (clients && clients.length > 0 && query) {
      setSearchList(
        clients.filter((client) =>
          client.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [clients, query]);

  const queryHandler = (e) => {
    setQuery(e.target.value);
    console.log(query);
  };



  const addClientToggle = () => {
    setAdd(!add);
  };

  return (
    <>
      {fullUserData && (
        <DrawerRight
          show={current === false}
          name="drawer-right-partial"
          children={
            <>
              <LineChart
                data={fullUserData.clientTotals}
                color={'#0ee2d0'}
                background={'#0ee2d044'}
                label={'Clients'}
              />

              <LineChart
                data={fullUserData.checkinTotals}
                color={'#0ee2d0'}
                background={'#0ee2d044'}
                label={'Checkins'}
              />

              <LineChart
                data={fullUserData.workoutTotals}
                color={'#0ee2d0'}
                background={'#0ee2d044'}
                label={'Workouts'}
              />

              <LineChart
                data={fullUserData.dietTotals}
                color={'#0ee2d0'}
                background={'#0ee2d044'}
                label={'Diets'}
              />
            </>
          }
        />
      )}

      <DrawerBottom
        show={add === true}
        name="drawer-bottom-partial"
        children={<AddClientMobile users={DUMMYCLIENTS} />}
      />

      <header className="dash-head">
        <HiOutlineMenuAlt2 className="mobile-menu" onClick={navToggle} />
        {add === false ? <h1>Clients</h1> : <h1>New Client</h1>}
        <RiUserAddLine className="add-user-mobile" onClick={() => console.log(currentClient.id)} />
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
          <Input
            name="search-input"
            parentClass="parent-auto"
            placeholder={'Search Clients'}
            onChange={queryHandler}
            value={query}
            clear={() => setQuery('')}
            clearable={true}
          />
          <Button
            name="search-button"
            contents={<GoSearch className="magnify" />}
          />

          {query && query !== '' && searchList && searchList.length > 0 && (
            <div className="search-drop">
              {searchList.map((client, index) => (
                <ClientButton
                  name={client.name}
                  key={index}
                  image={client.image}
                  lastCheckin={'April 1 2020'}
                  firstCheckin={'July 30 2019'}
                  click={() => clientSelect(client.id)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="client-list-container">
          <div className="client-desk-menu">
            {addMode === false ? <h3>Clients</h3> : <h3>New Client</h3>}
            {/* <IoAddSharp
              className="add-desk-icon"
              onClick={() => setAddMode(!addMode)}
            /> */}
            {addMode === false && clients && (
              <IoTrashOutline
                className="desk-trash-icon"
                onClick={() => setDeleteMode(!deleteMode)}
              />
            )}
          </div>
          {clients && clients.length > 0 && !loading && (
            <div className="absurd-box">
              {clients.map((client, index) => (
                <ClientButton
                  name={client.name}
                  key={index}
                  image={client.image}
                  lastCheckin={'April 1 2020'}
                  firstCheckin={'July 30 2019'}
                  click={() => clientSelect(client.id)}
                />
              ))}
            </div>
          )}
          {clients && clients.length === 0 && fullUserData.code && !loading &&

            <div className="absurd-box">
              <h3 className="no-data-title">
                Have your clients sign up with the code below to gain access to
                your clients!
              </h3>
              {fullUserData && fullUserData.code && (
                <p className="no-data-addition">{fullUserData.code}</p>
              )}
            </div>
          }
          {/* {addMode === false ? (
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
          )} */}
        </div>
      </div>

      <div className="right-sector-desk">
        {fullUserData && (
          <div className="right-bar-desk">
            <div className="analytics-deskHead">
              <h3>Analytics</h3>
            </div>
            <LineChart
              data={fullUserData.clientTotals}
              color={'#0ee2d0'}
              background={'#0ee2d044'}
              label={'Clients'}
            />

            <LineChart
              data={fullUserData.checkinTotals}
              color={'#0ee2d0'}
              background={'#0ee2d044'}
              label={'Checkins'}
            />

            <LineChart
              data={fullUserData.workoutTotals}
              color={'#0ee2d0'}
              background={'#0ee2d044'}
              label={'Workouts'}
            />

            <LineChart
              data={fullUserData.dietTotals}
              color={'#0ee2d0'}
              background={'#0ee2d044'}
              label={'Diets'}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Clients;

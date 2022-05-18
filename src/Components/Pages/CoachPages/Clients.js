import React, { useState, useEffect, useContext } from 'react';
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

import { IoTrashOutline } from 'react-icons/io5';

import LineChart from '../../Charts/LineChart';
import Axios from 'axios';
import Modal from '../../Modals/Modal';
import { AuthContext } from '../../../Context/auth-context';

const Clients = ({
  navToggle,
  fullUserData,
  clientSelect,
  userId,
}) => {
  const auth = useContext(AuthContext);
  const [addClient, setAddClient] = useState(false);
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
      let results;
      try {
        results = await Axios.get(
          process.env.REACT_APP_BACKEND_URL + `/users/clients/${userId}`,
          { headers: { Authorization: 'Bearer ' + auth.token } }
        );
      } catch (err) {
        setLoading(false);
        setError('Couldnt fetch clients');
        return;
      }
      setClients(results.data.clients);
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
  };
  return (
    <>
      <Modal
        show={error}
        onCancel={() => setError()}
        children={
          <div className="error-modal-container">
            <h3>{error}</h3>
            <Button
              name="auth-button-primary"
              contents="GOT IT!"
              click={() => setError()}
            />
          </div>
        }
      />

      {/* ADD MODAL */}
      <Modal
        show={addClient}
        onCancel={() => setAddClient(false)}
        children={
          <div className="error-modal-container">
            <h3>
              Add clients by having them sign up with your coach code below!
            </h3>
            <p>{fullUserData.code}</p>
            <Button
              name="auth-button-primary"
              contents="GOT IT!"
              click={() => setAddClient(false)}
            />
          </div>
        }
      />

      {/* END ADD MODAL */}

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



      <header className="dash-head">
        <HiOutlineMenuAlt2 className="mobile-menu" onClick={navToggle} />
        {add === false ? <h1>Clients</h1> : <h1>New Client</h1>}
        <RiUserAddLine
          className="add-user-mobile"
          onClick={() => setAddClient(!addClient)}
        />
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
          onClick={() => {
            setCurrent(false)
            setQuery("")
          }}
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
            <div className="search-drop-broken">
              {searchList.map((client, index) => (
                <ClientButton
                  notifications={fullUserData.notifications.checkins.some(
                    (id) => client.checkins.includes(id)
                  )}
                  clientNotification={fullUserData.notifications.clients.includes(
                    client.id
                  )}
                  name={client.name}
                  key={index}
                  image={client.image}
                  lastCheckin={client.checkins.length}
                  firstCheckin={`${client.dateJoined.monthString} ${client.dateJoined.day} ${client.dateJoined.year}`}
                  click={() => clientSelect(client)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="client-list-container">
          <div className="client-desk-menu">
            {addMode === false ? <h3>Clients</h3> : <h3>New Client</h3>}

            {addMode === false && clients && (
              <RiUserAddLine
                className="desk-add-client-icon"
                onClick={() => setAddClient(!addClient)}
              />
            )}
          </div>
          {fullUserData && clients && clients.length > 0 && !loading && (
            <div className="absurd-box">
               {/* <div className="list-scroll-container-lg"> */}
              {clients.map((client, index) => (
                <ClientButton
                  notifications={fullUserData.notifications.checkins.some(
                    (id) => client.checkins.includes(id)
                  )}
                  clientNotification={fullUserData.notifications.clients.includes(
                    client.id
                  )}
                  name={client.name}
                  key={index}
                  image={client.image}
                  lastCheckin={client.checkins.length}
                  firstCheckin={`${client.dateJoined.monthString} ${client.dateJoined.day} ${client.dateJoined.year}`}
                  click={() => clientSelect(client)}
                />
              ))}
              {/* </div> */}
            </div>
          )}
          {clients && clients.length === 0 && fullUserData.code && !loading && (
            <div className="absurd-box">
              <h3 className="no-data-title">
                Have your clients sign up with the code below to gain access to
                your clients!
              </h3>
              {fullUserData && fullUserData.code && (
                <p className="no-data-addition">{fullUserData.code}</p>
              )}
            </div>
          )}

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

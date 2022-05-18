import React, { useState, useEffect, useContext } from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { GoSearch } from 'react-icons/go';
import './Clients.css';
import './CoachUniversal.css';
import '../Dashboard.css';
import './CoachMessages.css';
import Input from '../../Forms/InputFront';
import Button from '../../Buttons/Button';
import MessageButton from '../../Buttons/MessageButton';
import DrawerRight from '../../Nav/DrawerRight';

import Messaging from '../../Messaging/Messaging';
import { IoImageOutline } from 'react-icons/io5';
import Axios from 'axios';
import LoadingDots from '../../Animations/LoadingDots';
import NoImage from '../../../Resources/userimage.jpeg';
import { AuthContext } from '../../../Context/auth-context';
import Modal from '../../Modals/Modal';

const CoachMessages = ({
  navToggle,
  fullUserData,
  userRole,
  userId,
  setReset,
  reset,
  hack,
  setHack,
  setFullUserData,
}) => {
  const data = { role: userRole };
  const auth = useContext(AuthContext);
  const [error, setError] = useState('');
  const [current, setCurrent] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(
    fullUserData.convos[fullUserData.convos.length - 1]
  );

  const [loading, setLoading] = useState(false);
  const [convos, setConvos] = useState();

  const [messageContent, setMessageContent] = useState('');
  const [query, setQuery] = useState('');
  const [searchList, setSearchList] = useState();

  useEffect(() => {
    const getConvosHandler = async () => {
      setLoading(true);
      let result;
      try {
        result = await Axios.get(
          process.env.REACT_APP_BACKEND_URL + `/convos/${userId}`,
          data,
          { headers: { Authorization: 'Bearer ' + auth.token } }
        );
      } catch (err) {
        setError('err');
        setLoading(false);
        return;
      }
      setConvos(result.data.convos);
      setSelectedMessage(result.data.convos[0]);
      setLoading(false);
    };
    getConvosHandler();
  }, [userId, userRole, auth.token,]);


  const sendImageHandler = async (event) => {
    setLoading(true);
    let pickedFile;
    let finalFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
    } else {
      setLoading(false);
      setError('Only upload one file');
      return;
    }
    // this onload either has to be async or just load the request into the filreader
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      finalFile = fileReader.result;
      let results;
      try {
        results = await Axios.patch(
          process.env.REACT_APP_BACKEND_URL + `/convos/add/${userId}`,
          {
            convoId: selectedMessage.id,
            role: userRole,
            image: finalFile,
          },
          { headers: { Authorization: 'Bearer ' + auth.token } }
        );
      } catch (err) {
        setError('Couldnt send image');
        setLoading(false);
        return;
      }

      setSelectedMessage(results.data.convo);
      setConvos(results.data.convos);
      setLoading(false);
    };

    fileReader.readAsDataURL(pickedFile);
  };

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    let results;
    async function sendText() {
      setLoading(true);
      try {
        results = await Axios.patch(
          process.env.REACT_APP_BACKEND_URL + `/convos/add/${userId}`,
          {
            convoId: selectedMessage.id,
            role: userRole,
            message: messageContent,
          },
          { headers: { Authorization: 'Bearer ' + auth.token } }
        );
      } catch (err) {
        setError('Couldnt send message');
        setLoading(false);
        return;
      }
      setSelectedMessage(results.data.convo);
      setConvos(results.data.convos);
      setMessageContent('');
      setLoading(false);
    }
    if (messageContent !== '') {
      sendText();
    } else {
      setError('There is no content in your message!');
    }
  };

  useEffect(() => {
    if ( userRole === 'coach' && query && convos && convos.length > 0) {
      setSearchList(fullUserData.clients.filter(
        (client) => client.name.toLowerCase()
            .includes(query.toLowerCase())
            ))
          }
        }, [fullUserData.clients, query, convos, userRole]);







  const setConvo = async (convo) => {
    setLoading(true);
    let newData = fullUserData;
    try {
      await Axios.patch(
        process.env.REACT_APP_BACKEND_URL + `/users/notifications/${userId}`,
        { message: convo.id },
        { headers: { Authorization: 'Bearer ' + auth.token } }
      );
    } catch (err) {
      setError(err);
      setLoading(false);
      return;
    }

    newData.notifications.messages = newData.notifications.messages.filter(
      (item) => item !== convo.id
    );
    setFullUserData(newData);
    setQuery('');
    setSearchList();
    setHack(!hack);
    setSelectedMessage(convo);
    setCurrent(false);
    setLoading(false);
  };

  const backFunction = () => {
    setCurrent(true);
  };

  const queryHandler = (e) => {
    setQuery(e.target.value);
  };

  const searchHandler = (c) => {
    let clickedConvo = convos.filter(convo => convo.id === c.conversations[0])
    console.log(clickedConvo[0])
    setConvo(clickedConvo[0])
  }


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
      {userRole === 'coach' && (
        <DrawerRight
          show={current === false}
          name="drawer-right-full"
          children={
            convos && convos.length > 0 && fullUserData.clients.length > 0 ? (
              <Messaging
                convo={selectedMessage}
                fullUserData={fullUserData}
                userRole={userRole}
                image={
                  userRole === 'coach'
                    ? fullUserData.clients.find(
                        (client) => client.id === selectedMessage.client
                      ).image
                    : NoImage
                }
                myImage={fullUserData.user.image}
                userId={userId}
                back={backFunction}
                mobileImageSend={sendImageHandler}
                sendMessageHandler={sendMessageHandler}
                setMessageContent={setMessageContent}
                messageContent={messageContent}
              />
            ) : (
              <div>Add Clients</div>
            )
          }
        />
      )}

      {userRole === 'client' && (
        <DrawerRight
          show={current === false}
          name="drawer-right-full"
          children={
            convos && convos.length > 0 ? (
              <Messaging
                convo={selectedMessage}
                fullUserData={fullUserData}
                userRole={userRole}
                image={fullUserData.coach.image}
                myImage={fullUserData.user.image}
                userId={userId}
                back={backFunction}
                mobileImageSend={sendImageHandler}
                sendMessageHandler={sendMessageHandler}
                setMessageContent={setMessageContent}
                messageContent={messageContent}
              />
            ) : (
              <div>No Coach...something went wrong</div>
            )
          }
        />
      )}

      {/* <DrawerBottom show={add === true} name="drawer-bottom-partial" /> */}

      <div className="desktop-messaging-wrapper">
        <div className="middle-messaging">
          <div className="mid-message-head">
            <Input
              name="search-input"
              parentClass="parent-auto"
              placeholder={'Search Messages'}
              onChange={queryHandler}
                  value={query}
                  clear={() => setQuery('')}
                  clearable={true}
            />
            <Button
              name="search-button"
              click={() => console.log(convos)}
              contents={<GoSearch className="magnify" />}
            />

            {query && query !== '' && searchList && searchList.length > 0 && (
                  <div className={"search-drop-message"}>
                    {searchList.map((client, index) => (
                      <div key={client.id}className="cl-message-drop" onClick={() => searchHandler(client)}>
                      <div className="cl-drop-img">
                       <img alt="" src={client.image} />
                      </div>
                      <p className="cl-drop-name">{client.name}</p>
                      </div>
                    ))}
                  </div>
                )}



          </div>
          <div className="mid-convo-container">
            <div className="mid-convo-header">
              <div className="mid-convo-head-image">
                {userRole === 'coach' &&
                  convos &&
                  convos.length > 0 &&
                  fullUserData.clients.length > 0 && (
                    <img
                      alt=""
                      src={
                        userRole === 'coach'
                          ? fullUserData.clients.find(
                              (client) => client.id === selectedMessage.client
                            ).image
                          : NoImage
                      }
                    />
                  )}

                {userRole === 'client' && convos && convos.length > 0 && (
                  <img alt="" src={fullUserData.coach.image} />
                )}
              </div>
              {userRole === 'coach' &&
                convos &&
                convos.length !== 0 &&
                fullUserData.clients.length > 0 && (
                  <h3>
                    {userRole === 'coach'
                      ? fullUserData.clients.find(
                          (client) => client.id === selectedMessage.client
                        ).name
                      : fullUserData.coach.name}
                  </h3>
                )}

              {userRole === 'client' && convos && convos.length !== 0 && (
                <h3>{fullUserData.coach.name}</h3>
              )}
              <div className="mid-convo-head-image"></div>
            </div>
            {loading && <LoadingDots />}
            {(!convos || convos.length < 1) && !loading && fullUserData.code && (
              <div>
                <h3 className="no-data-title">
                  Have Clients Sign Up With Your Coach Code To Start Messaging!
                </h3>
                <p className="no-data-addition">{fullUserData.code}</p>
              </div>
            )}
            {userRole === 'coach' &&
              convos &&
              convos.length > 0 &&
              fullUserData.clients.length > 0 && (
                <Messaging
                  back={backFunction}
                  convo={selectedMessage}
                  fullUserData={fullUserData}
                  userRole={userRole}
                  image={
                    userRole === 'coach'
                      ? fullUserData.clients.find(
                          (client) => client.id === selectedMessage.client
                        ).image
                      : fullUserData.coach.image
                  }
                  myImage={fullUserData.user.image}
                  userId={userId}
                />
              )}

            {userRole === 'client' && convos && convos.length > 0 && (
              <Messaging
                back={backFunction}
                convo={selectedMessage}
                fullUserData={fullUserData}
                userRole={userRole}
                image={fullUserData.coach.image}
                myImage={fullUserData.user.image}
                userId={userId}
              />
            )}
          </div>

          <div className="mid-convo-input">
            <Input
              placeholder="Write a message..."
              name="message-input-desk"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
            <Button
              contents="SEND"
              name="send-message-btn-desk"
              click={sendMessageHandler}
            />

            <Button
              contents={
                <>
                  <IoImageOutline
                    style={{ color: 'white' }}
                    className="add-image-icon-desk"
                  />
                  <input
                    type="file"
                    className="message-image-input"
                    onChange={sendImageHandler}
                  />
                </>
              }
              name="image-button-desk"
            />
          </div>
        </div>

        <div className="right-messaging">
          <div className="messaging-deskHead">
            <h3>Messages</h3>
          </div>

          {userRole === 'coach' && (
            <div className="desk-message-list">
              {convos && convos.length > 0 && fullUserData.clients.length > 0 && (
                //this needs removed if issues or div tag added with column styling.
                <>
                  {loading === true && <LoadingDots />}
                  {convos.map((convo, index) => (
                    <MessageButton
                      convo={convo}
                      click={setConvo}
                      notifications={fullUserData.notifications.messages.includes(
                        convo.id
                      )}
                      index={index}
                      userId={userId}
                      key={index}
                      lastMessageTime={
                        convo.messages.length > 0
                          ? convo.messages[convo.messages.length - 1].date.time
                          : ''
                      }
                      name={
                        userRole === 'coach'
                          ? fullUserData.clients.find(
                              (client) => client.id === convo.client
                            ).name
                          : fullUserData.coach.name
                      }
                      image={
                        userRole === 'coach'
                          ? fullUserData.clients.find(
                              (client) => client.id === convo.client
                            ).image
                          : fullUserData.coach.image
                      }
                      lastMessageMonth={
                        convo.messages.length > 0
                          ? convo.messages[convo.messages.length - 1].date
                              .monthString
                          : ''
                      }
                      lastMessageDay={
                        convo.messages.length > 0
                          ? convo.messages[convo.messages.length - 1].date.day
                          : ''
                      }
                      lastMessageYear={
                        convo.messages.length > 0
                          ? convo.messages[convo.messages.length - 1].date.year
                          : ''
                      }
                      lastMessage={
                        convo.messages.length > 0 &&
                        convo.messages[convo.messages.length - 1].message !==
                          null
                          ? convo.messages[
                              convo.messages.length - 1
                            ].message.slice(0, 33)
                          : ''
                      }
                    />
                  ))}
                </>
              )}
            </div>
          )}

          {userRole === 'client' && (
            <div className="desk-message-list">
              {convos && convos.length > 0 && (
                //this needs removed if issues or div tag added with column styling.
                <>
                  {/* {loading === true && <LoadingDots />} */}
                  {convos.map((convo, index) => (
                    <MessageButton
                      convo={convo}
                      click={setConvo}
                      notifications={fullUserData.notifications.messages.includes(
                        convo.id
                      )}
                      index={index}
                      userId={userId}
                      key={index}
                      lastMessageTime={
                        convo.messages.length > 0
                          ? convo.messages[convo.messages.length - 1].date.time
                          : ''
                      }
                      name={fullUserData.coach.name}
                      image={fullUserData.coach.image}
                      lastMessageMonth={
                        convo.messages.length > 0
                          ? convo.messages[convo.messages.length - 1].date
                              .monthString
                          : ''
                      }
                      lastMessageDay={
                        convo.messages.length > 0
                          ? convo.messages[convo.messages.length - 1].date.day
                          : ''
                      }
                      lastMessageYear={
                        convo.messages.length > 0
                          ? convo.messages[convo.messages.length - 1].date.year
                          : ''
                      }
                      lastMessage={
                        convo.messages.length > 0 &&
                        convo.messages[convo.messages.length - 1].message !==
                          null
                          ? convo.messages[
                              convo.messages.length - 1
                            ].message.slice(0, 33)
                          : ''
                      }
                    />
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <header className="dash-head">
        <HiOutlineMenuAlt2 className="mobile-menu" onClick={navToggle} />
        <h1>Messaging</h1>
        <div className="add-user-mobile"></div>
      </header>

      <div className="desk-center onlyMobile">
        <div className="dash-search-container" style={{ marginTop: '4rem' }}>
          <Input
            name="search-input"
            parentClass="parent-auto"
            placeholder={'Search Messages'}
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
                  <div className={"search-drop-message"}>
                    {searchList.map((client, index) => (

                       <div key={client.id}className="cl-message-drop" onClick={() => searchHandler(client)}>
                       <div className="cl-drop-img">
                        <img alt="" src={client.image} />
                       </div>
                       <p className="cl-drop-name">{client.name}</p>
                       </div>
                    ))}
                  </div>
                )}
        </div>
        {userRole === 'coach' && (
          <div className="client-list-container">
            <div className="client-desk-menu">
              <h3>Messaging</h3>
            </div>

            {loading === true && <LoadingDots />}

            {convos && convos.length < 1 && fullUserData.code && (
              <>
                <h3 className="no-data-title">
                  Have Clients Sign Up With Your Coach Code To Start Messaging!
                </h3>
                <p className="no-data-addition">{fullUserData.code}</p>
              </>
            )}

            {convos && convos.length > 0 && fullUserData.clients.length > 0 && (
              <div className="messageList-desktop-condition">
                {convos.map((convo, index) => (
                  <MessageButton
                    convo={convo}
                    click={setConvo}
                    notifications={fullUserData.notifications.messages.includes(
                      convo.id
                    )}
                    index={index}
                    userId={userId}
                    key={index}
                    lastMessageTime={
                      convo.messages.length > 0
                        ? convo.messages[convo.messages.length - 1].date.time
                        : ''
                    }
                    name={
                      userRole === 'coach'
                        ? fullUserData.clients.find(
                            (client) => client.id === convo.client
                          ).name
                        : fullUserData.coach.name
                    }
                    image={
                      userRole === 'coach'
                        ? fullUserData.clients.find(
                            (client) => client.id === convo.client
                          ).image
                        : fullUserData.coach.image
                    }
                    lastMessageMonth={
                      convo.messages.length > 0
                        ? convo.messages[convo.messages.length - 1].date
                            .monthString
                        : ''
                    }
                    lastMessageDay={
                      convo.messages.length > 0
                        ? convo.messages[convo.messages.length - 1].date.day
                        : ''
                    }
                    lastMessageYear={
                      convo.messages.length > 0
                        ? convo.messages[convo.messages.length - 1].date.year
                        : ''
                    }
                    lastMessage={
                      convo.messages.length > 0 &&
                      convo.messages[convo.messages.length - 1].message !== null
                        ? convo.messages[
                            convo.messages.length - 1
                          ].message.slice(0, 33)
                        : ''
                    }
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {userRole === 'client' && (
          <div className="client-list-container">
            <div className="client-desk-menu">
              <h3>Messaging</h3>
            </div>

            {/* {loading === true && <LoadingDots />} */}

            {/* {convos && convos.length < 1 && fullUserData.code &&  (
            <>

              <h3 className="no-data-title">Have Clients Sign Up With Your Coach Code To Start Messaging!</h3>
              <p className="no-data-addition">{fullUserData.code}</p>

            </>
          )} */}

            {convos && convos.length > 0 && (
              <div className="messageList-desktop-condition">
                {convos.map((convo, index) => (
                  <MessageButton
                    convo={convo}
                    click={setConvo}
                    notifications={fullUserData.notifications.messages.includes(
                      convo.id
                    )}
                    index={index}
                    userId={userId}
                    key={index}
                    lastMessageTime={
                      convo.messages.length > 0
                        ? convo.messages[convo.messages.length - 1].date.time
                        : ''
                    }
                    name={fullUserData.coach.name}
                    image={fullUserData.coach.image}
                    lastMessageMonth={
                      convo.messages.length > 0
                        ? convo.messages[convo.messages.length - 1].date
                            .monthString
                        : ''
                    }
                    lastMessageDay={
                      convo.messages.length > 0
                        ? convo.messages[convo.messages.length - 1].date.day
                        : ''
                    }
                    lastMessageYear={
                      convo.messages.length > 0
                        ? convo.messages[convo.messages.length - 1].date.year
                        : ''
                    }
                    lastMessage={
                      convo.messages.length > 0 &&
                      convo.messages[convo.messages.length - 1].message !== null
                        ? convo.messages[
                            convo.messages.length - 1
                          ].message.slice(0, 33)
                        : ''
                    }
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CoachMessages;

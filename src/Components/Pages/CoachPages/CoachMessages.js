import React, { useState, useEffect } from 'react';
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
import DrawerBottom from '../../Nav/DrawerBottom';
import Messaging from '../../Messaging/Messaging';
import { IoImageOutline } from 'react-icons/io5';
import Axios from 'axios';
import LoadingDots from '../../Animations/LoadingDots';
import NoImage from '../../../Resources/userimage.jpeg';

const CoachMessages = ({
  DUMMYMESSAGES,
  navToggle,
  fullUserData,
  userRole,
  userId,
  setReset,
  reset,
}) => {
  const [error, setError] = useState('');
  const [current, setCurrent] = useState(true);
  const [add, setAdd] = useState(false);

  const [messages, setMessages] = useState();
  const [selectedMessage, setSelectedMessage] = useState(
    fullUserData.convos[fullUserData.convos.length - 1]
  );

  const [loading, setLoading] = useState(false);
  const [convos, setConvos] = useState();

  const [messageContent, setMessageContent] = useState('');

  useEffect(() => {
    const getConvosHandler = async () => {
      setLoading(true);
      let result;
      console.log('hitting the use effect');
      try {
        result = await Axios.get(`http://localhost:5000/api/convos/${userId}`, {
          role: userRole,
        });
      } catch (err) {
        console.log('error');
        alert('there was an error');
        setLoading(false);
        return;
      }
      setConvos(result.data.convos);
      console.log('here are convos', result.data.convos);

      setSelectedMessage(result.data.convos[0]);
      setLoading(false);
    };
    getConvosHandler();
  }, [userId, userRole]);

  const updateConvosHandler = async () => {
    setLoading(true);
    let result;
    try {
      result = await Axios.get(`http://localhost:5000/api/convos/${userId}`, {
        role: userRole,
      });
    } catch (err) {
      alert('there was an error');
      return;
    }
    setConvos(result.data.convos);
    setLoading(false);
  };

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

      console.log(
        {
          convoId: selectedMessage.id,
          role: userRole,
          image: finalFile,
        },
        'this is the data sent'
      );
      let results;
      try {
        results = await Axios.patch(
          `http://localhost:5000/api/convos/add/${userId}`,
          {
            convoId: selectedMessage.id,
            role: userRole,
            image: finalFile,
          }
        );
      } catch (err) {
        setError('Couldnt send image');
        setLoading(false);
        return;
      }
      updateConvosHandler();
      setSelectedMessage(results.data.convo);
      setLoading(false);
      console.log('sent to convo');
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
          `http://localhost:5000/api/convos/add/${userId}`,
          {
            convoId: selectedMessage.id,
            role: userRole,
            message: messageContent,
          }
        );
      } catch (err) {
        alert(err);
        setError('Couldnt send message');
        setLoading(false);
        return;
      }
      // setReset(!reset);
      console.log(results.data.convo);
      setSelectedMessage(results.data.convo);
      setMessageContent('');
      setLoading(false);
    }
    if (messageContent !== '') {
      sendText();
    } else {
      alert('you need to type something first');
      setError('There is no content in your message!');
    }
  };

  console.log(current);
  const addMessageToggle = () => {
    setAdd(!add);
  };

  const setConvo = async(convo) => {
    // update the convo to set the notifications to zero
    setSelectedMessage(convo)
    setCurrent(false);
  };

  const backFunction = () => {
    setCurrent(true);
  };

  return (
    <>
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
            />
            <Button
              name="search-button"
              click={() => console.log(convos)}
              contents={<GoSearch className="magnify" />}
            />
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
                      onClick={() => {
                        setSelectedMessage(convo);
                        setCurrent(false);
                      }}
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
                  {loading === true && <LoadingDots />}
                  {convos.map((convo, index) => (
                    <MessageButton
                      onClick={() => {
                        setSelectedMessage(convo);
                        setCurrent(false);
                      }}
                      notifications={userRole === 'client' ? convo.clientNotifications : convo.coachNotifications}
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
          />
          <Button
            name="search-button"
            contents={<GoSearch className="magnify" />}
          />
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
                    onClick={() => {
                      setSelectedMessage(convo);
                      setCurrent(false);
                    }}
                    notifications={userRole === 'client' ? convo.clientNotifications : convo.coachNotifications}
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

            {loading === true && <LoadingDots />}

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
                    onClick={() => {
                      setSelectedMessage(convo);
                      setCurrent(false);
                    }}
                    notifications={userRole === 'client' ? convo.clientNotifications : convo.coachNotifications}
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

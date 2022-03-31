import React, { useState } from 'react';
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
  const [selectedMessage, setSelectedMessage] = useState(
    fullUserData.convos[fullUserData.convos.length - 1]
  );

  const [loading, setLoading] = useState(false);

  const [messageContent, setMessageContent] = useState('');

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    // alert('its triggering');
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
      setReset(!reset);
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

  const setConvo = (index) => {
    // e.preventDefault()
    setSelectedMessage(DUMMYMESSAGES[index]);
    setCurrent(false);
  };

  const backFunction = () => {
    setCurrent(true);
  };

  return (
    <>
      <DrawerRight
        show={current === false}
        name="drawer-right-full"
        children={
          <Messaging
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
            back={backFunction}
          />
        }
      />

      {/* <DrawerBottom show={add === true} name="drawer-bottom-partial" /> */}

      <div className="desktop-messaging-wrapper">
        <div className="middle-messaging">
          <div className="mid-message-head">
            <Input name="search-input" placeholder={'Search Messages'} />
            <Button
              name="search-button"
              contents={<GoSearch className="magnify" />}
            />
          </div>
          <div className="mid-convo-container">
            <div className="mid-convo-header">
              <div className="mid-convo-head-image">
                <img
                  alt=""
                  src={
                    userRole === 'coach'
                      ? fullUserData.clients.find(
                          (client) => client.id === selectedMessage.client
                        ).image
                      : fullUserData.coach.image
                  }
                />
              </div>
              <h3>
                {userRole === 'coach'
                  ? fullUserData.clients.find(
                      (client) => client.id === selectedMessage.client
                    ).name
                  : fullUserData.coach.name}
              </h3>
              <div className="mid-convo-head-image"></div>
            </div>
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
                <IoImageOutline
                  style={{ color: 'white' }}
                  className="add-image-icon-desk"
                />
              }
              name="image-button-desk"
            />
          </div>
        </div>

        <div className="right-messaging">
          <div className="messaging-deskHead">
            <h3>Messages</h3>
          </div>
          <div className="desk-message-list">
            {fullUserData.convos.map((convo, index) => (
              <MessageButton
                onClick={() => {
                  setSelectedMessage(convo);
                  setCurrent(false);
                }}
                index={index}
                userId={userId}
                key={index}
                lastMessageTime={
                  convo.messages[convo.messages.length - 1].date.time
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
                  convo.messages[convo.messages.length - 1].date.monthString
                }
                lastMessageDay={
                  convo.messages[convo.messages.length - 1].date.day
                }
                lastMessageYear={
                  convo.messages[convo.messages.length - 1].date.year
                }
                lastMessage={convo.messages[
                  convo.messages.length - 1
                ].message.slice(0, 33)}
              />
            ))}
          </div>
        </div>
      </div>

      <header className="dash-head">
        <HiOutlineMenuAlt2 className="mobile-menu" onClick={navToggle} />
        <h1>Messaging</h1>
        <div className="add-user-mobile"></div>
      </header>

      <div className="desk-center onlyMobile">
        <div className="dash-search-container" style={{ marginTop: '4rem' }}>
          <Input name="search-input" placeholder={'Search Messages'} />
          <Button
            name="search-button"
            contents={<GoSearch className="magnify" />}
          />
        </div>
        <div className="client-list-container">
          <div className="client-desk-menu">
            <h3>Messaging</h3>
          </div>
          <div className="messageList-desktop-condition">
            {fullUserData.convos.map((convo, index) => (
              <MessageButton
                onClick={() => {
                  setSelectedMessage(convo);
                  setCurrent(false);
                }}
                index={index}
                userId={userId}
                key={index}
                lastMessageTime={
                  convo.messages[convo.messages.length - 1].date.time
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
                  convo.messages[convo.messages.length - 1].date.monthString
                }
                lastMessageDay={
                  convo.messages[convo.messages.length - 1].date.day
                }
                lastMessageYear={
                  convo.messages[convo.messages.length - 1].date.year
                }
                lastMessage={convo.messages[
                  convo.messages.length - 1
                ].message.slice(0, 33)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachMessages;

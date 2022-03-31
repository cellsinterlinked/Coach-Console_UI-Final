import React, { useEffect, useState, useRef } from 'react';
import './Messaging.css';
import '../Pages/CoachPages/CoachUniversal.css';
import { IoChevronBackOutline } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';
import Button from '../Buttons/Button';
import { IoImageOutline } from 'react-icons/io5';
import InputFront from '../Forms/InputFront';


const Messaging = ({
  convo,
  back,
  image,
  fullUserData,
  userRole,
  userId,
  myImage,
  messageContent,
  setMessageContent,
  sendMessageHandler
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [convo, isLoading, messagesEndRef]);



  const annoyingDate = (param) => {
    let now = new Date();
    let nowSec = now.getTime();
    let amPm = '';
    let date = new Date(param.time);
    let hour = date.getHours();
    if (hour < 12) {
      amPm = 'AM';
    } else {
      amPm = 'PM';
    }
    if (hour === 0) {
      hour = 12;
    }
    if (hour > 12) {
      hour = hour - 12;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (nowSec - param.time < 86400000) {
      return `${hour}:${minutes} ${amPm}`;
    } else {
      return `${param.monthString} ${param.day} ${param.year} ${hour}:${minutes} ${amPm}`;
    }
  };

  return (
    <div className="messaging-wrapper">
      <header className="dash-head greyBottom">
        <IoChevronBackOutline className="mobile-menu" onClick={back} />
        <div className="message-person-container">
          <div className="message-head-image">
            <img src={image} alt="Trainee" />
          </div>
          <h2 className="convo-mobile-header">{userRole === "coach" ? fullUserData.clients.find(client => client.id === convo.client).name : fullUserData.coach.name}</h2>
        </div>
        <IoMdSettings className="add-user-mobile" />
      </header>

      <div className="convo-container">
        {convo.messages.map((message, index) => (
          <div key={index} className="message-component-wrapper">
            {(!convo.messages[index - 1] ||
                  convo.messages[index - 1].date.time - message.date.time <
                    -3600000) && (
                  <div className="message-time-stamp">
                    {annoyingDate(message.date)}
                  </div>
                )}

            {(!message.image || message.image === '') && (
              <div
                className={
                  message.user === userId
                    ? 'sender-message-wrapper'
                    : 'reciever-message-wrapper'
                }
              >
                {message.message}
              </div>
            )}

            {message.image && message.image !== '' && (
              <div
                className={
                  message.user === userId
                    ? 'sender-image-wrapper'
                    : 'reciever-image-wrapper'
                }
              >
                <img src={myImage} alt="" />
              </div>
            )}

            {message.user !== userId &&
              (!convo.messages[index + 1] ||
                convo.messages[index + 1].user === userId) && (
                <div className="message-user-circle">
                  <img src={image} alt="" />
                </div>
              )}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <footer className="message-input-wrapper">
        <div className="message-input-group">
          <InputFront
            placeholder="Write a message..."
            name="message-input"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
          <Button
            contents="SEND"
            name="send-message-btn"
            click={() => console.log('click')}
          />
        </div>
        <Button
          contents={
            <IoImageOutline
              style={{ color: 'white' }}
              className="add-image-icon"
            />
          }
          name="image-button"
        />
      </footer>
    </div>
  );
};

export default Messaging;

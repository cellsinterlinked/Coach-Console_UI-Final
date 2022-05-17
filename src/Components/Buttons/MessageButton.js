import React, {useState, useEffect} from 'react'
import './MessageButton.css';

const MessageButton = ({image, name, lastMessage, lastMessageTime, click, index, lastMessageDay, lastMessageMonth, lastMessageYear, notifications, convo }) => {
  const [time, setTime] = useState()
  const [timeDisplay, setTimeDisplay] = useState()

  const setterFunc = () => {
    click(convo)

  }



  useEffect(() => {

    const now = new Date();
    const time = now.getTime();
    if (time - lastMessageTime <= 3600000) {setTimeDisplay("minutesAgo"); setTime(time - lastMessageTime)}
    else if (time - lastMessageTime <= 86400000) {setTimeDisplay("today"); setTime(time - lastMessageTime)}
    else if (time - lastMessageTime <= 604800000) {setTimeDisplay("thisWeek"); setTime(time - lastMessageTime)}
    else if (time - lastMessageTime <= 31536000000) {setTimeDisplay("thisYear"); setTime(time - lastMessageTime)}
    else {setTimeDisplay("longTime"); setTime(time - lastMessageTime)}

  }, [lastMessageTime])

  return(
    <button
    className="message-button-wrapper "

     onClick={setterFunc}
     >

      {notifications &&
      <div className="new-notification-message">
        <p>NEW MESSAGES</p>
      </div>
      }
       {/* <div className="notification-bubble-button">{notifications}</div> */}
      <div className="msg-btn-img">
        <img src={image} alt=""/>
      </div>
      <div className="msg-btn-info">
        <div className="msg-btn-info-top">
          <h3 >{name}</h3>
          {lastMessage && <p style={{color: "grey"}}>{lastMessage}...</p>}
          {!lastMessage && <p style={{color: "grey"}}>Click to send your first message...</p>}

        </div>

        {time && timeDisplay && <div className="msg-btn-info-bottom">
        {timeDisplay === "minutesAgo" && <p className="grn-btn-text">{Math.floor(time / 60000)} minutes ago</p>}
              {timeDisplay === "today" && <p className="grn-btn-text">{Math.floor(time / 3600000)} hours ago</p>}
              {timeDisplay === "thisWeek" && <p className="grn-btn-text">{Math.floor(time / 86400000)} days ago</p>}
              {timeDisplay === "thisYear" && <p className="grn-btn-text">{lastMessageMonth.slice(0,3)} {lastMessageDay}</p>}
              {timeDisplay === "longTime" && <p className="grn-btn-text">{lastMessageMonth.slice(0,3)} {lastMessageDay} {lastMessageYear}</p>}

              </div>}
        {/* <div className="msg-btn-info-bottom">

         <p className="grn-btn-text">{convoData}</p>

        </div> */}

      </div>
    </button>
  )
}

export default MessageButton;
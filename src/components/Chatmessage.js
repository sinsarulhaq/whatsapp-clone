import React from 'react'
import './Chatmessage.css'

function Chatmessage({ message, date }) {
  return (
    <div className='chat-message'>
        <div className="chat-message-text">
            <p>{message}</p>
        </div>
        <div className="chat-message-date">
            <p>{date}</p>
        </div>
    </div>
  )
}

export default Chatmessage
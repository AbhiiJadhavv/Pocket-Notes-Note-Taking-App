import React from 'react';
import './Message.css';

function Message({ note }) {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'});
  };

  return (
    <div className="messages">
      <div className="messageTime">
        <p className="time">
            {formatTime(note.timestamp)}
        </p>
        <p className="date">
            {formatDate(note.timestamp)}
        </p>
      </div>
      <div className="messageContent">{note.content}</div>
    </div>
  );
}

export default Message;
import React from 'react';
import './MessagesHeader.css';

const MessagesHeader = ({ noteList }) => {
  const getInitials = (name) => {
    const nameParts = name.trim().split(' ');
    if (nameParts.length >= 2) {
      return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
    } else if (nameParts.length === 1) {
      return nameParts[0][0].toUpperCase() + (nameParts[0][1] ? nameParts[0][1].toUpperCase() : '');
    }
    return '';
  };

  return (
    <div className="messageHeader">
      <div className="groupIcon" style={{ backgroundColor: noteList.color || '#ccc' }}>
        {getInitials(noteList.name)}
      </div>
      <p>{noteList.name}</p>
    </div>
  );
}

export default MessagesHeader;
import React from 'react';
import './GroupMessages.css'
import sendIcon from '../assets/sendIcon.png'

function GroupMessages({ group }) {
    const getInitials = (name) => {
        const words = name.split(' ');
        if (words.length === 1) {
          // If group name is a single word, take first two letters in capital format
          return name.slice(0, 2).toUpperCase();
        } else if (words.length >= 2) {
          // If group name has two or more words, take first letters of first two words
          return words[0][0].toUpperCase() + words[1][0].toUpperCase();
        } else {
          return '';
        }
    };
    
    return (
    <div className='groupMessages'>
      <div className='messageHeader'>
        <div className="groupIcon" style={{ backgroundColor: group.color }}>
          {getInitials(group.name)}
        </div>
        <p>{group.name}</p>
      </div>
      <div className="messages">

      </div>
      <div className="textareaCon">
        <textarea className="textarea" placeholder='Enter your text here...........'></textarea>
        <button className="textareaButton"><img src={sendIcon} alt="sendIcon Image"/></button>
      </div>
    </div>
  );
}

export default GroupMessages;

import React, { useState } from 'react';
import './GroupMessages.css';
import sendIcon from '../assets/sendIcon.png';

function GroupMessages({ group, messages, onMessageSend }) {
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

    const [message, setMessage] = useState('');
    const [sentTime, setSentTime] = useState('');

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            // Get current date and time
            const currentDate = new Date();
            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const amOrPm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12; // Convert hours to 12-hour format
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero for minutes less than 10

            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const month = months[currentDate.getMonth()];
            const day = currentDate.getDate();
            const year = currentDate.getFullYear();

            const currentTime = `${formattedHours}:${formattedMinutes} ${amOrPm} ${day} ${month} ${year}`;
            // Format the message
            const formattedMessage = `${message}`;
            // Notify parent component to update messages
            onMessageSend(group, formattedMessage);
            setMessage('');
            // Update the sent time
            setSentTime(currentTime);
        }
    };

    const renderMessages = () => {
        return messages.map((message, index) => (
            <div key={index} className="message">
                {message}
            </div>
        ));
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
              {sentTime && <div className="dateAndTime">{sentTime}</div>}
                {renderMessages()}
            </div>
            <div className="textareaCon">
                <textarea className="textarea" value={message} onChange={handleMessageChange} placeholder='Enter your text here...........' />
                <button className="textareaButton" onClick={handleSendMessage}>
                    <img src={sendIcon} alt="sendIcon Image" />
                </button>
            </div>
        </div>
    );
}

export default GroupMessages;

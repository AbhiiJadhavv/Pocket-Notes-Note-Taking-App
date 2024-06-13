import React, { useState } from 'react';
import './GroupMessages.css';
import sendIcon from '../assets/sendIcon.png';

function GroupMessages({ group, onMessageSend }) {
    const getInitials = (name) => {
        const words = name.split(' ');
        if (words.length === 1) {
            return name.slice(0, 2).toUpperCase();
        } else if (words.length >= 2) {
            return words[0][0].toUpperCase() + words[1][0].toUpperCase();
        } else {
            return '';
        }
    };

    const [message, setMessage] = useState('');
    const [sentMessages, setSentMessages] = useState([]);

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSendMessage();
      }
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
    
            const currentTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;
            const currentDateAndTime = `${month} ${day} ${year}`;
    
            // Format the message
            const formattedMessage = {
                content: message,
                time: currentTime,
                date: currentDateAndTime
            };
    
            // Notify parent component to update messages
            onMessageSend(group, formattedMessage);
            setMessage('');
            // Update the sent messages
            setSentMessages([...sentMessages, formattedMessage]);
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
            <div className="messagesCon">
                {sentMessages.map((message, index) => (
                    <div key={index} className="messages">
                        <div className="messageTime">
                            <p className="time">{message.time}</p>
                            <p className="date">{message.date}</p>
                        </div>
                        <div className="messageContent">{message.content}</div>
                    </div>
                ))}
            </div>
            <div className="textareaCon">
                <textarea className="textarea" value={message} onChange={handleMessageChange} onKeyDown={handleKeyPress} placeholder='Enter your text here...........' />
                <button className={`textareaButton ${!message.trim() ? 'textareaButton2' : ''}`} onClick={handleSendMessage}>
                  <img src={sendIcon} alt="send" />
                </button>
            </div>
        </div>
    );
}

export default GroupMessages;

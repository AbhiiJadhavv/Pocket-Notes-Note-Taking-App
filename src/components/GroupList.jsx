import React, { useState } from 'react';
import Popup from './Popup';
import './GroupList.css'

function GroupList({ onGroupClick }) {
  const [showPopup, setShowPopup] = useState(false);
  const [groups, setGroups] = useState([]);

  const handleCreateGroup = (newGroup) => {
    setGroups([...groups, newGroup]);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

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

  const [clickedGroup, setClickedGroup] = useState(null);

  const handleGroupClick = (group) => {
    onGroupClick(group); // Perform any other actions you need here
    setClickedGroup(group);
  };

  return (
    <div className="groupList">
        <div className="header">
            <p>Pocket Notes</p>
            <div className="button"><button onClick={togglePopup}><span>+ </span> Create Notes group</button></div>
            {showPopup && (
            <Popup
                onClose={togglePopup}
                onCreateGroup={handleCreateGroup}
            />
            )}
        </div>
        <div className="groups">
            {groups.map((group, index) => (
                <div key={index} className={`group ${clickedGroup === group ? 'clicked' : ''}`} onClick={() => handleGroupClick(group)}>
                    <div className="groupIcon" style={{ backgroundColor: group.color }}>
                        {getInitials(group.name)}
                    </div>
                    <p>{group.name}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default GroupList;
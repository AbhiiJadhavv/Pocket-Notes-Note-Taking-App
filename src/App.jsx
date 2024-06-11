import React, { useState } from 'react';
import './App.css';
import GroupList from './components/GroupList';
import LandingPage from './components/LandingPage';
import GroupMessages from './components/GroupMessages';

function App() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupMessages, setGroupMessages] = useState({});

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  const handleReturnToGroupList = () => {
    setSelectedGroup(null);
  };

  const handleMessagesUpdate = (group, message) => {
    // Update messages for the selected group
    const updatedMessages = { ...groupMessages };
    updatedMessages[group.name] = [...(updatedMessages[group.name] || []), message];
    setGroupMessages(updatedMessages);
  };

  return (
    <div className="firstPage">
      <GroupList onGroupClick={handleGroupClick} />
      {selectedGroup ? (
        <GroupMessages 
            group={selectedGroup} 
            messages={groupMessages[selectedGroup.name] || []} 
            onMessageSend={handleMessagesUpdate} 
            onClose={handleReturnToGroupList} 
        />
      ) : (
        <LandingPage />
      )}
    </div>
  );
}

export default App;

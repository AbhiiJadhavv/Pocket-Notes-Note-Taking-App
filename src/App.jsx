import React, { useState } from 'react';
import './App.css';
import GroupList from './components/GroupList';
import LandingPage from './components/LandingPage';
import GroupMessages from './components/GroupMessages';

function App() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState({});

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  const handleReturnToGroupList = () => {
    setSelectedGroup(null);
  };

  const handleMessagesUpdate = (group, message) => {
    // Update messages for the selected group
    setMessages({
      ...messages,
      [group.name]: [...(messages[group.name] || []), message]
    });
  };

  return (
    <div className="firstPage">
      <GroupList onGroupClick={handleGroupClick} />
      {selectedGroup ? (
        <GroupMessages group={selectedGroup} messages={messages[selectedGroup.name] || []} onMessageSend={handleMessagesUpdate} onClose={handleReturnToGroupList} />
      ) : (
        <LandingPage />
      )}
    </div>
  );
}

export default App;

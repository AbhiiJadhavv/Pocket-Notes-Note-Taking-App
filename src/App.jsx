import React, { useState } from 'react';
import './App.css';
import GroupList from './components/GroupList';
import LandingPage from './components/LandingPage';
import GroupMessages from './components/GroupMessages';

function App() {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  const handleReturnToGroupList = () => {
    setSelectedGroup(null);
  };

  return (
    <div className="firstPage">
      <GroupList onGroupClick={handleGroupClick} />
      {selectedGroup ? (
        <GroupMessages group={selectedGroup} onClose={handleReturnToGroupList} />
      ) : (
        <LandingPage />
      )}
    </div>
  );
}

export default App;

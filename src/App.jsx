import React, { useState, useEffect } from 'react';
import Popup from './components/Popup';
import MessagesHeader from './components/MessagesHeader';
import Message from './components/Message';
import TextArea from './components/TextArea';
import LandingPage from './components/LandingPage';
import './App.css';

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [noteLists, setNoteLists] = useState([]);
  const [activeNoteList, setActiveNoteList] = useState(null);

  // Load note lists from local storage on component mount
  useEffect(() => {
    const storedNoteLists = JSON.parse(localStorage.getItem('noteLists')) || [];
    setNoteLists(storedNoteLists);
  }, []);

  // Save note lists to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('noteLists', JSON.stringify(noteLists));
  }, [noteLists]);


  const handleCreateNotesGroup = () => setIsFormVisible(true);
  const handleCloseForm = () => setIsFormVisible(false);

  const handleCreateNoteList = (name, color) => {
    const newNoteList = { id: Date.now(), name, color, notes: [] };
    setNoteLists([...noteLists, newNoteList]);
    setIsFormVisible(false);
  };

  // Deselect if the same list is clicked
  const handleSelectNoteList = (noteList) => {
    if (activeNoteList && activeNoteList.id === noteList.id) {
      setActiveNoteList(null); 
    } else {
      setActiveNoteList(noteList);
    }
  };

  const handleSaveNote = (content) => {
    const timestamp = new Date().toISOString();
    const updatedNoteLists = noteLists.map((list) => {
      if (list.id === activeNoteList.id) {
        return {
          ...list,
          notes: [{ id: Date.now(), content, timestamp, updated: timestamp }, ...list.notes],
        };
      }
      return list;
    });
    setNoteLists(updatedNoteLists);
    const updatedActiveNoteList = updatedNoteLists.find(list => list.id === activeNoteList.id);
    setActiveNoteList(updatedActiveNoteList);
  };

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
    <div className="firstPage">
      <div className="groupList">
        <div className='header'>
          <p>Pocket Notes</p>
          <div className="button"><button onClick={handleCreateNotesGroup}><span>+ </span> Create Notes Group</button></div>
        </div>
        <div className='groups'>
          <nav>
            <ul>
              {noteLists.map((list) => (
                <li key={list.id} 
                  onClick={() => handleSelectNoteList(list)} 
                  className={`group ${activeNoteList && activeNoteList.id === list.id ? 'clicked' : ''}`}> 
                  <div className="groupIcon" style={{ backgroundColor: list.color || '#ccc' }}>
                    {getInitials(list.name)}
                  </div>
                  <p>{list.name}</p>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="groupMessages">
        {activeNoteList ? (
          <>
            <MessagesHeader noteList={activeNoteList} />
            <div className="messagesCon">
              {activeNoteList && activeNoteList.notes.slice().reverse().map((note) => (
                <Message key={note.id} note={note} />
              ))}
            </div>
            <TextArea onSave={handleSaveNote} />
          </>
        ) : (
          <LandingPage/>
        )}
        {isFormVisible && (
          <div className="popup-container">
            <Popup onCreate={handleCreateNoteList} onClose={handleCloseForm} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import './TextArea.css'; 
import sendIcon from '../assets/sendIcon.png'; 

function TextArea ({ onSave, onCancel }) {
  const [noteContent, setNoteContent] = useState('');

  // Load saved note content from localStorage on component mount
  useEffect(() => {
    const savedNoteContent = localStorage.getItem('savedNoteContent') || '';
    setNoteContent(savedNoteContent);
  }, []);

  const handleChange = (event) => {
    setNoteContent(event.target.value);
  };

  const handleSubmit = () => {
    if (noteContent.trim()) {
      onSave(noteContent);
      setNoteContent(''); // Clear the input field after saving
      localStorage.setItem('savedNoteContent', ''); // Clear saved note content in localStorage
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="textareaCon">
      <textarea
        className="textarea"
        value={noteContent}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="Type your note here..."
      />
      <button className={`textareaButton ${!noteContent.trim() ? 'textareaButton2' : ''}`} onClick={handleSubmit}>
          <img src={sendIcon} alt="send" />
      </button>
    </div>
  );
}

export default TextArea;
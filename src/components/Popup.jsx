import React, { useState } from 'react';
import './Popup.css';

function Popup({ onCreate, onClose }) {
  const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];
  const colors2 = ['pink']

  const [newNoteListName, setNewNoteListName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors2[0]);

  const handleNameChange = (event) => setNewNoteListName(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newNoteListName.trim()) {
      onCreate(newNoteListName, selectedColor);
      setNewNoteListName('');
    }
  };

  return (
    <div className="popup" onClick={onClose}>
      <div className="popupBox" onClick={(e) => e.stopPropagation()}>
        <p>Create New Notes Group</p>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className='groupInputContainer'>
            <label htmlFor="noteListName" className="form-label">Group Name</label>
            <input
              type="text"
              className="groupInput"
              placeholder="Enter Your Group Name..."
              value={newNoteListName}
              onChange={handleNameChange}
            />
          </div>
          <div className='color-container'>
            <label className="form-label">Choose Color</label>
            <div className="color-options">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`color-circle ${color === selectedColor ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default Popup;

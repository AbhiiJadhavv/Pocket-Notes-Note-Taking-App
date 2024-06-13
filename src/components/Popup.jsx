import React, { useState } from 'react';
import './Popup.css'

function Popup({ onClose, onCreateGroup }) {
    const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];
    const colors2 = ['pink']

    const [groupName, setGroupName] = useState('');
    const [selectedColor, setSelectedColor] = useState(colors2[0]);
  
    const handleColorSelection = (color) => {
      setSelectedColor(color);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onCreateGroup({ name: groupName, color: selectedColor });
      onClose();
    };
  
    return (
      <div className="popup" onClick={onClose}>
        <div className="popupBox" onClick={(e) => e.stopPropagation()}>
        <p>Create New Notes group</p>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="groupInputContainer">
          <label className="form-label"> Group Name </label>
          <input
            className="groupInput"
            type="text"
            placeholder="Enter your group name...."
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
          </div>
          <div className="color-container">
          <label className="form-label"> Choose colour </label>
          <div className="color-options">
            {colors.map((color) => (
              <div
                key={color}
                className={`color-circle ${color === selectedColor ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelection(color)}
              ></div>
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

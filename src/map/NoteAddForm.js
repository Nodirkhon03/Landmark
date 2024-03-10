// NoteAddForm.js
import React, { useState } from 'react';

const NoteAddForm = ({ onSubmit, position, onCancel }) => {
  const [userName, setUserName] = useState('');
  const [noteText, setNoteText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      user: userName,
      text: noteText,
      location: position,
    });
    setUserName('');
    setNoteText('');
  };

  return (
    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', borderRadius: '8px' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your note here"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          required
        ></textarea>
        <button type="submit">Add Note</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default NoteAddForm;

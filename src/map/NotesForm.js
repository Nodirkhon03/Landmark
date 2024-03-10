import React, { useState } from "react";

const NotesForm = ({ onAddNote }) => {
  const [text, setText] = useState("");
  const [user, setUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !user) return;
    onAddNote({ text, user });
    setText("");
    setUser("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <textarea
        placeholder="Write your note here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NotesForm;

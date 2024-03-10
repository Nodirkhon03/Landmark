import React from "react";

const NotesList = ({ notes }) => {
    return (
      <ul>
        {notes.map((note) => (
          note.location && (
            <li key={note.id}>
              <strong>{note.user}</strong>: {note.text} (Located at{" "}
              {note.location.lat}, {note.location.lng})
            </li>
          )
        ))}
      </ul>
    );
  };
  
  export default NotesList;
  

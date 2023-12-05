import React, { useEffect } from "react";

const Sidebar = ({ notes, loadNote, addNote }) => {
  useEffect(() => {
    console.log(notes)
  }, [notes]);

  return (
    <div className="sidebar" style={{ width: '250px', backgroundColor: '#f3f3f3' }}>
      {notes.map(note => (
        <div key={note.id} className="sidebar-item" onClick={() => loadNote(note)} style={{ padding: '10px', cursor: 'pointer' }}>
          {note.topic}
        </div>
      ))}
      <div className="sidebar-item" onClick={() => addNote()} style={{ padding: '10px', cursor: 'pointer' }}>
          + Add Note
        </div>
    </div>
  );
}

export default Sidebar;
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import TextEditor from './components/TextEditor';
import Home from './components/Home';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [notes, setNotes] = useState([{id: 1, topic: "first"},{id: 2, topic: "second"}, {id: 3, topic: "third"}]);
  const [currentNote, setCurrentNote] = useState(null);

  const saveNote = (content) => {
    if (currentNote) {
      setNotes(notes.map(note => note.id === currentNote.id ? { ...note, content } : note));
    } else {
      const newNote = { id: Date.now(), content };
      setNotes([...notes, newNote]);
      setCurrentNote(newNote);
    }
  };

  useEffect(() => {
    console.log("in ap.js ", notes)
  }, [notes]);

  // const selectNote = (note) => {
  //   setCurrentNote(note);
  // };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/note" element={<TextEditor currentNote={currentNote} onSave={saveNote} notes={notes} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

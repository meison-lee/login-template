import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import Sidebar from './Sidebar';

const TextEditor = () => {
  const [notes, setNotes] = useState([{id: 1, topic:'first page', content: "first"},{id: 2, topic:'second page', content: "second"}, {id: 3, topic:'third page', content: "third"}]);
  const [currentNote, setCurrentNote] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [currentTopic, setCurrentTopic] = useState('');

  useEffect(() => {
    console.log("current note ",currentNote)
    if (currentNote) {
      console.log("if current note")
      const contentState = stateFromHTML(currentNote.content);
      setEditorState(EditorState.createWithContent(contentState));
      console.log("set content state")
    } else {
      console.log("else current note")
      setEditorState(EditorState.createWithContent(ContentState.createFromText('')));
      console.log("set content state")
    }
  }, [currentNote]);

  const saveNote = (content) => {
    if (currentNote) {
      setNotes(notes.map(note => note.id === currentNote.id ? { ...note, content } : note));
    } else {
      const newNote = { id: Date.now(), content, topic: currentTopic || 'undefined' };
      setNotes([...notes, newNote]);
      setCurrentNote(newNote);
    }
  };

  const onEditorStateChange = (newState) => {

    console.log("set editor state")

    setEditorState(newState);
    const html = stateToHTML(newState.getCurrentContent());
    saveNote(html);
  };

  const handleTopicChange = (event) => {
    setCurrentTopic(event.target.value);
  };

  const loadNote = (note) => {
    setCurrentNote(note);
    // setCurrentTopic('')
    console.log("load note")
    console.log(note)
  };
  const addNote = () => {
    console.log("add note")
    setCurrentNote(null);
  };

  return (
    <div className='main_page' style={{ display: 'flex' }}>
      <Sidebar notes={notes} loadNote={loadNote} addNote={addNote}/>
      <div className="text-editor" style={{ flexGrow: 1 }}>
      {!currentNote && (
        <input
          type="text"
          placeholder="Enter topic name"
          value={currentTopic}
          onChange={handleTopicChange}
        />
      )}
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
    </div>
  );
};

export default TextEditor;

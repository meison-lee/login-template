import React, { useEffect } from 'react';
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

const TextEditor = ({ currentNote, onSave, notes }) => {
  // const [notes, setNotes] = useState([]);
  const contentState = currentNote && currentNote.content ? stateFromHTML(currentNote.content) : EditorState.createWithContent(ContentState.createFromText(''));
  const [editorState, setEditorState] = React.useState(
    currentNote ? EditorState.createWithContent(contentState) : EditorState.createEmpty()
  );

  const onEditorStateChange = (newState) => {
    setEditorState(newState);
    const html = stateToHTML(newState.getCurrentContent());
    onSave(html);
  };

  const loadNote = (note) => {
    // setCurrentNote(note);
    console.log("load note")
  };

  useEffect(() => {
    console.log(notes)
  }, [notes]);

  return (
    <div className='main_page' style={{ display: 'flex' }}>
      <div className="sidebar" style={{ width: '250px', backgroundColor: '#f3f3f3' }}>
        {notes.map(note => (
          <div key={note.id} className="sidebar-item" onClick={() => loadNote(note)} style={{ padding: '10px', cursor: 'pointer' }}>
            Note {note.id}
          </div>
        ))}
      </div>
      <div className="text-editor" style={{ flexGrow: 1 }}>
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

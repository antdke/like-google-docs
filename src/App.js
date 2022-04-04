import './App.css';
import {useState} from 'react'
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

function MyEditor() {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  return <Editor editorState={editorState} onChange={setEditorState} />;
}

function App() {
  return (
    <div>
      <h1 className="text-2xl font-bold underline">Hello World</h1>
      <MyEditor />
    </div>
    
  );
}

export default App;

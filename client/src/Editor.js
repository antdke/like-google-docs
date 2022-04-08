import React, {useEffect, useRef, useCallback} from 'react'
import Quill from 'quill';
import "quill/dist/quill.snow.css"
import {io} from "socket.io-client"

function Editor() {

  const editorRef = useCallback((editorWrapper) => {
    if (editorWrapper === null) return
    
    const editorDiv = document.createElement('div')

    editorWrapper.innerHTML = ""
    editorWrapper.append(editorDiv);
    new Quill(editorDiv, {theme: 'snow'})
    
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:3001")
    return (() => {
      socket.disconnect()
    })
  },[])



  return (
    <div ref={editorRef} id='container'></div>
  )
}

export default Editor
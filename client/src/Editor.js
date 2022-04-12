import React, {useEffect, useRef, useCallback, useState} from 'react'
import Quill from 'quill';
import "quill/dist/quill.snow.css"
import {io} from "socket.io-client"

function Editor() {
  const [quill, setQuill] = useState()
  const [socket, setSocket] = useState()

  const editorRef = useCallback((editorWrapper) => {
    
    if (editorWrapper === null) return
    
    const editorDiv = document.createElement('div')

    editorWrapper.innerHTML = ""
    editorWrapper.append(editorDiv);
    const quillInstance = new Quill(editorDiv, {theme: 'snow'})
    setQuill(quillInstance)

    
    
    // socket.on('editedContent', (editedContent) => {
    //   quill.setContents(editedContent)
    // })

    
  }, []);

  // TODO: Fix infinite loop

  // SETTING UP THE SOCKET CONNECTION
  useEffect(() => {
    const socketInstance = io("http://localhost:3001")

    setSocket(socketInstance)
    
    // return (() => {
    //   socket.disconnect()
    // })
  },[])

  // SEND CHANGES
  useEffect(() => {
    if (!socket || !quill) return

    const handleChange = (delta, oldDelta, source) => {
      if (source != 'user') return
      socket.emit('send-changes', delta)
    }
    
    quill.on('text-change', handleChange)

    return () => {
      quill.off('text-change', handleChange)
    }
  }, [quill, socket])

  // RECIEVE CHANGES
  useEffect(() => {
     if (!socket || !quill) return

     const handleChange = (delta) => {
      quill.updateContents(delta)
    }

    socket.on('recieve-changes', handleChange)
  
    return () => {
      socket.off('recieve-changes', handleChange)
    }
  }, [quill, socket])
  

  return (
    <div ref={editorRef} id='container'></div>
  )
}

export default Editor
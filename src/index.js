import React from 'react'
import ReactDOM from 'react-dom'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import App from './App'

function Root() {
  return (
    <div className="App">
      <DndProvider backend={Backend}>
        <App />
      </DndProvider>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Root />, rootElement)

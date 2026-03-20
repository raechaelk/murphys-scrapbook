import { useState } from 'react'
import Room from './components/Room'
import DialogueBox from './components/DialogueBox'
import './index.css'

const initialState = {
  pagesFound: [],
  symbolsFound: [],
  dialogueOpen: true,
  currentDialogue: 'opening',
  roomState: {
    fairyLights: false,
    candleOne: false,
    candleTwo: false,
    candleThree: false,
    roomExpanded: false,
    pinboardUnlocked: false,
    drawerUnlocked: false,
  }
}

function App() {
  const [gameState, setGameState] = useState(initialState)

  const updateRoom = (key, value) => {
    setGameState(prev => ({
      ...prev,
      roomState: { ...prev.roomState, [key]: value }
    }))
  }

  const closeDialogue = () => {
    setGameState(prev => ({ ...prev, dialogueOpen: false }))
  }

  const setDialogue = (dialogueName) => {
    setGameState(prev => ({
      ...prev,
      currentDialogue: dialogueName,
      dialogueOpen: true
    }))
  }

  return (
    <div className="game-container">
      <Room 
        roomState={gameState.roomState}
        onUpdateRoom={updateRoom}
        onSetDialogue={setDialogue}
      />
      {gameState.dialogueOpen && (
        <DialogueBox
          dialogue={gameState.currentDialogue}
          onClose={closeDialogue}
          onSetDialogue={setDialogue}
        />
      )}
    </div>
  )
}

export default App
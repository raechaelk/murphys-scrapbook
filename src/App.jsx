// App.jsx — the main canvas that holds everything
// 🎓 REACT LESSON: useState lets the game "remember" things
// when state changes, React automatically re-draws what changed
import { useState } from 'react'
import Room from './components/Room'
import DialogueBox from './components/DialogueBox'
import './index.css'

// this is our GAME STATE — everything the game needs to remember
// think of it like murphy's case file
const initialState = {
  // which scrapbook pages have been found
  pagesFound: [],
  // which hidden symbols have been found  
  symbolsFound: [],
  // is the dialogue box showing
  dialogueOpen: true,
  // which dialogue sequence is playing
  currentDialogue: 'opening',
  // which parts of the room are lit/unlocked
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
  // 🎓 REACT LESSON: useState(initialState) creates a state variable
  // gameState = the current value
  // setGameState = the function to update it
  // whenever setGameState is called, React re-renders everything that uses gameState
  const [gameState, setGameState] = useState(initialState)

  // this function updates the room (e.g. turning on a candle)
  // 🎓 REACT LESSON: we never directly change state — we always use the setter function
  const updateRoom = (key, value) => {
    setGameState(prev => ({
      ...prev,  // "keep everything else the same"
      roomState: {
        ...prev.roomState,
        [key]: value
      }
    }))
  }

  // this function closes the dialogue box
  const closeDialogue = () => {
    setGameState(prev => ({
      ...prev,
      dialogueOpen: false
    }))
  }

  // this function changes which dialogue is playing
  const setDialogue = (dialogueName) => {
    setGameState(prev => ({
      ...prev,
      currentDialogue: dialogueName,
      dialogueOpen: true
    }))
  }

  return (
    // 🎓 REACT LESSON: components are like HTML tags you invent yourself
    // we pass data DOWN to components using "props" (the attributes you see below)
    // Room needs to know the roomState so it can light up correctly
    // DialogueBox needs to know what dialogue to show
    <div className="game-container">
      <Room 
        roomState={gameState.roomState}
        onUpdateRoom={updateRoom}
        onSetDialogue={setDialogue}
      />
      {/* 🎓 REACT LESSON: the {} lets us write JavaScript inside JSX */}
      {/* this says: only show DialogueBox if dialogueOpen is true */}
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
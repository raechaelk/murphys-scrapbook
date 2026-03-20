// DialogueBox.jsx — murphy and bartholomew's speech
// 🎓 REACT LESSON: this component only knows about dialogue
// it doesn't know anything about the room or game state
// single responsibility — each component does ONE thing well

import { useState } from 'react'

// all the dialogue scripts live here
const DIALOGUES = {
  'opening': {
    lines: [
      { 
        speaker: 'bartholomew', 
        korean: '야 murphy', 
        text: 'MURPHY. murphy wake up. WAKE UP RIGHT NOW.' 
      },
      { 
        speaker: 'murphy', 
        text: '...what time is it.' 
      },
      { 
        speaker: 'bartholomew', 
        text: "THE SCRAPBOOK, murphy. THE SCRAPBOOK IS — but um — it's not great." 
      },
      { 
        speaker: 'murphy', 
        text: '...oh no.' 
      },
      { 
        speaker: 'bartholomew', 
        text: 'We need to find every page. Every piece. Before tonight.' 
      },
      { 
        speaker: 'murphy', 
        text: 'Why before tonight?' 
      },
      { 
        speaker: 'bartholomew', 
        text: 'I have my reasons. Are you going to help or not.' 
      },
    ]
  },
  'desk-zoom': {
    lines: [
      {
        speaker: 'bartholomew',
        text: 'The desk. This is where we start. Look carefully — but um — everything matters.'
      }
    ]
  }
}

// 🎓 REACT LESSON: these are the character portrait components
// small, self-contained, just renders the right character face
// placeholder emoji for now — swap with your procreate art later!
function CharacterPortrait({ speaker }) {
  return (
    <div className={`dialogue-portrait portrait-${speaker}`}>
      {/* 
        🎨 TO SWAP IN YOUR ART LATER:
        replace the emoji div below with:
        <img src={`/characters/${speaker}.png`} alt={speaker} />
        and export your procreate drawings as PNG into public/characters/
      */}
      <div className="portrait-placeholder">
        {speaker === 'bartholomew' ? '🦈' : '🦫'}
      </div>
    </div>
  )
}

function DialogueBox({ dialogue, onClose, onSetDialogue }) {
  // 🎓 REACT LESSON: useState inside a component is LOCAL state
  // currentLine only exists inside DialogueBox
  const [currentLine, setCurrentLine] = useState(0)

  const script = DIALOGUES[dialogue]
  if (!script) return null

  const line = script.lines[currentLine]
  const isLastLine = currentLine === script.lines.length - 1

  const handleNext = () => {
    if (isLastLine) {
      onClose()
      setCurrentLine(0) // reset for next time
    } else {
      // 🎓 REACT LESSON: prev => prev + 1 is the safe way to update
      // based on the previous value — avoids timing bugs
      setCurrentLine(prev => prev + 1)
    }
  }

  return (
    <div className="dialogue-overlay">
      <div className={`dialogue-box speaker-is-${line.speaker}`}>

        {/* CHARACTER PORTRAIT — left side, swaps with speaker */}
        {/* 🎓 REACT LESSON: we pass speaker as a prop to CharacterPortrait */}
        {/* when line.speaker changes, React re-renders the portrait automatically */}
        <CharacterPortrait speaker={line.speaker} />

        {/* DIALOGUE CONTENT — right side */}
        <div className="dialogue-content">

          {/* SPEAKER NAME */}
          <div className={`dialogue-speaker ${line.speaker}`}>
            {line.speaker === 'bartholomew' ? 'bartholomew' : 'murphy'}
          </div>

          {/* KOREAN BIT if it exists */}
          {line.korean && (
            <div className="dialogue-korean">{line.korean}</div>
          )}

          {/* DIALOGUE TEXT */}
          <div className="dialogue-text">
            {line.text}
          </div>

          {/* NEXT BUTTON — says "next" always, "close" on last line */}
          <button className="dialogue-next" onClick={handleNext}>
            {isLastLine ? '[ close ]' : '[ next ▶ ]'}
          </button>

        </div>
      </div>
    </div>
  )
}

export default DialogueBox

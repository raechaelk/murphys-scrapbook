// DialogueBox.jsx — murphy and bartholomew's speech
import { useState } from 'react'

const DIALOGUES = {
  'opening': {
    lines: [
      { 
        speaker: 'bartholomew', 
        korean: '야 murphy', 
        text: 'MURPHY. murphy wake up. WAKE UP RIGHT NOW.',
        murphyEmotion: 'sleeping'
      },
      { 
        speaker: 'murphy', 
        text: '...what time is it.',
        murphyEmotion: 'sleeping'
      },
      { 
        speaker: 'bartholomew', 
        text: "THE SCRAPBOOK, murphy. THE SCRAPBOOK IS — but um — it's not great.",
        murphyEmotion: 'shocked'
      },
      { 
        speaker: 'murphy', 
        text: '...oh no.',
        murphyEmotion: 'shocked'
      },
      { 
        speaker: 'bartholomew', 
        text: 'We need to find every page. Every piece. Before tonight.',
        murphyEmotion: 'shocked'
      },
      { 
        speaker: 'murphy', 
        text: 'Why before tonight?',
        murphyEmotion: 'shocked'
      },
      { 
        speaker: 'bartholomew', 
        text: 'I have my reasons. Are you going to help or not.',
        murphyEmotion: 'neutral'
      },
    ]
  },
  'desk-zoom': {
    lines: [
      {
        speaker: 'bartholomew',
        text: 'The desk. This is where we start. Look carefully — but um — everything matters.',
        murphyEmotion: 'neutral'
      }
    ]
  }
}

function CharacterPortrait({ speaker, murphyEmotion }) {
  const getMurphyImage = () => {
    switch(murphyEmotion) {
      case 'sleeping': return '/murphys-scrapbook/characters/murphy-sleeping.png'
      case 'shocked':  return '/murphys-scrapbook/characters/murphy-shocked.png'
      default:         return '/murphys-scrapbook/characters/murphy-neutral.png'
    }
  }

  return (
    <div className={`dialogue-portrait portrait-${speaker}`}>
      {speaker === 'murphy' ? (
        <img src={getMurphyImage()} alt={`murphy ${murphyEmotion}`} className="portrait-img" />
      ) : (
        <div className="portrait-placeholder">🦈</div>
      )}
    </div>
  )
}

function DialogueBox({ dialogue, onClose, onSetDialogue }) {
  const [currentLine, setCurrentLine] = useState(0)

  const script = DIALOGUES[dialogue]
  if (!script) return null

  const line = script.lines[currentLine]
  const isLastLine = currentLine === script.lines.length - 1

  const handleNext = () => {
    if (isLastLine) {
      onClose()
      setCurrentLine(0)
    } else {
      setCurrentLine(prev => prev + 1)
    }
  }

  return (
    <div className="dialogue-overlay">
      <div className={`dialogue-box speaker-is-${line.speaker}`}>
        <CharacterPortrait speaker={line.speaker} murphyEmotion={line.murphyEmotion} />
        <div className="dialogue-content">
          <div className={`dialogue-speaker ${line.speaker}`}>
            {line.speaker === 'bartholomew' ? 'bartholomew' : 'murphy'}
          </div>
          {line.korean && (
            <div className="dialogue-korean">{line.korean}</div>
          )}
          <div className="dialogue-text">
            {line.text}
          </div>
          <button className="dialogue-next" onClick={handleNext}>
            {isLastLine ? '[ close ]' : '[ next ▶ ]'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DialogueBox
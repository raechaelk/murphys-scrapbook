// Room.jsx — the bedroom scene
// 🎓 REACT LESSON: props are received as a parameter object
// we "destructure" them: { roomState, onUpdateRoom, onSetDialogue }
// means: pull these three things out of the props object

function Room({ roomState, onUpdateRoom, onSetDialogue }) {
  return (
    <div className="room">

      {/* THE BACKGROUND — dark night room */}
      <div className="room-bg" />

      {/* THE WINDOW — dark outside, rain */}
      <div className="window">
        <div className="window-rain" />
        {/* city lights outside */}
        <div className="city-lights" />
      </div>

      {/* THE LAMP — always on, brightest point */}
      <div className="lamp">
        <div className="lamp-base" />
        <div className="lamp-glow" />
      </div>

      {/* CANDLES — start off, light up as pages are found */}
      {/* 🎓 REACT LESSON: roomState.candleOne comes from App.jsx via props */}
      {/* the className changes based on state — candle vs candle lit */}
      <div className={`candle candle-one ${roomState.candleOne ? 'lit' : ''}`}>
        <div className="candle-flame" />
      </div>
      <div className={`candle candle-two ${roomState.candleTwo ? 'lit' : ''}`}>
        <div className="candle-flame" />
      </div>

      {/* FAIRY LIGHTS — unlock after page 1 */}
      {roomState.fairyLights && (
        <div className="fairy-lights">
          {/* 🎓 REACT LESSON: Array.from creates an array of 20 items */}
          {/* .map() turns each item into a light bulb div */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="fairy-light-bulb" 
              style={{ animationDelay: `${i * 0.15}s` }} 
            />
          ))}
        </div>
      )}

      {/* THE DESK — clickable area, zooms in */}
      <div className="desk" onClick={() => onSetDialogue('desk-zoom')}>

        {/* MURPHY — asleep at the desk */}
        <div className="murphy-sprite sleeping">
          {/* placeholder — your procreate art goes here later */}
          <div className="placeholder-murphy">🦫</div>
        </div>

        {/* DESK OBJECTS — placeholders for now */}
        <div className="desk-objects">
          <div className="desk-object coffee-cup">☕</div>
          <div className="desk-object calendar">📅</div>
          <div className="desk-object photo-strip">📷</div>
          <div className="desk-object grey-bear">🐻</div>
          <div className="desk-object scrapbook">📖</div>
        </div>

      </div>

      {/* BARTHOLOMEW — off to the side */}
      <div className="bartholomew-sprite">
        <div className="placeholder-bartholomew">🦈</div>
      </div>

    </div>
  )
}

export default Room
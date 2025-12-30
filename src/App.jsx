import { useState, useEffect, useRef } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function Clock() {
  const [breaks, setBreaks] = useState(5);
  const [sessions, setSessions] = useState(25);
  
  const [isPlaying, setPlaying] = useState(false);
  const [time, setTime] = useState(sessions * 60);
  
  const [label, setLabel] = useState("Session");
  let timer = useRef(null);
  
  const reset = () => {
    clearInterval(timer.current);
    setPlaying(false);
    setLabel("Session");
    setBreaks(5);
    setSessions(25);
    setTime(25 * 60);
  };
  
  const upDown = (val) => {
    if(!isPlaying){
    
      if ((breaks === 1 && val === "bd") || (breaks === 60 && val === "bi")) {
        return;
      }

      if ((sessions === 1 && val === "sd") || (sessions === 60 && val === "si")) {
        return;
      } 

      if (val === "bd") {
        setBreaks(breaks - 1);
      } else if (val === "bi") {
        setBreaks(breaks + 1);
      } else if (val === "sd") {
        setSessions(sessions - 1);
        setTime((sessions - 1) * 60);
      } else if (val === "si") {
        setSessions(sessions + 1);
        setTime((sessions + 1) * 60);
      } 
    }
  }
  
  const playPause = () => {
   setPlaying(prev => !prev);
 }
  
  const updateBreak = () => {
    if (label === "Session") {
      setTime(breaks * 60);
      setLabel("Break");
    } 
    if(label === "Break") {
      setTime(sessions * 60);
      setLabel("Session");
    }  
  }

  const playSound = () => {
    const audio = document.getElementById("beep");
    audio.currentTime = 0;
    audio.play();
  }
  
  useEffect(() => {
    if(!isPlaying) return;
    
      timer.current = setInterval(() => {
        setTime(prev => {
          if(prev <= 1) {
          updateBreak();
          playSound();
          return prev;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer.current);
  }, [isPlaying, label]);

  
  return (
    <div className="main container-fluid">
      <h1 id="title">25 + 5 Clock</h1>
      <div className="con-1">
        <div className="labels">
          <h2 id="break-label">Break Length</h2>
          <h2 id="session-label">Session Length</h2>
        </div>
        <div className="bs">
          <p id="break-length">{breaks}</p>
          <p id="session-length">{sessions}</p>
        </div>
        <div className="ud-buttons">
          <button className="btn btn-secondary" id="break-decrement" onClick={() => upDown("bd")}>-1</button>
          <button className="btn btn-secondary" id="break-increment" onClick={() => upDown("bi")}>+1</button>
          <button className="btn btn-secondary" id="session-decrement" onClick={() => upDown("sd")}>-1</button>
          <button className="btn btn-secondary" id="session-increment" onClick={() => upDown("si")}>+1</button>
        </div>
      </div>
      
      <div className="con-2">
        <h2 id="timer-label">{label}</h2>
        <p id="time-left">{String(Math.floor(time / 60)).padStart(2, "0")}:{String(time % 60).padStart(2, "0")}</p>
        <audio id="beep" src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3" preload="auto"></audio>
        <div className="controls">
          <button id="reset" className="btn btn-danger" onClick={reset}>Reset</button>
          <button id="start_stop" className="btn btn-warning" onClick={playPause}>Play / Pause</button>
        </div>
      </div>
    </div>
  )
}

export default Clock;

// Globals
import "./styles.scss";
import React, { useState, useEffect } from "react";
// Components
import { Button } from "components/Button";
// Sub-component
function Expired() {
  return (
    <div className="aura-expired">
      <div className="aura-expired-emoji">⚠️</div>
      <div className="aura-expired-text">Timer expired!</div>
    </div>
  );
}

// Component
function Timer() {
  const [counter, setCounter] = useState('00');
  const [isActive, setIsActive] = useState(false);

  const startTimer = () => {
    setCounter('60');
    setIsActive(true);
  }
  const reset = () => {
    setCounter('60');
    setIsActive(false);
  }
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if(+counter === 0){
          setIsActive(false);
        } else {
          setCounter(counter => {
            if(+counter < 10){
              return `0${+counter - 1}`;
            } else {
              return `${+counter - 1}`;
            }
          });
        }
      }, 1000);
    } else if (!isActive && +counter !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, counter]);


  // Render
  return (
    <div className="aura-page aura-timer">
      <h1>Timer</h1>

      <div className="aura-page-content">
        <div className="aura-timer-clock">{counter === '60' ? `1:00` : `0:${counter}`}</div>
        {+counter <= 0 ? <Expired /> : null}

        <div className="aura-timer-buttons">
          <Button onClick={startTimer}>Start</Button>
          <Button onClick={reset}>Reset</Button>
        </div>
      </div>
    </div>
  );
}

export { Timer };

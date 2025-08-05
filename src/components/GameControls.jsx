import React from 'react';
import { GAME_STATES } from '../utils/constants.js';
import '../styles/GameControls.css';

const GameControls = ({ gameState, onPause, onRestart }) => {
  
  if (gameState === GAME_STATES.PLAYING) {
    return (
      <div className="game-controls">
        <button onClick={onPause} className="btn btn-warning">
          ⏸️ Pause
        </button>
        <button onClick={onRestart} className="btn btn-secondary">
          🔄 Restart
        </button>
      </div>
    );
  }

  return null;
};

export default GameControls;
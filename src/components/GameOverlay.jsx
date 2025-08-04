import React from 'react';
import { GAME_STATES } from '../utils/constants.js';
import '../styles/GameOverlay.css';

const GameOverlay = ({ gameState, stats, onStart, onRestart }) => {
  
  if (!['start', 'gameOver', 'win', 'paused'].includes(gameState)) {
    return null;
  }

  const getOverlayContent = () => {
    switch (gameState) {
      case GAME_STATES.START:
        return {
          title: 'Brick Breaker',
          text: 'Click Play to start the game',
          buttonText: '▶️ Play',
          buttonClass: 'btn-primary',
          action: onStart,
        };
      case GAME_STATES.GAME_OVER:
        return {
          title: 'Game Over',
          text: `Final Score: ${stats.score}`,
          buttonText: '🔄 Play Again',
          buttonClass: 'btn-primary',
          action: onRestart,
        };
      case GAME_STATES.WIN:
        return {
          title: 'You Win!',
          text: `Congratulations! Score: ${stats.score}`,
          buttonText: '🔄 Play Again',
          buttonClass: 'btn-success',
          action: onRestart,
        };
      case GAME_STATES.PAUSED:
        return {
          title: 'Paused',
          text: '',
          buttonText: '▶️ Resume',
          buttonClass: 'btn-success',
          action: onStart,
        };
      default:
        return null;
    }
  };

  const content = getOverlayContent();
  if (!content) return null;

  return (
    <div className="game-overlay">
      <div className="overlay-content">
        <h1 className="overlay-title">{content.title}</h1>
        {content.text && <p className="overlay-text">{content.text}</p>}
        
        <button
          onClick={content.action}
          className={`btn ${content.buttonClass}`}
        >
          {content.buttonText}
        </button>
      </div>
    </div>
  );
};

export default GameOverlay;
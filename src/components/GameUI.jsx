import React from 'react';
import ScoreDisplay from './ScoreDisplay.jsx';
import LivesDisplay from './LivesDisplay.jsx';
import GameControls from './GameControls.jsx';
import GameOverlay from './GameOverlay.jsx';
import '../styles/GameUI.css';

const GameUI = ({ gameState, stats, onStart, onPause, onRestart }) => {
  return (
    <div className="game-ui" data-testid="game-ui">
      {/* Header with score and lives */}
      <div className="game-header">
        <ScoreDisplay score={stats.score} />
        <LivesDisplay lives={stats.lives} />
      </div>

      {/* Game controls */}
      <GameControls
        gameState={gameState}
        onStart={onStart}
        onPause={onPause}
        onRestart={onRestart}
      />

      {/* Overlay for different game states */}
      <GameOverlay
        gameState={gameState}
        stats={stats}
        onStart={onStart}
        onRestart={onRestart}
      />

      {/* Instructions */}
      <div className="instructions">
        <p>Use mouse to control paddle • Spacebar to launch ball</p>
        <p>Break all bricks to win • Don't let the ball fall!</p>
      </div>
    </div>
  );
};

export default GameUI;
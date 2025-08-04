import React, { useState, useCallback, useEffect } from 'react';
import GameCanvas from './GameCanvas.jsx';
import GameUI from './GameUI.jsx';
import { useGameState } from '../hooks/useGameState.js';
import { useGameLoop } from '../hooks/useGameLoop.js';
import { GAME_CONFIG, GAME_STATES } from '../utils/constants.js';
import '../styles/BrickBreaker.css';

const BrickBreaker = () => {
  const {
    gameState,
    setGameState,
    ball,
    setBall,
    paddle,
    setPaddle,
    bricks,
    setBricks,
    stats,
    resetGame,
    updateScore,
    loseLife,
  } = useGameState();

  const [mouseX, setMouseX] = useState(GAME_CONFIG.CANVAS_WIDTH / 2);

  useGameLoop({
    gameState,
    setGameState,
    ball,
    setBall,
    paddle,
    setPaddle,
    bricks,
    setBricks,
    stats,
    updateScore,
    loseLife,
    mouseX,
  });

  const handleMouseMove = useCallback((event) => {
    if (gameState === GAME_STATES.PLAYING) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const scaleX = GAME_CONFIG.CANVAS_WIDTH / rect.width;
      setMouseX(x * scaleX);
    }
  }, [gameState]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        if (gameState === GAME_STATES.START) {
          setGameState(GAME_STATES.PLAYING);
        } else if (gameState === GAME_STATES.PAUSED) {
          setGameState(GAME_STATES.PLAYING);
        }
      }
      
      if (event.code === 'Escape') {
        if (gameState === GAME_STATES.PLAYING) {
          setGameState(GAME_STATES.PAUSED);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, setGameState]);

  const handleStart = () => setGameState(GAME_STATES.PLAYING);
  const handlePause = () => setGameState(GAME_STATES.PAUSED);
  const handleRestart = () => {
    resetGame();
    setGameState(GAME_STATES.START);
  };

  return (
    <div className="brick-breaker">
      <div className="game-container" onMouseMove={handleMouseMove}>
        <GameCanvas
          width={GAME_CONFIG.CANVAS_WIDTH}
          height={GAME_CONFIG.CANVAS_HEIGHT}
          ball={ball}
          paddle={paddle}
          bricks={bricks}
        />
        <GameUI
          gameState={gameState}
          stats={stats}
          onStart={handleStart}
          onPause={handlePause}
          onRestart={handleRestart}
        />
      </div>
    </div>
    
  );
};

export default BrickBreaker;
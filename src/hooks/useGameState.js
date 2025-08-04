import { useState, useReducer, useCallback } from 'react';
import { GAME_STATES } from '../utils/constants.js';
import { createBall, createPaddle, createBricks } from '../utils/gameObjects.js';

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SCORE':
      return { ...state, score: state.score + action.payload };
    case 'LOSE_LIFE':
      return { ...state, lives: state.lives - 1 };
    case 'RESET_STATS':
      return { score: 0, lives: 3, level: 1 };
    default:
      return state;
  }
};

export const useGameState = () => {
  const [gameState, setGameState] = useState(GAME_STATES.START);
  const [ball, setBall] = useState(() => createBall());
  const [paddle, setPaddle] = useState(() => createPaddle());
  const [bricks, setBricks] = useState(() => createBricks());
  const [stats, dispatchStats] = useReducer(gameReducer, {
    score: 0,
    lives: 3,
    level: 1,
  });

  const resetGame = useCallback(() => {
    setBall(createBall());
    setPaddle(createPaddle());
    setBricks(createBricks());
    dispatchStats({ type: 'RESET_STATS' });
  }, []);

  const updateScore = useCallback((points) => {
    dispatchStats({ type: 'UPDATE_SCORE', payload: points });
  }, []);

  const loseLife = useCallback(() => {
    dispatchStats({ type: 'LOSE_LIFE' });
  }, []);

  return {
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
  };
};
import React, { useRef, useEffect } from 'react';
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Brick from './Brick.js';
import '../styles/GameCanvas.css';

const GameCanvas = ({ width, height, ball, paddle, bricks }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, width, height);

    // Render all bricks
    bricks.forEach((brick) => {
      Brick({ brick, ctx });
    });

    // Render paddle
    Paddle({ paddle, ctx });

    // Render ball
    Ball({ ball, ctx });

  }, [width, height, ball, paddle, bricks]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="game-canvas"
    />
  );
};

export default GameCanvas;
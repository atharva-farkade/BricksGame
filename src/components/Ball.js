import React from 'react';

const Ball = ({ ball, ctx }) => {
  if (!ctx || !ball) return null;

  // Draw ball with glow effect
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
  
  // Add glow effect
  ctx.shadowColor = '#22c55e';
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  return null;
};

export default Ball;
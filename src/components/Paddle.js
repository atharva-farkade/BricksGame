import React from 'react';

const Paddle = ({ paddle, ctx }) => {
  if (!ctx || !paddle) return null;

  // Draw paddle
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  
  // Add subtle border
  ctx.strokeStyle = '#d1d5db';
  ctx.lineWidth = 1;
  ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);

  return null;
};

export default Paddle;
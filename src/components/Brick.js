import React from 'react';

const Brick = ({ brick, ctx }) => {
  if (!ctx || !brick || !brick.visible) return null;

  // Draw brick
  ctx.fillStyle = brick.color;
  ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
  
  // Add border for better visibility
  ctx.strokeStyle = '#374151';
  ctx.lineWidth = 1;
  ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);

  return null;
};

export default Brick;
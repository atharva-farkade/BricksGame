import { GAME_CONFIG, BRICK_COLORS } from './constants.js';

export const createBall = () => ({
  x: GAME_CONFIG.CANVAS_WIDTH / 2,
  y: GAME_CONFIG.CANVAS_HEIGHT - 100,
  dx: GAME_CONFIG.BALL_SPEED,
  dy: -GAME_CONFIG.BALL_SPEED,
  radius: GAME_CONFIG.BALL_RADIUS,
});

export const createPaddle = () => ({
  x: GAME_CONFIG.CANVAS_WIDTH / 2 - GAME_CONFIG.PADDLE_WIDTH / 2,
  y: GAME_CONFIG.CANVAS_HEIGHT - 40,
  width: GAME_CONFIG.PADDLE_WIDTH,
  height: GAME_CONFIG.PADDLE_HEIGHT,
});

export const createBricks = () => {
  const bricks = [];
  const brickWidth = GAME_CONFIG.CANVAS_WIDTH / GAME_CONFIG.BRICK_COLS;
  
  for (let row = 0; row < GAME_CONFIG.BRICK_ROWS; row++) {
    for (let col = 0; col < GAME_CONFIG.BRICK_COLS; col++) {
      const colorIndex = Math.floor(row / 2);
      const brickColor = BRICK_COLORS[colorIndex] || BRICK_COLORS[2];
      
      bricks.push({
        id: `${row}-${col}`, // Unique identifier for each brick
        x: col * brickWidth,
        y: 60 + row * (GAME_CONFIG.BRICK_HEIGHT + 3),
        width: brickWidth - GAME_CONFIG.BRICK_PADDING,
        height: GAME_CONFIG.BRICK_HEIGHT,
        visible: true,
        color: brickColor.color,
        points: brickColor.points,
      });
    }
  }
  
  return bricks;
};
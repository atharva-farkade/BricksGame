// Single Responsibility Principle (SRP): This module has one responsibility - managing game constants
export const GAME_CONFIG = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  BALL_RADIUS: 8,
  BALL_SPEED: 4,
  PADDLE_WIDTH: 120,
  PADDLE_HEIGHT: 12,
  PADDLE_SPEED: 8,
  BRICK_ROWS: 6,
  BRICK_COLS: 10,
  BRICK_HEIGHT: 25,
  BRICK_PADDING: 2,
  INITIAL_LIVES: 3,
};

export const GAME_STATES = {
  START: 'start',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAME_OVER: 'gameOver',
  WIN: 'win',
};

export const BRICK_COLORS = [
  { color: '#ef4444', points: 30 }, // Red - highest points
  { color: '#f97316', points: 20 }, // Orange - medium points
  { color: '#22c55e', points: 10 }, // Green - lowest points
];
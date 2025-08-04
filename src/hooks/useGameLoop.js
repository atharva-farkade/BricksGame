import { useEffect, useRef, useCallback } from 'react';
import { GAME_CONFIG, GAME_STATES } from '../utils/constants.js';
import { CollisionDetector } from '../utils/collisionDetection.js';
import { createBall } from '../utils/gameObjects.js';

export const useGameLoop = ({
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
}) => {
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const updateGame = useCallback((time) => {
    if (gameState !== GAME_STATES.PLAYING) return;

    if (previousTimeRef.current !== undefined) {
      let newBall = { ...ball };
      let newBricks = bricks;

      // Update ball position
      newBall.x += newBall.dx;
      newBall.y += newBall.dy;

      // Wall collisions
      const wallCollisions = CollisionDetector.checkBallWallCollision(
        newBall,
        GAME_CONFIG.CANVAS_WIDTH,
        GAME_CONFIG.CANVAS_HEIGHT
      );
      if (wallCollisions.left || wallCollisions.right) {
        newBall.dx = -newBall.dx;
      }
      if (wallCollisions.top) {
        newBall.dy = -newBall.dy;
      }
      // Ball falls below paddle - lose life
      if (wallCollisions.bottom) {
        loseLife();
        if (stats.lives > 1) {
          setBall(createBall());
        } else {
          setGameState(GAME_STATES.GAME_OVER);
          setBall(newBall);
        }
        previousTimeRef.current = time;
        if (gameState === GAME_STATES.PLAYING) {
          requestRef.current = requestAnimationFrame(updateGame);
        }
        return;
      }

      // Update paddle position based on mouse
      setPaddle((prevPaddle) => {
        const newX = Math.max(
          0,
          Math.min(
            GAME_CONFIG.CANVAS_WIDTH - prevPaddle.width,
            mouseX - prevPaddle.width / 2
          )
        );
        return { ...prevPaddle, x: newX };
      });

      // Paddle collision
      if (CollisionDetector.checkBallPaddleCollision(newBall, paddle)) {
        newBall = CollisionDetector.handleBallPaddleCollision(newBall, paddle);
      }

      // Brick collision 
      const brickHitIndex = bricks.findIndex(
        (brick) => brick.visible && CollisionDetector.checkBallBrickCollision(newBall, brick)
      );
      if (brickHitIndex !== -1) {
        const brick = bricks[brickHitIndex];
        newBall = CollisionDetector.handleBallBrickCollision(newBall, brick);
        updateScore(brick.points);
        newBricks = bricks.map((b, idx) =>
          idx === brickHitIndex ? { ...b, visible: false } : b
        );
      }

      // Check win
      const visibleBricks = newBricks.filter((brick) => brick.visible);
      if (visibleBricks.length === 0) {
        setGameState(GAME_STATES.WIN);
      }

      // Commit state updates
      setBall(newBall);
      setBricks(newBricks);
    }

    previousTimeRef.current = time;
    if (gameState === GAME_STATES.PLAYING) {
      requestRef.current = requestAnimationFrame(updateGame);
    }
  }, [
    gameState,
    setGameState,
    setBall,
    setPaddle,
    setBricks,
    paddle,
    stats.lives,
    updateScore,
    loseLife,
    mouseX,
  ]);

  useEffect(() => {
    if (gameState === GAME_STATES.PLAYING) {
      requestRef.current = requestAnimationFrame(updateGame);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [gameState, updateGame]);
};

export class CollisionDetector {
  
  static checkBallWallCollision(ball, canvasWidth, canvasHeight) {
    const collisions = {
      left: ball.x <= ball.radius,
      right: ball.x >= canvasWidth - ball.radius,
      top: ball.y <= ball.radius,
      bottom: ball.y >= canvasHeight,
    };
    
    return collisions;
  }

  static checkBallPaddleCollision(ball, paddle) {
    return (
      ball.x + ball.radius > paddle.x &&
      ball.x - ball.radius < paddle.x + paddle.width &&
      ball.y + ball.radius > paddle.y &&
      ball.y - ball.radius < paddle.y + paddle.height
    );
  }

  static checkBallBrickCollision(ball, brick) {
    if (!brick.visible) return false;
    
    return (
      ball.x + ball.radius > brick.x &&
      ball.x - ball.radius < brick.x + brick.width &&
      ball.y + ball.radius > brick.y &&
      ball.y - ball.radius < brick.y + brick.height
    );
  }

  static handleBallPaddleCollision(ball, paddle) {
    const paddleCenter = paddle.x + paddle.width / 2;
    const ballRelativePosition = (ball.x - paddleCenter) / (paddle.width / 2);
    
    return {
      ...ball,
      dy: -Math.abs(ball.dy), 
      dx: ball.dx + ballRelativePosition * 2, 
    };
  }

  static handleBallBrickCollision(ball, brick) {
    // Determine collision side for bounce
    const ballCenterX = ball.x;
    const ballCenterY = ball.y;
    const brickCenterX = brick.x + brick.width / 2;
    const brickCenterY = brick.y + brick.height / 2;
    
    const dx = ballCenterX - brickCenterX;
    const dy = ballCenterY - brickCenterY;
    
    const width = (brick.width + ball.radius * 2) / 2;
    const height = (brick.height + ball.radius * 2) / 2;
    
    const crossWidth = width * dy;
    const crossHeight = height * dx;
    
    let newDx = ball.dx;
    let newDy = ball.dy;
    
    // Determine which side was hit top or bottom
    if (Math.abs(crossWidth) > Math.abs(crossHeight)) {
      newDy = -newDy;
    } else {
      newDx = -newDx;
    }
    
    return { ...ball, dx: newDx, dy: newDy };
  }
}
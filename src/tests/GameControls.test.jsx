import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GameControls from '../components/GameControls.jsx';
import { GAME_STATES } from '../utils/constants.js';

describe('GameControls component', () => {
  test('renders Pause and Restart when gameState is PLAYING', () => {
    const onPause = jest.fn();
    const onRestart = jest.fn();

    render(
      <GameControls
        gameState={GAME_STATES.PLAYING}
        onStart={() => {}}
        onPause={onPause}
        onRestart={onRestart}
      />
    );

    const pauseButton = screen.getByText(/pause/i);
    const restartButton = screen.getByText(/restart/i);

    expect(pauseButton).toBeInTheDocument();
    expect(restartButton).toBeInTheDocument();
  });

  test('calls onPause when Pause button is clicked', () => {
    const onPause = jest.fn();
    const onRestart = jest.fn();

    render(
      <GameControls
        gameState={GAME_STATES.PLAYING}
        onStart={() => {}}
        onPause={onPause}
        onRestart={onRestart}
      />
    );

    const pauseButton = screen.getByText(/pause/i);
    fireEvent.click(pauseButton);
    expect(onPause).toHaveBeenCalledTimes(1);
  });

  test('calls onRestart when Restart button is clicked', () => {
    const onPause = jest.fn();
    const onRestart = jest.fn();

    render(
      <GameControls
        gameState={GAME_STATES.PLAYING}
        onStart={() => {}}
        onPause={onPause}
        onRestart={onRestart}
      />
    );

    const restartButton = screen.getByText(/restart/i);
    fireEvent.click(restartButton);
    expect(onRestart).toHaveBeenCalledTimes(1);
  });

  test('renders nothing when gameState is not PLAYING', () => {
    const { container } = render(
      <GameControls
        gameState={GAME_STATES.PAUSED}
        onStart={() => {}}
        onPause={() => {}}
        onRestart={() => {}}
      />
    );

    // The component returns null, so container should be empty
    expect(container.firstChild).toBeNull();
  });
});

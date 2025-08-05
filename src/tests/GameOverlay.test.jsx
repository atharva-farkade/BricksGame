import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GameOverlay from '../components/GameOverlay.jsx';
import { GAME_STATES } from '../utils/constants.js';

const defaultStats = { score: 42 };

describe('GameOverlay component', () => {
  test('render start overlay and calls onStart', () => {
    const onStart = jest.fn();
    render(
      <GameOverlay
        gameState={GAME_STATES.START}
        stats={defaultStats}
        onStart={onStart}
        onRestart={() => {}}
      />
    );

    expect(screen.getByRole('heading', { name: /brick breaker/i })).toBeInTheDocument();
    expect(screen.getByText(/click play to start the game/i)).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /play/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  test('render game over overlay with score and calls onRestart', () => {
    const onRestart = jest.fn();
    render(
      <GameOverlay
        gameState={GAME_STATES.GAME_OVER}
        stats={defaultStats}
        onStart={() => {}}
        onRestart={onRestart}
      />
    );

    expect(screen.getByRole('heading', { name: /game over/i })).toBeInTheDocument();
    expect(screen.getByText(/final score: 42/i)).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /play again/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onRestart).toHaveBeenCalledTimes(1);
  });

  test('render win overlay with congratulations and calls onRestart', () => {
    const onRestart = jest.fn();
    render(
      <GameOverlay
        gameState={GAME_STATES.WIN}
        stats={defaultStats}
        onStart={() => {}}
        onRestart={onRestart}
      />
    );

    expect(screen.getByRole('heading', { name: /you win!/i })).toBeInTheDocument();
    expect(screen.getByText(/congratulations! score: 42/i)).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /play again/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onRestart).toHaveBeenCalledTimes(1);
  });

  test('render paused overlay and calls onStart (resume)', () => {
    const onStart = jest.fn();
    render(
      <GameOverlay
        gameState={GAME_STATES.PAUSED}
        stats={defaultStats}
        onStart={onStart}
        onRestart={() => {}}
      />
    );

    expect(screen.getByRole('heading', { name: /paused/i })).toBeInTheDocument();
    // paused has no extra text besides title
    const button = screen.getByRole('button', { name: /resume/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  test('render nothing when gameState is not one of the overlay states', () => {
    const { container } = render(
      <GameOverlay
        gameState="PLAYING"
        stats={defaultStats}
        onStart={() => {}}
        onRestart={() => {}}
      />
    );
    expect(container.firstChild).toBeNull();
  });
});

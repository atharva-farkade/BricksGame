import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BrickBreaker from '../components/BrickBreaker.jsx'

describe('BrickBreaker Component', () => {
  test('renders game container', () => {
    render(<BrickBreaker />);
    expect(screen.getByRole('presentation', { hidden: true })).toBeInTheDocument();
  });

  test('renders GameCanvas and GameUI', () => {
    render(<BrickBreaker />);
    expect(screen.getByTestId('game-canvas')).toBeInTheDocument();
    expect(screen.getByTestId('game-ui')).toBeInTheDocument();
  });

  test('starts game on start button click', () => {
    render(<BrickBreaker />);
    const startButton = screen.getByText(/start/i);
    fireEvent.click(startButton);
    // You can add more assertions based on game state changes
  });
});
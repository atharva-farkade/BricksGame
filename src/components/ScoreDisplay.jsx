import React from 'react';
import '../styles/ScoreDisplay.css';

const ScoreDisplay = ({ score }) => {
  return (
    <div className="score-display">
      <span className="score-label">Score:</span>
      <span className="score-value">{score}</span>
    </div>
  );
};

export default ScoreDisplay;
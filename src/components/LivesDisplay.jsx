import React from 'react';
import '../styles/LivesDisplay.css';

const LivesDisplay = ({ lives }) => {
  const renderHearts = () => {
    return Array.from({ length: lives }).map((_, i) => (
      <span key={i} className="heart">❤️</span>
    ));
  };

  return (
    <div className="lives-display">
      {renderHearts()}
    </div>
  );
};

export default LivesDisplay;
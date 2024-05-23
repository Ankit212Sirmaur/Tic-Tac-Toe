import React from 'react';

interface SquareProps {
  value: string;
  onClick: () => void;
  highlight: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, highlight }) => {
  return (
    <button
      className={`square ${highlight ? 'highlight' : ''}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;

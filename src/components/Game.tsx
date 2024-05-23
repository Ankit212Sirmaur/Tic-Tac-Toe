import React, { useState } from 'react';
import Board from './Board';

const Game: React.FC = () => {
  const [history, setHistory] = useState<{ squares: string[], location: [number, number] }[]>([
    { squares: Array(9).fill(''), location: [-1, -1] }
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [ascendingOrder, setAscendingOrder] = useState(true);

  const current = history[stepNumber];
  const winnerInfo = calculateWinner(current.squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningSquares = winnerInfo ? winnerInfo.line : [];

  const handleClick = (i: number) => {
    const historyUpToNow = history.slice(0, stepNumber + 1);
    const current = historyUpToNow[historyUpToNow.length - 1];
    const squares = current.squares.slice();

    if (winner || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(historyUpToNow.concat([{ squares: squares, location: [Math.floor(i / 3), i % 3] }]));
    setStepNumber(historyUpToNow.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  };

  const toggleSortOrder = () => {
    setAscendingOrder(!ascendingOrder);
  };

  const moves = history.map((step, move) => {
    const desc = move ?
      `Go to move #${move} (${step.location[0]}, ${step.location[1]})` :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {move === stepNumber ? <strong>You are at move #{move}</strong> : desc}
        </button>
      </li>
    );
  });

  const sortedMoves = ascendingOrder ? moves : moves.reverse();

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (stepNumber === 9) {
    status = 'Result: Draw';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          winningSquares={winningSquares}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={toggleSortOrder}>
          {ascendingOrder ? 'Sort Descending' : 'Sort Ascending'}
        </button>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
};

// Helper function to calculate winner
function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}

export default Game;

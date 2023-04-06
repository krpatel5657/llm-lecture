import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setPlayer(player === 'X' ? 'O' : 'X');
    checkForWinner(newBoard);
  };

  const checkForWinner = (board) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes(null)) {
      setWinner('draw');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer('X');
    setWinner(null);
  };

  return (
    <div className="app">
      <h1 className="title">Tic Tac Toe</h1>
      {winner ? (
        <h2 className="winner">{winner === 'draw' ? 'Draw!' : `${winner} wins!`}</h2>
      ) : (
        <h2 className="player">{`Player ${player}'s turn`}</h2>
      )}
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className={`cell ${cell}`} onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default App;

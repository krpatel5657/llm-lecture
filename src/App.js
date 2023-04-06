import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  function handleClick(index) {
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setPlayer(player === 'X' ? 'O' : 'X');
    setWinner(calculateWinner(newBoard));
  }

  function calculateWinner(board) {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (board.every((cell) => cell !== null)) {
      return 'draw';
    }
    return null;
  }

  function handleReset() {
    setBoard(Array(9).fill(null));
    setPlayer('X');
    setWinner(null);
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div className={`cell ${cell}`} key={index} onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      <div className="status">
        {winner ? (
          winner === 'draw' ? (
            <div>It's a draw!</div>
          ) : (
            <div>
              {winner} wins!
              <button onClick={handleReset}>Play again</button>
            </div>
          )
        ) : (
          <div>Current player: {player}</div>
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./styles.css";

const initialBoard = [
    [1,0,0,0,5,6,7,0,9],
    [3,0,5,0,8,0,1,0,6],
    [0,8,0,1,2,0,0,0,5],
    [0,3,0,0,6,7,0,9,0],
    [5,0,7,0,0,1,2,0,4],
    [0,0,1,0,3,4,5,6,0],
    [9,5,0,0,1,2,0,7,8],
    [0,7,2,9,0,0,0,0,0],
    [6,0,0,0,0,0,0,0,0],
  
];

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [message, setMessage] = useState("");

  const handleChange = (row, col, value) => {
    const intVal = parseInt(value);
    if (value === "" || (intVal >= 1 && intVal <= 9)) {
      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = value === "" ? 0 : intVal;
      setBoard(newBoard);
      setMessage("");
    }
  };

  const isConflict = (row, col, value) => {
    if (value === 0) return false;

    for (let i = 0; i < 9; i++) {
      if (i !== col && board[row][i] === value) return true;
      if (i !== row && board[i][col] === value) return true;
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if ((i !== row || j !== col) && board[i][j] === value) return true;
      }
    }

    return false;
  };

  const checkCompletion = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const val = board[row][col];
        if (val === 0 || isConflict(row, col, val)) {
          setMessage("Puzzle incomplet sau invalid.");
          return;
        }
      }
    }
    setMessage("Felicitări, Sudoku complet!");
  };
  
  const resetBoard = () => {
    setBoard(initialBoard);
    setMessage("");
  };
  
  const Cell = ({ value, row, col }) => {
    const conflict = isConflict(row, col, value);
    const readOnly = initialBoard[row][col] !== 0;
  
    return (
      <input
        type="text"
        value={value === 0 ? "" : value}
        onChange={(e) => handleChange(row, col, e.target.value)}
        maxLength="1"
        className={`cell ${conflict ? "conflict" : ""}`}
        readOnly={readOnly}
      />
    );
  };

  return (
    <div className="App">
      <h1>Sudoku</h1>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cellValue, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                value={cellValue}
                row={rowIndex}
                col={colIndex}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={checkCompletion}>Check</button>
        <button onClick={resetBoard}>Reset</button>
      </div>
      <p className="message">{message}</p>
    </div>
  );
}
  
  export default App;
  
import React, { useEffect, useState } from "react";
import Square from "./Square";
import "./Board.css";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [board, setBoard] = useState([]);
  const [toggleValue, setToggleValue] = useState(true);

  const calcuateWinner = (squares) => {
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

    for (let index = 0; index < lines.length; index++) {
      const [a, b, c] = lines[index];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calcuateWinner(squares);
  let status;
  if (winner) {
    status = "Winner:" + winner;
  } else {
    status = `Next Player : ${toggleValue ? "X" : "O"}`;
  }

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calcuateWinner(newSquares) || newSquares[i]) {
      return window.alert(`GameOver, ${winner}의 승리입니다.`);
    }
    newSquares[i] = toggleValue ? "X" : "O";
    setSquares(newSquares);
    setToggleValue((prev) => !prev);
  };

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 9; i++) {
      arr.push(i);
    }
    setBoard(arr);
  }, []);

  return (
    <React.Fragment>
      <div className="status">{status}</div>
      <div className="board">
        {board.map((i) => {
          return (
            <React.Fragment key={i}>
              <Square value={squares[i]} onClick={() => handleClick(i)} />
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Board;

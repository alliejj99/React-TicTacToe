import React, { useEffect, useState } from "react";
import Square from "./Square";
import "./Board.css";

const Board = ({ squares, onClick }) => {
  const [board, setBoard] = useState([]);
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 9; i++) {
      arr.push(i);
    }
    setBoard(arr);
  }, []);

  return (
    <div className="board-wrapper">
      <div className="board">
        {board.map((i) => {
          return (
            <React.Fragment key={i}>
              <Square value={squares[i]} onClick={() => onClick(i)} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Board;

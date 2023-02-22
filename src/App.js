import React, { useState } from "react";
import Board from "./components/Board";
import "./App.css";

function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [toggleValue, setToggleValue] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const calculateWinner = (squares) => {
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

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  let status;
  if (winner) {
    status = "Winner:" + winner;
  } else {
    status = `Next Player : ${toggleValue ? "X" : "O"}`;
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1); // history 저장
    const newCurrent = newHistory[newHistory.length - 1]; // histor에 저장된 내용 앞으로 이동
    const newSquares = newCurrent.squares.slice(); // 버튼 클릭했던 해당 시점으로 배열 불러오기
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = toggleValue ? "X" : "O";
    setHistory([...newHistory, { squares: newSquares }]);
    setToggleValue((prev) => !prev);

    setStepNumber(newHistory.length);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setToggleValue(step % 2 === 0);
    /* setToggleValue(step % 2 === 0);
     * => stepNumber를 업데이트 하기 위해 jumpto를 정의해주기
     * stepNumber가 짝수일 때마다 toggleValue를 true로 설정
     */
  };

  const moves = history.map((step, move) => {
    const desc = move ? "Go To Move #" + move : "Go To Game Reset";
    return (
      <li key={move}>
        <button className="move-button " onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ul>{moves}</ul>
      </div>
    </div>
  );
}

export default App;

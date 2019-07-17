import React, { useState, useEffect } from "react";
import "./App.css";
import Grid from "./components/Grid/Grid";

function App() {
  const [grid, setGrid] = useState([]);
  const [changeState, setChangeState] = useState(false);
  const [stop, setStop] = useState(false);
  const [generation, setGeneration] = useState(0);

  // Create rows and columns with zeros
  useEffect(() => {
    let testArr = [];
    for (let i = 0; i < 15; i++) {
      testArr[i] = [];
      for (let j = 0; j < 15; j++) {
        testArr[i][j] = 0;
      }
    }
    setGrid(testArr);
  }, []);

  let timerId;

  const startGame = e => {
    e.preventDefault();
    timerId = setInterval(gameOfLife, 500);
  };

  const stopGame = e => {
    e.preventDefault();
    clearInterval(timerId);
    console.log("stopped");
  };

  const gameOfLife = () => {
    const newGrid = [];
    const length = grid.length;
    for (let row = 0; row < length; row++) {
      newGrid.push([]);
      for (let col = 0; col < length; col++) {
        const neighbors = getNeighbors(grid, row, col);
        if (neighbors === 3 && !grid[row][col]) {
          newGrid[row][col] = 1;
        } else if ((neighbors === 2 || neighbors === 3) && grid[row][col]) {
          newGrid[row][col] = 1;
        } else {
          newGrid[row][col] = 0;
        }
      }
    }
    setGrid(newGrid);
    setGeneration(generation + 1);
  };

  const getNeighbors = (board, i, j) => {
    const length = board.length;
    let count = 0;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (!x && !y) {
          continue;
        }
        const ix = i + x;
        const jy = j + y;
        if (ix >= 0 && ix < length && jy >= 0 && jy < length) {
          if (board[ix][jy]) {
            count++;
          }
        }
      }
    }
    return count;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Game Of Life</h2>
        <p>{generation}</p>
        <Grid
          grid={grid}
          setGrid={setGrid}
          changeState={changeState}
          setChangeState={setChangeState}
        />
        <div>
          <button onClick={e => startGame(e)}>Start!</button>
          <button onClick={e => stopGame(e)}>Stop!</button>
        </div>
      </header>
    </div>
  );
}

export default App;

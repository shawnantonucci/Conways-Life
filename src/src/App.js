import React, { useState, useEffect } from "react";
import "./App.css";
import Grid from "./components/Grid/Grid";

function App() {
  const [grid, setGrid] = useState([]);

  // Create rows and columns with zeros
  useEffect(() => {
    let testArr = [];
    for (let i = 0; i < 15; i++) {
      testArr[i] = [];
      for (let j = 0; j < 15; j++) {
        testArr[i][j] = 0;
      }
    }
    // console.log(testArr, "From testArray");
    setGrid(testArr);
  }, []);
  // console.log(grid, "From useState");

  return (
    <div className="App">
      <header className="App-header">
        <h2>Game Of Life</h2>
        <Grid grid={grid} setGrid={setGrid} />
      </header>
    </div>
  );
}

export default App;

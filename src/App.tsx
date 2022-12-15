import React, { useState } from "react";
import "./App.css";

type Point = {
  x: number;
  y: number;
};

function App() {
  const [points, setPoints] = useState<Point[]>([]);
  const [popped, setPopped] = useState<Point[]>([]);

  const handlePlaceCircle = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    setPoints([
      ...points,
      {
        x: clientX,
        y: clientY,
      },
    ]);
  };

  const handleUndo = () => {
    const newPoints = [...points];
    const poppedPoint = newPoints.pop();
    if (!poppedPoint) return;
    setPopped([...popped, poppedPoint]);
    setPoints(newPoints);
  };

  const handleRedo = () => {
    const newPopped = [...popped];
    const poppedPoint = newPopped.pop();
    if (!poppedPoint) return;
    setPoints([...points, poppedPoint]);
    setPopped(newPopped);
  };

  return (
    <>
      <div className="title">Click on the screen!</div>
      <button
        disabled={points.length === 0}
        onClick={handleUndo}
        className="button"
      >
        Undo
      </button>
      <button
        disabled={popped.length === 0}
        onClick={handleRedo}
        className="button"
      >
        Redo
      </button>
      <div className="App" onClick={handlePlaceCircle}>
        {points.map((point, idx) => (
          <div
            key={idx}
            className="point"
            style={{
              left: point.x + "px",
              top: point.y + "px",
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

export default App;

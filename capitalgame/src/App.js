import './App.css';
import DATA from './data';
import { useState, useEffect } from 'react';

export default function App() {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [id, setId] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  // Function to generate new data
  const generateData = () => {
    const newData = [];

    for (let key in DATA) {
      let obj1 = {};
      let obj2 = {};
      let common = Math.random();
      obj1.common = common;
      obj2.common = common;
      obj1.id = Math.random();
      obj2.id = Math.random();
      obj1.data = key;
      obj2.data = DATA[key];

      newData.push(obj1, obj2);
    }

    // Shuffle the array
    for (let i = newData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newData[i], newData[j]] = [newData[j], newData[i]];
    }

    return newData;
  };

  // useEffect to initialize data or reset when needed
  useEffect(() => {
    setData(generateData());  // Initial data generation
    setSelectedId(null);
    setId(null);
    setIsGameOver(false);  // Reset game over state
  }, []);  // Runs only once when the component mounts

  // Function to reset the game
  const resetGame = () => {
    setData(generateData());
    setSelectedId(null);
    setId(null);
    setIsGameOver(false); // Reset game over state
  };

  // Handle selection and game end logic
  const onSelect = (common, id) => {
    if (selectedId == null) {
      setSelectedId(common);
      setId(id);
      return;
    }

    if (selectedId !== common) {
      setSelectedId(null);
      setId(null);
      return;
    }

    if (selectedId === common) {
      let filteredData = data.filter(item => item.common !== selectedId);
      setId(id);

      setTimeout(() => {
        setData(filteredData);
        setSelectedId(null);
        setId(null);

        // Check if game is over (no more items to select)
        if (filteredData.length === 0) {
          setIsGameOver(true);  // Set game over state to true
        }
      }, 1000);
    }
  };

  return (
    <main>
      {/* Tab Buttons for the game */}
      <div className="tabs-container">
        {data.map((item, index) => (
          <button
            className={`tab-button ${item.id === id ? 'active' : ''}`}
            onClick={() => onSelect(item.common, item.id)}
            key={index}
          >
            {item.data}
          </button>
        ))}
      </div>

      {/* Game Over Notification */}
      {isGameOver && (
        <div className="game-over-message">
          <p>Game Over! You've matched all the pairs.</p>
        </div>
      )}

      {/* Reset Button */}
      {isGameOver && (
        <div className="reset-button-container">
          <button onClick={resetGame} className="reset-button">
            Restart Game
          </button>
        </div>
      )}
    </main>
  );
}

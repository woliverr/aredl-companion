import { useState, useEffect } from 'react'
import './App.css'

function App() {

// useStates
  const [levelList, setLevelList] = useState( () => {
    const oldData = JSON.parse(localStorage.getItem("levelList")) ?? []
    return oldData.map((item) => 
      typeof item === "string" ? { id: crypto.randomUUID(), name: item } : item
    );
  });
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) ?? true
  );
  const [editMode, setEditMode] = useState(false);
  const [levelInput, setLevelInput] = useState('');

// Update darkMode upon toggle
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

// Update levelList upon update
  useEffect(() => {
    localStorage.setItem("levelList", JSON.stringify(levelList))
  }, [levelList]);

  function addNewLevel(level){
    setLevelList([...levelList, { id: crypto.randomUUID(), name: level }]);
  }

// Submit level
  function submitLevel(event) {
    event.preventDefault();
    addNewLevel(levelInput);
    setLevelInput('');
  }

  function removeLevel(id) {
    setLevelList(levelList.filter(item => item.id !== id));
  }

  function moveLevel(id, direction){
    const index = levelList.findIndex((item) => item.id === id);
    const newIndex = index + direction;
    if (newIndex >=0 && newIndex < levelList.length) {
      setLevelList((currentList) => {
        const newList = [...currentList];
        [newList[index], newList[newIndex]] = [newList[newIndex], newList[index]];
        return newList;
      });
    }
  }

// Return function
  return (
    <div>
      <header>
        <h1>AREDL Companion</h1>
        <button type="button" id="theme-toggle" onClick={() => {
          setDarkMode(!darkMode);
          localStorage.setItem("darkMode", JSON.stringify(!darkMode));
          console.log(JSON.parse(darkMode));
        }}>Toggle Dark Theme</button>
      </header>
      <div>
        <div>
          <h1>My List</h1>
        </div>
          {levelList.map((level, index) => (
            <div className="level" key={level.id}>
              <h2>{index + 1}. {level.name}</h2>
              <div>
                <button type="button" onClick={() => removeLevel(level.id)}>X</button>
                <button type="button" onClick={() => moveLevel(level.id, -1)}>↑</button>
                <button type="button" onClick={() => moveLevel(level.id, 1)}>↓</button>
              </div>
            </div>
          ))}
      </div>
      <div className="new-level-container">
        <form id="new-level" onSubmit={submitLevel}>
          <input type="text" id="level-input" value={levelInput} onChange={(e) => setLevelInput(e.target.value)}/>
          <button type="submit" id="add-level">Add Level</button>
        </form>
      </div>
      <footer>
        <p>&copy; 2026 AREDL Companion. Made by William Oliver.</p>
      </footer>
    </div>
  )
}

export default App

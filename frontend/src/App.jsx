import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/header'
import Footer from './components/footer'
import LevelList from './components/LevelList'
import SearchApp from './components/SearchApp'

function App() {

// useStates

  const [isLoaded, setIsLoaded] = useState(false);
  const [levelList, setLevelList] = useState([]);

  useEffect(() => {
    loadData(0).then(() => setIsLoaded(true));
  }, []);

  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) ?? true
  );

// Debounced autosave
  useEffect(() => {
  if (!isLoaded) return;
  const timeoutId = setTimeout(() => {
    saveData(0, levelList);
  }, 1000);
  return () => clearTimeout(timeoutId);
}, [levelList, isLoaded]);

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
    if(isLoaded){
      localStorage.setItem("levelList", JSON.stringify(levelList))
    }
  }, [levelList]);

  function addNewLevel(level){
    setLevelList([...levelList, level]);
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

  async function loadData(userID) {
    const levels = await fetch(`http://localhost:5000/api/completions/${userID}`, {
      method: 'GET'
    })
    const data = await levels.json();
    const normalized = data.map(level => ({ ...level, id: level.level_id }));
    setLevelList(normalized);
  }

  async function saveData(userID, levelList){

    const levels = levelList.map(level => level.id)

    await fetch(`http://localhost:5000/api/completions/${userID}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(levels)
    })
  }

// Return function
  return (
    <div>
      <Header 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <button onClick={() => saveData(0, levelList)}> &gt;Save Data&lt; </button>
      <LevelList 
        levels={levelList} 
        removeFn={removeLevel} 
        moveFn={moveLevel} 
      />
      <SearchApp 
        submitFn={addNewLevel}/>
      <Footer />
    </div>
  )
}

export default App
 
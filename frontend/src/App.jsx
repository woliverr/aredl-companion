import { useState, useEffect } from 'react'
import './App.css'
import Header from '../components/header'
import Footer from '../components/footer'
import LevelList from '../components/LevelList'
import AddLevel from '../components/AddLevelForm'

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
      <Header 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <LevelList 
        levels={levelList} 
        removeFn={removeLevel} 
        moveFn={moveLevel} 
      />
      <AddLevel 
        submitFn={submitLevel} 
        formContents={levelInput} 
        updateFormFn={setLevelInput}  
      />
      <Footer />
    </div>
  )
}

export default App

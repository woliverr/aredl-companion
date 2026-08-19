/**
 * Main JavaScript file for web application
 */

// Add buttons to existing levels
document.querySelectorAll('.level').forEach(addRemoveButton);
document.querySelectorAll('.level').forEach(addUpButton);
document.querySelectorAll('.level').forEach(addDownButton);

// Initialize dark mode and add level buttons
const darkModeButton = document.getElementById('theme-toggle');
const addLevelButton = document.getElementById('add-level');
const newLevelContainer = document.getElementById('new-level-container')
const submissionForm = document.getElementById('new-level');

// Load levelList
let levelList = JSON.parse(localStorage.getItem("levelList")) ?? [];
drawList();

// List empty text
if (levelList.length === 0) {
    const text = document.createElement('p');
    text.textContent = "Welcome to the list. Add a level to get started!";
    document.body.insertBefore(text, newLevelContainer);
}

// Function to redraw the list
function drawList() {
    document.querySelectorAll('.level').forEach(level => level.remove());
    for (const level of levelList) {
        const newLevel = document.createElement('div');
        newLevel.classList.add('level');
    
        const header = document.createElement('h2');
        header.textContent = level;
        newLevel.appendChild(header);

        const buttonContainer = document.createElement('div');
        addRemoveButton(buttonContainer);
        addUpButton(buttonContainer);
        addDownButton(buttonContainer);
        newLevel.appendChild(buttonContainer);

        document.body.insertBefore(newLevel, newLevelContainer);
    }
    saveLevels();
    console.log(levelList);
}

// Add new level
submissionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('level-input');
    const name = input.value;
    console.log(name);
    levelList.push(name);
    saveLevels();
    drawList();
    e.target.reset();
});

// Remove level on button click
document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-level')) {

        // Find level position in the DOM using an array of all DOM level elements and then finding where the current level is.
        const level = event.target.closest('.level');
        const allLevels = Array.from(document.querySelectorAll('.level'));
        const levelPosition = allLevels.indexOf(level);

        level.remove();
        levelList.splice(levelPosition, 1);
        saveLevels();
    }
});

// Move level up on button click
document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('up-button')) {
        const level = event.target.closest('.level');
        const allLevels = Array.from(document.querySelectorAll('.level'));
        const levelPosition = allLevels.indexOf(level);
        
        if (levelList[levelPosition - 1]) {
            [levelList[levelPosition], levelList[levelPosition - 1]] = [levelList[levelPosition - 1], levelList[levelPosition]];
            saveLevels();
            drawList();
        }
    }
});

// Move level down on button click
document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('down-button')) {
        const level = event.target.closest('.level');
        const allLevels = Array.from(document.querySelectorAll('.level'));
        const levelPosition = allLevels.indexOf(level);
        
        if (levelList[levelPosition + 1]) {
            [levelList[levelPosition], levelList[levelPosition + 1]] = [levelList[levelPosition + 1], levelList[levelPosition]];
            saveLevels();
            drawList();
        }
    }
});

// Helper function to add a remove button to a level
function addRemoveButton(level) {
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-level');
    removeButton.type = 'button';
    removeButton.textContent = 'X';
    level.appendChild(removeButton);
}

// Helper function to add an up button to a level
function addUpButton(level) {
    const upButton = document.createElement('button');
    upButton.classList.add('up-button');
    upButton.type = 'button';
    upButton.textContent = '↑';
    level.appendChild(upButton);
}

// Helper function to add a down button to a level
function addDownButton(level) {
    const downButton = document.createElement('button');
    downButton.classList.add('down-button');
    downButton.type = 'button';
    downButton.textContent = '↓';
    level.appendChild(downButton);
}

//Save levels
function saveLevels() {
    localStorage.setItem("levelList", JSON.stringify(levelList));
}

// Dark mode toggle
darkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    // Set up and handle localStorage for dark mode preference
    if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('darkMode', 'false');
    } else {
        localStorage.setItem('darkMode', 'true');
    }
});

// Persistent dark mode
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.remove('light-mode');
} else {
    document.body.classList.add('light-mode');
}

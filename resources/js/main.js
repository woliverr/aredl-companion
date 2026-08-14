/**
 * Main JavaScript file for web application
 */


// Add buttons to existing levels
document.querySelectorAll('.level').forEach(addRemoveButton);
document.querySelectorAll('.level').forEach(addUpButton);
document.querySelectorAll('.level').forEach(addDownButton);

// Initialize buttons
const darkModeButton = document.getElementById('theme-toggle');
const addLevelButton = document.getElementById('add-level');

// Function to add a remove button to a level
function addRemoveButton(level) {
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-level');
    removeButton.type = 'button';
    removeButton.textContent = 'X';
    level.appendChild(removeButton);
}

// Function to add an up button to a level
function addUpButton(level) {
    const upButton = document.createElement('button');
    upButton.classList.add('up-button');
    upButton.type = 'button';
    upButton.textContent = '↑';
    level.appendChild(upButton);
}

// Function to add a down button to a level
function addDownButton(level) {
    const downButton = document.createElement('button');
    downButton.classList.add('down-button');
    downButton.type = 'button';
    downButton.textContent = '↓';
    level.appendChild(downButton);
}

// Dark mode toggle
darkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});

// Add new level
addLevelButton.addEventListener('click', () => {
    const name = prompt('Enter level name:');
    if (!name || !name.trim()) return;
    
    const newLevel = document.createElement('div');
    newLevel.classList.add('level');
    
    const header = document.createElement('h2');
    header.textContent = name;

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-level');
    removeButton.type = 'button';
    removeButton.textContent = 'X';

    newLevel.appendChild(header);
    newLevel.appendChild(removeButton);
    document.body.insertBefore(newLevel, addLevelButton);
});

// Remove level on button click
document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-level')) {
        event.target.closest('.level').remove();
    }
});
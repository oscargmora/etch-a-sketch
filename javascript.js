// Defaults for Window Startup //
const defaultSize = 16;
const defaultMode = 'classic';
const defaultColor = "#e8eaed";

// Variables that can change with user inputs. These start at default //
let currentColor = defaultColor;
let currentMode = defaultMode;
let size = defaultSize;
let repeater;
let mouseDown;

// Get Element Section //
let button = document.getElementsByClassName("button");
let classic = document.getElementById("classic");
let rainbow = document.getElementById("rainbow");
let shader = document.getElementById("shader");
let eraser = document.getElementById("eraser");
let clear = document.getElementById("clear");
let colorPicker = document.getElementById("color-picker");

// User Inputs that lead to functions //
classic.onclick = () => setCurrentMode('classic');
colorPicker.oninput = (e) => setCurrentColor(e.target.value);
rainbow.onclick = () => setCurrentMode('rainbow');
shader.onclick = () => setCurrentMode('shader');
eraser.onclick = () => setCurrentMode('eraser');
clear.onclick = () => reloadGrid();

// Mouse Click Variables. Needed to assign variables to mouse up and mouse down to keep the mouse as down, even when clicking and holding to another div. //
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// Function for changing colors depending on mode selected //
function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'classic') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'shader') {
        e.target.style.backgroundColor = '#e8eaed';
        console.log(e.target.count)
        e.target.count += 1;
        console.log(e.target.count)
        e.target.style.opacity = 0.2 * e.target.count;
        console.log(e.target.count);
        console.log(e.target.style.opacity);
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = 'black'
    };
  };

// Function for setting color from color picker //
function setCurrentColor(newColor) {
    currentColor = newColor;
};

// Function for grid setup. Takes the size from slider.oninput to assign the number of divs inside. Adds grid element count of 0 for shader. //
function setupGrid() {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    output.innerHTML = `${size} X ${size}`;
    for (let i = 0; i < size * size; i++) {
        let gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.style.background = "black";
        gridElement.count = 0;
        document.getElementById('grid').appendChild(gridElement);
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown', changeColor);
    };
};

// Code for clearing grid so that setup grid does not setup on pre-existing grid //
function clearGrid () {
    grid.innerHTML = '';
};

// Clears grid, then reloads grid to desired size //
function reloadGrid () {
    clearGrid();
    setupGrid();
};

// Function starts when button is clicked to set the new mode //
function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
};

// Changes between modes. Removes current mode being used and updates to new mode. //
function activateButton(newMode) {
    if (currentMode === 'rainbow') {
        rainbow.classList.remove('active')
    } else if (currentMode === 'classic') {
        classic.classList.remove('active')
    } else if (currentMode === 'shader') {
        shader.classList.remove('active')
    } else if (currentMode === 'eraser') {
        eraser.classList.remove('active')
    };
    if (newMode === 'rainbow') {
        rainbow.classList.add('active')
    } else if (newMode === 'color') {
        classic.classList.add('active')
    } else if (newMode === 'shader') {
        shader.classList.add('active')
    } else if (newMode === 'eraser') {
        eraser.classList.add('active')
    };
};

// Code for Slider //
let slider = document.getElementById('myRange');
let output = document.getElementById('demo');
output.innerHTML = slider.value;

slider.oninput = function() {
    size = this.value;
    output.innerHTML = `${size} X ${size}`;
};

// Code for reloading grid size after slider is changed //
slider.onchange = function() {
    clearGrid();
    setupGrid();
};

// Window Load Up. Back to Defaults. //
window.onload = () => {
    setupGrid(defaultSize);
    output.innerHTML = `${size} X ${size}`;
};
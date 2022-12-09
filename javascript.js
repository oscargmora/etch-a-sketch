const defaultSize = 16;
const defaultMode = 'classic';

let currentMode = defaultMode;

let button = document.getElementsByClassName("button");
let classic = document.getElementById("classic");
let rainbow = document.getElementById("rainbow");
let shader = document.getElementById("shader");
let eraser = document.getElementById("eraser");
let clear = document.getElementById("clear");

let size = defaultSize;
let repeater;
let mouseDown;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

classic.onclick = () => setCurrentMode('classic');
rainbow.onclick = () => setCurrentMode('rainbow');
shader.onclick = () => setCurrentMode('shader');
eraser.onclick = () => setCurrentMode('eraser');
clear.onclick = () => reloadGrid();

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'classic') {
        e.target.style.backgroundColor = '#e8eaed'
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

let slider = document.getElementById('myRange');
let output = document.getElementById('demo');
output.innerHTML = slider.value;

slider.oninput = function() {
    size = this.value;
    output.innerHTML = `${size} X ${size}`;
};

slider.onchange = function() {
    clearGrid();
    setupGrid();
};

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

window.onload = () => {
    setupGrid(defaultSize);
    output.innerHTML = `${size} X ${size}`;
};

function clearGrid () {
    grid.innerHTML = '';
};

function reloadGrid () {
    clearGrid();
    setupGrid();
};

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
};

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
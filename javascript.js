const defaultSize = 16;

let size = defaultSize;
let repeater;
let mouseDown;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) {
        return;
    } else {e.target.style.backgroundColor = '#fefefe'};
};

let slider = document.getElementById('myRange');
let output = document.getElementById('demo');
output.innerHTML = slider.value;

slider.oninput = function() {
    size = this.value;
};

slider.onchange = function() {
    output.innerHTML = `${size} X ${size}`;
    clearGrid();
    setupGrid();
}

function setupGrid() {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    output.innerHTML = `${size} X ${size}`;
    for (let i = 0; i < size * size; i++) {
        let gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.style.background = "black";
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
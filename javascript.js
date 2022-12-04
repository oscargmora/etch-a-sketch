for (let i = 0; i < 256; i++) {
    let gridElement = document.createElement('div');
    gridElement.className = "gridElement";
    gridElement.addEventListener('mouseover', changeColor);
    gridElement.style.background = "black";
    gridElement.style.height = "20px";
    gridElement.style.width = "20px";
    document.getElementById('grid').appendChild(gridElement);
};

function changeColor(e) {
    e.target.style.backgroundColor = '#fefefe';
};

let slider = document.getElementById('myRange');
let output = document.getElementById('demo');
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
}
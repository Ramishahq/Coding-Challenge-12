// Task 2: Configure the JavaScript for Drawing Context

const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear');
const colorInput = document.getElementById('color');
const shapeOptions = document.getElementsByName('shape');

let drawing = false;
let startX, startY;

// Handle mouse events for drawing
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    [startX, startY] = getMousePosition(e);
});

canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;

    const [mouseX, mouseY] = getMousePosition(e);

    // Clear and redraw when the mouse moves
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawShape(mouseX, mouseY); 
}); 

canvas.addEventListener('mouseup', (e) => {
    if (drawing) {
        const [mouseX, mouseY] = getMousePosition(e);
        drawShape(mouseX, mouseY); 
        drawing = false;
    }
});

canvas.addEventListener('mouseout', () => {
    drawing = false;
    ctx.closePath();
});

// Task 3: Draw shape based on selected option
function drawShape(mouseX, mouseY) {
    const shape = getSelectedShape();
    const color = colorInput.value;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    ctx.beginPath();
    if (shape === 'line') {
        ctx.moveTo(startX, startY);
        ctx.lineTo(mouseX, mouseY);
    } else if (shape === 'rectangle') {
        ctx.rect(startX, startY, mouseX - startX, mouseY - startY);
    } else if (shape === 'circle') {
        const radius = Math.sqrt(Math.pow(mouseX - startX, 2) + Math.pow(mouseY - startY, 2));
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    }
    ctx.stroke();
    ctx.closePath(); 
}

// Clear the canvas function
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// function to get option to select shape
function getSelectedShape() {
    for (const option of shapeOptions) {
        if (option.checked) {
            return option.value;
        }
    }
}

// Task 4: Clear the canvas
clearButton.addEventListener('click', clearCanvas);
function getMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    return [e.clientX - rect.left, e.clientY - rect.top];
}
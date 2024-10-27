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


let board = new Board();

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Canvas Size calculations
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

// Handle movement
function handleKeyPress(event) {
    event.preventDefault();

    if (moves[event.keyCode]) {
        let p = moves[event.keyCode](board.piece);

        board.piece.move(p);

        draw();
    }
}

function addEventListener() {
    document.removeEventListener('keydown', handleKeyPress);
    document.addEventListener('keydown', handleKeyPress);
}

// Start game button
function play() {
    board = new Board(ctx);
    draw();
}

// create piece
function draw() {
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);

    board.piece.draw();
}
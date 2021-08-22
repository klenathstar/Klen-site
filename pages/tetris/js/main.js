// Canvas Size calculations
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

function addEventListener() {
    document.removeEventListener('keydown', handleKeyPress);
    document.addEventListener('keydown', handleKeyPress);
}

let board = new Board();

// Start game button
function play() {
    board = new Board(ctx);
    addEventListener();
    
    if (requestId) {
        cancelAnimationFrame(requestId);
    }

    time.start = performance.now();
    animate();
}

let time = { start: 0, elapsed: 0, level: 1000 };

function animate(now = 0) {
    time.elapsed = now - time.start;

    if (time.elapsed > time.level) {
        time.start = now;

        board.drop();
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    board.piece.draw();
    requestId = requestAnimationFrame(animate);
}

// create piece
function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    board.draw();
    board.piece.draw();
}

// Handle movement
function handleKeyPress(event) {
    event.preventDefault();

    if (moves[event.keyCode]) {
        let p = moves[event.keyCode](board.piece);
        
        if (event.keyCode === KEY.UP) { 
            while (board.valid(p)) {
                board.piece.move(p);
                p = moves[KEY.UP](board.piece);
            }
        }

        if (board.valid(p)) {
            board.piece.move(p);
        }

        draw();
    }
}
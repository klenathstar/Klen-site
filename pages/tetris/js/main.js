function addEventListener() {
    document.removeEventListener('keydown', handleKeyPress);
    document.addEventListener('keydown', handleKeyPress);
}

// Start game button
function play() {
    resetGame();
    addEventListener();
    showHighScores();
    
    if (requestId) {
        cancelAnimationFrame(requestId);
    }
    
    animate();
}

let time = { start: 0, elapsed: 0, level: 1000 };

// create piece
function draw() {
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);  

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
                account.score += POINTS.HARD_DROP;
                p = moves[KEY.DOWN](board.piece);
            }
        } else if (board.valid(p)) {
            board.piece.move(p);
            if (event.keyCode === KEY.DOWN) {
                account.score += POINTS.SOFT_DROP;
            }
        }
    }
}

function animate(now = 0) {
    time.elapsed = now - time.start;

    if (time.elapsed > time.level) {
        time.start = now;

        if (!board.drop()) {
            gameOver();
            return;
        }
    }

    draw();
    requestId = requestAnimationFrame(animate);
}

function gameOver() {
    cancelAnimationFrame(requestId);

    ctx.fillStyle = 'black';
    ctx.fillRect(1, 3, 8, 1.2);
    ctx.fillStyle = 'red';
    ctx.font = '1px Courier New';
    ctx.fillText(' GAME OVER', 1.8, 4);

    checkHighScore(account.score);
    showHighScores();
}

let accountValues = {
    score: 0,
    lines: 0,
    level: 0
}

let account = new Proxy(accountValues, {
    set: (target, key, value) => {
        target[key] = value;
        updateAccount(key, value);
        return true;
    }
});

function updateAccount(key, value) {
    let element = document.getElementById(key);
    if (element) {
        element.textContent = value;
    }
}

function resetGame() {
    account.score = 0;
    account.lines = 0;
    account.level = 0;
    board = new Board(ctx, ctxNext);
    time = {start: performance.now(), elapsed: 0, level: LEVEL[0]}
}

function checkHighScore(score) {
    const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) || [];
    const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;

    if (score > lowestScore) {
        saveHighScore(score, highScores);
    }
}

function saveHighScore(score, highScores) {
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    highScores.splice(NO_OF_HIGH_SCORES);
    localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
}

function showHighScores() {
    const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) || [];
    const highScoreList = document.getElementById(HIGH_SCORES);

    highScoreList.innerHTML = highScores
        .map((score) => `<li>${score}`)
        .join('');
}
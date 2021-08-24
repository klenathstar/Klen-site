const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

const canvasNext = document.getElementById('next');  
const ctxNext = canvasNext.getContext('2d');

ctxNext.canvas.width = 4 * BLOCK_SIZE;  
ctxNext.canvas.height = 4 * BLOCK_SIZE; 
ctxNext.scale(BLOCK_SIZE/2, BLOCK_SIZE/2);

const KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    Z: 90,
    X: 88
}
Object.freeze(KEY);

moves = {
    [KEY.LEFT]:  (p) => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]:  (p) => ({ ...p, y: p.y + 1 }),
    [KEY.X]: (p) => board.rotate(p),
    [KEY.Z]: (p) => board.rotateReverse(p),
    [KEY.UP]: (p) => ({ ...p, y: p.y + 1 })
};

let requestId = null;

const COLORS = ['red', 'blue', 'orange', 'cyan', 'lime', 'magenta', 'yellow'];

const BORDER_COLOR = ['orange', 'blue', 'red', 'lime', 'peach', 'yellow', 'black',]

const SHAPES = [
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
    [[0, 0, 3], [3, 3, 3], [0, 0, 0]],
    [[4, 4, 4], [0, 4, 0], [0, 0, 0]],
    [[5, 5, 0], [0, 5, 5], [0, 0, 0]],
    [[0, 6, 6], [6, 6, 0], [0, 0, 0]],
    [[7, 7], [7, 7]]
];

const POINTS = {
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
    TETRIS: 800,
    SOFT_DROP: 1,
    HARD_DROP: 2
}
Object.freeze(POINTS);

const LINES_PER_LEVEL = 10

const LEVEL = {
    0: 800,
    1: 720,
    2: 630,
    3: 550,
    4: 470,
    5: 380,
    6: 300,
    7: 220,
    8: 130,
    9: 100,
    10: 80,
    11: 80,
    12: 80,
    13: 70,
    14: 70,
    15: 70,
    16: 50,
    17: 50,
    18: 50,
    19: 30,
    20: 30,
}
Object.freeze(LEVEL);
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

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
    [KEY.Z]: (p) => board.rotateReverse(p)
};
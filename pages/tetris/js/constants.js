const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
}
Object.freeze(KEY);

moves = {
    [KEY.LEFT]: ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: ({ ...p, x: p.y + 1 })
};
class Board {
    constructor(ctx) {
        this.ctx = ctx;
        this.grid = this.getEmptyBoard();
        this.piece = new Piece(ctx);
    }
    
// Fill matrix with zeros
    getEmptyBoard() {
        return Array.from(
            {length: ROWS}, () => Array(COLS).fill(0)
        );
    }
}
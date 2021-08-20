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

    rotate(piece) {
        let p = JSON.parse(JSON.stringify(piece));
    
        for (let y = 0; y < p.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [p.shape[x][y], p.shape[y][x]] =
                [p.shape[y][x], p.shape[x][y]];
            }
        }
    
        p.shape.forEach(row => row.reverse());
    
        return p;
    }

    rotateReverse(piece) {
        let p = JSON.parse(JSON.stringify(piece));
    
        p.shape.forEach(row => row.reverse());

        for (let y = 0; y < p.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [p.shape[y][x], p.shape[x][y]] =
                [p.shape[x][y], p.shape[y][x]];
            }
        }

        return p;
    }

    isInsideWalls(x, y) {
        return (
            x >= 0 &&
            x < COLS &&
            y < ROWS
        )
    }

    valid(p) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) =>
                value === 0 ||
                this.isInsideWalls(p.x + dx, p.y + dy)
            );
        });
    }

    freeze() {
        this.piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.grid[y + this.piece.y][x + this.piece.x] = value;
                }
            });
        });
    }

    drop() {
        let p = moves[KEY.DOWN](this.piece);
        
        if (this.valid(p)) {
          this.piece.move(p);
        } else {
          this.freeze();
          this.piece = new Piece(this.ctx);
        } 
      }
    
    draw() {
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillStyle = COLORS[value-1];
                    this.ctx.fillRect(x, y, 1, 1);
                }
            });
        });
    }
}
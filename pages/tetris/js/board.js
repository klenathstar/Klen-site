class Board {
    constructor(ctx, ctxNext) {
        this.ctx = ctx;
        this.ctxNext = ctxNext;
        this.grid = this.getEmptyBoard();
        this.setNextPiece();
        this.setCurrentPiece();
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

    isNotOccupied(x, y) {
        return this.grid[y] && this.grid[y][x] === 0;
    }

    valid(p) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return value === 0 || (this.isInsideWalls(x, y) && this.isNotOccupied(x, y));
            });
        });
    }

    drop() {
        let p = moves[KEY.DOWN](this.piece);
        
        if (this.valid(p)) {
          this.piece.move(p);
        } else {
          this.freeze();
          if (this.piece.y === 0 && this.piece.x === 3) {
              return false;
          }
          this.setCurrentPiece();
        } 
        return true;
    }
    
    freeze() {
        this.piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.grid[y + this.piece.y][x + this.piece.x] = value;
                }
            });
        });
        this.clearLines();
    }

    clearLines() {
        let lines = 0;
        this.grid.forEach((row, y) => {
            if (row.every(value => value > 0)) {
                lines++;
                this.grid.splice(y, 1);
                this.grid.unshift(Array(COLS).fill(0));
            }
        });

        if (lines > 0) {
            account.score += this.getLineClearPoints(lines);
            account.lines += lines;

            if (account.lines >= LINES_PER_LEVEL) {
                account.level++;
                account.lines -+LINES_PER_LEVEL;
                time.level = LEVEL[account.level];
            }
        }
    }

    draw() {  
        this.grid.forEach((row, y) => {  
            row.forEach((value, x) => {  
                if (value > 0) {  
                    this.ctx.fillStyle = 'black';
                    this.ctx.fillRect(x, y, 1, 1);
                    this.ctx.fillStyle = COLORS[value-1];  
                    this.ctx.fillRect(x + 0.05, y + 0.05, 0.9, 0.9);  
                }  
            });  
        });  
    }

    getLineClearPoints(lines) {
        const lineClearPoints =
                lines === 1 ? POINTS.SINGLE :
                lines === 2 ? POINTS.DOUBLE :
                lines === 3 ? POINTS.TRIPLE :
                lines === 4 ? POINTS.TETRIS :
                0;

        return (account.level + 1) * lineClearPoints;
    }

    setNextPiece() {
        const { width, height } = this.ctxNext.canvas;
        this.nextPiece = new Piece(this.ctxNext);
        this.ctxNext.clearRect(0, 0, width, height);
        this.nextPiece.draw();
      }
    
      setCurrentPiece() {
        this.piece = this.nextPiece;
        this.piece.ctx = this.ctx;
        this.piece.x = 3;
        this.piece.y = 0;
        this.setNextPiece();
      }
}
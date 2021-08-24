class Piece {
    constructor(ctx) {
        this.ctx = ctx;
        
        const typeId = this.randomizeTetrominoType(COLORS.length);
        this.color = COLORS[typeId];
        this.borderColors = 'black';
        this.shape = SHAPES[typeId];

        // starting position
        this.x = 3;
        this.y = 3;
    }

    draw() {
        this.ctx.fillStyle = this.borderColors;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillRect(this.x + x + 0.05, this.y + y + 0.05, 0.9, 0.9);
                }
            });
        });
    }   
    
    move(p) {
        this.x = p.x;
        this.y = p.y;
        this.shape = p.shape;
    }

    randomizeTetrominoType(noOfTypes) {
        return Math.floor(Math.random() * noOfTypes);
    }

    gradient(typeId) {
        let grd = this.ctx.createRadialGradient();
        grd.addColorStop(0, COLORS[typeId]);
        grd.addColorStop(1, BORDER_COLOR[typeId]);
        return grd;
    }
}
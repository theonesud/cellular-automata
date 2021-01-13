let alive_yellow = '#e7ef23';
let alive_red = '#f85200';
let alive_blue = '#00a4d0';
let alive_navy = '#315389';
let dead_black = '#030317';


class World {

    constructor(sketch, cellSize, noCellsX, noCellsY) {
        this.sketch = sketch;
        this.cellSize = cellSize;
        this.noCellsX = noCellsX;
        this.noCellsY = noCellsY;
        this.cells = Array(noCellsX).fill().map(() => Array(noCellsY).fill(0));
        this.cellsBuffer = Array(noCellsX).fill().map(() => Array(noCellsY).fill(0));
    }

    randomInit = (percentAlive) => {
        for (let i = 0; i < this.noCellsX; ++i) {
            for (let j = 0; j < this.noCellsY; ++j) {
                if (Math.random() * 100 > percentAlive) {
                    this.cells[i][j] = 0;
                } else {
                    this.cells[i][j] = Math.random(0.19, 1);
                    // cells[i][j] = 1;
                }
            }
        }
    }

    render = () => {
        for (let i = 0; i < this.noCellsX; ++i) {
            for (let j = 0; j < this.noCellsY; ++j) {

                // Render cells
                if (this.cells[i][j] < 0.20) {
                    this.sketch.fill(dead_black);
                } else if (this.cells[i][j] < 0.40) {
                    this.sketch.fill(alive_navy);
                } else if (this.cells[i][j] < 0.60) {
                    this.sketch.fill(alive_blue);
                } else if (this.cells[i][j] < 0.80) {
                    this.sketch.fill(alive_red);
                } else {
                    this.sketch.fill(alive_yellow);
                }
                this.sketch.rect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);

                // Dump cells to the buffer
                this.cellsBuffer[i][j] = this.cells[i][j];
            }
        }
    }

    noNeighbours = (i, j) => {
        // Coordinates of neighbours

        // console.log(typeof (i), typeof (j))
        let kernel = [
            [i - 1, j - 1],
            [i, j - 1],
            [i + 1, j - 1],
            [i - 1, j],
            [i + 1, j],
            [i - 1, j + 1],
            [i, j + 1],
            [i + 1, j + 1]
        ];

        // console.log(i, j, kernel)

        // Calculate no of neighbours
        let count = 0;
        let that = this
        kernel.forEach(function (part, index) {
            this[index][0] = part[0] === -1 ? this.noCellsX - 1 : part[0];
            this[index][0] = part[0] === this.noCellsX ? 0 : part[0];
            this[index][1] = part[1] === -1 ? this.noCellsY - 1 : part[1];
            this[index][1] = part[1] === this.noCellsY ? 0 : part[1];

            // console.log(part[0], part[1])
            // if (that.cellsBuffer[part[0]][part[1]] >= 0.20) {
            //     count++;
            //     // count += that.cellsBuffer[part[0]][part[1]];
            // }

        }, kernel);

        return count;
    }

    nextGen = () => {
        // let avgNeighbours = 0;
        // let avgCell = 0;

        for (let i = 0; i < this.noCellsX; ++i) {
            for (let j = 0; j < this.noCellsY; ++j) {

                let count = this.noNeighbours(i, j);
                if (this.cellsBuffer[i][j] > 0.20) {
                    // overpopulation and underpopulation hurts
                    if (count < 2 || count > 3) {
                        this.cells[i][j] -= 0.90;
                    }
                } else {
                    if (count == 3) {
                        // stable growth
                        this.cells[i][j] += 0.87;
                    }
                }
                // avgNeighbours += count;
                // avgCell += this.cells[i][j];
            }
        }

        // if (debug == true) {
        //     avgNeighbours = avgNeighbours / (this.noCellsX * this.noCellsY);
        //     avgCell = avgCell / (this.noCellsX * this.noCellsY);
        //     fill(255, 175);
        //     rect(5, 7, 275, 95);
        //     fill(0);
        //     text("fps: " + frameRate, 10, 30);
        //     text("avgNeighbours: " + avgNeighbours, 10, 60);
        //     text("avgCell: " + avgCell, 10, 90);
        // }
    }

    clear = () => {
        for (let i = 0; i < this.noCellsX; ++i) {
            for (let j = 0; j < this.noCellsY; ++j) {
                this.cells[i][j] = 0;
            }
        }
    }
}
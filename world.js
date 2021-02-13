let alive_yellow = '#e7ef23';
let alive_red = '#f85200';
let alive_blue = '#00a4d0';
let alive_navy = '#315389';
let dead_black = '#030317';


class World {

    constructor(sketch, cellSize, noCellsX, noCellsY) {
        this.gen = 0
        this.sketch = sketch;
        this.cellSize = cellSize;
        this.noCellsX = noCellsX;
        this.noCellsY = noCellsY;
        this.cells = Array(noCellsX).fill().map(() => Array(noCellsY).fill(0));
        this.cellsBuffer = Array(noCellsX).fill().map(() => Array(noCellsY).fill(0));
        this.debug = false
    }

    randomInit = (percentAlive) => {
        this.avgCell = 0
        for (let i = 0; i < this.noCellsX; ++i) {
            for (let j = 0; j < this.noCellsY; ++j) {
                if (Math.random() * 100 > percentAlive) {
                    this.cells[i][j] = 0;
                } else {
                    this.cells[i][j] = Math.random() * (1 - 0.20) + 0.20;
                    this.avgCell += 1;
                }
            }
        }
        this.avgCell = this.avgCell / (this.noCellsX * this.noCellsY);
        console.log('Starting Life: ', this.avgCell.toFixed(2))
    }

    nextGen = () => {
        this.gen++
        this.avgNeighbours = 0;
        this.avgCell = 0;
        this.color = 0.06
        let randomness = 0.9

        for (let i = 0; i < this.noCellsX; ++i) {
            for (let j = 0; j < this.noCellsY; ++j) {

                let count = this.noNeighbours(i, j);
                let chance = (Math.random() * (2 * randomness)) + 1 - randomness;

                if (this.cellsBuffer[i][j] >= 0.20) {
                    // underpopulation
                    if (count < 2) {
                        this.cells[i][j] = this.cells[i][j] - chance * (0.90 - this.color); // Death
                    }
                    // overpopulation
                    if (count > 3) {
                        this.cells[i][j] = this.cells[i][j] - chance * (0.90 + this.color); // Death
                    }
                } else {
                    // stable
                    if (count == 3) {
                        this.cells[i][j] += chance * (0.90 - this.color);  // Birth
                    }
                }
                this.avgNeighbours += count;
                if (this.cells[i][j] > 0) {
                    this.avgCell += 1;
                }
            }
        }

        if (this.debug == true) {
            this.avgNeighbours = this.avgNeighbours / (this.noCellsX * this.noCellsY);
            this.avgCell = this.avgCell / (this.noCellsX * this.noCellsY);
            this.sketch.fill(0, 150);
            this.sketch.rect(5, 47, 130, 100);
            this.sketch.fill(255, 150);
            this.sketch.text("Gen: " + this.gen, 10, 70);
            this.sketch.text("Density: " + this.avgNeighbours.toFixed(2), 10, 100);
            this.sketch.text("Life: " + this.avgCell.toFixed(2), 10, 130);
            console.log("density: " + this.avgNeighbours.toFixed(2), "life: " + this.avgCell.toFixed(2));
        }
    }

    noNeighbours = (i, j) => {
        // Coordinates of neighbours
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

        // Calculate no of neighbours
        let count = 0;
        let that = this
        kernel.forEach(function (part, index) {
            this[index][0] = part[0] === -1 ? that.noCellsX - 1 : part[0];
            this[index][0] = part[0] === that.noCellsX ? 0 : part[0];
            this[index][1] = part[1] === -1 ? that.noCellsY - 1 : part[1];
            this[index][1] = part[1] === that.noCellsY ? 0 : part[1];
            if (that.cellsBuffer[part[0]][part[1]] >= 0.20) {
                count++;
            }

        }, kernel);
        return count;
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

    toggle_stats = () => {
        this.debug = !this.debug
    }

    clear = () => {
        for (let i = 0; i < this.noCellsX; ++i) {
            for (let j = 0; j < this.noCellsY; ++j) {
                this.cells[i][j] = 0;
            }
        }
    }
}
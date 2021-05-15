let dark = '#B58863';
let light = '#F0D9B5';
// let superior_white = '#808080';


class chessworld {

    constructor(sketch, cellSize, noCellsX, noCellsY) {
        this.gen = 0
        this.sketch = sketch;
        this.cellSize = cellSize;
        this.noCellsX = noCellsX;
        this.noCellsY = noCellsY;
        this.cells = Array(noCellsX).fill().map(() => Array(noCellsY).fill(''));
        this.cellsBuffer = Array(noCellsX).fill().map(() => Array(noCellsY).fill(''));
        this.history = Array()
        this.debug = false
        this.pieces = Array()
    }

    images_preload = () => {
        let l = 'rl nl bl ql kl bl nl rl'.split(' ')
        let d = 'rd nd bd qd kd bd nd rd'.split(' ')
        let pl = Array(8).fill('pl')
        let pd = Array(8).fill('pd')
        for (let i = 0; i < l.length; ++i) {
            this.pieces[l[i]] = this.sketch.loadImage('pieces/Chess_' + l[i] + 't60.png');
            this.pieces[d[i]] = this.sketch.loadImage('pieces/Chess_' + d[i] + 't60.png');
        }
        this.pieces[pl[0]] = this.sketch.loadImage('pieces/Chess_' + pl[0] + 't60.png');
        this.pieces[pd[0]] = this.sketch.loadImage('pieces/Chess_' + pd[0] + 't60.png');
        console.log(this.pieces)
    }

    image_setup = (img) => {
        this.sketch.image(img, 0, 0);
    }

    setup = () => {
        // here we use a callback to display the image after loading
        this.sketch.loadImage('assets/laDefense.jpg', img => {
            this.sketch.image(img, 0, 0);
        });
    }

    lay_board = () => {
        for (let i = 0; i < this.noCellsX; ++i) {
            for (let j = 0; j < this.noCellsY; ++j) {
                if (((i % 2 == 0) & (j % 2 == 1)) || ((i % 2 == 1) & (j % 2 == 0))) {
                    this.sketch.fill(dark);
                }
                else {
                    this.sketch.fill(light);
                }
                this.sketch.rect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);
            }
        }
    }

    show_pieces = () => {
        for (let i = 0; i < this.noCellsX; ++i) {
            for (let j = 0; j < this.noCellsY; ++j) {
                if (this.cells[i][j]) {
                    // console.log()
                    let pos_j = j * this.cellSize
                    let pos_i = i * this.cellSize
                    this.sketch.image(this.pieces[this.cells[i][j]], pos_j, pos_i, this.cellSize, this.cellSize);
                }
            }
        }
    }

    render = () => {
        this.lay_board()
        this.show_pieces()
        // // Dump cells to the buffer
        // this.cellsBuffer[i][j] = this.cells[i][j];
    }

    Init = (side) => {
        for (let i = 0; i < this.noCellsX; ++i) {
            for (let j = 0; j < this.noCellsY; ++j) {
                if (side == 0) {
                    // black side
                    this.cells[0][j] = ('rl nl bl ql kl bl nl rl'.split(' '))[j]
                    this.cells[1][j] = Array(8).fill('pl')[j]
                    this.cells[6][j] = Array(8).fill('pd')[j]
                    this.cells[7][j] = 'rd nd bd qd kd bd nd rd'.split(' ')[j]
                } else {
                    // white side
                    this.cells[0][j] = 'rd nd bd qd kd bd nd rd'.split(' ')[j]
                    this.cells[1][j] = Array(8).fill('pd')[j]
                    this.cells[6][j] = Array(8).fill('pl')[j]
                    this.cells[7][j] = ('rl nl bl ql kl bl nl rl'.split(' '))[j]
                }
            }
        }
        console.log(this.cells)
        console.log('Starting Side: ', side)
    }

    nextGen = () => {
        // this.gen++
        // this.avgNeighbours = 0;
        // this.avgCell = 0;
        // this.color = 0.06
        // let randomness = 0.9

        // for (let i = 0; i < this.noCellsX; ++i) {
        //     for (let j = 0; j < this.noCellsY; ++j) {

        //         let count = this.noNeighbours(i, j);
        //         let chance = (Math.random() * (2 * randomness)) + 1 - randomness;

        //         if (this.cellsBuffer[i][j] >= 0.20) {
        //             // underpopulation
        //             if (count < 2) {
        //                 this.cells[i][j] = this.cells[i][j] - chance * (0.90 - this.color); // Death
        //             }
        //             // overpopulation
        //             if (count > 3) {
        //                 this.cells[i][j] = this.cells[i][j] - chance * (0.90 + this.color); // Death
        //             }
        //         } else {
        //             // stable
        //             if (count == 3) {
        //                 this.cells[i][j] += chance * (0.90 - this.color);  // Birth
        //             }
        //         }
        //         this.avgNeighbours += count;
        //         if (this.cells[i][j] > 0) {
        //             this.avgCell += 1;
        //         }
        //     }
        // }

        // if (this.debug == true) {
        //     this.avgNeighbours = this.avgNeighbours / (this.noCellsX * this.noCellsY);
        //     this.avgCell = this.avgCell / (this.noCellsX * this.noCellsY);
        //     this.sketch.fill(0, 150);
        //     this.sketch.rect(5, 47, 130, 100);
        //     this.sketch.fill(255, 150);
        //     this.sketch.text("Gen: " + this.gen, 10, 70);
        //     this.sketch.text("Density: " + this.avgNeighbours.toFixed(2), 10, 100);
        //     this.sketch.text("Life: " + this.avgCell.toFixed(2), 10, 130);
        //     console.log("density: " + this.avgNeighbours.toFixed(2), "life: " + this.avgCell.toFixed(2));
        // }
    }

    // noNeighbours = (i, j) => {
    //     // Coordinates of neighbours
    //     let kernel = [
    //         [i - 1, j - 1],
    //         [i, j - 1],
    //         [i + 1, j - 1],
    //         [i - 1, j],
    //         [i + 1, j],
    //         [i - 1, j + 1],
    //         [i, j + 1],
    //         [i + 1, j + 1]
    //     ];

    //     // Calculate no of neighbours
    //     let count = 0;
    //     let that = this
    //     kernel.forEach(function (part, index) {
    //         this[index][0] = part[0] === -1 ? that.noCellsX - 1 : part[0];
    //         this[index][0] = part[0] === that.noCellsX ? 0 : part[0];
    //         this[index][1] = part[1] === -1 ? that.noCellsY - 1 : part[1];
    //         this[index][1] = part[1] === that.noCellsY ? 0 : part[1];
    //         if (that.cellsBuffer[part[0]][part[1]] >= 0.20) {
    //             count++;
    //         }

    //     }, kernel);
    //     return count;
    // }



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
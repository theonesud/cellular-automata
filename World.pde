color alive_yellow = #e7ef23;
color alive_red = #f85200;
color alive_blue = #00a4d0;
color alive_navy = #315389;
color dead_black = #030317;


class World {
    float[][] cells;
    float[][] cellsBuffer;
    int noCellsX;
    int noCellsY;
    int cellSize;

    World(int c){
        cellSize = c;
        noCellsX = width/cellSize;
        noCellsY = height/cellSize;

        cells = new float[noCellsX][noCellsY];
        cellsBuffer = new float[noCellsX][noCellsY];
    }

    void clear(){
        for (int i = 0; i < noCellsX; ++i) {
            for (int j = 0; j < noCellsY; ++j) {
                cells[i][j] = 0;
            }
        }
    }

    void randomInit(int percentAlive){
        for (int i = 0; i < noCellsX; ++i) {
            for (int j = 0; j < noCellsY; ++j) {
                float prob = random(100);
                if (prob > percentAlive) {
                    cells[i][j] = 0;
                } else {
                    cells[i][j] = random(0.19, 1);
                    // cells[i][j] = 1;
                }
            }
        }
    }

    void render(){
        for (int i = 0; i < noCellsX; ++i) {
            for (int j = 0; j < noCellsY; ++j) {

                // Render cells
                if (cells[i][j] < 0.20) {
                    fill(dead_black);
                } else if (cells[i][j] < 0.40){
                    fill(alive_navy);
                } else if (cells[i][j] < 0.60){
                    fill(alive_blue);
                } else if (cells[i][j] < 0.80){
                    fill(alive_red);
                } else {
                    fill(alive_yellow);
                }
                rect(i*cellSize, j*cellSize, cellSize, cellSize);

                // Dump cells to the buffer
                cellsBuffer[i][j] = cells[i][j];
            }
        }
    }

    float noNeighbours(int i, int j){
        // Coordinates of neighbours
        int[][] kernel = {
            {i-1,j-1}, {i,j-1}, {i+1,j-1},
            {i-1,j},            {i+1,j},
            {i-1,j+1}, {i,j+1}, {i+1,j+1},
        };

        // Calculate no of neighbours
        float count = 0;
        for (int[] coord : kernel) {

            // For a circular world
            coord[0] = coord[0]==-1 ? noCellsX-1 : coord[0];
            coord[0] = coord[0]==noCellsX ? 0 : coord[0];
            coord[1] = coord[1]==-1 ? noCellsY-1 : coord[1];
            coord[1] = coord[1]==noCellsY ? 0 : coord[1];

            if (cellsBuffer[coord[0]][coord[1]] >= 0.20){
                count++;
                // count += cellsBuffer[coord[0]][coord[1]];
            }
        }
        return count;
    }

    void nextGen(){
        float avgNeighbours = 0;
        float avgCell = 0;

        for (int i = 0; i < noCellsX; ++i) {
            for (int j = 0; j < noCellsY; ++j) {

                float count = noNeighbours(i,j);
                if (cellsBuffer[i][j] > 0.20){
                    // overpopulation and underpopulation hurts
                    if (count < 2 || count > 3){
                        cells[i][j] -= 0.90;
                    }
                } else {
                    if (count == 3){
                        // stable growth
                        cells[i][j] += 0.87;
                    }
                }
                avgNeighbours+=count;
                avgCell+=cells[i][j];
            }
        }

        if (debug == true){
            avgNeighbours = avgNeighbours/(noCellsX*noCellsY);
            avgCell = avgCell/(noCellsX*noCellsY);
            fill(255, 175);
            rect(5, 7, 275, 95);
            fill(0);
            text("fps: "+frameRate, 10, 30);
            text("avgNeighbours: "+avgNeighbours, 10, 60);
            text("avgCell: "+avgCell, 10, 90);
        }
    }
}

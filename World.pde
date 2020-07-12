color alive_yellow = #e7ef23;
color alive_red = #f85200;
color alive_blue = #00a4d0;
color alive_navy = #315389;
color dead_black = #030317;


class World {
    int[][] cells;
    int[][] cellsBuffer;
    int noCellsX;
    int noCellsY;
    int cellSize;

    World(int c){
        cellSize = c;
        noCellsX = width/cellSize;
        noCellsY = height/cellSize;

        cells = new int[noCellsX][noCellsY];
        cellsBuffer = new int[noCellsX][noCellsY];
    }

    void randomInit(int percentAlive){
        for (int i = 0; i < noCellsX; ++i) {
            for (int j = 0; j < noCellsY; ++j) {
                float prob = random(100);
                if (prob > percentAlive) {
                    cells[i][j] = 0;
                } else {
                    cells[i][j] = 1;
                }
            }
        }
    }

    void render(){
        for (int i = 0; i < noCellsX; ++i) {
            for (int j = 0; j < noCellsY; ++j) {

                // Render cells
                if (cells[i][j] == 1) {
                    fill(alive_yellow);
                    rect(i*cellSize, j*cellSize, cellSize, cellSize);
                } else {
                    fill(dead_black);
                    rect(i*cellSize, j*cellSize, cellSize, cellSize);
                }

                // Dump cells to the buffer
                cellsBuffer[i][j] = cells[i][j];
            }
        }
    }

    int noNeighbours(int i, int j){
        // Coordinates of neighbours
        int[][] kernel = {
            {i-1,j-1}, {i,j-1}, {i+1,j-1},
            {i-1,j},            {i+1,j},
            {i-1,j+1}, {i,j+1}, {i+1,j+1},
        };

        // Calculate no of neighbours
        int count = 0;
        for (int[] coord : kernel) {

            // For a circular world
            coord[0] = coord[0]==-1 ? noCellsX-1 : coord[0];
            coord[0] = coord[0]==noCellsX ? 0 : coord[0];
            coord[1] = coord[1]==-1 ? noCellsY-1 : coord[1];
            coord[1] = coord[1]==noCellsY ? 0 : coord[1];

            if (cellsBuffer[coord[0]][coord[1]] == 1){
                count++;
            }
        }
        return count;
    }

    void nextGen(){
        for (int i = 0; i < noCellsX; ++i) {
            for (int j = 0; j < noCellsY; ++j) {

                // Update cell based on noNeighbours
                int count = noNeighbours(i,j);
                if (cellsBuffer[i][j] == 1){
                    if (count > 3 || count < 2){
                        cells[i][j] = 0;
                    }
                } else {
                    if (count == 3){
                        cells[i][j] = 1;
                    }
                }
            }
        }
    }
}

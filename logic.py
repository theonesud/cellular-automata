from pygame import display, time, event, QUIT, surfarray, transform
import numpy as np
from config import WHITE, BLACK, SCREEN_WIDTH, GRID_SCALE, FPS


class Session(object):
    def __init__(self):
        self.grid_width = int(SCREEN_WIDTH / GRID_SCALE)
        self.colors = np.array([BLACK, WHITE])
        self.screen = display.set_mode((SCREEN_WIDTH, SCREEN_WIDTH))
        self.screen.fill(BLACK)
        self.world = np.zeros((self.grid_width, self.grid_width), dtype=np.int)
        self.seed_world()

    def seed_world(self):
        idx = np.array([[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]])
        np.add.at(self.world, (idx[:, 0], idx[:, 1]), 1)
        pass

        # glider = np.array([[0, 1, 0],
        #                    [0, 0, 1],
        #                    [1, 1, 1]])

        # world[: int(self.grid_width * .2)] = 1      # Seed a percentage with life
        # world = world.reshape(self.grid_width**2)
        # np.random.shuffle(world)
        # self.world = world.reshape(self.grid_width, self.grid_width)

    def run_loop(self):
        done = False
        clock = time.Clock()
        while not done:
            for e in event.get():
                if e.type == QUIT:
                    done = True

            surface = surfarray.make_surface(self.colors[self.world])
            surface = transform.scale(surface, (SCREEN_WIDTH, SCREEN_WIDTH))
            self.screen.blit(surface, (0, 0))
            display.flip()  # update the screen with what we've blit
            clock.tick(FPS)

            self.compute_next_gen()

    def no_of_neighbours(self, world, row, col):
        return world[row-1:row+1][col-1:col+1].sum() - world[row, col]

    def compute_next_gen(self):
        buffer = self.world.copy()

        for row_id in range(self.grid_width):
            for col_id in range(self.grid_width):

                neighbour_count = self.no_of_neighbours(self.world, row_id, col_id)

                # Any live cell with two or three live neighbours survives.
                if self.world[row_id][col_id] and 2 <= neighbour_count <= 3:
                    buffer[row_id][col_id] = 1
                # Any dead cell with three live neighbours becomes a live cell.
                elif not self.world[row_id][col_id] and neighbour_count == 3:
                    buffer[row_id][col_id] = 1
                # All other live cells die in the next generation. All other dead cells stay dead.
                else:
                    buffer[row_id][col_id] = 0

        self.world = buffer.copy()

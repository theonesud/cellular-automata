from time import sleep
from random import randint
import pygame

pygame.init()

# Initialise the screen
xmax = 600  # Width of screen in pixels
ymax = 600  # Height of screen in pixels
screen = pygame.display.set_mode((xmax, ymax), 0, 24)  # New 24-bit screen


def evolve_cell(alive, neighbours):
    return neighbours == 3 or (alive and neighbours == 2)


def count_neighbours(grid, position):
    x, y = position
    neighbour_cells = [(x - 1, y - 1), (x - 1, y + 0), (x - 1, y + 1),
                       (x + 0, y - 1),                 (x + 0, y + 1),
                       (x + 1, y - 1), (x + 1, y + 0), (x + 1, y + 1)]
    count = 0
    for x, y in neighbour_cells:
        if x >= 0 and y >= 0:
            try:
                count += grid[x][y]
            except:
                pass
    return count


def make_empty_grid(x, y):
    grid = []
    for r in range(x):
        row = []
        for c in range(y):
            row.append(0)
        grid.append(row)
    return grid


def make_random_grid(x, y):
    grid = []
    for r in range(x):
        row = []
        for c in range(y):
            row.append(randint(0, 1))
        grid.append(row)
    return grid


def evolve(grid):
    x = len(grid)
    y = len(grid[0])
    new_grid = make_empty_grid(x, y)
    for r in range(x):
        for c in range(y):
            cell = grid[r][c]
            neighbours = count_neighbours(grid, (r, c))
            new_grid[r][c] = 1 if evolve_cell(cell, neighbours) else 0
    return new_grid


BLACK = (0, 0, 0)


def draw_block(x, y, alive_color):
    block_size = 9
    x *= block_size
    y *= block_size
    center_point = ((x + (block_size / 2)), (y + (block_size / 2)))
    pygame.draw.circle(screen, alive_color, center_point, block_size / 2, 0)


def main():
    h = 0
    cell_number = 0
    alive_color = pygame.Color(0, 0, 0)
    alive_color.hsva = [h, 100, 100]
    xlen = int(xmax / 9)
    ylen = int(ymax / 9)
    while True:
        world = make_random_grid(xlen, ylen)
        for i in range(200):
            for x in range(xlen):
                for y in range(ylen):
                    alive = world[x][y]
                    cell_number += 1
                    cell_color = alive_color if alive else BLACK
                    draw_block(x, y, cell_color)
            pygame.display.flip()
            h = (h + 2) % 360
            alive_color.hsva = (h, 100, 100)
            world = evolve(world)
            cell_number = 0
            sleep(0.1)


if __name__ == '__main__':
    main()

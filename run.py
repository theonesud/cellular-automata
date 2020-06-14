import pygame
from logic import Session


if __name__ == "__main__":
    pygame.init()
    pygame.display.set_caption("Cellular Automata")
    sess = Session()
    sess.run_loop()
    pygame.quit()

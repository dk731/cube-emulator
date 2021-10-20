from ledcd import CubeDrawer
from random import random
from time import sleep
import math

drawer = CubeDrawer.get_obj()
drawer.draw_immediate = True

drawer.clear()
drawer.circle(4, 4, 0, 3)

drawer.clear()
drawer.circle(6, 12, 0, 4, 2, 0.25)

drawer.clear()
drawer.circle(12, 6, 0, 2, 4, 0.25)

drawer.clear()
drawer.circle(7.5, 7.5, 15, 7.5, 7.5, 0.015)

drawer.clear()
drawer.filled_circle(4, 4, 13, 2.5)

drawer.clear()
drawer.filled_circle(10, 10, 11, 4, 2)

drawer.clear()
drawer.filled_circle(7.5, 7.5, 6, 3, 3, 2)

drawer.clear()
drawer.circle(7.5, 7.5, 6, 5.5, 5.5, 0.1, 2)

input()

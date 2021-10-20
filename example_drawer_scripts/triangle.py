from ledcd import CubeDrawer
from random import random
from time import sleep
import math

drawer = CubeDrawer.get_obj()
drawer.draw_immediate = True

drawer.clear()
drawer.poly(0, 0, 0, 6, 0, 0, 0, 6, 0)

drawer.clear()
drawer.poly(0, 0, 15, 15, 0, 15, 15, 15, 15)

drawer.clear()
drawer.poly(0, 15, 15, 0, 15, 0, 15, 15, 0)

drawer.clear()
drawer.poly(15, 15, 14, 15, 15, 1, 0, 0, 7)

drawer.clear()
drawer.poly(13, 8, 3, 13, 8, 13, 13, 0, 8, 1.5)

input()

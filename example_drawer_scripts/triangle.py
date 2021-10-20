from ledcd import CubeDrawer
from random import random
from time import sleep
import math

drawer = CubeDrawer.get_obj()
# drawer.draw_immediate = True
drawer.translate(7.5, 7.5, 7.5)
while True:
    drawer.clear()
    drawer.rotate(0, math.pi * drawer.delta_time / 3, math.pi * drawer.delta_time / 2)
    drawer.poly_pyr(-2, -2, -2, 2, -2, -2, 0, -2, 2, 0, 2, 0)
    drawer.show()

input()

from ledcd import CubeDrawer as cd
from math import sin

a = cd.get_obj()

a.draw_immediate = True

a.clear()
a.filled_sphere(4, 4, 12, 3.5)

a.clear()
a.filled_sphere(11, 11, 4, 4)  # Spehre

a.clear()
a.circle(7.5, 3, 4, 7, 3, 0.2)

a.clear()
a.filled_circle(7.5, 12, 12, 7, 3, 0.2)

input()
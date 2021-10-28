from ledcd import CubeDrawer as cd
from math import sin

a = cd.get_obj()

a.draw_immediate = True
a.translate(7.5, 7.5, 7.5)

a.clear()
a.filled_sphere(0, 0, 0, 2.5, 2.5, 2.5)

a.clear()
a.scale(1.5, 1, 1)
a.sphere((0, 0, 0), (3.5, 3.5, 3.5), 1)

a.pop_matrix()

a.translate(7, 7.5, 7.5)
a.clear()

a.set_color(255, 0, 0)
a.poly(-4, 5, -7, 4, 5, -7, 0, -3, -5, 2)

a.clear()
a.scale(1, -1, -1)
a.poly(-4, 5, -7, 4, 5, -7, 0, -3, -5, 2)


input()

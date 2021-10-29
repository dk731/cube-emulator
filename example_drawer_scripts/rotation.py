from ledcd import CubeDrawer as cd
from math import sin, radians

a = cd.get_obj()

a.draw_immediate = True

a.clear()
a.point(5, 0, 0)

a.rotate(radians(90), 0, 0)

a.clear()
a.point(5, 0, 0)

a.pop_matrix()
a.translate(7, 7, 7)

a.clear()
a.poly(-4, 6, -6, 4, 6, -6, 0, -3, -3, 2)

a.rotate(0, radians(90), 0)

a.clear()
a.poly(-4, 6, -6, 4, 6, -6, 0, -3, -3, 2)

a.pop_matrix()

a.translate(7, 7, 7)

a.clear()
a.circle(0, 0, 6, 4, 2, 2)

a.rotate(0, radians(90), 0)

a.clear()
a.circle(0, 0, 6, 4, 2, 2)

a.rotate(0, radians(45), 0)

a.clear()
a.filled_circle(0, 0, 0, 4, 4)


# a.poly(-4, 6, -6, 4, 6, -6, 0, -3, -3, 2)

# a.rotate(radians(-180), radians(90), 0)

# a.poly(-4, 6, -6, 4, 5, -6, 0, -3, -3, 2)

input()

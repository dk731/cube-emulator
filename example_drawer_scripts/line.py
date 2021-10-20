from ledcd import CubeDrawer as cd

a = cd.get_obj()

a.draw_immediate = True

a.clear()
a.line(0, 0, 0, 0, 9, 0)

a.clear()
a.line(15, 0, 15, 15, 0, 8)

a.clear()
a.line(0, 0, 15, 15, 15, 0, 1.5)

a.clear()
a.line(0, 15, 0, 15, 15, 15)

a.clear()
a.line(12, 5, 0, 12, 5, 15, 2.5)

input()

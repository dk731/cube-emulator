from ledcd import CubeDrawer as cd

a = cd.get_obj()

a.draw_immediate = True

a.clear()
a.tetr(0, 0, 0, 6, 0, 0, 0, 0, 6, 0, 6, 0)

a.clear()
a.tetr((5, 0, 5), (9, 0, 11), (12, 0, 5), (9, 6, 7))

a.clear()
a.tetr((0, 15, 15), (15, 15, 15), (15, 15, 0), (15, 6, 15))

a.clear()
a.tetr((0, 15, 0), (0, 15, 13), (13, 15, 0), (0, 11, 0))

input()

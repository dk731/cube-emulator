from ledcd import CubeDrawer

cd = CubeDrawer.get_obj()


cd.line(7, 7, 0, 7, 7, 15, 3)
cd.set_color(1.0, 0.0, 0.0)
cd.line(7, 7, 0, 7, 7, 15, 1.5)
cd.set_color(0.0, 1.0, 0.0)
cd.line(7, 7, 0, 7, 7, 15, 0.5)

cd.show()
input()

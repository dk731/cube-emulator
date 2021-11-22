from ledcd import CubeDrawer

drawer = CubeDrawer.get_obj()

drawer.poly(
    (
        0,
        15,
        0,
    ),
    (7.5, 0, 15),
    (15, 15, 0),
)
drawer.show()

input()

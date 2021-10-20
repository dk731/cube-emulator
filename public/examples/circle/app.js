import * as THREE from "https://cdn.skypack.dev/pin/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/mode=imports/optimized/three.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/examples/jsm/controls/OrbitControls.js";
import * as TWEEN from "https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.esm.js";

////////////////////////////////////////////////////// Init WebGL Scene and Camera objects
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer({ antialias: true });
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.maxDistance = 100;
controls.target = new THREE.Vector3(0.0, 0.0, 0.0);
controls.minDistance = 5;

camera.position.set(-35, 35, 35);
controls.update();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

function windowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", windowResize);

////////////////////////////////////////////////////// \Init WebGL Scene and Camera objects

////////////////////////////////////////////////////// Setup Scene objects
const sphere_r = 0.15;
const grid_dist = 2.5;
const grid_size = new THREE.Vector3(16, 16, 16);

const start_color = 0.08;
const start_point = new THREE.Vector3()
  .copy(grid_size)
  .subScalar(1)
  .multiply(new THREE.Vector3(grid_dist, grid_dist, grid_dist))
  .divideScalar(2)
  .multiply(new THREE.Vector3(-1, 1, 1));

const sphere_geometry = new THREE.SphereGeometry(sphere_r, 10, 10);
const table_geometry = new THREE.BoxGeometry(
  grid_size.x * grid_dist * 1.1,
  grid_dist / 2,
  grid_size.y * grid_dist * 1.1
);

const table_material = new THREE.MeshBasicMaterial({
  color: new THREE.Color(0x854c00),
});

// const plane = new THREE.Mesh(geometry, material);

setup_grid_mesh();
const light = new THREE.AmbientLight(); // soft white light
scene.add(light);
////////////////////////////////////////////////////// \Setup Scene objects

////////////////////////////////////////////////////// Setup Animations

function pos_to_ind(vec) {
  return vec[0] + (vec[1] + vec[2] * grid_size.y) * grid_size.x;
}

const lines_points = [
  {
    start_f: {
      r: start_color,
      g: start_color,
      b: start_color,
      x: 1,
      y: 1,
      z: 1,
    },
    end_f: {
      r: 1.0,
      g: 1.0,
      b: 1.0,
      x: 3,
      y: 3,
      z: 3,
    },
    points: [
      114, 115, 116, 117, 118, 97, 98, 99, 101, 102, 103, 81, 82, 86, 87, 65,
      71, 49, 50, 54, 55, 33, 34, 35, 37, 38, 39, 18, 19, 20, 21, 22,
    ],
  },
  {
    start_f: {
      r: start_color,
      g: start_color,
      b: start_color,
      x: 1,
      y: 1,
      z: 1,
    },
    end_f: {
      r: 0.431,
      g: 0.267,
      b: 1.0,
      x: 3,
      y: 3,
      z: 3,
    },
    points: [
      228, 229, 230, 231, 232, 210, 211, 212, 216, 217, 218, 194, 195, 201, 202,
      178, 179, 180, 184, 185, 186, 164, 165, 166, 167, 168,
    ],
  },
  {
    start_f: {
      r: start_color,
      g: start_color,
      b: start_color,
      x: 1,
      y: 1,
      z: 1,
    },
    end_f: {
      r: 0.592,
      g: 0.8,
      b: 0.016,
      x: 3,
      y: 3,
      z: 3,
    },
    points: [
      171, 172, 173, 155, 156, 157, 138, 139, 141, 142, 122, 126, 106, 110, 90,
      94, 74, 75, 77, 78, 59, 60, 61, 43, 44, 45,
    ],
  },
  {
    start_f: {
      r: start_color,
      g: start_color,
      b: start_color,
      x: 1,
      y: 1,
      z: 1,
    },
    end_f: {
      r: 1.0,
      g: 0.0,
      b: 0.329,
      x: 3,
      y: 3,
      z: 3,
    },
    points: [
      4085, 4086, 4087, 4088, 4089, 4090, 4067, 4068, 4075, 4076, 4050, 4051,
      4060, 4061, 4033, 4034, 4045, 4046, 4017, 4030, 4000, 4015, 3984, 3999,
      3968, 3983, 3952, 3967, 3936, 3951, 3920, 3935, 3905, 3918, 3889, 3890,
      3901, 3902, 3874, 3875, 3884, 3885, 3859, 3860, 3867, 3868, 3845, 3846,
      3847, 3848, 3849, 3850,
    ],
  },
  {
    start_f: {
      r: start_color,
      g: start_color,
      b: start_color,
      x: 1,
      y: 1,
      z: 1,
    },
    end_f: {
      r: 0.965,
      g: 0.682,
      b: 0.176,
      x: 3,
      y: 3,
      z: 3,
    },
    points: [
      3907, 3908, 3909, 3650, 3651, 3652, 3653, 3654, 3394, 3395, 3396, 3397,
      3398, 3138, 3139, 3140, 3141, 3142, 2883, 2884, 2885,
    ],
  },
  {
    start_f: {
      r: start_color,
      g: start_color,
      b: start_color,
      x: 1,
      y: 1,
      z: 1,
    },
    end_f: {
      r: 0.302,
      g: 0.631,
      b: 0.663,
      x: 3,
      y: 3,
      z: 3,
    },
    points: [
      3018, 2999, 3000, 3001, 3002, 3003, 3004, 3005, 2982, 2983, 2984, 2985,
      2986, 2987, 2988, 2989, 2990, 2967, 2968, 2969, 2970, 2971, 2972, 2973,
      2954,
    ],
  },
  {
    start_f: {
      r: start_color,
      g: start_color,
      b: start_color,
      x: 1,
      y: 1,
      z: 1,
    },
    end_f: {
      r: 0.2,
      g: 0.631,
      b: 0.992,
      x: 3,
      y: 3,
      z: 3,
    },
    points: [
      2214, 2215, 2216, 2217, 2197, 2198, 2199, 2200, 2201, 2202, 2181, 2182,
      2183, 2184, 2185, 2186, 2165, 2166, 2167, 2168, 2169, 2170, 2149, 2150,
      2151, 2152, 2153, 2154, 2134, 2135, 2136, 2137, 1958, 1959, 1960, 1961,
      1941, 1942, 1943, 1944, 1945, 1946, 1925, 1926, 1927, 1928, 1929, 1930,
      1909, 1910, 1911, 1912, 1913, 1914, 1893, 1894, 1895, 1896, 1897, 1898,
      1878, 1879, 1880, 1881, 1702, 1703, 1704, 1705, 1685, 1686, 1687, 1688,
      1689, 1690, 1669, 1670, 1671, 1672, 1673, 1674, 1653, 1654, 1655, 1656,
      1657, 1658, 1637, 1638, 1639, 1640, 1641, 1642, 1622, 1623, 1624, 1625,
      1446, 1447, 1448, 1449, 1429, 1430, 1431, 1432, 1433, 1434, 1413, 1414,
      1415, 1416, 1417, 1418, 1397, 1398, 1399, 1400, 1401, 1402, 1381, 1382,
      1383, 1384, 1385, 1386, 1366, 1367, 1368, 1369, 1190, 1191, 1192, 1193,
      1173, 1174, 1175, 1176, 1177, 1178, 1157, 1158, 1159, 1160, 1161, 1162,
      1141, 1142, 1143, 1144, 1145, 1146, 1125, 1126, 1127, 1128, 1129, 1130,
      1110, 1111, 1112, 1113,
    ],
  },
  {
    start_f: {
      r: start_color,
      g: start_color,
      b: start_color,
      x: 1,
      y: 1,
      z: 1,
    },
    end_f: {
      r: 0.859,
      g: 0.188,
      b: 0.412,
      x: 3,
      y: 3,
      z: 3,
    },
    points: [
      2261, 2262, 2263, 2264, 2265, 2266, 2244, 2245, 2246, 2249, 2250, 2251,
      2227, 2228, 2235, 2236, 2210, 2211, 2220, 2221, 2194, 2195, 2204, 2205,
      2178, 2189, 2162, 2173, 2146, 2147, 2156, 2157, 2130, 2131, 2140, 2141,
      2115, 2116, 2123, 2124, 2100, 2101, 2102, 2105, 2106, 2107, 2085, 2086,
      2087, 2088, 2089, 2090, 2005, 2006, 2007, 2008, 2009, 2010, 1988, 1989,
      1990, 1993, 1994, 1995, 1971, 1972, 1979, 1980, 1954, 1955, 1964, 1965,
      1938, 1939, 1948, 1949, 1922, 1933, 1906, 1917, 1890, 1891, 1900, 1901,
      1874, 1875, 1884, 1885, 1859, 1860, 1867, 1868, 1844, 1845, 1846, 1849,
      1850, 1851, 1829, 1830, 1831, 1832, 1833, 1834, 1749, 1750, 1751, 1752,
      1753, 1754, 1732, 1733, 1734, 1737, 1738, 1739, 1715, 1716, 1723, 1724,
      1698, 1699, 1708, 1709, 1682, 1683, 1692, 1693, 1666, 1677, 1650, 1661,
      1634, 1635, 1644, 1645, 1618, 1619, 1628, 1629, 1603, 1604, 1611, 1612,
      1588, 1589, 1590, 1593, 1594, 1595, 1573, 1574, 1575, 1576, 1577, 1578,
      1493, 1494, 1495, 1496, 1497, 1498, 1476, 1477, 1478, 1481, 1482, 1483,
      1459, 1460, 1467, 1468, 1442, 1443, 1452, 1453, 1426, 1427, 1436, 1437,
      1410, 1421, 1394, 1405, 1378, 1379, 1388, 1389, 1362, 1363, 1372, 1373,
      1347, 1348, 1355, 1356, 1332, 1333, 1334, 1337, 1338, 1339, 1317, 1318,
      1319, 1320, 1321, 1322, 1237, 1238, 1239, 1240, 1241, 1242, 1220, 1221,
      1222, 1225, 1226, 1227, 1203, 1204, 1211, 1212, 1186, 1187, 1196, 1197,
      1170, 1171, 1180, 1181, 1154, 1165, 1138, 1149, 1122, 1123, 1132, 1133,
      1106, 1107, 1116, 1117, 1091, 1092, 1099, 1100, 1076, 1077, 1078, 1081,
      1082, 1083, 1061, 1062, 1063, 1064, 1065, 1066,
    ],
  },
];

var tweens_in = [];
var tweens_out = [];
lines_points.forEach((line, i) => {
  tweens_in.push(
    new TWEEN.Tween(JSON.parse(JSON.stringify(line.start_f)))
      .delay(1500)
      .to(JSON.parse(JSON.stringify(line.end_f)), 1500)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(function (obj) {
        line.points.forEach((p) => {
          scene.children[p].material.color.copy(obj);
          scene.children[p].scale.copy(obj);
        });
      })
      .onStart(() => {
        parent.postMessage((i + 1) * 2, "*");
        setTimeout(() => {
          parent.postMessage((i + 1) * 2 + 1, "*");
        }, 1500);
      })
  );

  tweens_out.unshift(
    new TWEEN.Tween(JSON.parse(JSON.stringify(line.end_f)))
      .delay(1000)
      .to(JSON.parse(JSON.stringify(line.start_f)), 1000)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(function (obj) {
        line.points.forEach((p) => {
          scene.children[p].material.color.copy(obj);
          scene.children[p].scale.copy(obj);
        });
      })
  );
});

for (var i = 0; i < tweens_in.length - 1; i++)
  tweens_in[i].chain(tweens_in[i + 1]);

tweens_in[tweens_in.length - 1].onComplete(() => {
  parent.postMessage(0, "*");
  tweens_out.forEach((t) => {
    t.start();
  });

  setTimeout(() => {
    parent.postMessage(1, "*");
  }, 1500);
  setTimeout(() => {
    tweens_in[0].start();
  }, 1500);
});

////////////////////////////////////////////////////// \Setup Animations

////////////////////////////////////////////////////////

parent.postMessage(0, "*");
setTimeout(() => {
  parent.postMessage(1, "*");
  tweens_in[0].start();
}, 1500);
animate();

////////////////////////////////////////////////////////

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  TWEEN.update();
  render();
}

function setup_grid_mesh() {
  for (let z = 0; z < grid_size.z; z++) {
    for (let y = 0; y < grid_size.y; y++) {
      for (let x = 0; x < grid_size.x; x++) {
        const sphere = new THREE.Mesh(
          sphere_geometry,
          new THREE.MeshBasicMaterial({
            color: new THREE.Color(start_color, start_color, start_color),
          })
        );
        sphere.position.copy(
          new THREE.Vector3(x, -y, -z)
            .multiplyScalar(grid_dist)
            .add(start_point)
        );
        scene.add(sphere);
      }
    }
  }

  const table = new THREE.Mesh(table_geometry, table_material);
  table.position.copy(new THREE.Vector3(0, -start_point.y - grid_dist * 4, 0));
  scene.add(table);
}

function render() {
  renderer.render(scene, camera);
}

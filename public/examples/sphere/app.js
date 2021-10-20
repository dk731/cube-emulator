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
      3923, 3924, 3925, 3907, 3908, 3909, 3891, 3892, 3893, 3682, 3683, 3684,
      3685, 3686, 3666, 3667, 3668, 3669, 3670, 3650, 3651, 3652, 3653, 3654,
      3634, 3635, 3636, 3637, 3638, 3618, 3619, 3620, 3621, 3622, 3443, 3444,
      3445, 3426, 3427, 3428, 3429, 3430, 3409, 3410, 3411, 3412, 3413, 3414,
      3415, 3393, 3394, 3395, 3396, 3397, 3398, 3399, 3377, 3378, 3379, 3380,
      3381, 3382, 3383, 3362, 3363, 3364, 3365, 3366, 3347, 3348, 3349, 3187,
      3188, 3189, 3170, 3171, 3172, 3173, 3174, 3153, 3154, 3155, 3156, 3157,
      3158, 3159, 3137, 3138, 3139, 3140, 3141, 3142, 3143, 3121, 3122, 3123,
      3124, 3125, 3126, 3127, 3106, 3107, 3108, 3109, 3110, 3091, 3092, 3093,
      2931, 2932, 2933, 2914, 2915, 2916, 2917, 2918, 2897, 2898, 2899, 2900,
      2901, 2902, 2903, 2881, 2882, 2883, 2884, 2885, 2886, 2887, 2865, 2866,
      2867, 2868, 2869, 2870, 2871, 2850, 2851, 2852, 2853, 2854, 2835, 2836,
      2837, 2658, 2659, 2660, 2661, 2662, 2642, 2643, 2644, 2645, 2646, 2626,
      2627, 2628, 2629, 2630, 2610, 2611, 2612, 2613, 2614, 2594, 2595, 2596,
      2597, 2598, 2387, 2388, 2389, 2371, 2372, 2373, 2355, 2356, 2357,
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
      2235, 2010, 2011, 2012, 1993, 1994, 1995, 1996, 1997, 1977, 1978, 1979,
      1980, 1981, 1961, 1962, 1963, 1964, 1965, 1946, 1947, 1948, 1770, 1771,
      1772, 1753, 1754, 1755, 1756, 1757, 1736, 1737, 1738, 1739, 1740, 1741,
      1742, 1720, 1721, 1722, 1723, 1724, 1725, 1726, 1704, 1705, 1706, 1707,
      1708, 1709, 1710, 1689, 1690, 1691, 1692, 1693, 1674, 1675, 1676, 1513,
      1514, 1515, 1516, 1517, 1496, 1497, 1498, 1499, 1500, 1501, 1502, 1480,
      1481, 1482, 1483, 1484, 1485, 1486, 1464, 1465, 1466, 1467, 1468, 1469,
      1470, 1448, 1449, 1450, 1451, 1452, 1453, 1454, 1432, 1433, 1434, 1435,
      1436, 1437, 1438, 1417, 1418, 1419, 1420, 1421, 1275, 1257, 1258, 1259,
      1260, 1261, 1240, 1241, 1242, 1243, 1244, 1245, 1246, 1224, 1225, 1226,
      1227, 1228, 1229, 1230, 1207, 1208, 1209, 1210, 1211, 1212, 1213, 1214,
      1215, 1192, 1193, 1194, 1195, 1196, 1197, 1198, 1176, 1177, 1178, 1179,
      1180, 1181, 1182, 1161, 1162, 1163, 1164, 1165, 1147, 1001, 1002, 1003,
      1004, 1005, 984, 985, 986, 987, 988, 989, 990, 968, 969, 970, 971, 972,
      973, 974, 952, 953, 954, 955, 956, 957, 958, 936, 937, 938, 939, 940, 941,
      942, 920, 921, 922, 923, 924, 925, 926, 905, 906, 907, 908, 909, 746, 747,
      748, 729, 730, 731, 732, 733, 712, 713, 714, 715, 716, 717, 718, 696, 697,
      698, 699, 700, 701, 702, 680, 681, 682, 683, 684, 685, 686, 665, 666, 667,
      668, 669, 650, 651, 652, 474, 475, 476, 457, 458, 459, 460, 461, 441, 442,
      443, 444, 445, 425, 426, 427, 428, 429, 410, 411, 412, 187,
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
      1123, 1124, 1125, 1126, 1127, 1128, 1129, 1130, 1131, 1132, 1105, 1106,
      1107, 1108, 1109, 1114, 1115, 1116, 1117, 1118, 1088, 1089, 1090, 1101,
      1102, 1103, 1072, 1073, 1074, 1085, 1086, 1087, 1056, 1057, 1058, 1069,
      1070, 1071, 1041, 1042, 1043, 1044, 1045, 1050, 1051, 1052, 1053, 1054,
      1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034, 1035, 1036,
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
      3299, 3300, 3301, 3302, 3303, 3304, 3305, 3306, 3307, 3308, 3281, 3282,
      3283, 3284, 3285, 3286, 3287, 3288, 3289, 3290, 3291, 3292, 3293, 3294,
      3265, 3266, 3267, 3268, 3269, 3270, 3271, 3272, 3273, 3274, 3275, 3276,
      3277, 3278, 3249, 3250, 3251, 3252, 3253, 3254, 3255, 3256, 3257, 3258,
      3259, 3260, 3261, 3262, 3235, 3236, 3237, 3238, 3239, 3240, 3241, 3242,
      3243, 3244,
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

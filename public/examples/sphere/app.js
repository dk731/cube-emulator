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
      2267, 2250, 2251, 2252, 2233, 2234, 2235, 2236, 2237, 2218, 2219, 2220,
      2203, 2026, 2027, 2028, 2009, 2010, 2011, 2012, 2013, 1992, 1993, 1997,
      1998, 1976, 1977, 1981, 1982, 1960, 1961, 1965, 1966, 1945, 1946, 1947,
      1948, 1949, 1930, 1931, 1932, 1787, 1769, 1770, 1771, 1772, 1773, 1752,
      1758, 1736, 1742, 1719, 1720, 1726, 1727, 1704, 1710, 1688, 1694, 1673,
      1674, 1675, 1676, 1677, 1659, 1530, 1531, 1532, 1512, 1513, 1517, 1518,
      1496, 1502, 1479, 1487, 1463, 1471, 1447, 1455, 1432, 1438, 1416, 1417,
      1421, 1422, 1402, 1403, 1404, 1273, 1274, 1275, 1276, 1277, 1256, 1257,
      1261, 1262, 1239, 1240, 1246, 1247, 1223, 1231, 1207, 1215, 1191, 1199,
      1175, 1176, 1182, 1183, 1160, 1161, 1165, 1166, 1145, 1146, 1147, 1148,
      1149, 1018, 1019, 1020, 1000, 1001, 1005, 1006, 984, 990, 967, 975, 951,
      959, 935, 943, 920, 926, 904, 905, 909, 910, 890, 891, 892, 763, 745, 746,
      747, 748, 749, 728, 734, 712, 718, 695, 696, 702, 703, 680, 686, 664, 670,
      649, 650, 651, 652, 653, 635, 490, 491, 492, 473, 474, 475, 476, 477, 456,
      457, 461, 462, 440, 441, 445, 446, 424, 425, 429, 430, 409, 410, 411, 412,
      413, 394, 395, 396, 219, 202, 203, 204, 185, 186, 187, 188, 189, 170, 171,
      172, 155,
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
      1622, 1623, 1624, 1625, 1603, 1604, 1605, 1606, 1607, 1608, 1609, 1610,
      1611, 1612, 1587, 1588, 1589, 1590, 1591, 1592, 1593, 1594, 1595, 1596,
      1571, 1572, 1573, 1574, 1575, 1576, 1577, 1578, 1579, 1580, 1558, 1559,
      1560, 1561, 1363, 1364, 1365, 1366, 1367, 1368, 1369, 1370, 1371, 1372,
      1346, 1347, 1348, 1349, 1350, 1351, 1352, 1353, 1354, 1355, 1356, 1357,
      1329, 1330, 1331, 1332, 1333, 1334, 1335, 1336, 1337, 1338, 1339, 1340,
      1341, 1342, 1314, 1315, 1316, 1317, 1318, 1319, 1320, 1321, 1322, 1323,
      1324, 1325, 1299, 1300, 1301, 1302, 1303, 1304, 1305, 1306, 1307, 1308,
      1107, 1108, 1109, 1110, 1111, 1112, 1113, 1114, 1115, 1116, 1089, 1090,
      1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1099, 1100, 1101, 1102,
      1073, 1074, 1075, 1076, 1077, 1078, 1079, 1080, 1081, 1082, 1083, 1084,
      1085, 1086, 1057, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065, 1066,
      1067, 1068, 1069, 1070, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050,
      1051, 1052, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 834, 835,
      836, 837, 838, 839, 840, 841, 842, 843, 844, 845, 817, 818, 819, 820, 821,
      822, 823, 824, 825, 826, 827, 828, 829, 830, 802, 803, 804, 805, 806, 807,
      808, 809, 810, 811, 812, 813, 787, 788, 789, 790, 791, 792, 793, 794, 795,
      796, 598, 599, 600, 601, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588,
      563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 547, 548, 549, 550, 551,
      552, 553, 554, 555, 556, 534, 535, 536, 537,
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
      4053, 4054, 4055, 4056, 4057, 4058, 4036, 4037, 4038, 4039, 4040, 4041,
      4042, 4043, 4021, 4022, 4023, 4024, 4025, 4026, 3812, 3813, 3814, 3815,
      3816, 3817, 3818, 3819, 3794, 3795, 3796, 3803, 3804, 3805, 3778, 3779,
      3788, 3789, 3762, 3763, 3764, 3771, 3772, 3773, 3748, 3749, 3750, 3751,
      3752, 3753, 3754, 3755, 3573, 3574, 3575, 3576, 3577, 3578, 3554, 3555,
      3556, 3563, 3564, 3565, 3537, 3550, 3521, 3534, 3505, 3518, 3490, 3491,
      3492, 3499, 3500, 3501, 3477, 3478, 3479, 3480, 3481, 3482, 3316, 3317,
      3318, 3319, 3320, 3321, 3322, 3323, 3298, 3299, 3308, 3309, 3281, 3294,
      3265, 3249, 3262, 3234, 3235, 3244, 3245, 3220, 3221, 3222, 3223, 3224,
      3225, 3226, 3227, 3061, 3062, 3063, 3064, 3065, 3066, 3042, 3043, 3044,
      3051, 3052, 3053, 3025, 3038, 3009, 3022, 2993, 3006, 2978, 2979, 2980,
      2987, 2988, 2989, 2965, 2966, 2967, 2968, 2969, 2970, 2788, 2789, 2790,
      2791, 2792, 2793, 2794, 2795, 2770, 2771, 2772, 2779, 2780, 2781, 2754,
      2755, 2764, 2765, 2738, 2739, 2740, 2747, 2748, 2749, 2724, 2725, 2726,
      2727, 2728, 2729, 2730, 2731, 2517, 2518, 2519, 2520, 2521, 2522, 2500,
      2501, 2502, 2503, 2504, 2505, 2506, 2507, 2485, 2486, 2487, 2488, 2489,
      2490,
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

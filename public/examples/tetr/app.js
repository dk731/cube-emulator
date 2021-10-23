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
      r: 0.506,
      g: 0.941,
      b: 0.898,
      x: 3,
      y: 3,
      z: 3,
    },
    points: [
      1536, 1296, 1280, 1281, 1056, 1040, 1041, 1024, 1025, 1026, 816, 800, 801,
      784, 785, 786, 768, 769, 770, 771, 576, 560, 561, 544, 545, 546, 528, 529,
      530, 531, 512, 513, 514, 515, 516, 336, 320, 321, 304, 305, 306, 288, 289,
      290, 291, 272, 273, 274, 275, 276, 256, 257, 258, 259, 260, 261, 96, 80,
      81, 64, 65, 66, 48, 49, 50, 51, 32, 33, 34, 35, 36, 16, 17, 18, 19, 20,
      21, 0, 1, 2, 3, 4, 5, 6,
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
      r: 0.588,
      g: 0.008,
      b: 0.0,
      x: 3,
      y: 3,
      z: 3,
    },
    points: [
      2825, 2585, 2569, 2361, 2345, 2329, 2312, 2313, 2314, 2121, 2105, 2088,
      2089, 2072, 2073, 2074, 2055, 2056, 2057, 2058, 1897, 1881, 1865, 1848,
      1849, 1850, 1832, 1833, 1834, 1815, 1816, 1817, 1818, 1799, 1800, 1801,
      1802, 1803, 1591, 1592, 1593, 1594, 1575, 1576, 1577, 1578, 1559, 1560,
      1561, 1562, 1563, 1542, 1543, 1544, 1545, 1546, 1547, 1285, 1286, 1287,
      1288, 1289, 1290, 1291, 1292,
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
      r: 0.969,
      g: 0.925,
      b: 0.349,
      x: 3,
      y: 3,
      z: 3,
    },
    points: [
      4080, 4081, 4082, 4083, 4084, 4085, 4086, 4087, 4088, 4089, 4090, 4091,
      4092, 4093, 4094, 4095, 4066, 4067, 4068, 4069, 4070, 4071, 4072, 4073,
      4074, 4075, 4076, 4077, 4078, 4079, 4052, 4053, 4054, 4055, 4056, 4057,
      4058, 4059, 4060, 4061, 4062, 4063, 4037, 4038, 4039, 4040, 4041, 4042,
      4043, 4044, 4045, 4046, 4047, 4023, 4024, 4025, 4026, 4027, 4028, 4029,
      4030, 4031, 4009, 4010, 4011, 4012, 4013, 4014, 4015, 3994, 3995, 3996,
      3997, 3998, 3999, 3980, 3981, 3982, 3983, 3966, 3967, 3951, 3825, 3826,
      3827, 3828, 3829, 3830, 3831, 3832, 3833, 3834, 3835, 3836, 3837, 3838,
      3839, 3811, 3812, 3813, 3814, 3815, 3816, 3817, 3818, 3819, 3820, 3821,
      3822, 3823, 3797, 3798, 3799, 3800, 3801, 3802, 3803, 3804, 3805, 3806,
      3807, 3782, 3783, 3784, 3785, 3786, 3787, 3788, 3789, 3790, 3791, 3768,
      3769, 3770, 3771, 3772, 3773, 3774, 3775, 3754, 3755, 3756, 3757, 3758,
      3759, 3739, 3740, 3741, 3742, 3743, 3725, 3726, 3727, 3711, 3570, 3571,
      3572, 3573, 3574, 3575, 3576, 3577, 3578, 3579, 3580, 3581, 3582, 3583,
      3556, 3557, 3558, 3559, 3560, 3561, 3562, 3563, 3564, 3565, 3566, 3567,
      3542, 3543, 3544, 3545, 3546, 3547, 3548, 3549, 3550, 3551, 3527, 3528,
      3529, 3530, 3531, 3532, 3533, 3534, 3535, 3513, 3514, 3515, 3516, 3517,
      3518, 3519, 3499, 3500, 3501, 3502, 3503, 3484, 3485, 3486, 3487, 3470,
      3471, 3315, 3316, 3317, 3318, 3319, 3320, 3321, 3322, 3323, 3324, 3325,
      3326, 3327, 3301, 3302, 3303, 3304, 3305, 3306, 3307, 3308, 3309, 3310,
      3311, 3287, 3288, 3289, 3290, 3291, 3292, 3293, 3294, 3295, 3272, 3273,
      3274, 3275, 3276, 3277, 3278, 3279, 3258, 3259, 3260, 3261, 3262, 3263,
      3244, 3245, 3246, 3247, 3229, 3230, 3231, 3215, 3060, 3061, 3062, 3063,
      3064, 3065, 3066, 3067, 3068, 3069, 3070, 3071, 3046, 3047, 3048, 3049,
      3050, 3051, 3052, 3053, 3054, 3055, 3032, 3033, 3034, 3035, 3036, 3037,
      3038, 3039, 3017, 3018, 3019, 3020, 3021, 3022, 3023, 3003, 3004, 3005,
      3006, 3007, 2989, 2990, 2991, 2974, 2975, 2805, 2806, 2807, 2808, 2809,
      2810, 2811, 2812, 2813, 2814, 2815, 2791, 2792, 2793, 2794, 2795, 2796,
      2797, 2798, 2799, 2777, 2778, 2779, 2780, 2781, 2782, 2783, 2762, 2763,
      2764, 2765, 2766, 2767, 2748, 2749, 2750, 2751, 2734, 2735, 2719, 2550,
      2551, 2552, 2553, 2554, 2555, 2556, 2557, 2558, 2559, 2536, 2537, 2538,
      2539, 2540, 2541, 2542, 2543, 2522, 2523, 2524, 2525, 2526, 2527, 2507,
      2508, 2509, 2510, 2511, 2493, 2494, 2495, 2479, 2295, 2296, 2297, 2298,
      2299, 2300, 2301, 2302, 2303, 2281, 2282, 2283, 2284, 2285, 2286, 2287,
      2267, 2268, 2269, 2270, 2271, 2252, 2253, 2254, 2255, 2238, 2239, 2040,
      2041, 2042, 2043, 2044, 2045, 2046, 2047, 2026, 2027, 2028, 2029, 2030,
      2031, 2012, 2013, 2014, 2015, 1997, 1998, 1999, 1983, 1785, 1786, 1787,
      1788, 1789, 1790, 1791, 1771, 1772, 1773, 1774, 1775, 1757, 1758, 1759,
      1742, 1743, 1530, 1531, 1532, 1533, 1534, 1535, 1516, 1517, 1518, 1519,
      1502, 1503, 1487, 1275, 1276, 1277, 1278, 1279, 1261, 1262, 1263, 1247,
      1020, 1021, 1022, 1023, 1006, 1007, 765, 766, 767, 751, 510, 511, 255,
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
      g: 0.533,
      b: 0.863,
      x: 3,
      y: 3,
      z: 3,
    },
    points: [
      3568, 3312, 3313, 3056, 3057, 3058, 2800, 2801, 2802, 2803, 2544, 2545,
      2546, 2547, 2548, 2528, 2288, 2289, 2290, 2291, 2292, 2293, 2272, 2273,
      2032, 2033, 2034, 2035, 2036, 2037, 2038, 2016, 2017, 2018, 1776, 1777,
      1778, 1779, 1780, 1781, 1782, 1783, 1760, 1761, 1762, 1763, 1744, 1520,
      1521, 1522, 1523, 1524, 1525, 1526, 1527, 1528, 1504, 1505, 1506, 1507,
      1508, 1488, 1489, 1264, 1265, 1266, 1267, 1268, 1269, 1270, 1271, 1272,
      1273, 1248, 1249, 1250, 1251, 1252, 1253, 1232, 1233, 1234, 1008, 1009,
      1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 992, 993, 994, 995,
      996, 997, 998, 976, 977, 978, 979, 960, 752, 753, 754, 755, 756, 757, 758,
      759, 760, 761, 762, 763, 736, 737, 738, 739, 740, 741, 742, 743, 720, 721,
      722, 723, 724, 704, 705, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505,
      506, 507, 508, 480, 481, 482, 483, 484, 485, 486, 487, 488, 464, 465, 466,
      467, 468, 469, 448, 449, 450, 240, 241, 242, 243, 244, 245, 246, 247, 248,
      249, 250, 251, 252, 253, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233,
      208, 209, 210, 211, 212, 213, 214, 192, 193, 194, 195, 176,
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

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
      r: 0.133,
      g: 0.424,
      b: 0.878,
      x: 3,
      y: 3,
      z: 3,
    },
    points: [
      96, 80, 81, 64, 65, 66, 48, 49, 50, 51, 32, 33, 34, 35, 36, 16, 17, 18,
      19, 20, 21, 0, 1, 2, 3, 4, 5, 6,
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
      r: 0.514,
      g: 0.129,
      b: 0.38,
      x: 3,
      y: 3,
      z: 3,
    },
    points: [
      4095, 4078, 4079, 4061, 4062, 4063, 4044, 4045, 4046, 4047, 4027, 4028,
      4029, 4030, 4031, 4010, 4011, 4012, 4013, 4014, 4015, 3993, 3994, 3995,
      3996, 3997, 3998, 3999, 3976, 3977, 3978, 3979, 3980, 3981, 3982, 3983,
      3959, 3960, 3961, 3962, 3963, 3964, 3965, 3966, 3967, 3942, 3943, 3944,
      3945, 3946, 3947, 3948, 3949, 3950, 3951, 3925, 3926, 3927, 3928, 3929,
      3930, 3931, 3932, 3933, 3934, 3935, 3908, 3909, 3910, 3911, 3912, 3913,
      3914, 3915, 3916, 3917, 3918, 3919, 3891, 3892, 3893, 3894, 3895, 3896,
      3897, 3898, 3899, 3900, 3901, 3902, 3903, 3874, 3875, 3876, 3877, 3878,
      3879, 3880, 3881, 3882, 3883, 3884, 3885, 3886, 3887, 3857, 3858, 3859,
      3860, 3861, 3862, 3863, 3864, 3865, 3866, 3867, 3868, 3869, 3870, 3871,
      3840, 3841, 3842, 3843, 3844, 3845, 3846, 3847, 3848, 3849, 3850, 3851,
      3852, 3853, 3854, 3855,
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
      r: 0.945,
      g: 0.894,
      b: 0.91,
      x: 3,
      y: 3,
      z: 3,
    },
    points: [
      4080, 3824, 3825, 3568, 3569, 3570, 3312, 3313, 3314, 3315, 3056, 3057,
      3058, 3059, 3060, 2800, 2801, 2802, 2803, 2804, 2805, 2544, 2545, 2546,
      2547, 2548, 2549, 2550, 2288, 2289, 2290, 2291, 2292, 2293, 2294, 2295,
      2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 1776, 1777, 1778,
      1779, 1780, 1781, 1782, 1783, 1784, 1785, 1520, 1521, 1522, 1523, 1524,
      1525, 1526, 1527, 1528, 1529, 1530, 1264, 1265, 1266, 1267, 1268, 1269,
      1270, 1271, 1272, 1273, 1274, 1275, 1008, 1009, 1010, 1011, 1012, 1013,
      1014, 1015, 1016, 1017, 1018, 1019, 1020, 752, 753, 754, 755, 756, 757,
      758, 759, 760, 761, 762, 763, 764, 765, 496, 497, 498, 499, 500, 501, 502,
      503, 504, 505, 506, 507, 508, 509, 510, 240, 241, 242, 243, 244, 245, 246,
      247, 248, 249, 250, 251, 252, 253, 254, 255,
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
      r: 0.992,
      g: 0.906,
      b: 0.298,
      x: 3,
      y: 3,
      z: 3,
    },
    points: [
      3839, 3583, 3566, 3549, 3327, 3310, 3293, 3276, 3259, 3071, 3054, 3037,
      3020, 3003, 2986, 2969, 2815, 2798, 2781, 2764, 2747, 2730, 2713, 2696,
      2679, 2559, 2542, 2525, 2508, 2491, 2474, 2457, 2440, 2423, 2406, 2389,
      2303, 2286, 2269, 2252, 2235, 2218, 2201, 2184, 2167, 2150, 2133, 2116,
      2099, 2047, 2030, 2013, 1996, 1979, 1962, 1945, 1928, 1911, 1894, 1877,
      1860, 1843, 1826, 1809, 1792, 1791, 1774, 1757, 1740, 1723, 1706, 1689,
      1672, 1655, 1638, 1621, 1604, 1587, 1535, 1518, 1501, 1484, 1467, 1450,
      1433, 1416, 1399, 1382, 1365, 1279, 1262, 1245, 1228, 1211, 1194, 1177,
      1160, 1023, 1006, 989, 972, 955, 938, 767, 750, 733, 511,
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
      r: 0.608,
      g: 0.773,
      b: 0.239,
      x: 3,
      y: 3,
      z: 3,
    },
    points: [
      3468, 3469, 3470, 3212, 3213, 3214, 3196, 3197, 3198, 2956, 2957, 2958,
      2940, 2941, 2942, 2924, 2925, 2926, 2908, 2909, 2910, 2700, 2701, 2702,
      2684, 2685, 2686, 2668, 2669, 2670, 2652, 2653, 2654, 2636, 2637, 2638,
      2444, 2445, 2446, 2428, 2429, 2430, 2412, 2413, 2414, 2396, 2397, 2398,
      2380, 2381, 2382, 2364, 2365, 2366, 2348, 2349, 2350, 2188, 2189, 2190,
      2172, 2173, 2174, 2156, 2157, 2158, 2140, 2141, 2142, 2124, 2125, 2126,
      2108, 2109, 2110, 2092, 2093, 2094, 2076, 2077, 2078, 2060, 2061, 2062,
      1932, 1933, 1934, 1916, 1917, 1918, 1900, 1901, 1902, 1884, 1885, 1886,
      1868, 1869, 1870, 1852, 1853, 1854, 1836, 1837, 1838, 1676, 1677, 1678,
      1660, 1661, 1662, 1644, 1645, 1646, 1628, 1629, 1630, 1612, 1613, 1614,
      1420, 1421, 1422, 1404, 1405, 1406, 1388, 1389, 1390, 1372, 1373, 1374,
      1164, 1165, 1166, 1148, 1149, 1150, 908, 909, 910,
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

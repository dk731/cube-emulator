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
    points: [144, 128, 112, 96, 80, 64, 48, 32, 16, 0],
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
    points: [3855, 3599, 3343, 3087, 2831, 2575, 2319, 2063],
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
      3873, 3856, 3857, 3858, 3840, 3841, 3634, 3616, 3617, 3618, 3619, 3600,
      3601, 3602, 3584, 3585, 3586, 3395, 3377, 3378, 3379, 3380, 3361, 3362,
      3363, 3344, 3345, 3346, 3347, 3329, 3156, 3138, 3139, 3140, 3141, 3122,
      3123, 3124, 3105, 3106, 3107, 3108, 3090, 2917, 2899, 2900, 2901, 2902,
      2883, 2884, 2885, 2866, 2867, 2868, 2869, 2851, 2678, 2660, 2661, 2662,
      2663, 2644, 2645, 2646, 2627, 2628, 2629, 2630, 2612, 2439, 2421, 2422,
      2423, 2424, 2405, 2406, 2407, 2388, 2389, 2390, 2391, 2373, 2200, 2182,
      2183, 2184, 2185, 2166, 2167, 2168, 2149, 2150, 2151, 2152, 2134, 1961,
      1943, 1944, 1945, 1946, 1927, 1928, 1929, 1910, 1911, 1912, 1913, 1895,
      1722, 1704, 1705, 1706, 1707, 1688, 1689, 1690, 1671, 1672, 1673, 1674,
      1656, 1483, 1465, 1466, 1467, 1468, 1449, 1450, 1451, 1432, 1433, 1434,
      1435, 1417, 1244, 1226, 1227, 1228, 1229, 1210, 1211, 1212, 1193, 1194,
      1195, 1196, 1178, 1005, 987, 988, 989, 990, 971, 972, 973, 954, 955, 956,
      957, 939, 766, 748, 749, 750, 751, 732, 733, 734, 715, 716, 717, 718, 700,
      509, 510, 511, 493, 494, 495, 476, 477, 478, 479, 461, 254, 255, 237, 238,
      239, 222,
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
      4095, 3838, 3581, 3324, 3067, 2810, 2553, 2296, 2039, 1782, 1525, 1268,
      1011, 754, 497, 240,
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
      r: 0.435,
      g: 0.176,
      b: 0.741,
      x: 3,
      y: 3,
      z: 3,
    },
    points: [
      3963, 3964, 3965, 3946, 3947, 3948, 3949, 3950, 3930, 3931, 3932, 3933,
      3934, 3914, 3915, 3916, 3917, 3918, 3899, 3900, 3901, 3707, 3708, 3709,
      3690, 3691, 3692, 3693, 3694, 3674, 3675, 3676, 3677, 3678, 3658, 3659,
      3660, 3661, 3662, 3643, 3644, 3645, 3451, 3452, 3453, 3434, 3435, 3436,
      3437, 3438, 3418, 3419, 3420, 3421, 3422, 3402, 3403, 3404, 3405, 3406,
      3387, 3388, 3389, 3195, 3196, 3197, 3178, 3179, 3180, 3181, 3182, 3162,
      3163, 3164, 3165, 3166, 3146, 3147, 3148, 3149, 3150, 3131, 3132, 3133,
      2939, 2940, 2941, 2922, 2923, 2924, 2925, 2926, 2906, 2907, 2908, 2909,
      2910, 2890, 2891, 2892, 2893, 2894, 2875, 2876, 2877, 2683, 2684, 2685,
      2666, 2667, 2668, 2669, 2670, 2650, 2651, 2652, 2653, 2654, 2634, 2635,
      2636, 2637, 2638, 2619, 2620, 2621, 2427, 2428, 2429, 2410, 2411, 2412,
      2413, 2414, 2394, 2395, 2396, 2397, 2398, 2378, 2379, 2380, 2381, 2382,
      2363, 2364, 2365, 2171, 2172, 2173, 2154, 2155, 2156, 2157, 2158, 2138,
      2139, 2140, 2141, 2142, 2122, 2123, 2124, 2125, 2126, 2107, 2108, 2109,
      1915, 1916, 1917, 1898, 1899, 1900, 1901, 1902, 1882, 1883, 1884, 1885,
      1886, 1866, 1867, 1868, 1869, 1870, 1851, 1852, 1853, 1659, 1660, 1661,
      1642, 1643, 1644, 1645, 1646, 1626, 1627, 1628, 1629, 1630, 1610, 1611,
      1612, 1613, 1614, 1595, 1596, 1597, 1403, 1404, 1405, 1386, 1387, 1388,
      1389, 1390, 1370, 1371, 1372, 1373, 1374, 1354, 1355, 1356, 1357, 1358,
      1339, 1340, 1341, 1147, 1148, 1149, 1130, 1131, 1132, 1133, 1134, 1114,
      1115, 1116, 1117, 1118, 1098, 1099, 1100, 1101, 1102, 1083, 1084, 1085,
      891, 892, 893, 874, 875, 876, 877, 878, 858, 859, 860, 861, 862, 842, 843,
      844, 845, 846, 827, 828, 829, 635, 636, 637, 618, 619, 620, 621, 622, 602,
      603, 604, 605, 606, 586, 587, 588, 589, 590, 571, 572, 573, 379, 380, 381,
      362, 363, 364, 365, 366, 346, 347, 348, 349, 350, 330, 331, 332, 333, 334,
      315, 316, 317, 123, 124, 125, 106, 107, 108, 109, 110, 90, 91, 92, 93, 94,
      74, 75, 76, 77, 78, 59, 60, 61,
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

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

const start_color = { r: 0.08, g: 0.08, b: 0.08 };
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

setup_grid_mesh();
const light = new THREE.AmbientLight(); // soft white light
scene.add(light);
////////////////////////////////////////////////////// \Setup Scene objects

////////////////////////////////////////////////////// Setup Animations

const defualt_pix = { ...start_color, x: 1, y: 1, z: 1 };

const origin_pos = new THREE.Vector3().copy(start_point);
// .add({ x: -grid_dist / 2, y: grid_dist / 2, z: grid_dist / 2 });

const offset_1 = new THREE.Vector3()
  .copy(origin_pos)
  .add({ x: grid_dist * 7.5, y: -grid_dist * 7.5, z: -grid_dist * 7.5 });

const offset_2 = new THREE.Vector3()
  .copy(origin_pos)
  .add({ x: grid_dist * 7, y: -grid_dist * 7.5, z: -grid_dist * 7.5 });

const def_arrow_size = grid_dist * 5;
const def_arrow_size_vec = {
  x: def_arrow_size,
  y: def_arrow_size,
  z: def_arrow_size,
};

const sphere1_points = [
  2455, 2456, 2438, 2439, 2440, 2441, 2422, 2423, 2424, 2425, 2407, 2408, 2198,
  2199, 2200, 2201, 2182, 2183, 2184, 2185, 2166, 2167, 2168, 2169, 2150, 2151,
  2152, 2153, 1942, 1943, 1944, 1945, 1926, 1927, 1928, 1929, 1910, 1911, 1912,
  1913, 1894, 1895, 1896, 1897, 1687, 1688, 1670, 1671, 1672, 1673, 1654, 1655,
  1656, 1657, 1639, 1640,
];
const sphere2_points = [
  2966, 2967, 2968, 2969, 2949, 2950, 2951, 2952, 2953, 2954, 2933, 2934, 2935,
  2936, 2937, 2938, 2918, 2919, 2920, 2921, 2725, 2726, 2727, 2728, 2729, 2730,
  2708, 2709, 2710, 2713, 2714, 2715, 2691, 2692, 2693, 2698, 2699, 2700, 2675,
  2676, 2677, 2682, 2683, 2684, 2660, 2661, 2662, 2665, 2666, 2667, 2645, 2646,
  2647, 2648, 2649, 2650, 2486, 2487, 2488, 2489, 2468, 2469, 2470, 2473, 2474,
  2475, 2451, 2452, 2459, 2460, 2434, 2435, 2444, 2445, 2418, 2419, 2428, 2429,
  2403, 2404, 2411, 2412, 2388, 2389, 2390, 2393, 2394, 2395, 2374, 2375, 2376,
  2377, 2229, 2230, 2231, 2232, 2233, 2234, 2211, 2212, 2213, 2218, 2219, 2220,
  2194, 2195, 2204, 2205, 2178, 2179, 2188, 2189, 2162, 2163, 2172, 2173, 2146,
  2147, 2156, 2157, 2131, 2132, 2133, 2138, 2139, 2140, 2117, 2118, 2119, 2120,
  2121, 2122, 1973, 1974, 1975, 1976, 1977, 1978, 1955, 1956, 1957, 1962, 1963,
  1964, 1938, 1939, 1948, 1949, 1922, 1923, 1932, 1933, 1906, 1907, 1916, 1917,
  1890, 1891, 1900, 1901, 1875, 1876, 1877, 1882, 1883, 1884, 1861, 1862, 1863,
  1864, 1865, 1866, 1718, 1719, 1720, 1721, 1700, 1701, 1702, 1705, 1706, 1707,
  1683, 1684, 1691, 1692, 1666, 1667, 1676, 1677, 1650, 1651, 1660, 1661, 1635,
  1636, 1643, 1644, 1620, 1621, 1622, 1625, 1626, 1627, 1606, 1607, 1608, 1609,
  1445, 1446, 1447, 1448, 1449, 1450, 1428, 1429, 1430, 1433, 1434, 1435, 1411,
  1412, 1413, 1418, 1419, 1420, 1395, 1396, 1397, 1402, 1403, 1404, 1380, 1381,
  1382, 1385, 1386, 1387, 1365, 1366, 1367, 1368, 1369, 1370, 1174, 1175, 1176,
  1177, 1157, 1158, 1159, 1160, 1161, 1162, 1141, 1142, 1143, 1144, 1145, 1146,
  1126, 1127, 1128, 1129,
];

const triangle1_points = [
  871, 855, 677, 678, 679, 680, 681, 661, 662, 663, 664, 665, 646, 647, 648,
  630, 631, 632, 615, 599, 452, 453, 454, 455, 456, 457, 458, 436, 437, 438,
  439, 440, 441, 442, 421, 422, 423, 424, 425, 405, 406, 407, 408, 409, 390,
  391, 392, 374, 375, 376, 196, 197, 198, 199, 200, 201, 202, 180, 181, 182,
  183, 184, 185, 186,
];
const triangle2_points = [
  3908, 3909, 3910, 3911, 3912, 3913, 3914, 3892, 3893, 3894, 3895, 3896, 3897,
  3898, 3718, 3719, 3720, 3702, 3703, 3704, 3685, 3686, 3687, 3688, 3689, 3669,
  3670, 3671, 3672, 3673, 3652, 3653, 3654, 3655, 3656, 3657, 3658, 3636, 3637,
  3638, 3639, 3640, 3641, 3642, 3495, 3479, 3462, 3463, 3464, 3446, 3447, 3448,
  3429, 3430, 3431, 3432, 3433, 3413, 3414, 3415, 3416, 3417, 3239, 3223,
];

const origin_obj = {
  arrow_x: new THREE.ArrowHelper(
    { x: 1, y: 0, z: 0 },
    JSON.parse(JSON.stringify(origin_pos)), // Copy objects data
    JSON.parse(JSON.stringify(def_arrow_size)),
    0xff0000
  ),
  arrow_y: new THREE.ArrowHelper(
    { x: 0, y: -1, z: 0 },
    JSON.parse(JSON.stringify(origin_pos)),
    JSON.parse(JSON.stringify(def_arrow_size)),
    0x0000ff
  ),
  arrow_z: new THREE.ArrowHelper(
    { x: 0, y: 0, z: -1 },
    JSON.parse(JSON.stringify(origin_pos)),
    JSON.parse(JSON.stringify(def_arrow_size)),
    0x00ff00
  ),
};

//////////////////////////////////////////////////////

function anim_pixels(pix_list, start_col_s, end_col_s, anim_time, delay, msg) {
  new TWEEN.Tween(JSON.parse(JSON.stringify(start_col_s)))
    .delay(delay)
    .to(JSON.parse(JSON.stringify(end_col_s)), anim_time)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .onUpdate(function (obj) {
      pix_list.forEach((p) => {
        scene.children[p].material.color.copy(obj);
        scene.children[p].scale.copy(obj);
      });
    })
    .start();
  if (msg) parent.postMessage(msg, "*");
}

function anim_translate(start_pos, end_pos, anim_time, delay, msg) {
  new TWEEN.Tween(JSON.parse(JSON.stringify(start_pos)))
    .delay(delay)
    .to(JSON.parse(JSON.stringify(end_pos)), anim_time)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .onUpdate(function (obj) {
      origin_obj.arrow_x.position.copy(obj);
      origin_obj.arrow_y.position.copy(obj);
      origin_obj.arrow_z.position.copy(obj);
    })
    .start();
  if (msg) parent.postMessage(msg, "*");
}

function anim_scale(start_scale, end_scale, anim_time, delay, msg) {
  new TWEEN.Tween(JSON.parse(JSON.stringify(start_scale)))
    .delay(delay)
    .to(JSON.parse(JSON.stringify(end_scale)), anim_time)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .onUpdate(function (obj) {
      origin_obj.arrow_x.setLength(Math.abs(obj.x));
      origin_obj.arrow_y.setLength(Math.abs(obj.y));
      origin_obj.arrow_z.setLength(Math.abs(obj.z));

      if (obj.x < -0.1) origin_obj.arrow_x.setDirection({ x: -1, y: 0, z: 0 });
      else origin_obj.arrow_x.setDirection({ x: 1, y: 0, z: 0 });
      if (obj.y < -0.1) origin_obj.arrow_y.setDirection({ x: 0, y: 1, z: 0 });
      else origin_obj.arrow_y.setDirection({ x: 0, y: -1, z: 0 });
      if (obj.z < -0.1) origin_obj.arrow_z.setDirection({ x: 0, y: 0, z: 1 });
      else origin_obj.arrow_z.setDirection({ x: 0, y: 0, z: -1 });
    })
    .start();
  if (msg) parent.postMessage(msg, "*");
}

scene.add(origin_obj.arrow_x);
scene.add(origin_obj.arrow_y);
scene.add(origin_obj.arrow_z);

// Code animation flow

setTimeout(animation_flow, 0);

////////////////////////////////////////////////////// \Setup Animations

////////////////////////////////////////////////////////

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
            color: new THREE.Color(start_color.r, start_color.g, start_color.b),
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

// Code animation names:
// clear
// trans1
// sphere1
// scale1
// sphere2
// pop1
// trans2
// trinagle1
// scale2
// triangle2
// pop2
function animation_flow() {
  parent.postMessage("clear", "*");
  (async () => await new Promise((resolve) => setTimeout(resolve, 500)))();

  anim_translate(origin_pos, offset_1, 2000, 1000, "trans1");

  anim_pixels(
    sphere1_points,
    defualt_pix,
    { r: 1.0, g: 0.721, b: 0.819, x: 3, y: 3, z: 3 },
    2000,
    4000,
    "sphere1"
  );

  anim_scale(
    def_arrow_size_vec,
    {
      x: def_arrow_size * 1.5,
      y: def_arrow_size,
      z: def_arrow_size,
    },
    2000,
    7000,
    "scale1"
  );

  anim_pixels(
    sphere2_points,
    defualt_pix,
    { r: 0.807, g: 0.968, b: 0.627, x: 3, y: 3, z: 3 },
    2000,
    10000,
    "sphere2"
  );

  anim_scale(
    {
      x: def_arrow_size * 1.5,
      y: def_arrow_size,
      z: def_arrow_size,
    },
    def_arrow_size_vec,
    2000,
    13000,
    "pop1"
  );

  anim_translate(offset_1, origin_pos, 2000, 13000);

  anim_translate(origin_pos, offset_2, 2000, 16000, "trans2");

  anim_pixels(
    triangle1_points,
    defualt_pix,
    { r: 0.439, g: 0.839, b: 1.0, x: 3, y: 3, z: 3 },
    2000,
    19000,
    "triangle1"
  );

  anim_scale(
    def_arrow_size_vec,
    {
      x: def_arrow_size,
      y: -def_arrow_size,
      z: -def_arrow_size,
    },
    2000,
    22000,
    "scale2"
  );

  anim_pixels(
    triangle2_points,
    defualt_pix,
    { r: 0.439, g: 0.839, b: 1.0, x: 3, y: 3, z: 3 },
    2000,
    25000,
    "triangle2"
  );

  ////////////////////////////////////////

  anim_translate(offset_2, origin_pos, 2000, 28000);

  anim_scale(
    {
      x: def_arrow_size,
      y: -def_arrow_size,
      z: -def_arrow_size,
    },
    def_arrow_size_vec,
    2000,
    28000,
    "pop2"
  );

  anim_pixels(
    sphere1_points,
    { r: 1.0, g: 0.721, b: 0.819, x: 3, y: 3, z: 3 },
    defualt_pix,
    2000,
    31000
  );

  anim_pixels(
    sphere2_points,
    { r: 0.807, g: 0.968, b: 0.627, x: 3, y: 3, z: 3 },
    defualt_pix,
    2000,
    31000,
    "clear"
  );

  anim_pixels(
    triangle1_points,
    { r: 0.439, g: 0.839, b: 1.0, x: 3, y: 3, z: 3 },
    defualt_pix,
    2000,
    31000
  );

  anim_pixels(
    triangle2_points,
    { r: 0.439, g: 0.839, b: 1.0, x: 3, y: 3, z: 3 },
    defualt_pix,
    2000,
    31000
  );

  setTimeout(animation_flow, 31000);
}

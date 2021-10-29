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
  .add({ x: grid_dist * 7, y: -grid_dist * 7, z: -grid_dist * 7 });

const def_arrow_size = grid_dist * 5;
const def_arrow_size_vec = {
  x: def_arrow_size,
  y: def_arrow_size,
  z: def_arrow_size,
};

const p1 = [5];
const p2 = [80];

const trinagle1_points = [
  1142, 1143, 1144, 1127, 1111, 1095, 933, 934, 935, 936, 937, 917, 918, 919,
  920, 921, 902, 903, 904, 886, 887, 888, 871, 855, 839, 724, 725, 726, 727,
  728, 729, 730, 708, 709, 710, 711, 712, 713, 714, 692, 693, 694, 695, 696,
  697, 698, 677, 678, 679, 680, 681, 661, 662, 663, 664, 665, 646, 647, 648,
  630, 631, 632, 467, 468, 469, 470, 471, 472, 473, 474, 475, 452, 453, 454,
  455, 456, 457, 458, 436, 437, 438, 439, 440, 441, 442, 421, 422, 423, 424,
  425,
];

const trinagle2_points = [
  3025, 2769, 2770, 2753, 2754, 2737, 2738, 2513, 2514, 2497, 2498, 2481, 2482,
  2465, 2466, 2467, 2450, 2451, 2257, 2258, 2241, 2242, 2225, 2226, 2209, 2210,
  2211, 2194, 2195, 2178, 2179, 2162, 2163, 2164, 2001, 2002, 1985, 1986, 1969,
  1970, 1953, 1954, 1955, 1938, 1939, 1922, 1923, 1906, 1907, 1908, 1891, 1892,
  1875, 1876, 1859, 1860, 1745, 1746, 1729, 1730, 1713, 1714, 1697, 1698, 1699,
  1682, 1683, 1666, 1667, 1650, 1651, 1652, 1489, 1490, 1473, 1474, 1457, 1458,
  1441, 1442, 1443, 1426, 1427, 1233, 1234, 1217, 1218, 1201, 1202, 977,
];

const circle1_points = [
  3476, 3477, 3478, 3479, 3480, 3481, 3482, 3459, 3460, 3461, 3463, 3465, 3466,
  3467, 3442, 3443, 3444, 3450, 3451, 3452, 3427, 3428, 3429, 3431, 3433, 3434,
  3435, 3412, 3413, 3414, 3415, 3416, 3417, 3418,
];

const circle2_points = [
  2957, 2941, 2925, 2717, 2701, 2685, 2669, 2653, 2461, 2445, 2413, 2397, 2205,
  2141, 1949, 1933, 1901, 1885, 1693, 1629, 1437, 1421, 1389, 1373, 1181, 1165,
  1133, 1117, 909, 893, 877, 637,
];

const circle3_points = [
  2457, 2441, 2425, 2409, 2393, 2216, 2200, 2184, 2168, 2152, 2136, 2120, 1975,
  1959, 1943, 1927, 1911, 1895, 1879, 1863, 1702, 1686, 1670, 1654, 1638, 1622,
  1606, 1429, 1413, 1397, 1381, 1365,
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
    .onStart(() => {
      parent.postMessage(msg, "*");
    })
    .start();
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
    .onStart(() => {
      parent.postMessage(msg, "*");
    })
    .start();
}

function anim_rotate(start_rot, end_rot, anim_time, delay, msg) {
  new TWEEN.Tween(JSON.parse(JSON.stringify(start_rot)))
    .delay(delay)
    .to(JSON.parse(JSON.stringify(end_rot)), anim_time)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .onUpdate(function (obj) {
      origin_obj.arrow_x.setDirection({
        x: Math.sin(obj.y + Math.PI / 2) * Math.sin(obj.z + Math.PI / 2),
        y: Math.sin(obj.z),
        z: -Math.cos(obj.y + Math.PI / 2) * Math.cos(obj.z),
      });

      origin_obj.arrow_y.setDirection({
        x: Math.sin(obj.z),
        y: -(Math.sin(obj.x + Math.PI / 2) * Math.sin(obj.z + Math.PI / 2)),
        z: Math.cos(obj.x + Math.PI / 2) * Math.cos(obj.z + Math.PI / 2),
      });

      origin_obj.arrow_z.setDirection({
        x: Math.sin(obj.y),
        y: -Math.cos(obj.x + Math.PI / 2) * Math.cos(obj.y),
        z: -Math.sin(obj.x + Math.PI / 2) * Math.sin(obj.y + Math.PI / 2),
      });
    })
    .onStart(() => {
      parent.postMessage(msg, "*");
    })
    .start();
}

scene.add(origin_obj.arrow_x);
scene.add(origin_obj.arrow_y);
scene.add(origin_obj.arrow_z);

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
// point1
// rot1
// point2
// pop1
// trans1
// col1
// poly1
// rot2
// poly2
// pop2
// tran2
// col2
// circ1
// rot3
// circ2
// rot4
// col3
// circ3
// pop3
const anim_time = 1500;
const delay_time = 500;
// setTimeout(() => {
//   parent.postMessage("setc1", "*");
// }, (anim_time + delay_time) * 2);
function animation_flow() {
  parent.postMessage("clear", "*");
  (async () =>
    await new Promise((resolve) => setTimeout(resolve, anim_time)))();

  anim_pixels(
    p1,
    defualt_pix,
    { r: 1.0, g: 1.0, b: 1.0, x: 3, y: 3, z: 3 },
    anim_time,
    (anim_time + delay_time) * 1,
    "point1"
  );

  anim_rotate(
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: -Math.PI / 2 },
    anim_time,
    (anim_time + delay_time) * 2,
    "rot1"
  );

  anim_pixels(
    p2,
    defualt_pix,
    { r: 1.0, g: 1.0, b: 1.0, x: 3, y: 3, z: 3 },
    anim_time,
    (anim_time + delay_time) * 3,
    "point2"
  );

  anim_rotate(
    { x: 0, y: 0, z: -Math.PI / 2 },
    { x: 0, y: 0, z: 0 },
    anim_time,
    (anim_time + delay_time) * 4,
    "pop1"
  );

  anim_translate(
    origin_pos,
    offset_1,
    anim_time,
    (anim_time + delay_time) * 5,
    "trans1"
  );

  setTimeout(() => {
    parent.postMessage("col1", "*");
  }, (anim_time + delay_time) * 6);

  anim_pixels(
    trinagle1_points,
    defualt_pix,
    { r: 0.663, g: 0.984, b: 0.843, x: 3, y: 3, z: 3 },
    anim_time,
    (anim_time + delay_time) * 7,
    "poly1"
  );

  anim_rotate(
    { x: 0, y: 0, z: 0 },
    { x: 0, y: Math.PI / 2, z: 0 },
    anim_time,
    (anim_time + delay_time) * 8,
    "rot2"
  );

  anim_pixels(
    trinagle2_points,
    defualt_pix,
    { r: 0.663, g: 0.984, b: 0.843, x: 3, y: 3, z: 3 },
    anim_time,
    (anim_time + delay_time) * 9,
    "poly2"
  );

  anim_translate(
    offset_1,
    origin_pos,
    anim_time,
    (anim_time + delay_time) * 10,
    "pop2"
  );

  anim_rotate(
    { x: 0, y: Math.PI / 2, z: 0 },
    { x: 0, y: 0, z: 0 },
    anim_time,
    (anim_time + delay_time) * 10,
    null
  );

  anim_translate(
    origin_pos,
    offset_1,
    anim_time,
    (anim_time + delay_time) * 11,
    "trans2"
  );

  setTimeout(() => {
    parent.postMessage("col2", "*");
  }, (anim_time + delay_time) * 12);

  anim_pixels(
    circle1_points,
    defualt_pix,
    { r: 0.945, g: 0.733, b: 0.529, x: 3, y: 3, z: 3 },
    anim_time,
    (anim_time + delay_time) * 13,
    "circ1"
  );

  anim_rotate(
    { x: 0, y: 0, z: 0 },
    { x: 0, y: Math.PI / 2, z: 0 },
    anim_time,
    (anim_time + delay_time) * 14,
    "rot3"
  );

  anim_pixels(
    circle2_points,
    defualt_pix,
    { r: 0.945, g: 0.733, b: 0.529, x: 3, y: 3, z: 3 },
    anim_time,
    (anim_time + delay_time) * 15,
    "circ2"
  );

  anim_rotate(
    { x: 0, y: Math.PI / 2, z: 0 },
    { x: 0, y: (Math.PI * 3) / 4, z: 0 },
    anim_time,
    (anim_time + delay_time) * 16,
    "rot4"
  );

  setTimeout(() => {
    parent.postMessage("col3", "*");
  }, (anim_time + delay_time) * 17);

  anim_pixels(
    circle3_points,
    defualt_pix,
    { r: 0.56, g: 0.584, b: 0.827, x: 3, y: 3, z: 3 },
    anim_time,
    (anim_time + delay_time) * 18,
    "circ3"
  );

  /////////////////////

  anim_rotate(
    { x: 0, y: (Math.PI * 3) / 4, z: 0 },
    { x: 0, y: 0, z: 0 },
    anim_time,
    (anim_time + delay_time) * 19,
    "pop3"
  );

  anim_translate(
    offset_1,
    origin_pos,
    anim_time,
    (anim_time + delay_time) * 19,
    null
  );

  anim_pixels(
    p1,
    { r: 1.0, g: 1.0, b: 1.0, x: 3, y: 3, z: 3 },
    defualt_pix,
    anim_time,
    (anim_time + delay_time) * 20,
    "clear"
  );

  anim_pixels(
    p2,
    { r: 1.0, g: 1.0, b: 1.0, x: 3, y: 3, z: 3 },
    defualt_pix,
    anim_time,
    (anim_time + delay_time) * 20,
    null
  );

  anim_pixels(
    trinagle1_points,
    { r: 0.663, g: 0.984, b: 0.843, x: 3, y: 3, z: 3 },
    defualt_pix,
    anim_time,
    (anim_time + delay_time) * 20,
    null
  );

  anim_pixels(
    trinagle2_points,
    { r: 0.663, g: 0.984, b: 0.843, x: 3, y: 3, z: 3 },
    defualt_pix,
    anim_time,
    (anim_time + delay_time) * 20,
    null
  );

  anim_pixels(
    circle1_points,
    { r: 0.945, g: 0.733, b: 0.529, x: 3, y: 3, z: 3 },
    defualt_pix,
    anim_time,
    (anim_time + delay_time) * 20,
    null
  );

  anim_pixels(
    circle2_points,
    { r: 0.945, g: 0.733, b: 0.529, x: 3, y: 3, z: 3 },
    defualt_pix,
    anim_time,
    (anim_time + delay_time) * 20,
    null
  );

  anim_pixels(
    circle3_points,
    { r: 0.56, g: 0.584, b: 0.827, x: 3, y: 3, z: 3 },
    defualt_pix,
    anim_time,
    (anim_time + delay_time) * 20,
    null
  );

  setTimeout(animation_flow, (anim_time + delay_time) * 21);
}

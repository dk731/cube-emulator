import * as THREE from "https://cdn.skypack.dev/pin/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/mode=imports/optimized/three.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/examples/jsm/controls/OrbitControls.js";

////////////////////////////////////////////////////// Init WebGL Scene and Camera objects
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

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
const table_geometry = new THREE.BoxGeometry(grid_size.x * grid_dist * 1.1, grid_dist / 2, grid_size.y * grid_dist * 1.1);

const table_material = new THREE.MeshBasicMaterial({
  color: new THREE.Color(0x854c00),
});

setup_grid_mesh();
const light = new THREE.AmbientLight(); // soft white light
scene.add(light);
////////////////////////////////////////////////////// \Setup Scene objects

//////////////////////////////////////////////////////// Setup arrow objects

const color_points = [
  3607, 3608, 3367, 3368, 3126, 3127, 3128, 3129, 2886, 2887, 2888, 2889, 2645, 2646, 2647, 2648, 2649, 2650, 2405, 2406, 2407,
  2408, 2409, 2410, 2164, 2165, 2166, 2167, 2168, 2169, 2170, 2171, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1683, 1684,
  1685, 1686, 1687, 1688, 1689, 1690, 1691, 1692, 1443, 1444, 1445, 1446, 1447, 1448, 1449, 1450, 1451, 1452, 1202, 1203, 1204,
  1205, 1206, 1207, 1208, 1209, 1210, 1211, 1212, 1213, 962, 963, 964, 965, 966, 967, 968, 969, 970, 971, 972, 973, 721, 722,
  723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 734, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493,
  494, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255,
];

color_points.forEach((p) => {
  scene.children[p].material.color.copy({ r: 1.0, g: 1.0, b: 1.0 });
});
//////////////////////////////////////////////////////// \Setup arrow objects

animate();

////////////////////////////////////////////////////////

function animate() {
  requestAnimationFrame(animate);
  controls.update();

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
        sphere.position.copy(new THREE.Vector3(x, -y, -z).multiplyScalar(grid_dist).add(start_point));
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

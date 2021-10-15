import * as THREE from "https://cdn.skypack.dev/pin/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/mode=imports/optimized/three.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/examples/jsm/controls/OrbitControls.js";

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
renderer.toneMapping = THREE.ReinhardToneMapping;
document.body.appendChild(renderer.domElement);

function windowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", windowResize);

/////////////////
var sphere_r = 0.15;
var grid_dist = 2.5;
var grid_size = new THREE.Vector3(16, 16, 16);

const sphere_geometry = new THREE.SphereGeometry(sphere_r, 10, 10);
const table_geometry = new THREE.BoxGeometry(
  grid_size.x * grid_dist * 1.1,
  grid_dist / 2,
  grid_size.y * grid_dist * 1.1
);

const table_material = new THREE.MeshBasicMaterial({
  color: new THREE.Color(0x994c00),
});

setup_grid_mesh();
animate();

////////////////

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  render();
}

function setup_grid_mesh() {
  let start_point = new THREE.Vector3()
    .copy(grid_size)
    .subScalar(1)
    .multiply(new THREE.Vector3(grid_dist, grid_dist, grid_dist))
    .divideScalar(2)
    .multiply(new THREE.Vector3(-1, 1, 1));

  let i = 0;
  for (let z = 0; z < grid_size.z; z++) {
    for (let y = 0; y < grid_size.y; y++) {
      for (let x = 0; x < grid_size.x; x++) {
        const sphere = new THREE.Mesh(
          sphere_geometry,
          new THREE.MeshBasicMaterial({ color: new THREE.Color(0x202020) })
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

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

function pos_to_ind(x, y, z) {
  return x + (y + z * grid_size.y) * grid_size.x;
}

// .delay(2000)
//   .to(anim_objects.p1.end_f, 2000)
//   .easing(TWEEN.Easing.Sinusoidal.InOut)
//   .onStart(() => parent.postMessage(1, "*"));

const rand_int = (u) => {
  return Math.floor(Math.random() * u);
};

function point_spawner() {
  parent.postMessage(1, "*");
  var tmp_start = {
    r: start_color,
    g: start_color,
    b: start_color,
    x: 1,
    y: 1,
    z: 1,
  };
  const cur_pos = pos_to_ind(rand_int(15), rand_int(15), rand_int(15));
  new TWEEN.Tween(tmp_start)
    .to(
      {
        r: Math.random(),
        g: Math.random(),
        b: Math.random(),
        x: 3,
        y: 3,
        z: 3,
      },
      2000
    )
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .onComplete(() => {
      parent.postMessage(2, "*");
      setTimeout(() => {
        parent.postMessage(0, "*");
        setTimeout(point_spawner, 1000);
      }, 2000);
    })
    .onUpdate(function (obj) {
      scene.children[cur_pos].material.color.copy(obj);
      scene.children[cur_pos].scale.copy(obj);
    })
    .start();

  pos_to_ind();
}

////////////////////////////////////////////////////// \Setup Animations

////////////////////////////////////////////////////////

parent.postMessage(0, "*");
setTimeout(point_spawner, 1000);
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

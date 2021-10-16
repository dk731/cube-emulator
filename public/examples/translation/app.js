import * as THREE from "https://cdn.skypack.dev/pin/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/mode=imports/optimized/three.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/examples/jsm/controls/OrbitControls.js";
import * as TWEEN from "https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.esm.js";
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var start_color = 0.05;
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

// const plane = new THREE.Mesh(geometry, material);

setup_grid_mesh();
animate();

//////////////////////////////////////////////////////// Setup animation

function pos_to_ind(x, y, z) {
  return x + (y + z * grid_size.y) * grid_size.x;
}

var start_pos = -(grid_dist * grid_size.x) / 2;

var anim_objects = {
  xplane: {
    obj: new THREE.Mesh(
      new THREE.PlaneGeometry(
        grid_size.x * grid_dist * 1.2,
        grid_size.x * grid_dist * 1.2
      ),
      new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide,
        opacity: 0.2,
        transparent: true,
      })
    ),
    anims: [
      {
        start_pos: { x: start_pos, y: 0, z: 0 },
        end_pos: { x: start_pos + grid_dist * 4, y: 0, z: 0 },
      },
    ],
  },
  yplane: {
    obj: new THREE.Mesh(
      new THREE.PlaneGeometry(
        grid_size.x * grid_dist * 1.2,
        grid_size.x * grid_dist * 1.2
      ),
      new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        side: THREE.DoubleSide,
        opacity: 0.2,
        transparent: true,
      })
    ),
    anims: [{ start_pos: { x: 0, y: -start_pos, z: 0 } }],
  },
  zplane: {
    obj: new THREE.Mesh(
      new THREE.PlaneGeometry(
        grid_size.x * grid_dist * 1.2,
        grid_size.x * grid_dist * 1.2
      ),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide,
        opacity: 0.2,
        transparent: true,
      })
    ),
    anims: [{ start_pos: { x: 0, y: 0, z: -start_pos } }],
  },
  p1: {
    ind_list: [pos_to_ind(0, 0, 0)],
    start_f: {
      r: start_color,
      g: start_color,
      b: start_color,
      x: 1,
      y: 1,
      z: 1,
    },
    end_f: { r: 1, g: 1, b: 1, x: 2, y: 2, z: 2 },
  },
};

anim_objects.xplane.obj.position.copy(anim_objects.xplane.anims[0].start_pos);
anim_objects.yplane.obj.position.copy(anim_objects.yplane.anims[0].start_pos);
anim_objects.zplane.obj.position.copy(anim_objects.zplane.anims[0].start_pos);

anim_objects.yplane.obj.rotateX(Math.PI / 2);
anim_objects.xplane.obj.rotateY(Math.PI / 2);

scene.add(anim_objects.xplane.obj);
scene.add(anim_objects.yplane.obj);
scene.add(anim_objects.zplane.obj);

var p1_m = new TWEEN.Tween(anim_objects.p1.start_f)
  .delay(1500)
  .to(anim_objects.p1.end_f, 800)
  .easing(TWEEN.Easing.Sinusoidal.InOut);

var xplan_m = new TWEEN.Tween(anim_objects.xplane.anims[0].start_pos)
  .delay(500)
  .to(anim_objects.xplane.anims[0].end_pos, 1000)
  .easing(TWEEN.Easing.Sinusoidal.InOut);

p1_m.onUpdate(function (obj) {
  anim_objects.p1.ind_list.forEach((el) => {
    scene.children[el].material.color.copy(obj);
    scene.children[el].scale.copy(obj);
  });
});

xplan_m.onUpdate(function (obj) {
  anim_objects.xplane.obj.position.copy(obj);
});

p1_m.chain(xplan_m);
xplan_m.chain(p1_m);

p1_m.start();

////////////////////////////////////////////////////////

////////////////

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  TWEEN.update();
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

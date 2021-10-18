import * as THREE from "https://cdn.skypack.dev/pin/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/mode=imports/optimized/three.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/examples/jsm/controls/OrbitControls.js";
import * as TWEEN from "https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.esm.js";

parent.postMessage(-1, "*");
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

/////////////////
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

//////////////////////////////////////////////////////// Setup animation

function pos_to_ind(x, y, z) {
  return x + (y + z * grid_size.y) * grid_size.x;
}

const origin_pos = new THREE.Vector3()
  .copy(start_point)
  .add({ x: -grid_dist / 2, y: grid_dist / 2, z: grid_dist / 2 });

const unchanged_start = new THREE.Vector3().copy(origin_pos);

const first_move = new THREE.Vector3()
  .copy(origin_pos)
  .add({ x: grid_dist * 6, y: 0, z: 0 });

const second_move = new THREE.Vector3()
  .copy(origin_pos)
  .add({ x: grid_dist * 8, y: -grid_dist * 9, z: -grid_dist * 5 });

const def_arrow_size = 8;

var anim_objects = {
  arrow_x: {
    obj: new THREE.ArrowHelper(
      { x: 1, y: 0, z: 0 },
      origin_pos,
      def_arrow_size,
      0xff0000
    ),
  },
  arrow_y: {
    obj: new THREE.ArrowHelper(
      { x: 0, y: -1, z: 0 },
      origin_pos,
      def_arrow_size,
      0x0000ff
    ),
  },
  arrow_z: {
    obj: new THREE.ArrowHelper(
      { x: 0, y: 0, z: -1 },
      origin_pos,
      def_arrow_size,
      0x00ff00
    ),
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
    end_f: { r: 1, g: 1, b: 1, x: 3, y: 3, z: 3 },
  },
  p2: {
    ind_list: [pos_to_ind(6, 0, 0)],
    start_f: {
      r: start_color,
      g: start_color,
      b: start_color,
      x: 1,
      y: 1,
      z: 1,
    },
    end_f: { r: 1, g: 1, b: 1, x: 3, y: 3, z: 3 },
  },
  p3: {
    ind_list: [pos_to_ind(8, 9, 5)],
    start_f: {
      r: start_color,
      g: start_color,
      b: start_color,
      x: 1,
      y: 1,
      z: 1,
    },
    end_f: { r: 1, g: 1, b: 1, x: 3, y: 3, z: 3 },
  },
  p4: {
    ind_list: [pos_to_ind(8, 9, 5), pos_to_ind(6, 0, 0), pos_to_ind(0, 0, 0)],
    start_f: { r: 1, g: 1, b: 1, x: 3, y: 3, z: 3 },
    end_f: {
      r: start_color,
      g: start_color,
      b: start_color,
      x: 1,
      y: 1,
      z: 1,
    },
  },
};

scene.add(anim_objects.arrow_x.obj);
scene.add(anim_objects.arrow_y.obj);
scene.add(anim_objects.arrow_z.obj);

var p1_m = new TWEEN.Tween(anim_objects.p1.start_f)
  .delay(2000)
  .to(anim_objects.p1.end_f, 2000)
  .easing(TWEEN.Easing.Sinusoidal.InOut)
  .onStart(() => parent.postMessage(1, "*"));

var p2_m = new TWEEN.Tween(anim_objects.p2.start_f)
  .delay(1000)
  .to(anim_objects.p2.end_f, 2000)
  .easing(TWEEN.Easing.Sinusoidal.InOut)
  .onStart(() => parent.postMessage(3, "*"));

var p3_m = new TWEEN.Tween(anim_objects.p3.start_f)
  .delay(1000)
  .to(anim_objects.p3.end_f, 2000)
  .easing(TWEEN.Easing.Sinusoidal.InOut)
  .onStart(() => parent.postMessage(5, "*"));

var p4_m = new TWEEN.Tween(anim_objects.p4.start_f)
  .delay(1000)
  .to(anim_objects.p4.end_f, 2000)
  .easing(TWEEN.Easing.Sinusoidal.InOut)
  .onStart(() => parent.postMessage(0, "*"));

var origin1_m = new TWEEN.Tween(origin_pos)
  .delay(1000)
  .to(first_move, 2000)
  .easing(TWEEN.Easing.Sinusoidal.InOut)
  .onStart(() => parent.postMessage(2, "*"));

var origin2_m = new TWEEN.Tween(origin_pos)
  .delay(1000)
  .to(second_move, 2000)
  .easing(TWEEN.Easing.Sinusoidal.InOut)
  .onStart(() => parent.postMessage(4, "*"));

var origin3_m = new TWEEN.Tween(origin_pos)
  .delay(1000)
  .to(unchanged_start, 2000)
  .easing(TWEEN.Easing.Sinusoidal.InOut)
  .onStart(() => parent.postMessage(6, "*"));

var arrow1_len = new TWEEN.Tween({ lenx: def_arrow_size })
  .delay(800)
  .to({ lenx: def_arrow_size + 2 }, 900)
  .easing(TWEEN.Easing.Sinusoidal.InOut)
  .repeat(1)
  .yoyo(true);

var arrow2_len = new TWEEN.Tween({
  lenx: def_arrow_size,
  leny: def_arrow_size,
  lenz: def_arrow_size,
})
  .delay(800)
  .to(
    {
      lenx: def_arrow_size + 1,
      leny: def_arrow_size + 3,
      lenz: def_arrow_size + 2.5,
    },
    900
  )
  .easing(TWEEN.Easing.Sinusoidal.InOut)
  .repeat(1)
  .yoyo(true);

p1_m.onUpdate(function (obj) {
  anim_objects.p1.ind_list.forEach((el) => {
    scene.children[el].material.color.copy(obj);
    scene.children[el].scale.copy(obj);
  });
});

p2_m.onUpdate(function (obj) {
  anim_objects.p2.ind_list.forEach((el) => {
    scene.children[el].material.color.copy(obj);
    scene.children[el].scale.copy(obj);
  });
});

p3_m.onUpdate(function (obj) {
  anim_objects.p3.ind_list.forEach((el) => {
    scene.children[el].material.color.copy(obj);
    scene.children[el].scale.copy(obj);
  });
});

p4_m.onUpdate(function (obj) {
  anim_objects.p4.ind_list.forEach((el) => {
    scene.children[el].material.color.copy(obj);
    scene.children[el].scale.copy(obj);
  });
});

origin1_m.onUpdate(function (obj) {
  anim_objects.arrow_x.obj.position.copy(obj);
  anim_objects.arrow_y.obj.position.copy(obj);
  anim_objects.arrow_z.obj.position.copy(obj);
});

origin2_m.onUpdate(function (obj) {
  anim_objects.arrow_x.obj.position.copy(obj);
  anim_objects.arrow_y.obj.position.copy(obj);
  anim_objects.arrow_z.obj.position.copy(obj);
});

origin3_m.onUpdate(function (obj) {
  anim_objects.arrow_x.obj.position.copy(obj);
  anim_objects.arrow_y.obj.position.copy(obj);
  anim_objects.arrow_z.obj.position.copy(obj);
});

arrow1_len.onUpdate(function (obj) {
  anim_objects.arrow_x.obj.setLength(obj.lenx);
});

arrow2_len.onUpdate(function (obj) {
  anim_objects.arrow_x.obj.setLength(obj.lenx);
  anim_objects.arrow_y.obj.setLength(obj.leny);
  anim_objects.arrow_z.obj.setLength(obj.lenz);
});

p1_m.chain(origin1_m, arrow1_len);
origin1_m.chain(p2_m);
p2_m.chain(origin2_m, arrow2_len);
origin2_m.chain(p3_m);
p3_m.chain(origin3_m);
origin3_m.chain(p4_m);
p4_m.chain(p1_m);

// p3_m.onComplete(() => {
//   setTimeout(setup_scene, 2000);
// });

// function setup_scene() {
//   for (var i = 0; i < grid_size.x * grid_size.y * grid_size.z; i++) {
//     scene.children[i].material.color.copy({
//       r: start_color,
//       g: start_color,
//       b: start_color,
//     });
//     const tmp = new THREE.Vector3()
//       .copy(start_point)
//       .add({ x: -grid_dist / 2, y: grid_dist / 2, z: grid_dist / 2 });
//     anim_objects.arrow_x.obj.position.copy(tmp);
//     anim_objects.arrow_y.obj.position.copy(tmp);
//     anim_objects.arrow_z.obj.position.copy(tmp);
//   }
//   p1_m.start();
// }

p1_m.start();

////////////////////////////////////////////////////////

animate();

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

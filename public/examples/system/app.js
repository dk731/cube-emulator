import * as THREE from "https://cdn.skypack.dev/pin/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/mode=imports/optimized/three.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/examples/jsm/controls/OrbitControls.js";

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

setup_grid_mesh();
const light = new THREE.AmbientLight(); // soft white light
scene.add(light);
////////////////////////////////////////////////////// \Setup Scene objects

//////////////////////////////////////////////////////// Setup arrow objects

scene.add(
  new THREE.ArrowHelper(
    { x: 1, y: 0, z: 0 },
    new THREE.Vector3().copy(start_point).add({ x: -2, y: 2, z: 2 }),
    grid_size.x * grid_dist,
    0xff0000
  )
);

scene.add(
  new THREE.ArrowHelper(
    { x: 0, y: -1, z: 0 },
    new THREE.Vector3().copy(start_point).add({ x: -2, y: 2, z: 2 }),
    grid_size.x * grid_dist,
    0x0000ff
  )
);

scene.add(
  new THREE.ArrowHelper(
    { x: 0, y: 0, z: -1 },
    new THREE.Vector3().copy(start_point).add({ x: -2, y: 2, z: 2 }),
    grid_size.x * grid_dist,
    0x00ff00
  )
);

var loader = new THREE.FontLoader();

loader.load(
  "https://cdn.skypack.dev/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/examples/fonts/helvetiker_regular.typeface.json",
  function (font) {
    var x = new THREE.Mesh(
      new THREE.TextGeometry("X", {
        font: font,
        size: 80,
        height: 4,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
      })
    );
    var y = new THREE.Mesh(
      new THREE.TextGeometry("Y", {
        font: font,
        size: 80,
        height: 4,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x0000ff,
      })
    );
    var z = new THREE.Mesh(
      new THREE.TextGeometry("Z", {
        font: font,
        size: 80,
        height: 4,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x00ff00,
      })
    );
    x.scale.copy({ x: 0.06, y: 0.06, z: 0.06 });
    x.position.copy(
      new THREE.Vector3()
        .copy(start_point)
        .add({ x: (grid_size.x * grid_dist) / 2.5, y: 3, z: 2 })
    );
    y.scale.copy({ x: 0.06, y: 0.06, z: 0.06 });
    y.position.copy(
      new THREE.Vector3()
        .copy(start_point)
        .add({ x: -4, y: -(grid_size.x * grid_dist) / 2, z: 1 })
    );
    y.rotateY(-Math.PI / 4);
    z.scale.copy({ x: 0.06, y: 0.06, z: 0.06 });
    z.position.copy(
      new THREE.Vector3()
        .copy(start_point)
        .add({ x: -2, y: 3, z: -(grid_size.x * grid_dist) / 2.5 })
    );
    z.rotateY(-Math.PI / 2);
    scene.add(x);
    scene.add(y);
    scene.add(z);
  }
);

var f1 = new THREE.Mesh(
  new THREE.SphereGeometry(grid_dist / 2, 32, 16),
  new THREE.MeshBasicMaterial({
    color: 0xffff00,
    opacity: 0.3,
    transparent: true,
  })
);
var f2 = new THREE.Mesh(
  new THREE.SphereGeometry(grid_dist / 2, 32, 16),
  new THREE.MeshBasicMaterial({
    color: 0xffff00,
    opacity: 0.3,
    transparent: true,
  })
);

f1.position.copy(new THREE.Vector3().copy(start_point));
f2.position.copy(
  new THREE.Vector3()
    .copy(start_point)
    .add({ x: grid_dist * 3.21, y: -grid_dist * 5.11, z: -grid_dist * 6.31 })
);

scene.add(f1);

scene.add(f2);

scene.children[0].material.color.copy({ r: 1.0, g: 1.0, b: 1.0 });
scene.children[1619].material.color.copy({ r: 1.0, g: 1.0, b: 1.0 });

scene.children[0].scale.copy({ x: 2.0, y: 2.0, z: 2.0 });
scene.children[1619].scale.copy({ x: 2.0, y: 2.0, z: 2.0 });

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

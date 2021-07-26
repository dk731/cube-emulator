import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "https://unpkg.com/three@0.127.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://unpkg.com/three@0.127.0/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "https://unpkg.com/three@0.127.0/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "https://unpkg.com/three@0.127.0/examples/jsm/postprocessing/UnrealBloomPass.js";

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

const stats = Stats();
document.body.appendChild(stats.dom);

function windowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", windowResize);

/////////////////
var sphere_r = 0.2;
var grid_dist = 2.5;
var grid_size = new THREE.Vector3(16, 16, 16);

const ENTIRE_SCENE = 0,
  BLOOM_SCENE = 1;
const sphere_geometry = new THREE.SphereGeometry(sphere_r, 16, 16);
const table_geometry = new THREE.BoxGeometry(
  grid_size.x * grid_dist * 1.1,
  grid_dist / 2,
  grid_size.y * grid_dist * 1.1
);

const table_material = new THREE.MeshBasicMaterial({
  color: new THREE.Color(0x994c00),
});
const bloomLayer = new THREE.Layers();
bloomLayer.set(BLOOM_SCENE);

const bloom_params = {
  exposure: 1,
  bloomStrength: 2.4,
  bloomThreshold: 0,
  bloomRadius: 0.1,
};

const DARK_MATERIAL = new THREE.MeshBasicMaterial({ color: "black" });
const materials = {};

const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = bloom_params.bloomThreshold;
bloomPass.strength = bloom_params.bloomStrength;
bloomPass.radius = bloom_params.bloomRadius;

const bloomComposer = new EffectComposer(renderer);
bloomComposer.renderToScreen = false;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

const finalPass = new ShaderPass(
  new THREE.ShaderMaterial({
    uniforms: {
      baseTexture: { value: null },
      bloomTexture: { value: bloomComposer.renderTarget2.texture },
    },
    vertexShader: document.getElementById("vertexshader").textContent,
    fragmentShader: document.getElementById("fragmentshader").textContent,
    defines: {},
  }),
  "baseTexture"
);
finalPass.needsSwap = true;

const finalComposer = new EffectComposer(renderer);
finalComposer.addPass(renderScene);
finalComposer.addPass(finalPass);

////////////////// socket

var connect_delay = 500;

var wait_routine_id = setInterval(wait_prog_routine, connect_delay);
var socket;
function wait_prog_routine() {
  try {
    socket = new WebSocket("ws://localhost:8080");
    socket.onopen = init_socket;
    socket.onmessage = on_prog_receive;
    socket.onclose = on_prog_close;
  } catch (err) {
    console.log(err);
  }
}

function init_socket(event) {
  clearInterval(wait_routine_id);
  console.log("Oppened socket!: ", socket.readyState);
}

function on_prog_receive(event) {
  console.log(event);
}

function on_prog_close(event) {
  console.log(event);
  wait_routine_id = setInterval(wait_prog_routine, connect_delay);
}

//////////////////
// Setup colors array of grid size
var colors_array = Array.from({ length: grid_size.x }, () =>
  Array.from({ length: grid_size.y }, () =>
    Array.from({ length: grid_size.z }, () => new THREE.Color(0x010101))
  )
);

const dummy = new THREE.Object3D();

setup_grid_mesh();
animate();

////////////////

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  colors_array[Math.floor(Math.random() * grid_size.x)][
    Math.floor(Math.random() * grid_size.y)
  ][Math.floor(Math.random() * grid_size.z)] = new THREE.Color(
    0xffffff * Math.random()
  );
  update_colors();

  render();
  stats.update();
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
          new THREE.MeshBasicMaterial({ color: new THREE.Color(0x0f0f0f) })
        );
        sphere.position.copy(
          new THREE.Vector3(x, -y, -z)
            .multiplyScalar(grid_dist)
            .add(start_point)
        );
        sphere.layers.enable(BLOOM_SCENE);
        scene.add(sphere);
      }
    }
  }

  const table = new THREE.Mesh(table_geometry, table_material);
  table.position.copy(
    new THREE.Vector3(0, -start_point.y - grid_dist * 1.5, 0)
  );
  table.layers.disable(BLOOM_SCENE);
  scene.add(table);
}

function render() {
  scene.traverse(darkenNonBloomed);
  bloomComposer.render();
  scene.traverse(restoreMaterial);

  finalComposer.render();
}

function update_colors() {
  let i = 0;
  for (let z = 0; z < grid_size.z; z++)
    for (let y = 0; y < grid_size.y; y++)
      for (let x = 0; x < grid_size.x; x++) {
        const cur_obj = scene.children[x + (y + z * grid_size.y) * grid_size.x];
        const cur_color = colors_array[x][y][z];

        cur_obj.material.color.copy(cur_color);
      }
}

function darkenNonBloomed(obj) {
  if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
    materials[obj.uuid] = obj.material;
    obj.material = DARK_MATERIAL;
  }
}

function restoreMaterial(obj) {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid];
    delete materials[obj.uuid];
  }
}

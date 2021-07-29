import * as THREE from "https://cdn.skypack.dev/pin/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/mode=imports/optimized/three.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "https://cdn.skypack.dev/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.skypack.dev/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "https://cdn.skypack.dev/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "https://cdn.skypack.dev/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/examples/jsm/postprocessing/UnrealBloomPass.js";

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
var sphere_r = 0.15;
var grid_dist = 2.5;
var grid_size = new THREE.Vector3(16, 16, 16);
var cur_array; // Place where last received ArrayBuffer from socket will be stored

const ENTIRE_SCENE = 0,
  BLOOM_SCENE = 1;
const sphere_geometry = new THREE.SphereGeometry(sphere_r, 10, 10);
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
  bloomRadius: 0,
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

var idle_anim = {
  id: undefined,
  delay: 300,
  progress: 0,
  points_list: [],
  max_point: 512,
  default_color: 0x050505,
};

// Setup colors array of grid size
var colors_array = Array.from({ length: grid_size.x }, () =>
  Array.from({ length: grid_size.y }, () =>
    Array.from(
      { length: grid_size.z },
      () => new THREE.Color(idle_anim.default_color)
    )
  )
);

idle_anim.id = setInterval(idle_animation, idle_anim.delay);

function idle_animation() {
  const tmp_point = [
    Math.floor(Math.random() * grid_size.x),
    Math.floor(Math.random() * grid_size.y),
    Math.floor(Math.random() * grid_size.z),
  ];

  idle_anim.points_list.push(tmp_point);
  colors_array[tmp_point[0]][tmp_point[1]][tmp_point[2]] = new THREE.Color(
    0xffffff * Math.random()
  );

  if (idle_anim.points_list.length > idle_anim.max_point) {
    const tmp = idle_anim.points_list.shift();
    colors_array[tmp[0]][tmp[1]][tmp[2]] = new THREE.Color(
      idle_anim.default_color
    );
  }
}

var wait_routine_id = setTimeout(wait_prog_routine, 0);
var socket;
var was_connected = false;
var triggered_timeout = true;
function wait_prog_routine() {
  try {
    socket = new WebSocket("ws://localhost:8080");
    // setTimeout(on_connect_timeout, connect_delay);
    socket.onopen = init_socket;
    socket.binaryType = "arraybuffer";
    socket.onmessage = on_prog_receive;
    socket.onclose = on_prog_close;
  } catch (err) {
    // console.log(err);
  }
}

function init_socket(event) {
  // console.log("SOCKET OPPENED!!!!!!!!!!!!!");
  clearInterval(idle_anim.id);
  was_connected = true;
}

function on_prog_receive(event) {
  cur_array = event.data;
}

function on_prog_close(event) {
  // console.log("closed, connecting");
  setTimeout(wait_prog_routine, 0);
  if (was_connected) {
    colors_array = Array.from({ length: grid_size.x }, () =>
      Array.from({ length: grid_size.y }, () =>
        Array.from(
          { length: grid_size.z },
          () => new THREE.Color(idle_anim.default_color)
        )
      )
    );
    idle_anim.points_list = [];
  }
  was_connected = false;
  idle_anim.id = setInterval(idle_animation, idle_anim.delay);
}

//////////////////

setup_grid_mesh();
animate();

////////////////

function animate() {
  requestAnimationFrame(animate);
  controls.update();

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
  if (cur_array && cur_array.byteLength == 12288)
    var arr_view = new Uint8Array(cur_array);

  for (let z = 0; z < grid_size.z; z++)
    for (let y = 0; y < grid_size.y; y++)
      for (let x = 0; x < grid_size.x; x++) {
        const ind = x + (y + z * grid_size.y) * grid_size.x;
        const cur_obj = scene.children[ind];

        if (cur_array && cur_array.byteLength == 12288)
          var cur_color = new THREE.Color(
            arr_view[ind * 3 + 1] / 255,
            arr_view[ind * 3] / 255,
            arr_view[ind * 3 + 2] / 255
          );
        else var cur_color = colors_array[x][y][z];

        cur_obj.material.color.copy(cur_color);
      }

  cur_array = undefined;
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

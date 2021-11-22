import * as THREE from "https://cdn.skypack.dev/pin/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/mode=imports,min/optimized/three.js";
import { OrbitControls } from "https://cdn.skypack.dev/pin/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/mode=imports,min/unoptimized/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "https://cdn.skypack.dev/pin/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/mode=imports,min/unoptimized/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.skypack.dev/pin/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/mode=imports,min/unoptimized/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "https://cdn.skypack.dev/pin/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/mode=imports,min/unoptimized/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "https://cdn.skypack.dev/pin/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/mode=imports,min/unoptimized/examples/jsm/postprocessing/UnrealBloomPass.js";
import { EXRLoader } from "https://cdn.skypack.dev/pin/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/mode=imports,min/unoptimized/examples/jsm/loaders/EXRLoader.js";
import Stats from "https://cdn.skypack.dev/pin/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/mode=imports,min/unoptimized/examples/jsm/libs/stats.module.js";

const ENTIRE_SCENE = 0,
  BLOOM_SCENE = 1;

const bloomLayer = new THREE.Layers();
bloomLayer.set(BLOOM_SCENE);

const params = {
  exposure: 1,
  bloomStrength: 3,
  bloomThreshold: 0.05,
  bloomRadius: 0,
};

const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });
const materials = {};

const exr_loader = new EXRLoader();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;
document.body.appendChild(renderer.domElement);
window.addEventListener("resize", windowResize);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.maxDistance = 100;
controls.target = new THREE.Vector3(0.0, 0.0, 0.0);
controls.minDistance = 5;

const stats = Stats();
document.body.appendChild(stats.dom);

camera.position.set(-35, 35, 35);
controls.update();

scene.add(new THREE.AmbientLight(0x404040));

function windowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

/////////////////

var backgrounds = {
  none: { text: null, url: null, btn_id: "btnradio1" },
  indors: {
    text: null,
    url: "https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/2k/studio_country_hall_2k.exr",
    btn_id: "btnradio3",
  },
  outdoors: {
    text: null,
    url: "https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/2k/dikhololo_night_2k.exr",
    btn_id: "btnradio2",
  },
};

var cur_text = "none";

function load_image(type) {
  return new Promise((resolve, reject) => {
    exr_loader.load(backgrounds[type].url, function (texture, textureData) {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(renderer, texture);
      backgrounds[type].text = rt.texture;
      if (cur_text == type) scene.background = backgrounds[type].text;
    });
  });
}

async function load_backgrounds() {
  var promise_list = [];
  for (var type in backgrounds) if (backgrounds[type].url) promise_list.push(load_image(type));

  Promise.all(promise_list);
}

function on_back_change(type) {
  if (backgrounds[type].text == null) {
    if (backgrounds[type].url == null) scene.background = backgrounds[type].text;
  } else scene.background = backgrounds[type].text;
  cur_text = type;
}

Object.entries(backgrounds).forEach(([type, val]) => {
  document.getElementById(val.btn_id).onclick = function () {
    on_back_change(type);
  };
});

load_backgrounds();

/////////////////

const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

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

/////////////////
var sphere_r = 0.15;
var grid_dist = 2.5;
var grid_size = new THREE.Vector3(16, 16, 16);

const sphere_geometry = new THREE.SphereGeometry(sphere_r, 10, 10);
const table_geometry = new THREE.BoxGeometry(grid_size.x * grid_dist * 1.1, grid_dist / 2, grid_size.y * grid_dist * 1.1);

const table_material = new THREE.MeshBasicMaterial({
  color: new THREE.Color(0x502000),
});

var colors_array = Array.from({ length: grid_size.x }, () =>
  Array.from({ length: grid_size.y }, () => Array.from({ length: grid_size.z }, () => new THREE.Color(0xffffff)))
);

setup_grid_mesh();

////////////////

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
  Array.from({ length: grid_size.y }, () => Array.from({ length: grid_size.z }, () => new THREE.Color(idle_anim.default_color)))
);

idle_anim.id = setInterval(idle_animation, idle_anim.delay);

function idle_animation() {
  const tmp_point = [
    Math.floor(Math.random() * grid_size.x),
    Math.floor(Math.random() * grid_size.y),
    Math.floor(Math.random() * grid_size.z),
  ];

  idle_anim.points_list.push(tmp_point);
  colors_array[tmp_point[0]][tmp_point[1]][tmp_point[2]] = new THREE.Color(0xffffff * Math.random());

  if (idle_anim.points_list.length > idle_anim.max_point) {
    const tmp = idle_anim.points_list.shift();
    colors_array[tmp[0]][tmp[1]][tmp[2]] = new THREE.Color(idle_anim.default_color);
  }
}

var wait_routine_id = setTimeout(wait_prog_routine, 0);
var socket;
var ws_connected = false;
function wait_prog_routine() {
  try {
    socket = new WebSocket("ws://localhost:12035");

    socket.onopen = init_socket;
    socket.binaryType = "arraybuffer";
    socket.onmessage = on_prog_receive;
    socket.onclose = on_prog_close;
  } catch (err) {
    // console.log(err);
  }
}

function init_socket(event) {
  clearInterval(idle_anim.id);
  ws_connected = true;
}

function on_prog_receive(event) {
  const buf_view = new Uint8Array(event.data);
  for (let z = 0; z < grid_size.z; z++)
    for (let y = 0; y < grid_size.y; y++)
      for (let x = 0; x < grid_size.x; x++) {
        const ind = x + (255 - (y + z * grid_size.y)) * grid_size.x;
        const ind3 = ind * 3;
        scene.children[ind].material.color.setRGB(
          buf_view[ind3 + 1] / 255.0,
          buf_view[ind3] / 255.0,
          buf_view[ind3 + 2] / 255.0
        );
      }
}

function on_prog_close(event) {
  setTimeout(wait_prog_routine, 0);
  if (ws_connected) {
    colors_array = Array.from({ length: grid_size.x }, () =>
      Array.from({ length: grid_size.y }, () =>
        Array.from({ length: grid_size.z }, () => new THREE.Color(idle_anim.default_color))
      )
    );
    idle_anim.points_list = [];
    idle_anim.id = setInterval(idle_animation, idle_anim.delay);
  }
  ws_connected = false;
}

////////////////

animate();

////////////////

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  update_colors();
}

function setup_grid_mesh() {
  scene.traverse(disposeMaterial);
  scene.children.length = 0;

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
        const sphere = new THREE.Mesh(sphere_geometry, new THREE.MeshBasicMaterial({ color: new THREE.Color(0x0f0f0f) }));
        sphere.position.copy(new THREE.Vector3(x, -y, -z).multiplyScalar(grid_dist).add(start_point));
        scene.add(sphere);

        sphere.layers.enable(BLOOM_SCENE);
      }
    }
  }

  const table = new THREE.Mesh(table_geometry, table_material);
  table.position.copy(new THREE.Vector3(0, -start_point.y - grid_dist * 1.5, 0));
  scene.add(table);
}

function update_colors() {
  if (!ws_connected)
    for (let z = 0; z < grid_size.z; z++)
      for (let y = 0; y < grid_size.y; y++)
        for (let x = 0; x < grid_size.x; x++)
          scene.children[x + (y + z * grid_size.y) * grid_size.x].material.color.copy(colors_array[x][y][z]);
}

function render() {
  requestAnimationFrame(render);

  stats.update();
  controls.update();

  scene.traverse(darkenNonBloomed);
  scene.background = null;
  bloomComposer.render();
  on_back_change(cur_text);
  scene.traverse(restoreMaterial);

  finalComposer.render();
}

function disposeMaterial(obj) {
  if (obj.material) {
    obj.material.dispose();
  }
}

function darkenNonBloomed(obj) {
  if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
    materials[obj.uuid] = obj.material;
    obj.material = darkMaterial;
  }
}

function restoreMaterial(obj) {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid];
    delete materials[obj.uuid];
  }
}

render();

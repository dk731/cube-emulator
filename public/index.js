var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var renderer = new THREE.WebGLRenderer();
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

const stats = Stats();
document.body.appendChild(stats.dom);

function windowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", windowResize);

/////////////////
sphere_r = 0.2;
grid_dist = 2.5;
grid_size = new THREE.Vector3(16, 16, 16);

mesh = new THREE.InstancedMesh(
  new THREE.SphereGeometry(sphere_r, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xffffff }),
  grid_size.x * grid_size.y * grid_size.z
);
mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
scene.add(mesh);

// Setup colors array of grid size
colors_array = Array.from({ length: grid_size.x }, () =>
  Array.from({ length: grid_size.y }, () =>
    Array.from({ length: grid_size.z }, () => new THREE.Color(0x010101))
  )
);

// for (let z = 0; z < grid_size.z; z++)
//   for (let y = 0; y < grid_size.y; y++)
//     for (let x = 0; x < grid_size.x; x++)
//       colors_array[x][y][z] = new THREE.Color(0xffffff);

const dummy = new THREE.Object3D();

setup_grid_mesh();
animate();

////////////////

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  render();
  stats.update();
}

function setup_grid_mesh() {
  start_point = new THREE.Vector3()
    .copy(grid_size)
    .subScalar(1)
    .multiply(new THREE.Vector3(grid_dist, grid_dist, grid_dist))
    .divideScalar(2)
    .multiply(new THREE.Vector3(-1, 1, 1));

  let i = 0;
  for (let z = 0; z < grid_size.z; z++) {
    for (let y = 0; y < grid_size.y; y++) {
      for (let x = 0; x < grid_size.x; x++) {
        dummy.position.copy(
          new THREE.Vector3(x, -y, -z)
            .multiplyScalar(grid_dist)
            .add(start_point)
        );
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        mesh.setColorAt(i++, colors_array[x][y][z]);
      }
    }
  }
  mesh.instanceColor.needsUpdate = true;
  mesh.instanceMatrix.needsUpdate = true;
}

function gen_rand_vec3() {}

function render() {
  update_colors();
  colors_array[Math.floor(Math.random() * grid_size.x)][
    Math.floor(Math.random() * grid_size.y)
  ][Math.floor(Math.random() * grid_size.z)] = new THREE.Color(
    0xffffff * Math.random()
  );
  renderer.render(scene, camera);
}

function update_colors() {
  let i = 0;
  for (let z = 0; z < grid_size.z; z++)
    for (let y = 0; y < grid_size.y; y++)
      for (let x = 0; x < grid_size.x; x++)
        mesh.setColorAt(i++, colors_array[x][y][z]);

  mesh.instanceColor.needsUpdate = true;
}

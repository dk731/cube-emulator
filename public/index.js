var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
const controls = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.set(-100, 0, 0);
controls.update();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

function windowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
};

window.addEventListener('resize', windowResize);


/////////////////
sphere_r = 0.3
grid_dist = 2.5
grid_size = new THREE.Vector3(16, 16, 16);

mesh = new THREE.InstancedMesh(new THREE.SphereGeometry(sphere_r, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }), grid_size.x * grid_size.y * grid_size.z);
mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
scene.add(mesh);

const dummy = new THREE.Object3D();

animate();

////////////////

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    render();
}

function render() {
    console.log("rendering")
    if (mesh) {
        start_point = new THREE.Vector3();
        start_point.copy(grid_size)
        start_point.subScalar(1);
        start_point.multiply(new THREE.Vector3(grid_dist, grid_dist, grid_dist));
        start_point.divideScalar(2);
        start_point.multiply(new THREE.Vector3(-1, 1, -1));
        let i = 0;
        for (let z = 0; z < grid_size.z; z++) {
            for (let y = 0; y < grid_size.y; y++) {
                for (let x = 0; x < grid_size.x; x++) {
                    dummy.position.copy((new THREE.Vector3(x, y, z)).multiplyScalar(grid_dist).add(start_point));
                    dummy.updateMatrix();
                    mesh.setMatrixAt(i++, dummy.matrix);
                }
            }
        }
        mesh.instanceMatrix.needsUpdate = true;
    }
    renderer.render(scene, camera);
}

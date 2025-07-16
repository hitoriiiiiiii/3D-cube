// Create the scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);
camera.position.z = 5;

// Create a box geometry and a basic material, then combine them into a mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 , wireframe: true});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Get the canvas and create the renderer
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a clock for smooth animation
const clock = new THREE.Clock();

const controls = new THREE.OrbitControls(camera, renderer.domElement);
// Animation loop
function animate() {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();
  cube.rotation.x = elapsed;
  cube.rotation.y = elapsed;
  controls.update();
  renderer.render(scene, camera);
}

animate();

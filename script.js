// Create the scene
const scene = new THREE.Scene();

// --- Gradient Background (mostly black, cyan band in the middle) ---
function setGradientBackground(renderer) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  // Create gradient: mostly black, cyan in the middle
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#00ffff'); // cyan at the top
  gradient.addColorStop(1, '#000000'); // black at the bottom
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  const bgTexture = new THREE.CanvasTexture(canvas);
  scene.background = bgTexture;
}

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);
camera.position.z = 5;

// Load a texture
const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load('wood.png', () => {
  renderer.render(scene, camera);
});

// Create a box geometry and a material with the texture
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: woodTexture });
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
  setGradientBackground(renderer); // update background each frame for resizing
  renderer.render(scene, camera);
}

animate();

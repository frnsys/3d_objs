import Scene from './scene';
import GLTFLoader from './gltf';
import * as THREE from 'three';

// For loading GLTF models
const loader = new GLTFLoader();

// Create the scene
const el = document.getElementById('main');
const scene = new Scene({
  maxHeight: el.clientHeight,
  maxWidth: el.clientWidth,
  camera: 'perspective'
});
el.appendChild(scene.renderer.domElement);

// Load a model
let model;
function loadModel(path, cb) {
  loader.load(path, (gltf) => {
    model = gltf.scene.children[0];

    model.scale.set(60, 60, 60);
    model.rotation.x = -Math.PI/4;
    model.rotation.z = -Math.PI/8;
    scene.add(model);
    cb();
  });
}

// Render the scene
function render() {
  // Rotate the model
  model.rotation.y += 0.01;

  // Render the scene
  scene.render();
  requestAnimationFrame(render);
}

loadModel('models/fruit.gltf', render);

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Instantiate a loader
const loader = new GLTFLoader();

let plantLoaded = false;

// Load a glTF resource
loader.load(
	// resource URL
	'/indoor_plant/scene.gltf',
	// called when the resource is loaded
	function ( gltf ) {

        plantLoaded = gltf;

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Animation loop
function animate() {


    if (plantLoaded) {
        plantLoaded.scene.rotation.y += 0.01;
    }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

}


animate();

camera.position.z = 5;
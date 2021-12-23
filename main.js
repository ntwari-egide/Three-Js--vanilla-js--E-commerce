
import './style.css'

import * as THREE from "three"

// enabling the mouse to move in the scene
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

// create the scene

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg")
})


renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor("red",0.07)

camera.position.setZ(30)


renderer.render(scene, camera)

const loader = new OBJLoader();

loader.load( './shoe.obj', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

const geometry = new THREE.TorusGeometry( 10, 3, 100, 16 );
const material = new THREE.MeshStandardMaterial( { color: 0xFF6349 } );
const torus = new THREE.Mesh( geometry, material );

torus.position.x = 10


scene.add( torus );

// Lightening concept

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)



// using the mouse
const controls = new OrbitControls(camera, renderer.domElement)

// tell the browser that you want to do animations

function animate(){
  requestAnimationFrame(animate)

  // add your animations
  torus.rotation.x += 0.01
  torus.rotation.y += 0.0005
  torus.rotation.z += 0.001

  controls.update()

  renderer.render(scene, camera)
}

// function to move the document on scroll

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;

  camera.rotation.z = t * -0.01;
  camera.position.x = t * -0.002;
  camera.rotation.y = t * -0.002;

  
}

document.body.onscroll = moveCamera

animate()

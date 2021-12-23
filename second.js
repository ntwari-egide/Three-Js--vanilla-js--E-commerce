import * as THREE from "three"

// enabling the mouse to move in the scene
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

// adding second scene

const scene2 = new THREE.Scene()

const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer2 = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg2")
})


renderer2.setPixelRatio(window.devicePixelRatio)
renderer2.setSize(window.innerWidth, window.innerHeight)
renderer2.setClearColor("white",0.07)


camera2.position.setZ(30)


renderer2.render(scene2, camera2)

const loader = new OBJLoader();

loader.load( './shoe.obj', function ( gltf ) {

	scene2.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

const geometry = new THREE.SphereGeometry( 8, 332, 316 );
const material = new THREE.MeshStandardMaterial( { color: "rgb(9, 78, 206)" } );
const torus = new THREE.Mesh( geometry, material );

torus.position.x = 10


scene2.add( torus );

// Lightening concept

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene2.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)



// using the mouse
const controls = new OrbitControls(camera2, renderer2.domElement)

// tell the browser that you want to do animations

function animate(){
  requestAnimationFrame(animate)

  // add your animations
  torus.rotation.x -= 0.01
  torus.rotation.y -= 0.0005
  torus.rotation.z -= 0.001

  controls.update()

  renderer2.render(scene2, camera2)
}

// function to move the document on scroll

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;

  camera2.rotation.z = t * -0.01;
  camera2.position.x = t * -0.002;
  camera2.rotation.y = t * -0.002;

  
}

document.body.onscroll = moveCamera

animate()
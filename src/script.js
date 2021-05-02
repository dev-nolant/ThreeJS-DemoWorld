import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// SETS THE TEXTURE LOADING VARIABLE - DO NOT TOUCH
const textureLoader = new THREE.TextureLoader()



// SETS THE CANVAS VARIALBE - DO NOT TOUCH
const canvas = document.querySelector('canvas.webgl')

// SETS THE SCENE VARIABLE - DO NOT TOUCH
const scene = new THREE.Scene()

// ADDS EARTH SPHERE AND TEXTURES
var geometry = new THREE.SphereGeometry(0.5, 32, 32)
var material = new THREE.MeshPhongMaterial()
var earthMesh = new THREE.Mesh(geometry, material)
scene.add(earthMesh)
material.map = textureLoader.load('textures/earthmap1k.jpg')
material.bumpMap = textureLoader.load('textures/earthbump1k.jpg')
material.bumpScale = 0.05
material.specularMap = textureLoader.load('textures/earthspec1k.jpg')


// ADDS CLOUD OVERLAY - NOT REQUIRED
var geometry = new THREE.SphereGeometry(0.51, 32, 32)
var material = new THREE.MeshPhongMaterial({
    map: textureLoader.load('textures/earthcloudmaptrans.jpg'),
    side: THREE.DoubleSide,
    opacity: 0.2,
    transparent: true,
    depthWrite: false,
})
var cloudMesh = new THREE.Mesh(geometry, material)
earthMesh.add(cloudMesh)


// ADDS THE SUN/SPOTLIGHT

const pointLight = new THREE.PointLight(0xFFFFFF, .01)
pointLight.position.set(1, 1, 1)
pointLight.intensity = 1
pointLight.decay = 0
scene.add(pointLight)



// ADJUSTS THE SIZES BASED ON WINDOW SIZE
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // UPDATES THE SIZES
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // UPDATES THE CAMERA
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // UPDATES THE RENDER
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)

renderer.setPixelRatio(window.devicePixelRatio);

// MOUSE EVENT HANDLING
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
const clock = new THREE.Clock()

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}
// REFRESH RATE AND ROTATION - DO NOT TOUCH UNLESS NEEDED
const tick = () => {
    targetY = mouseY * .001
    targetX = mouseX * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    earthMesh.rotation.y = .5 * elapsedTime

    earthMesh.rotation.y += .5 * (targetX - earthMesh.rotation.y)
    earthMesh.rotation.x += .05 * (targetY - earthMesh.rotation.x)
    earthMesh.rotation.z += .05 * (targetY - earthMesh.rotation.x)
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}


//  SCROLLING TEXT REVEAL
$(document).ready(function () {
    //Take your div into one js variable
    var div = $("#divToShowHide");
    //Take the current position (vertical position from top) of your div in the variable
    var pos = div.position();
    //Now when scroll event trigger do following
    $(window).scroll(function () {
        var windowpos = $(window).scrollTop();
        //Now if you scroll more than 100 pixels vertically change the class to AfterScroll
        // I am taking 100px scroll, you can take whatever you need
        if (windowpos >= (pos.top - 1000)) {
            div.addClass("fade-in-text");
        }
        //If scroll is less than 100px, remove the class AfterScroll so that your content will be hidden again 
        else {
            s.removeClass("fade-in-text");
        }
        //Note: If you want the content should be shown always once you scroll and do not want to hide it again when go to top agian, no need to write the else part
    });
});
tick()

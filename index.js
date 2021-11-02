import * as THREE from './three.js/build/three.module.js'
import * as OrbitalControls from './three.js/examples/js/controls/OrbitControls.js'

var scene, camera, renderer

const Ground = () =>{
    let object_geometry = new THREE.PlaneGeometry(100, 100)
    let texture = new THREE.TextureLoader().load('./textures/grass.jpg')
    texture.wrapT = THREE.RepeatWrapping
    texture.wrapS = THREE.RepeatWrapping
    texture.repeat.set(10, 10)
    let material = new THREE.MeshBasicMaterial({
        map : texture,
        side : THREE.DoubleSide
    })
    let object = new THREE.Mesh(object_geometry, material)
    object.receiveShadow = true
    object.rotation.set(-Math.PI / 3, 0, 0)
    return object
}

var doInit = () => {
    scene = new THREE.Scene()

    const FOV = 45
    const WIDTH = window.innerWidth
    const HEIGHT = window.innerHeight
    const ASPECT =  WIDTH / HEIGHT

    camera = new THREE.PerspectiveCamera(FOV, ASPECT)  
    camera.position.set(0, 0, 100)
    camera.lookAt(0, 0, 0)
    
    renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(WIDTH, HEIGHT)
    renderer.setClearColor(0xFFFFFF)

    document.body.appendChild(renderer.domElement)

    let controller = new OrbitalControls.PointerLockControls(camera, renderer.domElement)
    let clock = new THREE.Clock()
    controller.lock()

    scene.add(Ground())
}

var doRender = () => {
    requestAnimationFrame(doRender)
    renderer.render(scene, camera)
}

window.onload = () => {
    doInit()
    doRender()
}

window.onresize = () => {
    const newW = innerWidth
    const newH = innerHeight

    renderer.setSize(newW, newH)

    camera.aspect = newW / newH
    camera.updateProjectionMatrix()
}



import * as THREE from './three.js/build/three.module.js'
import { FPS_Controller } from './components/FPS.js'
import {Ground} from './components/ground.js'

var scene, camera, renderer

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

    FPS_Controller()

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

export {camera, renderer}

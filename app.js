import * as THREE from './three.js/build/three.module.js'
import {FPS_Controller, FPS_Movement, controller} from './components/FPS.js'
import {Ground} from './components/ground.js'
import { wood_block, stone_block, brick_block } from './components/block.js'
import { download_model } from './components/exporter.js'
import { check_raycast, reset_material, check_ground } from './components/raycaster.js'

var scene, camera, renderer

var deltaTime

var doInit = () => {
    scene = new THREE.Scene()

    const FOV = 45
    const WIDTH = window.innerWidth
    const HEIGHT = window.innerHeight
    const ASPECT =  WIDTH / HEIGHT

    camera = new THREE.PerspectiveCamera(FOV, ASPECT)  
    camera.position.set(0, 7, 50)
    camera.lookAt(0, 0, 0)

    export_scene()
    
    renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(WIDTH, HEIGHT)
    renderer.setClearColor(0x87CEEB)
    renderer.shadowMap.enabled = true

    document.body.appendChild(renderer.domElement)

    FPS_Controller()

    wood_block.position.set(6, 2.5, 2)
    brick_block.position.set(0, 2.5, 2)
    stone_block.position.set(-6, 2.5, 2)

    let light = createDirectionalLight()

    scene.add(light)
    scene.add(Ground())
    //scene.add(controller.getObject())
}

var doRender = () => {
    deltaTime = new THREE.Clock().getDelta()
    check_ground()
    FPS_Movement()
    reset_material()
    check_raycast()

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

var createDirectionalLight = () =>{
    let light = new THREE.DirectionalLight(0xFFFFFF, 1)
    light.position.set(0, 100, 0)
    light.castShadow = true
    return light
}

const export_scene = () => {
    const export_btn = document.getElementById('export_btn')
    export_btn.style.display = 'none'
    export_btn.addEventListener('click', download_model)
}

export {camera, renderer, scene}
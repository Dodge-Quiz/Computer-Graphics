import * as THREE from './three.js/build/three.module.js'
import {FPS_Controller, FPS_Movement, update_position} from './components/FPS.js'
import { download_model, loading, saving } from './components/exporter.js'
import { check_raycast, reset_material, check_ground } from './components/raycaster.js'
import { SkyBox } from './components/skybox.js'
import { Ground } from './components/ground.js'

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
    save_scene()
    load_scene()
    
    renderer = new THREE.WebGLRenderer({antialias: true, canvas: dormicate})
    renderer.setSize(WIDTH, HEIGHT)
    renderer.setClearColor(0x87CEEB)
    renderer.shadowMap.enabled = true

    FPS_Controller()

    SkyBox()
    Ground()

    let light = createDirectionalLight()

    scene.add(light)
}

var doRender = () => {
    deltaTime = new THREE.Clock().getDelta()
    check_ground()
    FPS_Movement()
    reset_material()
    check_raycast()
    update_position(camera.position)

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
    export_btn.addEventListener('click', download_model)
}

const save_scene = () =>{
    const save_btn = document.getElementById('save_btn')
    save_btn.addEventListener('click', saving)
}

const load_scene = () =>{
    const load_btn = document.getElementById('load_btn')
    load_btn.addEventListener('click', loading)
}

export {camera, renderer, scene}
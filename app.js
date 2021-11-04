import * as THREE from './three.js/build/three.module.js'
import { FPS_Controller } from './components/FPS.js'
import {Ground} from './components/ground.js'
import { wood_block, stone_block, brick_block } from './components/block.js'

var scene, camera, renderer

var isGrounded = false

var doInit = () => {
    scene = new THREE.Scene()

    const FOV = 45
    const WIDTH = window.innerWidth
    const HEIGHT = window.innerHeight
    const ASPECT =  WIDTH / HEIGHT

    camera = new THREE.PerspectiveCamera(FOV, ASPECT)  
    camera.position.set(0, 1, 50)
    camera.lookAt(0, 0, 0)
    
    renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(WIDTH, HEIGHT)
    renderer.setClearColor(0x87CEEB)

    document.body.appendChild(renderer.domElement)

    FPS_Controller()

    wood_block.position.set(6, 2, 2)
    brick_block.position.set(0, 2, 2)
    stone_block.position.set(-6, 2, 2)

    scene.add(wood_block)
    scene.add(brick_block)
    scene.add(stone_block)

    scene.add(Ground())
}

var doRender = () => {
    requestAnimationFrame(doRender)
    // if(wood_block.position.y > 2){
    //     wood_block.position.y -= 1
    //     isGrounded = false
    //     console.log("Not Grounded")
    // }
    // else{
    //     isGrounded = true
    //     console.log("Grounded")
    // }
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
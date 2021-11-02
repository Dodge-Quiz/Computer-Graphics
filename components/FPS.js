import {PointerLockControls} from '../three.js/examples/jsm/controls/PointerLockControls.js'
import * as THREE from '../three.js/build/three.module.js'
import { camera, renderer } from '../app.js'

export const FPS_Controller = () =>{
    let controller = new PointerLockControls(camera, renderer.domElement)
    let clock = new THREE.Clock()
    document.addEventListener( 'click', function () {

        controller.lock()
    
    ,false })
}
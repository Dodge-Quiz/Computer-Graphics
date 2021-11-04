import {PointerLockControls} from '../three.js/examples/jsm/controls/PointerLockControls.js'
import { camera, renderer } from '../app.js'
import * as THREE from '../three.js/build/three.module.js'

var controller
var speed = 400
var jump_height = 100
var look_speed = 0.05
var isGrounded
var velocity = new THREE.Vector3()
var direction = new THREE.Vector3()

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let prevTime = performance.now();
let mass = 50

const FPS_Controller = () =>{
    controller = new PointerLockControls(camera, renderer.domElement)
    document.addEventListener( 'click', function () {
        controller.lock()
    ,false })

    document.addEventListener( 'keydown', onKeyDown );
    document.addEventListener( 'keyup', onKeyUp );
}

const FPS_Movement = () =>{

    let time = performance.now()
    if ( controller.isLocked === true ) {

        const delta = ( time - prevTime ) / 1000

        velocity.x -= velocity.x * 10.0 * delta
        velocity.z -= velocity.z * 10.0 * delta

        velocity.y -= 9.8 * mass * delta

        direction.z = Number( moveForward ) - Number( moveBackward )
        direction.x = Number( moveRight ) - Number( moveLeft )
        direction.normalize()

        if ( moveForward || moveBackward ) {
            velocity.z -= direction.z * speed * delta
        }
        if ( moveLeft || moveRight ) {
            velocity.x -= direction.x * speed * delta
        }

        // if ( onObject === true ) {
        //     velocity.y = Math.max( 0, velocity.y )
        //     isGrounded = true
        // }

        controller.moveRight( - velocity.x * delta )
        controller.moveForward( - velocity.z * delta )

        controller.getObject().position.y += ( velocity.y * delta ) // new behavior

        if ( controller.getObject().position.y <= 7 ) {

            velocity.y = 0
            controller.getObject().position.y = 7

            isGrounded = true

        }
    }
    prevTime = time
}

const onKeyDown = function ( event ) {

    switch ( event.code ) {

        case 'ArrowUp':
        case 'KeyW':
            moveForward = true
            break

        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = true
            break

        case 'ArrowDown':
        case 'KeyS':
            moveBackward = true
            break

        case 'ArrowRight':
        case 'KeyD':
            moveRight = true
            break

        case 'Space':
            if ( isGrounded === true ) velocity.y += jump_height;
            isGrounded = false
            break
    }

}

const onKeyUp = function ( event ) {

    switch ( event.code ) {

        case 'ArrowUp':
        case 'KeyW':
            moveForward = false
            break

        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = false
            break

        case 'ArrowDown':
        case 'KeyS':
            moveBackward = false
            break

        case 'ArrowRight':
        case 'KeyD':
            moveRight = false
            break
    }

}

const Player_Grounded = () =>{
    if(camera.position.y > 7 ){
        isGrounded = false
    }
    else{
        isGrounded = true
    }
}

export {FPS_Controller, FPS_Movement, Player_Grounded, controller}
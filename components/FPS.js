import {PointerLockControls} from '../three.js/examples/jsm/controls/PointerLockControls.js'
import { camera, renderer, scene } from '../app.js'
import * as THREE from '../three.js/build/three.module.js'
import { wood_block, brick_block, stone_block, block_size_height, block_size_widht, block_depth } from './block.js'
import { faceIndex, object_raycast, world_point } from './raycaster.js'

var controller
var speed = 400
var jump_height = 100
var isGrounded
var block_inhand
var clone_var
var velocity = new THREE.Vector3()
var direction = new THREE.Vector3()

let moveForward = false
let moveBackward = false
let moveLeft = false
let moveRight = false
let isDown = false
let prevTime = performance.now()
let mass = 50
let round_number = block_depth

const FPS_Controller = () =>{
    controller = new PointerLockControls(camera, renderer.domElement)
    document.addEventListener( 'click', function () {
        controller.lock()
    , false})

    document.addEventListener( 'keydown', onKeyDown )
    document.addEventListener( 'keyup', onKeyUp )
    document.addEventListener( 'click', function () {
        add_block()
    , false})
}

const FPS_Movement = () =>{

    let time = performance.now()
    if (controller.isLocked) {

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

        controller.getObject().position.y += ( velocity.y * delta )

        if ( controller.getObject().position.y <= 7 ) {
            velocity.y = 0
            controller.getObject().position.y = 7

            isGrounded = true
        }
    }
    prevTime = time
}

const onKeyDown = ( event ) => {

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
            if ( isGrounded === true && isDown === false) velocity.y += jump_height
            isGrounded = false
            isDown = true
            break

        case 'Digit1':
            block_inhand = wood_block
            break
        
        case 'Digit2':
            block_inhand = stone_block
            break
        
        case 'Digit3':
            block_inhand = brick_block
            break

    }

}

const onKeyUp = ( event ) => {

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

        case 'Space':
            isDown = false
            break

        case 'KeyR':
            remove_block()
            break
    }

}

const add_block = () =>{
    if(controller.isLocked){
        try{
            if(object_raycast.name === 'Ground'){
                let position_clone_x, position_clone_z
                position_clone_x = Math.round(world_point.x / round_number) *  round_number
                position_clone_z = Math.round(world_point.z / round_number) * round_number
                clone_var = block_inhand.clone()
                clone_var.traverse((node) => {
                    if (node.isMesh) {
                      node.material = node.material.clone();
                    }
                  })
                clone_var.position.set(position_clone_x, 2.5, position_clone_z)
                scene.add(clone_var)
            }
            else {
                if(faceIndex === 8){ 
                    //depan
                    clone_var = block_inhand.clone()
                    clone_var.traverse((node) => {
                        if (node.isMesh) {
                          node.material = node.material.clone();
                        }
                      })
                    clone_var.position.set(object_raycast.position.x, object_raycast.position.y, object_raycast.position.z + block_depth)
                    scene.add(clone_var)
                }
                else if(faceIndex === 0){
                    //kanan
                    clone_var = block_inhand.clone()
                    clone_var.traverse((node) => {
                        if (node.isMesh) {
                          node.material = node.material.clone();
                        }
                      })
                    clone_var.position.set(object_raycast.position.x + block_size_widht, object_raycast.position.y, object_raycast.position.z)
                    scene.add(clone_var)
                }
                else if(faceIndex === 10){
                    //belakang
                    clone_var = block_inhand.clone()
                    clone_var.traverse((node) => {
                        if (node.isMesh) {
                          node.material = node.material.clone();
                        }
                      })
                    clone_var.position.set(object_raycast.position.x, object_raycast.position.y, object_raycast.position.z - block_depth)
                    scene.add(clone_var)
                }
                else if(faceIndex === 2){
                    //kiri
                    clone_var = block_inhand.clone()
                    clone_var.traverse((node) => {
                        if (node.isMesh) {
                          node.material = node.material.clone();
                        }
                      })
                    clone_var.position.set(object_raycast.position.x - block_size_widht, object_raycast.position.y, object_raycast.position.z)
                    scene.add(clone_var)
                }
                else if(faceIndex === 4){
                    //atas
                    clone_var = block_inhand.clone()
                    clone_var.traverse((node) => {
                        if (node.isMesh) {
                          node.material = node.material.clone();
                        }
                      })
                    clone_var.position.set(object_raycast.position.x, object_raycast.position.y + block_size_height, object_raycast.position.z)
                    scene.add(clone_var)
                }
            }
        }
        catch(error){

        }
    }
}

const remove_block = () =>{
    if(controller.isLocked){
        if(object_raycast != null && object_raycast.name != 'Ground'){
            object_raycast.geometry.dispose()
            object_raycast.material.dispose()
            scene.remove( object_raycast )
            renderer.renderLists.dispose()
        }
    }
}

export {FPS_Controller, FPS_Movement, controller}
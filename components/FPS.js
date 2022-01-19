import {PointerLockControls} from '../three.js/examples/jsm/controls/PointerLockControls.js'
import { camera, renderer, scene } from '../app.js'
import * as THREE from '../three.js/build/three.module.js'
import { wood_block, brick_block, stone_block, block_size_height, block_size_widht, block_depth } from './block.js'
import { faceIndex, object_raycast, world_point, onObject } from './raycaster.js'
import { BangkuKayu, Lemari, LemariBukuKecil, Meja, MejaKecil, Sofa } from './model_loader.js'

var controller
var speed = 400
var jump_height = 100
var isGrounded
var block_inhand = new THREE.Object3D()
var clone_var
var player_position = new THREE.Vector3()
var velocity = new THREE.Vector3()
var direction = new THREE.Vector3()
var isMenu = false

let moveForward = false
let moveBackward = false
let moveLeft = false
let moveRight = false
let isDown = false
let prevTime = performance.now()
let mass = 50
let round_number = block_depth

const model = ['lemari', 'lemari_kecil', 'meja', 'meja_kecil', 'bangku_kayu', 'sofa_hitam']

const FPS_Controller = () =>{
    controller = new PointerLockControls(camera, renderer.domElement)
    document.getElementById("dormicate").addEventListener( 'click', function () {
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

        if ( onObject === true ) {
            velocity.y = Math.max(0, velocity.y)
            isGrounded = true
        }

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

        case 'KeyP':
            const menu = document.getElementById('menu')
            if(isMenu){
                menu.style.display = "none"
                isMenu = false
            }
            else{
                menu.style.display = "block"
                isMenu = true
            }
            break

        case 'Digit1':
            block_inhand = wood_block
            ui_handler(1)
            break
        
        case 'Digit2':
            block_inhand = stone_block
            ui_handler(2)
            break
        
        case 'Digit3':
            block_inhand = brick_block
            ui_handler(3)
            break
        case 'Digit4':
            block_inhand = new THREE.Group()
            Meja(block_inhand)
            ui_handler(4)
            break
        case 'Digit5':
            block_inhand = new THREE.Group()
            MejaKecil(block_inhand)
            ui_handler(5)
            break
        case 'Digit6':
            block_inhand = new THREE.Group()
            Lemari(block_inhand)
            ui_handler(6)
            break
        case 'Digit7':
            block_inhand = new THREE.Group()
            LemariBukuKecil(block_inhand)
            ui_handler(7)
            break
        case 'Digit8':
            block_inhand = new THREE.Group()
            BangkuKayu(block_inhand)
            ui_handler(8)
            break
        case 'Digit9':
            block_inhand = new THREE.Group()
            Sofa(block_inhand)
            ui_handler(9)
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

const ui_handler = (number) =>{
    const block1 = document.getElementById("block1")
    const block2 = document.getElementById("block2")
    const block3 = document.getElementById("block3")
    const block4 = document.getElementById("block4")
    const block5 = document.getElementById("block5")
    const block6 = document.getElementById("block6")
    const block7 = document.getElementById("block7")
    const block8 = document.getElementById("block8")
    const block9 = document.getElementById("block9")

    for(let i = 1; i < 10; i++){
        if(number !== i){
            switch(i){
                case 1:
                    block1.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
                    break
                case 2:
                    block2.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
                    break
                case 3:
                    block3.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
                    break
                case 4:
                    block4.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
                    break
                case 5:
                    block5.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
                    break
                case 6:
                    block6.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
                    break
                case 7:
                    block7.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
                    break
                case 8:
                    block8.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
                    break
                case 9:
                    block9.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
                    break
            }
        }
    }

    switch(number){
        case 1:
            block1.style.backgroundColor = "rgba(0, 0, 0, 1)"
            break
        case 2:
            block2.style.backgroundColor = "rgba(0, 0, 0, 1)"
            break
        case 3:
            block3.style.backgroundColor = "rgba(0, 0, 0, 1)"
            break
        case 4:
            block4.style.backgroundColor = "rgba(0, 0, 0, 1)"
            break
        case 5:
            block5.style.backgroundColor = "rgba(0, 0, 0, 1)"
            break
        case 6:
            block6.style.backgroundColor = "rgba(0, 0, 0, 1)"
            break
        case 7:
            block7.style.backgroundColor = "rgba(0, 0, 0, 1)"
            break
        case 8:
            block8.style.backgroundColor = "rgba(0, 0, 0, 1)"
            break
        case 9:
            block9.style.backgroundColor = "rgba(0, 0, 0, 1)"
            break
    }
}

export const update_position = (position) =>{
    player_position = position
}

const add_block = () =>{
    if(controller.isLocked){
        try{
            if(block_inhand.name === 'block'){
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
            else if(model.includes(block_inhand.name)){
                if(object_raycast.name === 'Ground'){
                    clone_var = block_inhand.clone()
                    // clone_var.traverse((node) => {
                    //     if (node.isMesh) {
                    //       node.material = node.material.clone();
                    //     }
                    //   })
                    clone_var.position.set(world_point.x, 0, world_point.z)
                    clone_var.lookAt(player_position.x, 0, player_position.z)
                    scene.add(clone_var)
                }
            }
            
        }
        catch(error){}
    }
}

const remove_block = () =>{
    if(controller.isLocked){
        if(object_raycast !== null){
            if(object_raycast.name === 'block'){
                object_raycast.geometry.dispose()
                object_raycast.material.dispose()
                scene.remove( object_raycast )
                renderer.renderLists.dispose()
            }
            else{
                let name = object_raycast.parent.name
                let parent = object_raycast.parent
                if(model.includes(name)){
                    for(let i = parent.children.length - 1; i >= 0; i--){
                        if(parent.children[i].isMesh){
                            parent.children[i].geometry.dispose()
                            parent.children[i].material.dispose()
                            parent.remove( parent.children[i] )
                            renderer.renderLists.dispose()
                        }
                    }
                }
            }
        }
    }
}

export {FPS_Controller, FPS_Movement, controller}
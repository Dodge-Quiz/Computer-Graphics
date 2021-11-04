import * as THREE from '../three.js/build/three.module.js'

const block_size = new Array(5, 5, 5)

const block_size_height = block_size[0]
const block_size_widht = block_size[1]
const block_depth = block_size[2]

var wood = () =>{
    let object_geometry = new THREE.BoxGeometry(block_size_widht, block_size_height, block_depth)
    let texture = new THREE.TextureLoader().load('./textures/wood_block.png')
    texture.wrapT = THREE.RepeatWrapping
    texture.wrapS = THREE.RepeatWrapping
    let material = new THREE.MeshPhongMaterial({
        map : texture,
        color : 0xFFFFFF
    })
    let object = new THREE.Mesh(object_geometry, material)
    object.castShadow = true
    object.receiveShadow = true
    return object
}

var stone = () =>{
    let object_geometry = new THREE.BoxGeometry(block_size_widht, block_size_height, block_depth)
    let texture = new THREE.TextureLoader().load('./textures/stone_block.jpg')
    texture.wrapT = THREE.RepeatWrapping
    texture.wrapS = THREE.RepeatWrapping
    let material = new THREE.MeshPhongMaterial({
        map : texture,
        color : 0xFFFFFF
    })
    let object = new THREE.Mesh(object_geometry, material)
    object.castShadow = true
    object.receiveShadow = true
    return object
}

var brick = () =>{
    let object_geometry = new THREE.BoxGeometry(block_size_widht, block_size_height, block_depth)
    let texture = new THREE.TextureLoader().load('./textures/brick_block.png')
    texture.wrapT = THREE.RepeatWrapping
    texture.wrapS = THREE.RepeatWrapping
    let material = new THREE.MeshPhongMaterial({
        map : texture,
        color : 0xFFFFFF
    })
    let object = new THREE.Mesh(object_geometry, material)
    object.castShadow = true
    object.receiveShadow = true
    return object
}

var glass = () =>{

}

var wood_block = wood()
var stone_block = stone()
var brick_block = brick()
var glass_block = glass()

export {wood_block, stone_block, brick_block}
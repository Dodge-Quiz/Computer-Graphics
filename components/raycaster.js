import * as THREE from '../three.js/build/three.module.js'
import { camera, scene } from '../app.js'

export var faceIndex
export var object_raycast
export var world_point = new THREE.Vector3
export var onObject
export var object_sum = 0

const ground_raycaster = new THREE.Raycaster()
const raycaster = new THREE.Raycaster()

export const reset_material = () =>{
    for ( let i = 0; i < scene.children.length; i ++ ) {
		if(scene.children[i].material){
            scene.children[i].material.color.setHex(0xFFFFFF) 
        }
	}
}

export const check_raycast = () =>{
    raycaster.setFromCamera(new THREE.Vector2, camera)
    const intersects = raycaster.intersectObjects( scene.children )
    object_raycast = null

	for ( let i = 0; i < intersects.length; i++ ) {
        if(intersects[i].object.name != 'Ground'){
            intersects[0].object.material.color.setHex(0x585859)
            faceIndex = intersects[0].faceIndex
        }
        object_raycast = intersects[0].object
        world_point = intersects[0].point
	}

    //console.log(object_raycast.name)
}

export const check_ground = () =>{
    ground_raycaster.set(camera.position, new THREE.Vector3(0, -1, 0))
    ground_raycaster.far = 14
    const intersects = ground_raycaster.intersectObjects(scene.children)
    onObject = false

    for ( let i = 0; i < intersects.length; i++ ) {
        if(intersects[i].object.name != 'Ground'){
            onObject = true          
        }
        if(object_sum != intersects.length) camera.position.y += 5
        object_sum = intersects.length
    }
}
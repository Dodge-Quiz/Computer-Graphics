import * as THREE from '../three.js/build/three.module.js'
import { camera, scene } from '../app.js'

const raycaster = new THREE.Raycaster()
export var faceIndex
export var object_raycast
export var world_point = new THREE.Vector3

export const reset_material = () =>{
    for ( let i = 0; i < scene.children.length; i ++ ) {
		if(scene.children[i].material){
            scene.children[i].material.color.setHex(0xFFFFFF) 
        }
	}
}

export const check_raycast = () =>{
    raycaster.setFromCamera(new THREE.Vector2(), camera)
    const intersects = raycaster.intersectObjects( scene.children )
    object_raycast = null

	for ( let i = 0; i < intersects.length; i ++ ) {
        if(intersects[i].object.name != 'Ground'){
            intersects[0].object.material.color.setHex(0x585859)
            faceIndex = intersects[0].faceIndex
        }
        object_raycast = intersects[0].object
        world_point = intersects[0].point
	}
}
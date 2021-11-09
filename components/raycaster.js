import * as THREE from '../three.js/build/three.module.js'
import { camera, scene } from '../app.js'

const raycaster = new THREE.Raycaster()

export const reset_material = () =>{
    for ( let i = 0; i < scene.children.length; i ++ ) {
		if(scene.children[i].material){
            scene.children[i].material.opacity = 1
        }
	}
}

export const check_raycast = () =>{
    raycaster.setFromCamera(new THREE.Vector2(), camera)
    const intersects = raycaster.intersectObjects( scene.children )

	for ( let i = 0; i < intersects.length; i ++ ) {
        if(intersects[i].object.name != 'Ground'){
            intersects[0].object.material.transparent = true
		    intersects[0].object.material.opacity = 0.8
        }
	}
}
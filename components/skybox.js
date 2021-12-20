import * as THREE from '../three.js/build/three.module.js'
import { scene } from '../app.js'

export const SkyBox = () =>{
    const geometry = new THREE.BoxGeometry(500, 500, 500)
    const material = [
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('../textures/daylight_box_right.jpg')
            , side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('../textures/daylight_box_left.jpg')
            , side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('../textures/daylight_box_top.jpg')
            , side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('../textures/daylight_box_bottom.jpg')
            , side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('../textures/daylight_box_front.jpg')
            , side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('../textures/daylight_box_back.jpg')
            , side: THREE.BackSide
        }),
    ]
    const mesh = new THREE.Mesh(geometry, material)
    mesh.name = 'skybox'
    scene.add(mesh)
}
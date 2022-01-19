import {GLTFExporter} from '../three.js/examples/jsm/exporters/GLTFExporter.js'
import {scene} from '../app.js'
import * as THREE from '../three.js/build/three.module.js'

export const download_model = () =>{
    const exporter = new GLTFExporter()
    const things = new THREE.Scene()
    for ( let i = 0; i < scene.children.length; i ++ ) {
		if(scene.children[i].name !== 'skybox'){
            things.add(scene.children[i].clone())
        }
	}
    exporter.parse(things, function(result){
        saveArrayBuffer(result, 'Dormicate.glb')
    },{
        binary : true
    })
}

function saveArrayBuffer(buffer, filename){
    save(new Blob([buffer], {type : 'application/octet-stream'}), filename)
}

function save(blob, filename){
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
}

export const saving = () =>{
    const scene_temp = new THREE.Scene()
    for ( let i = 0; i < scene.children.length; i ++ ) {
        scene_temp.add(scene.children[i].clone())
	}
    localStorage.setItem('save', JSON.stringify(scene_temp))
}

export const loading = () =>{
    let scene_temp = localStorage.getItem('save')
    for ( let i = 0; i < scene.children.length; i++ ) {
        scene.remove(scene.children[i])
	}
    if(scene_temp){
        let loadedGeometry = JSON.parse(scene_temp);
        let loader = new THREE.ObjectLoader();

        let loadedMesh = loader.parse(loadedGeometry);
        for ( let i = 0; i < loadedMesh.children.length; i++){
            scene.add(loadedMesh.children[i].clone());
        } 
        loadedMesh = ""
    }
}
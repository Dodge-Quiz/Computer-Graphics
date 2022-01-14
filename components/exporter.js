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
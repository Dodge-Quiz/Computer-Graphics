import {GLTFExporter} from '../three.js/examples/jsm/exporters/GLTFExporter.js'
import {scene} from '../app.js'

export const download_model = () =>{
    const exporter = new GLTFExporter()
    exporter.parse(scene, function(result){
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
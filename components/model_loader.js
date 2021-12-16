import { GLTFLoader } from '../three.js/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from '../three.js/build/three.module.js'

export const Lemari = (object3D) =>{
    const loader = new GLTFLoader();

    loader.load( '../model/Lemari/lemari_kayu.gltf', ( gltf ) =>{

        let lemari = new THREE.Group()
        gltf.scene.scale.set(1, 1, 1)
        lemari.add(gltf.scene.clone())
        lemari.traverse((node) =>{
            if(node.isMesh) node.name = 'lemari'
        })
        object3D.add(lemari)
        object3D.name = 'lemari'

    })
}

export const LemariBukuKecil = (object3D) =>{
    const loader = new GLTFLoader();

    loader.load( '../model/LemariBukuKecil/lemariBukuKecil_normal.gltf', ( gltf ) =>{

        let lemari_buku_kecil = new THREE.Group()
        gltf.scene.scale.set(1, 1, 1)
        lemari_buku_kecil.add(gltf.scene.clone())
        lemari_buku_kecil.traverse((node) =>{
            if(node.isMesh) node.name = 'lemari_buku_kecil'
        })
        object3D.add(meja)
        object3D.name = 'lemari_buku_kecil'

    })
}

export const Meja = (object3D) =>{
    const loader = new GLTFLoader();

    loader.load( '../model/Meja/Meja2_kayu.gltf', ( gltf ) =>{

        let meja = new THREE.Group()
        gltf.scene.scale.set(1, 1, 1)
        meja.add(gltf.scene.clone())
        meja.traverse((node) =>{
            if(node.isMesh) node.name = 'meja'
        })
        object3D.add(meja)
        object3D.name = 'meja'

    })
}

export const MejaKecil = (object3D) =>{
    const loader = new GLTFLoader();

    loader.load( '../model/MejaKecil/mejaKecil_kayu.gltf', ( gltf ) =>{

        let meja_kecil = new THREE.Group()
        gltf.scene.scale.set(1, 1, 1)
        meja_kecil.add(gltf.scene.clone())
        meja_kecil.traverse((node) =>{
            if(node.isMesh) node.name = 'meja_kecil'
        })
        object3D.add(meja_kecil)
        object3D.name = 'meja_kecil'

    })
}
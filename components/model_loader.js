import { GLTFLoader } from '../three.js/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from '../three.js/build/three.module.js'

export const Lemari = (object3D) =>{
    const loader = new GLTFLoader();
    let i = 0

    loader.load( './model/Lemari/lemari_kayu.gltf', ( gltf ) =>{

        let lemari = new THREE.Group()
        gltf.scene.scale.set(2, 2, 2)
        lemari = gltf.scene.clone()
        lemari.name = 'lemari'
        i = 0
        lemari.rotation.y -= Math.PI / 2
        lemari.position.x -= 5
        object3D.add(lemari)
        object3D.name = 'lemari'
    })
}

export const LemariBukuKecil = (object3D) =>{
    const loader = new GLTFLoader();

    loader.load( './model/LemariBukukecil/lemariBukuKecil_normal.gltf', ( gltf ) =>{

        let lemari_buku_kecil = new THREE.Group()
        gltf.scene.scale.set(5, 5, 5)
        lemari_buku_kecil= gltf.scene.clone()
        lemari_buku_kecil.name = 'lemari_kecil'
        lemari_buku_kecil.rotation.y -= Math.PI / 2
        lemari_buku_kecil.position.set(lemari_buku_kecil.position.x - 7, lemari_buku_kecil.position.y - 5.5, 0)
        object3D.add(lemari_buku_kecil)
        object3D.name = 'lemari_kecil'
    })
}

export const Meja = (object3D) =>{
    const loader = new GLTFLoader();

    loader.load( './model/Meja/Meja2_kayu.gltf', ( gltf ) =>{

        let meja = new THREE.Group()
        gltf.scene.scale.set(1, 1, 1)
        meja = gltf.scene.clone()
        meja.name = 'meja'
        meja.position.y += 1.5
        object3D.add(meja)
        object3D.name = 'meja'
    })
}

export const MejaKecil = (object3D) =>{
    const loader = new GLTFLoader();

    loader.load( './model/MejaKecil/MejaKecil_kayu.gltf', ( gltf ) =>{

        let meja_kecil = new THREE.Group()
        gltf.scene.scale.set(1, 1, 1)
        meja_kecil = gltf.scene.clone()
        meja_kecil.name = 'meja_kecil'
        meja_kecil.position.y += 0.2
        object3D.add(meja_kecil)
        object3D.name = 'meja_kecil'
    })
}

export const BangkuKayu = (object3D) =>{
    const loader = new GLTFLoader();

    loader.load( './model/BangkuKayu/bangku_kayu.gltf', ( gltf ) =>{

        let bangku_kayu = new THREE.Group()
        gltf.scene.scale.set(3, 3, 3)
        bangku_kayu = gltf.scene.clone()
        bangku_kayu.name = 'bangku_kayu'
        bangku_kayu.rotation.y -= Math.PI
        bangku_kayu.position.x += 0.3
        object3D.add(bangku_kayu)
        object3D.name = 'bangku_kayu'
    })
}

export const Sofa = (object3D) =>{
    const loader = new GLTFLoader();

    loader.load( './model/Sofa/sofa_Krem.gltf', ( gltf ) =>{

        let sofa_hitam = new THREE.Group()
        gltf.scene.scale.set(4, 4, 4)
        sofa_hitam = gltf.scene.clone()
        sofa_hitam.name = 'sofa_hitam'
        sofa_hitam.rotation.y -= Math.PI / 2
        sofa_hitam.position.x -= 4
        sofa_hitam.position.y -= 1
        object3D.add(sofa_hitam)
        object3D.name = 'sofa_hitam'
    })
}

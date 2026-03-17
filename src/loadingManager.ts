import * as THREE from "three";

const loadingManager = new THREE.LoadingManager();

const textureLoader = new THREE.TextureLoader(loadingManager);

export { textureLoader };

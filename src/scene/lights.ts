import * as THREE from "three";

const ambientLight = new THREE.AmbientLight("white", 1);

const hemisphereLight = new THREE.HemisphereLight("white", "green", 1);

const directionalLight = new THREE.DirectionalLight("white", 2);
directionalLight.position.set(2, 2, 2);

directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 10;

const directionalLightShadowMapSizeResolution = 2048;
directionalLight.shadow.mapSize.set(
  directionalLightShadowMapSizeResolution,
  directionalLightShadowMapSizeResolution
);

export { ambientLight, hemisphereLight, directionalLight };

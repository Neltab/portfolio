import * as THREE from "three";

import { directionalLight } from "../scene/lights";

const directionalLightShadowCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);

export { directionalLightShadowCameraHelper };

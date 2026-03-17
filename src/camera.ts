import * as THREE from "three";
import { CAMERA_START_POSITION, CAMERA_START_LOOKAT } from "./shared/positions";

const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100);

camera.position.set(CAMERA_START_POSITION.x, CAMERA_START_POSITION.y, CAMERA_START_POSITION.z);
camera.lookAt(CAMERA_START_LOOKAT);

export default camera;

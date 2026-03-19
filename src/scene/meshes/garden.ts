import * as THREE from "three";
import { loadPointCloud } from "./pointCloud";
import { updateLoop } from "../../engine/timer";
import { MathUtils } from "three/src/math/MathUtils.js";

const gardenGroup = await loadPointCloud('/models/garden.glb', [0.075], [4]);
const garden = gardenGroup.children[0] as THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;
garden.rotateX(MathUtils.degToRad(90));
garden.rotateZ(MathUtils.degToRad(25));

updateLoop.push((elapsedTime) => {
    garden.material.uniforms.time.value = elapsedTime;
});

export default garden;
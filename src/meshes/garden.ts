import loadPointCloud from "../utils/loadPointCloud";
import { updateLoop } from "../timer";
import * as THREE from "three";

const gardenGroup = await loadPointCloud('/static/models/garden4-2.glb', [0.075]);
const garden = gardenGroup.children[0];
garden.rotateX(THREE.MathUtils.degToRad(90));
garden.rotateZ(THREE.MathUtils.degToRad(25));

updateLoop.push((elapsedTime) => {
    garden.material.uniforms.time.value = elapsedTime;
});

console.log("garden called");

export default garden;
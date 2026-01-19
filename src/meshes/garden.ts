import { loadPointCloud } from "../utils/pointCloud";
import { updateLoop } from "../timer";
import { MathUtils } from "three/src/math/MathUtils.js";

const gardenGroup = await loadPointCloud('/static/models/garden4-2.glb', [0.075], [4]);
const garden = gardenGroup.children[0];
garden.rotateX(MathUtils.degToRad(90));
garden.rotateZ(MathUtils.degToRad(25));

updateLoop.push((elapsedTime) => {
    garden.material.uniforms.time.value = elapsedTime;
});

export default garden;
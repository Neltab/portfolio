import { CircleGeometry, Mesh, MeshBasicMaterial, DoubleSide, DataTexture, RGBAFormat, UnsignedByteType } from "three";
import { generateParticles } from "../utils/pointCloud";
import { updateLoop } from "../timer";

const size = 1;
const data = new Uint8Array([85, 154, 154, 128]); // RGBA for blue

const texture = new DataTexture(
  data, size, size, RGBAFormat, UnsignedByteType
);
texture.needsUpdate = true;
texture.needsUpdate = true;

const lake = new Mesh(
    new CircleGeometry(3, 8),
    new MeshBasicMaterial({ side: DoubleSide, map: texture })
);

const pointLake = generateParticles(lake, 0.1, 20);
pointLake.position.set(-0.75, 0.35, 1.5);
pointLake.rotateX(Math.PI / 2);

updateLoop.push((elapsedTime) => {
    pointLake.material.uniforms.time.value = elapsedTime;
});

export default pointLake;
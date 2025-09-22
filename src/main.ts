
import scene from "./scene";
import garden from "./meshes/garden";
import violin from "./meshes/violin";
import bench from "./meshes/bench";
import { ambientLight, hemisphereLight } from "./lights";
import timer, { tick, updateLoop } from "./timer";
import { CONTROL_POINTS, PLACES, TRAVELLING } from "./shared/positions";
import axesHelper from "./helpers/axesHelper";

import { BENCH_POSITION, BENCH_ROTATION, VIOLIN_POSITION, VIOLIN_ROTATION } from "./shared/positions";
import travelling from "./shared/travelling";
import { bezierFolder } from "./lilgui";

async function main() {
    // Meshe
    scene.add(garden);
    console.log("garden", garden);

    violin.position.set(VIOLIN_POSITION.x, VIOLIN_POSITION.y, VIOLIN_POSITION.z);
    violin.rotation.set(VIOLIN_ROTATION.x, VIOLIN_ROTATION.y, VIOLIN_ROTATION.z, VIOLIN_ROTATION.order);
    scene.add(violin);
    console.log("violin", violin);

    bench.position.set(BENCH_POSITION.x, BENCH_POSITION.y, BENCH_POSITION.z);
    bench.rotation.set(BENCH_ROTATION.x, BENCH_ROTATION.y, BENCH_ROTATION.z, BENCH_ROTATION.order);
    scene.add(bench);

    console.log("bench", bench);

    // scene.add(travelling.getCurves());

    // Lights
    scene.add(ambientLight);
    scene.add(hemisphereLight);

    // scene.add(axesHelper);
    const start = PLACES.LAKE.HOUSE;
    const end = PLACES.HOUSE;
    const controlPoints = CONTROL_POINTS[start][end];
    const points = TRAVELLING[start][end];
    const curve = travelling.curves[start][end];
    let oldCurve = curve.curve;

    // points.forEach((point, index) => {
    //     const subFolder = bezierFolder.addFolder(`Point ${index}`);
    //     subFolder.add(point, "x", -15, 15, 0.05).onChange(() => {scene.remove(oldCurve); oldCurve = curve.curve; scene.add(oldCurve)});
    //     subFolder.add(point, "z", -15, 15, 0.05).onChange(() => {scene.remove(oldCurve); oldCurve = curve.curve; scene.add(oldCurve)});
    // });

    // controlPoints.forEach((point, index) => {
    //     const subFolder = bezierFolder.addFolder(`Control Point ${index}`);
    //     subFolder.add(point, "x", -15, 15, 0.05).onChange(() => {scene.remove(oldCurve); oldCurve = curve.curve; scene.add(oldCurve)});
    //     subFolder.add(point, "z", -15, 15, 0.05).onChange(() => {scene.remove(oldCurve); oldCurve = curve.curve; scene.add(oldCurve)});
    // });

    // scene.add(oldCurve);

    tick();
    garden.material.uniforms.loadedTime.value = timer.getElapsed();
}

main();

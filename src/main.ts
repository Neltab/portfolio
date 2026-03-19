
import scene from "./scene/scene";
import * as THREE from "three";
import garden from "./scene/meshes/garden";
import violin from "./scene/meshes/violin";
import bench from "./scene/meshes/bench";
import lake from "./scene/meshes/lake";
import iss from "./scene/meshes/iss";
import { ambientLight, hemisphereLight } from "./scene/lights";
import timer, { tick } from "./engine/timer";
import { BENCH_POSITION, BENCH_ROTATION, VIOLIN_POSITION, VIOLIN_ROTATION, ISS_POSITION, ISS_ROTATION } from "./navigation/positions";
import { debugCurves } from "./debug/curveDebug";
import initHover from "./ui/hover";
import initHud from "./ui/hud";

async function main() {
    // Meshes
    scene.add(garden);

    iss.position.set(ISS_POSITION.x, ISS_POSITION.y, ISS_POSITION.z);
    iss.rotation.set(ISS_ROTATION.x, ISS_ROTATION.y, ISS_ROTATION.z, ISS_ROTATION.order);
    scene.add(iss);

    violin.position.set(VIOLIN_POSITION.x, VIOLIN_POSITION.y, VIOLIN_POSITION.z);
    violin.rotation.set(VIOLIN_ROTATION.x, VIOLIN_ROTATION.y, VIOLIN_ROTATION.z, VIOLIN_ROTATION.order);
    scene.add(violin);

    bench.position.set(BENCH_POSITION.x, BENCH_POSITION.y, BENCH_POSITION.z);
    bench.rotation.set(BENCH_ROTATION.x, BENCH_ROTATION.y, BENCH_ROTATION.z, BENCH_ROTATION.order);
    scene.add(bench);

    scene.add(lake);

    // Lights
    scene.add(ambientLight);
    scene.add(hemisphereLight);

    if (import.meta.env.DEV) {
        debugCurves();
    }

    tick();
    garden.material.uniforms.loadedTime.value = timer.getElapsed();

    // UI
    const hoverWhitelist = new Map<THREE.Object3D, string>([
        [violin, "Violin"],
        [iss, "Space Station"],
    ]);

    initHover(hoverWhitelist);
    initHud();
}

main();

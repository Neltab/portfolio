
import scene from "./scene";
import garden from "./meshes/garden";
import violin from "./meshes/violin";
import bench from "./meshes/bench";
import { ambientLight, hemisphereLight } from "./lights";
import { tick, updateLoop } from "./timer";
import { PLACES } from "./shared/positions";
import axesHelper from "./helpers/axesHelper";

import { BENCH_POSITION, BENCH_ROTATION, VIOLIN_POSITION, VIOLIN_ROTATION } from "./shared/positions";
import travelling from "./shared/travelling";

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

    document.addEventListener('keydown', (event) => {
        console.log(event.key);
        switch (event.key) {
            case 'a':
                updateLoop.push(travelling.travelTo(PLACES.BENCH));
                break;
            case 'z':
                updateLoop.push(travelling.travelTo(PLACES.PATH));
                break;
        }
    });

    scene.add(travelling.getCurves());

    // Lights
    scene.add(ambientLight);
    scene.add(hemisphereLight);

    scene.add(axesHelper);

    tick();
}

main();


import scene from "./scene";
import camera from "./camera";
import * as THREE from "three";
import garden from "./meshes/garden";
import violin from "./meshes/violin";
import bench from "./meshes/bench";
import lake from "./meshes/lake";
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

    scene.add(lake);

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

    const hoverWhitelist = new Map<THREE.Object3D, string>([
        [violin, "violin"],
    ]);

    const hoverLabel = document.getElementById("hover-label");
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const whitelistedObjects = [...hoverWhitelist.keys()];

    let currentHoveredKey: string | null = null;
    let isShowingObjectUI = false;

    function findWhitelistedMatch(hitObject: THREE.Object3D): THREE.Object3D | undefined {
        return whitelistedObjects.find(obj => hitObject === obj || hitObject.parent === obj || obj.getObjectById(hitObject.id));
    }

    function showObjectDescription(objectKey: string) {
        if (isShowingObjectUI && currentHoveredKey === objectKey) return;
        isShowingObjectUI = true;
        travelling.showObjectUI(objectKey);
    }

    function hideObjectDescription() {
        if (!isShowingObjectUI) return;
        isShowingObjectUI = false;
        travelling.hideObjectUI();
    }

    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(whitelistedObjects, true);

        if (intersects.length > 0) {
            const matched = findWhitelistedMatch(intersects[0].object);
            const objectKey = matched ? hoverWhitelist.get(matched) : undefined;

            if (objectKey && hoverLabel) {
                hoverLabel.textContent = objectKey;
                hoverLabel.style.left = `${event.clientX + 15}px`;
                hoverLabel.style.top = `${event.clientY + 15}px`;
                hoverLabel.classList.remove("hidden");

                currentHoveredKey = objectKey;
                showObjectDescription(objectKey);
            }
        } else {
            if (hoverLabel) hoverLabel.classList.add("hidden");
            currentHoveredKey = null;
            hideObjectDescription();
        }
    });
}

main();

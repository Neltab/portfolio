import * as THREE from "three";
import scene from "../scene";
import travelling from "../shared/travelling";
import { CONTROL_POINTS, PLACES, TRAVELLING } from "../shared/positions";
import { bezierFolder } from "../lilgui";
import axesHelper from "../helpers/axesHelper";
import controls from "../controls";

export let isDebugEnabled = false;

const PLACE_NAMES: { [key: number]: string } = {
    [PLACES.ENTRANCE]: "Entrance",
    [PLACES.BENCH]: "Bench",
    [PLACES.PATH]: "Path",
    [PLACES.HOUSE]: "House",
    [PLACES.LAKE.ENTRANCE]: "Lake.Entrance",
    [PLACES.LAKE.BENCH]: "Lake.Bench",
    [PLACES.LAKE.PATH]: "Lake.Path",
    [PLACES.LAKE.HOUSE]: "Lake.House",
};

export function debugCurves() {
    isDebugEnabled = true;
    scene.add(axesHelper);
    controls.enableDamping = true;

    for (const startKey in travelling.curves) {
        const start = Number(startKey);
        const startName = PLACE_NAMES[start] ?? startKey;

        for (const endKey in travelling.curves[start]) {
            const end = Number(endKey);
            const endName = PLACE_NAMES[end] ?? endKey;

            const curve = travelling.curves[start][end];
            const points = TRAVELLING[start][end];
            const controlPoints = CONTROL_POINTS[start][end];

            let curveVisual: THREE.Group | null = null;
            const state = { visible: false };

            const curveFolder = bezierFolder.addFolder(`${startName} → ${endName}`);
            curveFolder.close();

            const rebuild = () => {
                if (curveVisual) scene.remove(curveVisual);
                if (!state.visible) { curveVisual = null; return; }
                curveVisual = curve.curve;
                scene.add(curveVisual);
            };

            curveFolder.add(state, "visible").name("Show").onChange(rebuild);

            const pointsFolder = curveFolder.addFolder("Points");
            pointsFolder.close();
            points.forEach((point, index) => {
                const pFolder = pointsFolder.addFolder(`P${index}`);
                pFolder.close();
                pFolder.add(point, "x", -15, 15, 0.05).onChange(rebuild);
                pFolder.add(point, "z", -15, 15, 0.05).onChange(rebuild);
            });

            const cpFolder = curveFolder.addFolder("Control Points");
            cpFolder.close();
            controlPoints.forEach((point, index) => {
                const cFolder = cpFolder.addFolder(`CP${index}`);
                cFolder.close();
                cFolder.add(point, "x", -15, 15, 0.05).onChange(rebuild);
                cFolder.add(point, "z", -15, 15, 0.05).onChange(rebuild);
            });
        }
    }
}

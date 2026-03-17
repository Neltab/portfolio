import * as THREE from "three";
import scene from "../scene";
import travelling from "../shared/travelling";
import { PLACES } from "../shared/positions";
import { bezierFolder } from "../lilgui";
import axesHelper from "../helpers/axesHelper";
import controls from "../controls";


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
    if (!bezierFolder) return;

    scene.add(axesHelper);
    controls.enabled = true;
    controls.enableDamping = true;

    for (const startKey in travelling.curves) {
        const start = Number(startKey);
        const startName = PLACE_NAMES[start] ?? startKey;

        for (const endKey in travelling.curves[start]) {
            const end = Number(endKey);
            const endName = PLACE_NAMES[end] ?? endKey;

            const curve = travelling.curves[start][end];
            const lookAtCurve = travelling.lookAtCurves[start][end];
            const points = curve.points;
            const controlPoints = curve.controlPoints;
            const lookAtPoints = lookAtCurve.points;
            const lookAtControlPoints = lookAtCurve.controlPoints;

            let curveVisual: THREE.Group | null = null;
            let lookAtVisual: THREE.Group | null = null;
            const state = { visible: false };

            const curveFolder = bezierFolder!.addFolder(`${startName} → ${endName}`);
            curveFolder.close();

            const rebuild = () => {
                if (curveVisual) scene.remove(curveVisual);
                if (lookAtVisual) scene.remove(lookAtVisual);
                if (!state.visible) { curveVisual = null; lookAtVisual = null; return; }
                curveVisual = curve.getCurveVisual(0x00ff00);
                lookAtVisual = lookAtCurve.getCurveVisual(0x4444ff);
                if (!curveVisual || !lookAtVisual) return;
                scene.add(curveVisual);
                scene.add(lookAtVisual);
            };

            curveFolder.add(state, "visible").name("Show").onChange(rebuild);

            const travelFolder = curveFolder.addFolder("Travel (green)");
            travelFolder.close();

            const pointsFolder = travelFolder.addFolder("Points");
            pointsFolder.close();
            points.forEach((point, index) => {
                const pFolder = pointsFolder.addFolder(`P${index}`);
                pFolder.close();
                pFolder.add(point, "x", -15, 15, 0.05).onChange(rebuild);
                pFolder.add(point, "y", -15, 15, 0.05).onChange(rebuild);
                pFolder.add(point, "z", -15, 15, 0.05).onChange(rebuild);
            });

            const cpFolder = travelFolder.addFolder("Control Points");
            cpFolder.close();
            controlPoints.forEach((point, index) => {
                const cFolder = cpFolder.addFolder(`CP${index}`);
                cFolder.close();
                cFolder.add(point, "x", -15, 15, 0.05).onChange(rebuild);
                cFolder.add(point, "y", -15, 15, 0.05).onChange(rebuild);
                cFolder.add(point, "z", -15, 15, 0.05).onChange(rebuild);
            });

            const lookAtFolder = curveFolder.addFolder("Look-at (blue)");
            lookAtFolder.close();

            const laPointsFolder = lookAtFolder.addFolder("Points");
            laPointsFolder.close();
            lookAtPoints.forEach((point, index) => {
                const pFolder = laPointsFolder.addFolder(`P${index}`);
                pFolder.close();
                pFolder.add(point, "x", -15, 15, 0.05).onChange(rebuild);
                pFolder.add(point, "y", -15, 15, 0.05).onChange(rebuild);
                pFolder.add(point, "z", -15, 15, 0.05).onChange(rebuild);
            });

            const laCpFolder = lookAtFolder.addFolder("Control Points");
            laCpFolder.close();
            lookAtControlPoints.forEach((point, index) => {
                const cFolder = laCpFolder.addFolder(`CP${index}`);
                cFolder.close();
                cFolder.add(point, "x", -15, 15, 0.05).onChange(rebuild);
                cFolder.add(point, "y", -15, 15, 0.05).onChange(rebuild);
                cFolder.add(point, "z", -15, 15, 0.05).onChange(rebuild);
            });
        }
    }
}

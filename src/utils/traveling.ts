import { CAMERA_START_POSITION, TRAVELING } from "../shared/positions";
import * as THREE from "three";

type Curves = {
    [start: number]: {
        [end: number]: THREE.CatmullRomCurve3
    }
};

const convertToTravelingCurves = (positions: typeof TRAVELING) => {
    const curves = {} as Curves;
    for (const place in positions) {
        curves[place] = {};
        for (const place2 in positions[place]) {
            curves[place][place2] = new THREE.CatmullRomCurve3(positions[place][place2]);
        }
    }
    return curves;
}

export default convertToTravelingCurves;
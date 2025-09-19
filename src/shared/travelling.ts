import { PLACES, TRAVELLING } from "../shared/positions";
import * as THREE from "three";
import timer from "../timer";
import camera from "../camera";
import { CurrentUpdate } from "../helpers/updateLoop";
import BezierCurve from "./bezierCurve";
import { CAMERA_BENCH_POSITION, CAMERA_START_POSITION, CONTROL_POINTS } from "../shared/positions";

type Curves = {
    [start: number]: {
        [end: number]: BezierCurve
    }
};

class Travelling {
    currentPlace: number;
    curves: Curves;
    isTravelling: boolean;
    constructor(currentPlace: number) {
        this.currentPlace = currentPlace;
        this.curves = this.convertToTravelingCurves(TRAVELLING);
        this.isTravelling = false;
    }

    travelTo(place: number, duration: number = 7.5) {
        if(!this.isTravelling && (!this.curves[this.currentPlace] || !this.curves[this.currentPlace][place])) return () => {};
        const curve = this.curves[this.currentPlace][place];
        this.isTravelling = true;
        const travelFunction = this.travelAlongCurve(curve, timer.getElapsed(), duration);
        this.currentPlace = place;
        return travelFunction;
    }

    travelAlongCurve = (curve: BezierCurve, startTime: number, duration: number) => (elapsedTime: number, update: CurrentUpdate) => {
        const time = elapsedTime - startTime;
        if (time > duration) {
            this.isTravelling = false;
            update.remove();
            return;
        }
        const t1 = time / duration;
        const t2 = Math.min((time + duration * 0.01) / duration, 1);
        const pos = curve.getPointAt(t1);
        const look = curve.getPointAt(t2);
        camera.position.set(pos.x, pos.y, pos.z);
        camera.lookAt(look);
    }

    convertToTravelingCurves = (positions: typeof TRAVELLING) => {
        const curves = {} as Curves;
        for (const place in positions) {
            curves[place] = {};
            for (const place2 in positions[place]) {
                curves[place][place2] = new BezierCurve(TRAVELLING[place][place2], CONTROL_POINTS[place][place2]);
            }
        }
        return curves;
    }

    getCurves() {
        const group = new THREE.Group();
        for (const place in this.curves) {
            for (const place2 in this.curves[place]) {
                const curve = this.curves[place][place2];
                group.add(curve.curve);
            }
        }
        return group;
    }
}

const travelling = new Travelling(PLACES.ENTRANCE);

export default travelling;
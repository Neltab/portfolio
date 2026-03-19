// src/navigation/travelling.ts
import { PLACES, TRAVELLING, CONTROL_POINTS, TRAVELLING_LOOKAT, CONTROL_POINTS_LOOKAT } from "./positions";
import * as THREE from "three";
import timer from "../engine/timer";
import camera from "../scene/camera";
import { CurrentUpdate } from "../engine/updateLoop";
import BezierCurve from "./bezierCurve";
import eventBus from "../shared/eventBus";

type Curves = {
    [start: number]: {
        [end: number]: BezierCurve
    }
};

class Travelling {
    currentPlace: number;
    curves: Curves;
    lookAtCurves: Curves;
    isTravelling: boolean;

    constructor(currentPlace: number) {
        this.currentPlace = currentPlace;
        this.curves = this.convertToTravelingCurves(TRAVELLING, CONTROL_POINTS);
        this.lookAtCurves = this.convertToTravelingCurves(TRAVELLING_LOOKAT, CONTROL_POINTS_LOOKAT);
        this.isTravelling = false;
    }

    travelTo(place: number) {
        if (!this.isTravelling && (!this.curves[this.currentPlace] || !this.curves[this.currentPlace][place])) return () => {};
        const baseDuration = 5;
        const referenceLength = 11;

        const curve = this.curves[this.currentPlace][place];
        const lookAtCurve = this.lookAtCurves[this.currentPlace][place];
        this.isTravelling = true;
        eventBus.emit("travelStart", { from: this.currentPlace, to: place });
        const duration = baseDuration * Math.sqrt(curve.length / referenceLength);
        const travelFunction = this.travelAlongCurve(curve, lookAtCurve, timer.getElapsed(), duration);
        this.currentPlace = place;
        return travelFunction;
    }

    travelAlongCurve = (curve: BezierCurve, lookAtCurve: BezierCurve, startTime: number, duration: number) => (elapsedTime: number, update: CurrentUpdate) => {
        const time = elapsedTime - startTime;
        if (time > duration) {
            this.isTravelling = false;
            const finalPos = curve.getPointAt(1);
            const finalLook = lookAtCurve.getPointAt(0.99);
            camera.position.set(finalPos.x, finalPos.y, finalPos.z);
            camera.lookAt(finalLook);
            eventBus.emit("travelEnd", { place: this.currentPlace });
            eventBus.emit("placeChanged", { place: this.currentPlace });
            update.remove();
            return;
        }
        const t1 = Math.min(time / duration, 1);
        const t2 = Math.min(t1 + 0.01, 1);
        const pos = curve.getPointAt(t1);
        const look = lookAtCurve.getPointAt(t2);
        camera.position.set(pos.x, pos.y, pos.z);
        camera.lookAt(look);
    }

    convertToTravelingCurves = (positions: typeof TRAVELLING, controlPoints: typeof CONTROL_POINTS) => {
        const curves = {} as Curves;
        for (const start in positions) {
            curves[start] = {};
            for (const end in positions[start]) {
                curves[start][end] = new BezierCurve(positions[start][end], controlPoints[start][end]);
            }
        }
        return curves;
    }

    getCurves() {
        const group = new THREE.Group();
        for (const start in this.curves) {
            for (const end in this.curves[start]) {
                const curve = this.curves[start][end];
                group.add(curve.curve);
            }
        }
        return group;
    }
}

const travelling = new Travelling(PLACES.ENTRANCE);

export default travelling;

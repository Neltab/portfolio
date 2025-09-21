import { PLACES, TRAVELLING } from "../shared/positions";
import * as THREE from "three";
import timer from "../timer";
import camera from "../camera";
import { CurrentUpdate } from "../helpers/updateLoop";
import BezierCurve from "./bezierCurve";
import { CONTROL_POINTS } from "../shared/positions";
import en from "../texts/en";
import fr from "../texts/fr";

type Curves = {
    [start: number]: {
        [end: number]: BezierCurve
    }
};

class Travelling {
    currentPlace: number;
    curves: Curves;
    isTravelling: boolean;
    uiTitle: HTMLElement | null;
    uiDescriptionLeft: HTMLElement | null;
    uiDescriptionRight: HTMLElement | null;
    constructor(currentPlace: number) {
        this.currentPlace = currentPlace;
        this.curves = this.convertToTravelingCurves(TRAVELLING);
        this.isTravelling = false;
        this.uiTitle = document.getElementById("title");
        this.uiDescriptionLeft = document.getElementById("description-left");
        this.uiDescriptionRight = document.getElementById("description-right");

        if (this.uiTitle && this.uiDescriptionLeft && this.uiDescriptionRight) {
            this.uiTitle.innerHTML = en[currentPlace].title;
            this.uiDescriptionLeft.innerHTML = en[currentPlace].description;
        }
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
        for (const start in positions) {
            curves[start] = {};
            for (const end in positions[start]) {
                curves[start][end] = new BezierCurve(TRAVELLING[start][end], CONTROL_POINTS[start][end]);
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
import { PLACES, TRAVELING } from "../shared/positions";
import * as THREE from "three";
import timer from "../timer";
import camera from "../camera";
import { CurrentUpdate } from "../helpers/updateLoop";

type Curves = {
    [start: number]: {
        [end: number]: THREE.CatmullRomCurve3
    }
};

class Travelling {
    currentPlace: number;
    curves: Curves;
    isTravelling: boolean;
    constructor(currentPlace: number) {
        this.currentPlace = currentPlace;
        this.curves = this.convertToTravelingCurves(TRAVELING);
        this.isTravelling = false;
    }

    travelTo(place: number) {
        const curve = this.curves[this.currentPlace][place];
        this.isTravelling = true;
        const travelFunction = this.travelAlongCurve(curve, timer.getElapsed(), 5);
        this.currentPlace = place;
        return travelFunction;
    }

    travelAlongCurve = (curve: THREE.CatmullRomCurve3, startTime: number, duration: number) => (elapsedTime: number, update: CurrentUpdate) => {
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

    convertToTravelingCurves = (positions: typeof TRAVELING) => {
        const curves = {} as Curves;
        for (const place in positions) {
            curves[place] = {};
            for (const place2 in positions[place]) {
                curves[place][place2] = new THREE.CatmullRomCurve3(positions[place][place2], false, "catmullrom", 0.5);
            }
        }
        return curves;
    }

    getCurves() {
        const group = new THREE.Group();
        for (const place in this.curves) {
            for (const place2 in this.curves[place]) {
                const curve = this.curves[place][place2];
                const geometry = new THREE.BufferGeometry().setFromPoints( curve.getSpacedPoints(100) );
                const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x00ff00 }));
                group.add(line);
            }
        }
        return group;
    }
}

const travelling = new Travelling(PLACES.ENTRANCE);

export default travelling;
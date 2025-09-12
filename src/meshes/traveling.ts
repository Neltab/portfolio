import { PLACES, TRAVELING } from "../shared/positions";
import convertToTravelingCurves from "../utils/traveling";
import camera from "../camera";
import { CurrentUpdate } from "../helpers/updateLoop";
import timer from "../timer";


const curves = convertToTravelingCurves(TRAVELING);
let currentPlace = PLACES.ENTRANCE;

const travelTo = (place: number) => {
    const curve = curves[currentPlace][place];
    const travelFunction = travelAlongCurve(curve, timer.getElapsed(), 5);
    currentPlace = place;
    return travelFunction;
}

const travelAlongCurve = (curve: THREE.CatmullRomCurve3, startTime: number, duration: number) => (elapsedTime: number, update: CurrentUpdate) => {
    const time = elapsedTime - startTime;
    if (time > duration) {
        update.remove();
        return;
    }
    const t1 = time / duration;
    const t2 = (time + duration * 0.01) / duration;
    const pos = curve.getPointAt(t1);
    const look = curve.getPointAt(t2);
    camera.position.set(pos.x, pos.y, pos.z);
    camera.lookAt(look);
}

export {
    curves,
    travelTo,
};
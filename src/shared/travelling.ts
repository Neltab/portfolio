import { PLACES, TRAVELLING } from "../shared/positions";
import * as THREE from "three";
import timer, { updateLoop} from "../timer";
import camera from "../camera";
import { CurrentUpdate } from "../helpers/updateLoop";
import BezierCurve from "./bezierCurve";
import { CONTROL_POINTS, CONTROL_POINTS_LOOKAT, DESTINATIONS, TRAVELLING_LOOKAT } from "../shared/positions";
import en, { OBJECTS as EN_OBJECTS } from "../texts/en";
// import fr from "../texts/fr";

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
    uiTitle: HTMLElement | null;
    uiDescriptionLeft: HTMLElement | null;
    uiDescriptionRight: HTMLElement | null;
    uiNavigationMenu: HTMLElement | null;
    savedUIState: { title: string, left: string, right: string, nav: string, hiddenElements: string[] } | null = null;

    constructor(currentPlace: number) {
        this.currentPlace = currentPlace;
        this.curves = this.convertToTravelingCurves(TRAVELLING, CONTROL_POINTS);
        this.lookAtCurves = this.convertToTravelingCurves(TRAVELLING_LOOKAT, CONTROL_POINTS_LOOKAT);
        this.isTravelling = false;
        this.uiTitle = document.getElementById("title");
        this.uiDescriptionLeft = document.getElementById("description-left");
        this.uiDescriptionRight = document.getElementById("description-right");
        this.uiNavigationMenu = document.getElementById("navigation-menu");
        this.updateUI();
    }

    travelTo(place: number, duration: number = 7.5) {
        if(!this.isTravelling && (!this.curves[this.currentPlace] || !this.curves[this.currentPlace][place])) return () => {};
        const curve = this.curves[this.currentPlace][place];
        const lookAtCurve = this.lookAtCurves[this.currentPlace][place];
        this.isTravelling = true;
        this.savedUIState = null;
        this.uiTitle?.closest(".hud")?.classList.remove("object-hover");
        this.hideUI();
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
            this.updateUI();
            this.showUI();
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

    hideUI() {
        this.uiTitle?.classList.add("hidden");
        this.uiDescriptionLeft?.classList.add("hidden");
        this.uiDescriptionRight?.classList.add("hidden");
        this.uiNavigationMenu?.classList.add("hidden");
    }

    showUI() {
        this.uiTitle?.classList.remove("hidden");
        if (this.uiDescriptionLeft && this.uiDescriptionLeft.innerHTML) {
            this.uiDescriptionLeft?.classList.remove("hidden");
        }
        if (this.uiDescriptionRight && this.uiDescriptionRight.innerHTML) {
            this.uiDescriptionRight?.classList.remove("hidden");
        }
        this.uiNavigationMenu?.classList.remove("hidden");
    }

    showObjectUI(objectKey: string) {
        if (!this.uiTitle || !this.uiDescriptionLeft || !this.uiDescriptionRight || !this.uiNavigationMenu) {
            return;
        }
        const objectTexts = EN_OBJECTS[objectKey];
        if (!objectTexts) return;

        if (!this.savedUIState) {
            const hiddenElements: string[] = [];
            if (this.uiTitle.classList.contains("hidden")) hiddenElements.push("title");
            if (this.uiDescriptionLeft.classList.contains("hidden")) hiddenElements.push("left");
            if (this.uiDescriptionRight.classList.contains("hidden")) hiddenElements.push("right");
            if (this.uiNavigationMenu.classList.contains("hidden")) hiddenElements.push("nav");
            this.savedUIState = {
                title: this.uiTitle.innerHTML,
                left: this.uiDescriptionLeft.innerHTML,
                right: this.uiDescriptionRight.innerHTML,
                nav: this.uiNavigationMenu.innerHTML,
                hiddenElements,
            };
        }

        this.hideUI();
        this.uiTitle.closest(".hud")?.classList.add("object-hover");
        this.uiTitle.innerHTML = objectTexts.title;
        this.uiDescriptionLeft.innerHTML = objectTexts.leftDescription;
        this.uiDescriptionRight.innerHTML = objectTexts.rightDescription;
        this.uiNavigationMenu.innerHTML = "";
        this.showUI();
    }

    hideObjectUI() {
        if (!this.savedUIState || !this.uiTitle || !this.uiDescriptionLeft || !this.uiDescriptionRight || !this.uiNavigationMenu) {
            return;
        }

        const hiddenElements = this.savedUIState.hiddenElements;
        this.savedUIState = null;

        this.uiTitle.closest(".hud")?.classList.remove("object-hover");
        this.hideUI();
        this.updateUI();

        if (!hiddenElements.includes("title")) this.uiTitle.classList.remove("hidden");
        if (!hiddenElements.includes("left") && this.uiDescriptionLeft.innerHTML) this.uiDescriptionLeft.classList.remove("hidden");
        if (!hiddenElements.includes("right") && this.uiDescriptionRight.innerHTML) this.uiDescriptionRight.classList.remove("hidden");
        if (!hiddenElements.includes("nav")) this.uiNavigationMenu.classList.remove("hidden");
    }

    updateUI() {
        if (!this.uiTitle || !this.uiDescriptionLeft || !this.uiDescriptionRight || !this.uiNavigationMenu) {
            return;
        }
        this.uiTitle.innerHTML = en[this.currentPlace].title;
        this.uiDescriptionLeft.innerHTML = en[this.currentPlace].leftDescription;
        this.uiDescriptionRight.innerHTML = en[this.currentPlace].rightDescription;
        this.uiNavigationMenu.innerHTML = "";
        for(const destination of DESTINATIONS[this.currentPlace]) {
            const destinationElement = document.createElement("p");
            destinationElement.innerHTML = destination.name;
            destinationElement.onclick = () => updateLoop.push(this.travelTo(destination.position));
            this.uiNavigationMenu?.appendChild(destinationElement);
        }
    }
}

const travelling = new Travelling(PLACES.ENTRANCE);

export default travelling;
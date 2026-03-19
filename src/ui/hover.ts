import * as THREE from "three";
import camera from "../scene/camera";
import eventBus from "../shared/eventBus";

type HoverWhitelist = Map<THREE.Object3D, string>;
type PlaceWhitelists = Map<number, HoverWhitelist>;

export default function initHover(placeWhitelists: PlaceWhitelists) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let activeWhitelist: HoverWhitelist = new Map();
    let objectList: THREE.Object3D[] = [];
    let currentHoveredKey: string | null = null;
    let isShowingObjectUI = false;
    let isTravelling = false;

    function setPlace(place: number) {
        activeWhitelist = placeWhitelists.get(place) ?? new Map();
        objectList = [...activeWhitelist.keys()];

        if (isShowingObjectUI) {
            isShowingObjectUI = false;
            currentHoveredKey = null;
            eventBus.emit("objectUnhovered", {});
        }
    }

    eventBus.on("travelStart", () => { isTravelling = true; });
    eventBus.on("travelEnd", () => { isTravelling = false; });
    eventBus.on("placeChanged", ({ place }) => { setPlace(place); });

    function findWhitelistedMatch(hitObject: THREE.Object3D): THREE.Object3D | undefined {
        return objectList.find(obj => hitObject === obj || hitObject.parent === obj || obj.getObjectById(hitObject.id));
    }

    window.addEventListener('mousemove', (event) => {
        if (isTravelling || objectList.length === 0) return;
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(objectList, true);

        if (intersects.length > 0) {
            const matched = findWhitelistedMatch(intersects[0].object);
            const objectKey = matched ? activeWhitelist.get(matched) : undefined;

            if (objectKey) {
                if (!isShowingObjectUI || currentHoveredKey !== objectKey) {
                    currentHoveredKey = objectKey;
                    isShowingObjectUI = true;
                    eventBus.emit("objectHovered", { objectKey });
                }
            }
        } else {
            if (currentHoveredKey !== null) {
                currentHoveredKey = null;
                if (isShowingObjectUI) {
                    isShowingObjectUI = false;
                    eventBus.emit("objectUnhovered", {});
                }
            }
        }
    });
}

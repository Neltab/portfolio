import * as THREE from "three";
import camera from "../scene/camera";
import eventBus from "../shared/eventBus";

type HoverWhitelist = Map<THREE.Object3D, string>;

export default function initHover(whitelistedObjects: HoverWhitelist) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const objectList = [...whitelistedObjects.keys()];

    let currentHoveredKey: string | null = null;
    let isShowingObjectUI = false;

    function findWhitelistedMatch(hitObject: THREE.Object3D): THREE.Object3D | undefined {
        return objectList.find(obj => hitObject === obj || hitObject.parent === obj || obj.getObjectById(hitObject.id));
    }

    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(objectList, true);

        if (intersects.length > 0) {
            const matched = findWhitelistedMatch(intersects[0].object);
            const objectKey = matched ? whitelistedObjects.get(matched) : undefined;

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

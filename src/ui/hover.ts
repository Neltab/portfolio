import * as THREE from "three";
import camera from "../scene/camera";
import scene from "../scene/scene";
import eventBus from "../shared/eventBus";

type HoverWhitelist = Map<THREE.Object3D, string>;
type PlaceWhitelists = Map<number, HoverWhitelist>;

function createBoundingBoxMesh(object: THREE.Object3D): THREE.Mesh {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const material = new THREE.MeshBasicMaterial({ visible: false });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(center);
    scene.add(mesh);

    return mesh;
}

export default function initHover(placeWhitelists: PlaceWhitelists) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Pre-compute bounding box meshes for all hoverable objects
    const boxToKey = new Map<THREE.Mesh, string>();
    const placeBoxes = new Map<number, THREE.Mesh[]>();

    for (const [place, whitelist] of placeWhitelists) {
        const boxes: THREE.Mesh[] = [];
        for (const [object, key] of whitelist) {
            const boxMesh = createBoundingBoxMesh(object);
            boxToKey.set(boxMesh, key);
            boxes.push(boxMesh);
        }
        placeBoxes.set(place, boxes);
    }

    let activeBoxes: THREE.Mesh[] = [];
    let currentHoveredKey: string | null = null;
    let isShowingObjectUI = false;
    let isTravelling = false;

    function setPlace(place: number) {
        activeBoxes = placeBoxes.get(place) ?? [];

        if (isShowingObjectUI) {
            isShowingObjectUI = false;
            currentHoveredKey = null;
            eventBus.emit("objectUnhovered", {});
        }
    }

    eventBus.on("travelStart", () => { isTravelling = true; });
    eventBus.on("travelEnd", () => { isTravelling = false; });
    eventBus.on("placeChanged", ({ place }) => { setPlace(place); });

    window.addEventListener('mousemove', (event) => {
        if (isTravelling || activeBoxes.length === 0) return;
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(activeBoxes);

        if (intersects.length > 0) {
            const objectKey = boxToKey.get(intersects[0].object as THREE.Mesh);

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

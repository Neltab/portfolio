import { Timer } from "three/src/core/Timer.js";
import { resizeRendererToDisplaySize } from "./resize";
import renderer from "../scene/renderer";
import camera from "../scene/camera";
import scene from "../scene/scene";
import stats from "../debug/stats";
import UpdateLoop from "./updateLoop";
const timer = new Timer();

export default timer;

export const updateLoop = new UpdateLoop(null);

export const tick = async () => {
    stats.begin();
    const elapsedTime = timer.getElapsed();
    timer.update();

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    updateLoop.update(elapsedTime);

    renderer.render(scene, camera);
    stats.end();
    requestAnimationFrame(tick);
};
import { Timer } from "three/src/core/Timer.js";
import { resizeRendererToDisplaySize } from "./utils/resize";
import renderer from "./renderer";
import camera from "./camera";
import scene from "./scene";
import controls from "./controls";
import stats from "./utils/stats";
import UpdateLoop from "./helpers/updateLoop";

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
    controls.update();
    stats.end();
    requestAnimationFrame(tick);
};
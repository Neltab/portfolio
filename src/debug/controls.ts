import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import camera from "../scene/camera";
import canvas from "../engine/canvas";

const controls = new OrbitControls(camera, canvas);
controls.enabled = false;

export default controls;

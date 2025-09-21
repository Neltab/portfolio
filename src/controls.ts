import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import camera from "./camera";
import canvas from "./canvas";

const controls = new OrbitControls(camera, canvas);

export default controls;

import { loadPointCloud } from "../utils/pointCloud";

const ISS_SCALE = 0.0125;

const iss = await loadPointCloud('/models/ISS.glb', [ISS_SCALE, 2*ISS_SCALE, ISS_SCALE, ISS_SCALE, ISS_SCALE, 2*ISS_SCALE], [4, 6, 4, 4, 4, 4]);
iss.scale.set(ISS_SCALE, ISS_SCALE, ISS_SCALE);

export default iss;
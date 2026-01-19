import { loadPointCloud } from "../utils/pointCloud";

const bench = await loadPointCloud('/static/models/bench2.glb', [0.03, 0.03], [12,4]);
bench.scale.set(0.75, 0.75, 0.75);

export default bench;
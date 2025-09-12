import loadPointCloud from "../utils/loadPointCloud";

const violin = await loadPointCloud('/static/models/violin.glb', [0.01], [4]);
violin.scale.set(0.01, 0.01, 0.01);


export default violin;
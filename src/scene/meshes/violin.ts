import { loadPointCloud } from "./pointCloud";

export default async function loadViolin() {
    const violin = await loadPointCloud('/models/violin.glb', [0.01], [4]);
    violin.scale.set(0.01, 0.01, 0.01);
    return violin;
}

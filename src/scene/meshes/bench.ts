import { loadPointCloud } from "./pointCloud";

export default async function loadBench() {
    const bench = await loadPointCloud('/models/bench.glb', [0.03, 0.03], [12, 4]);
    bench.scale.set(0.75, 0.75, 0.75);
    return bench;
}

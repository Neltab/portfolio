declare module "three/src/core/Timer.js" {
    export class Timer {
        constructor();
        getElapsed(): number;
        getDelta(): number;
        update(): void;
        setTimescale(timescale: number): Timer;
        reset(): Timer;
        dispose(): void;
    }
}

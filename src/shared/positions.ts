import * as THREE from "three";

export const PLACES = {
    ENTRANCE: 0,
    BENCH: 1,
    PATH: 2,
    HOUSE: 3,
    LAKE: {
        ENTRANCE: 100,
        BENCH: 101,
        PATH: 102,
        HOUSE: 103,
    }
}

export const BENCH_POSITION = new THREE.Vector3(0, 0.85, 11);
export const BENCH_ROTATION = new THREE.Euler(0, THREE.MathUtils.degToRad(180), 0, "XYZ");

export const VIOLIN_POSITION = BENCH_POSITION.clone().add(new THREE.Vector3(0.5, -0.005, 0.15));
export const VIOLIN_ROTATION = new THREE.Euler(-2.15, -1.1, -1.95, "XYZ");

export const CAMERA_START_POSITION = new THREE.Vector3(-12.5,1.5,0);
export const CAMERA_START_LOOKAT = new THREE.Vector3(0,1.5,0);
export const CAMERA_BENCH_POSITION = BENCH_POSITION.clone().add(new THREE.Vector3(0, 0.65, -1));



type Positions = {
    [start: number]: {
        [end: number]: THREE.Vector3[]
    }
};

export const TRAVELLING: Positions = {
    [PLACES.ENTRANCE]: {
        [PLACES.BENCH]: [CAMERA_START_POSITION.clone(), new THREE.Vector3(-5, 1.5, 5), CAMERA_BENCH_POSITION.clone()],
        [PLACES.PATH]: [CAMERA_START_POSITION.clone(), new THREE.Vector3(-7, 1.5, -0.6), new THREE.Vector3(-3.85, 1.5, -3.85), new THREE.Vector3(-2, 1.5, -6.5)],
        [PLACES.HOUSE]: [CAMERA_START_POSITION.clone(), new THREE.Vector3(-7.4, 1.5, 0.6), new THREE.Vector3(-1.9, 1.5, 8.15), new THREE.Vector3(6.75, 1.5, -0.5)],
        [PLACES.LAKE.ENTRANCE]: [CAMERA_START_POSITION.clone(), new THREE.Vector3(-3.85, 1.5, -0.5)],
    },
    [PLACES.BENCH]: {
        [PLACES.PATH]: [CAMERA_BENCH_POSITION.clone(), new THREE.Vector3(-7, 1.5, -0.6), new THREE.Vector3(-3.85, 1.5, -3.85), new THREE.Vector3(-2, 1.5, -6.5)],
        [PLACES.LAKE.ENTRANCE]: [CAMERA_BENCH_POSITION.clone(), new THREE.Vector3(-3.85, 1.5, -0.5)],
    },
};

export const CONTROL_POINTS: Positions = {
    [PLACES.ENTRANCE]: {
        [PLACES.BENCH]: [new THREE.Vector3(-5, 1.5, 0), new THREE.Vector3(-7.35, 1.5, 2.15), new THREE.Vector3(0, 1.5, 7.65)],
        [PLACES.PATH]: [CAMERA_START_POSITION.clone(), new THREE.Vector3(-7.75, 1.5, -0), new THREE.Vector3(-5.4, 1.5, -2.3), new THREE.Vector3(-2.3, 1.5, -4.7)],
        [PLACES.HOUSE]: [CAMERA_START_POSITION.clone(), new THREE.Vector3(-9.3, 1.5, -0.3), new THREE.Vector3(-5.8, 1.5, 6.1), new THREE.Vector3(4, 1.5, -0.5)],
        [PLACES.LAKE.ENTRANCE]: [new THREE.Vector3(-6.2, 1.5, 0.85), new THREE.Vector3(-7, 1.5, -2.5)],
    },
    [PLACES.BENCH]: {
        [PLACES.PATH]: [CAMERA_BENCH_POSITION.clone(), new THREE.Vector3(-7, 1.5, -0.6), new THREE.Vector3(-3.85, 1.5, -3.85), new THREE.Vector3(-2, 1.5, -6.5)],
        [PLACES.LAKE.ENTRANCE]: [CAMERA_BENCH_POSITION.clone(), new THREE.Vector3(-3.85, 1.5, -0.5)],
    },
};
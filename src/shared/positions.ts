import * as THREE from "three";

const PLACES = {
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

const BENCH_POSITION = new THREE.Vector3(0, 0.85, 11);
const BENCH_ROTATION = new THREE.Euler(0, THREE.MathUtils.degToRad(180), 0, "XYZ");

const VIOLIN_POSITION = BENCH_POSITION.clone().add(new THREE.Vector3(0.5, -0.005, 0.15));
const VIOLIN_ROTATION = new THREE.Euler(-2.15, -1.1, -1.95, "XYZ");

const CAMERA_START_POSITION = new THREE.Vector3(-12.5,1.5,0);
const CAMERA_START_LOOKAT = new THREE.Vector3(0,1.5,0);
const CAMERA_BENCH_POSITION = BENCH_POSITION.clone().add(new THREE.Vector3(0, 0.65, -1));



type Positions = {
    [start: number]: {
        [end: number]: THREE.Vector3[]
    }
};

const TRAVELING: Positions = {
    [PLACES.ENTRANCE]: {
        [PLACES.BENCH]: [CAMERA_START_POSITION, new THREE.Vector3(-7, 1.5, 0.6), new THREE.Vector3(-5, 1.5, 5), new THREE.Vector3(-3, 1.5, 7), CAMERA_BENCH_POSITION],
        [PLACES.PATH]: [CAMERA_START_POSITION, new THREE.Vector3(-7, 1.5, -0.6), new THREE.Vector3(-5, 1.5, -3), new THREE.Vector3(-3, 1.5, -4.5), new THREE.Vector3(-2, 1.5, -6), new THREE.Vector3(-2, 1.5, -7)],
        [PLACES.LAKE.ENTRANCE]: [new THREE.Vector3(0, 0.85, 11), new THREE.Vector3(0, 0.85, 11)],
    },
};



export { CAMERA_START_POSITION, CAMERA_START_LOOKAT, BENCH_POSITION, BENCH_ROTATION, VIOLIN_POSITION, VIOLIN_ROTATION, TRAVELING, PLACES };
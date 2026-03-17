import * as THREE from "three";

export const PLACES = {
    ENTRANCE: 0,
    BENCH: 1,
    PATH: 2,
    HOUSE: 3,
    LAKE: {
        ENTRANCE: 10,
        BENCH: 11,
        PATH: 12,
        HOUSE: 13,
    }
}

export type Destination = {
    name: string,
    position: number,
}

const BENCH_DESTINATION: Destination = { name: "Bench", position: PLACES.BENCH };
const PATH_DESTINATION: Destination = { name: "Path", position: PLACES.PATH };
const HOUSE_DESTINATION: Destination = { name: "House", position: PLACES.HOUSE };
const LAKE_ENTRANCE_DESTINATION: Destination = { name: "Lake", position: PLACES.LAKE.ENTRANCE };
const LAKE_BENCH_DESTINATION: Destination = { name: "Lake", position: PLACES.LAKE.BENCH };
const LAKE_PATH_DESTINATION: Destination = { name: "Lake", position: PLACES.LAKE.PATH };
const LAKE_HOUSE_DESTINATION: Destination = { name: "Lake", position: PLACES.LAKE.HOUSE };

export type Destinations = {
    [start: number]: Destination[]
}

export const DESTINATIONS: Destinations = {
    [PLACES.ENTRANCE]: [BENCH_DESTINATION, PATH_DESTINATION, HOUSE_DESTINATION, LAKE_ENTRANCE_DESTINATION],
    [PLACES.BENCH]: [PATH_DESTINATION, HOUSE_DESTINATION, LAKE_BENCH_DESTINATION],
    [PLACES.PATH]: [BENCH_DESTINATION, HOUSE_DESTINATION, LAKE_PATH_DESTINATION],
    [PLACES.HOUSE]: [BENCH_DESTINATION, PATH_DESTINATION, LAKE_HOUSE_DESTINATION],
    [PLACES.LAKE.ENTRANCE]: [BENCH_DESTINATION, PATH_DESTINATION, HOUSE_DESTINATION],
    [PLACES.LAKE.BENCH]: [BENCH_DESTINATION, PATH_DESTINATION, HOUSE_DESTINATION],
    [PLACES.LAKE.PATH]: [BENCH_DESTINATION, PATH_DESTINATION, HOUSE_DESTINATION],
    [PLACES.LAKE.HOUSE]: [BENCH_DESTINATION, PATH_DESTINATION, HOUSE_DESTINATION],
};

export const UI_POSITIONS = {
    LEFT: 1,
    RIGHT: 2,
    BOTH: 3,
} as const;

export const BENCH_POSITION = new THREE.Vector3(0, 0.85, 11);
export const BENCH_ROTATION = new THREE.Euler(0, THREE.MathUtils.degToRad(180), 0, "XYZ");

export const VIOLIN_POSITION = BENCH_POSITION.clone().add(new THREE.Vector3(0.5, -0.005, 0.15));
export const VIOLIN_ROTATION = new THREE.Euler(-2.15, -1.1, -1.95, "XYZ");

export const CAMERA_START_POSITION = new THREE.Vector3(-12.5,1.5,0);
export const CAMERA_START_LOOKAT = new THREE.Vector3(0,1.5,0);
export const CAMERA_BENCH_POSITION = BENCH_POSITION.clone().add(new THREE.Vector3(0, 0.65, -1));
export const CAMERA_PATH_POSITION = new THREE.Vector3(-2, 1.5, -6.5);
export const CAMERA_HOUSE_POSITION = new THREE.Vector3(6.75, 1.5, -0.5);
export const CAMERA_LAKE_ENTRANCE_POSITION = new THREE.Vector3(-3.85, 1.5, -0.5);
export const CAMERA_LAKE_BENCH_POSITION = new THREE.Vector3(-0.3, 1.5, 5);
export const CAMERA_LAKE_PATH_POSITION = new THREE.Vector3(-3.45, 1.5, -1.25);
export const CAMERA_LAKE_HOUSE_POSITION = new THREE.Vector3(3.2, 1.5, 2.4);


type Positions = {
    [start: number]: {
        [end: number]: THREE.Vector3[]
    }
};

export const TRAVELLING: Positions = {
    [PLACES.ENTRANCE]: {
        [PLACES.BENCH]: [CAMERA_START_POSITION.clone(), new THREE.Vector3(-5, 1.5, 5), CAMERA_BENCH_POSITION.clone()],
        [PLACES.PATH]: [CAMERA_START_POSITION.clone(), new THREE.Vector3(-7, 1.5, -0.6), new THREE.Vector3(-3.85, 1.5, -3.85), CAMERA_PATH_POSITION.clone()],
        [PLACES.HOUSE]: [CAMERA_START_POSITION.clone(), new THREE.Vector3(-7.4, 1.5, 0.6), new THREE.Vector3(-1.9, 1.5, 8.15), CAMERA_HOUSE_POSITION.clone()],
        [PLACES.LAKE.ENTRANCE]: [CAMERA_START_POSITION.clone(), CAMERA_LAKE_ENTRANCE_POSITION.clone()],
    },
    [PLACES.BENCH]: {
        [PLACES.PATH]: [CAMERA_BENCH_POSITION.clone(), new THREE.Vector3(-6.2, 1.5, 1.35), CAMERA_PATH_POSITION.clone()],
        [PLACES.HOUSE]: [CAMERA_BENCH_POSITION.clone(), new THREE.Vector3(3.6, 1.5, 5), CAMERA_HOUSE_POSITION.clone()],
        [PLACES.LAKE.BENCH]: [CAMERA_BENCH_POSITION.clone(), CAMERA_LAKE_BENCH_POSITION.clone()],
    },
    [PLACES.PATH]: {
        [PLACES.BENCH]: [CAMERA_PATH_POSITION.clone(), new THREE.Vector3(-6.2, 1.5, 1.35), CAMERA_BENCH_POSITION.clone()],
        [PLACES.HOUSE]: [CAMERA_PATH_POSITION.clone(), new THREE.Vector3(1.65, 1.5, -4.9), CAMERA_HOUSE_POSITION.clone()],
        [PLACES.LAKE.PATH]: [CAMERA_PATH_POSITION.clone(), CAMERA_LAKE_PATH_POSITION.clone()],
    },
    [PLACES.HOUSE]: {
        [PLACES.BENCH]: [CAMERA_HOUSE_POSITION.clone(), new THREE.Vector3(4.8, 1.5, 4), CAMERA_BENCH_POSITION.clone()],
        [PLACES.PATH]: [CAMERA_HOUSE_POSITION.clone(), new THREE.Vector3(2.45, 1.5, -3.9), CAMERA_PATH_POSITION.clone()],
        [PLACES.LAKE.HOUSE]: [CAMERA_HOUSE_POSITION.clone(), CAMERA_LAKE_HOUSE_POSITION.clone()],
    },
    [PLACES.LAKE.ENTRANCE]: {
        [PLACES.BENCH]: [CAMERA_LAKE_ENTRANCE_POSITION.clone(), new THREE.Vector3(-5, 1.5, 5.6), CAMERA_BENCH_POSITION.clone()],
        [PLACES.PATH]: [CAMERA_LAKE_ENTRANCE_POSITION.clone(), CAMERA_PATH_POSITION.clone()],
        [PLACES.HOUSE]: [CAMERA_LAKE_ENTRANCE_POSITION.clone(), new THREE.Vector3(0.1, 1.5, -5.4), CAMERA_HOUSE_POSITION.clone()],
    },
    [PLACES.LAKE.BENCH]: {
        [PLACES.BENCH]: [CAMERA_LAKE_BENCH_POSITION.clone(), CAMERA_BENCH_POSITION.clone()],
        [PLACES.PATH]: [CAMERA_LAKE_BENCH_POSITION.clone(), new THREE.Vector3(-5.8, 1.5, -0.3), CAMERA_PATH_POSITION.clone()],
        [PLACES.HOUSE]: [CAMERA_LAKE_BENCH_POSITION.clone(), CAMERA_HOUSE_POSITION.clone()],
    },
    [PLACES.LAKE.PATH]: {
        [PLACES.BENCH]: [CAMERA_LAKE_PATH_POSITION.clone(), new THREE.Vector3(-5.8, 1.5, 3.2), CAMERA_BENCH_POSITION.clone()],
        [PLACES.PATH]: [CAMERA_LAKE_PATH_POSITION.clone(), CAMERA_PATH_POSITION.clone()],
        [PLACES.HOUSE]: [CAMERA_LAKE_PATH_POSITION.clone(), CAMERA_HOUSE_POSITION.clone()],
    },
    [PLACES.LAKE.HOUSE]: {
        [PLACES.BENCH]: [CAMERA_LAKE_HOUSE_POSITION.clone(), CAMERA_BENCH_POSITION.clone()],
        [PLACES.PATH]: [CAMERA_LAKE_HOUSE_POSITION.clone(), CAMERA_PATH_POSITION.clone()],
        [PLACES.HOUSE]: [CAMERA_LAKE_HOUSE_POSITION.clone(), CAMERA_HOUSE_POSITION.clone()],
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
        [PLACES.PATH]: [new THREE.Vector3(0, 1.5, 7.5), new THREE.Vector3(-7, 1.5, 6), new THREE.Vector3(-2, 1.5, -4.15)],
        [PLACES.HOUSE]: [new THREE.Vector3(0, 1.5, 8), new THREE.Vector3(1.25, 1.5, 6), new THREE.Vector3(4.8, 1.5, -0.2)],
        [PLACES.LAKE.BENCH]: [new THREE.Vector3(0, 1.5, 7.4), new THREE.Vector3(0.1, 1.5, 7.4)],
    },
    [PLACES.PATH]: {
        [PLACES.BENCH]: [new THREE.Vector3(-1.9, 1.5, -3.35), new THREE.Vector3(-6.2, 1.5, -4.15), new THREE.Vector3(-1.1, 1.5, 6.35)],
        [PLACES.HOUSE]: [new THREE.Vector3(-1.9, 1.5, -4.9), new THREE.Vector3(-0.3, 1.5, -5.95), new THREE.Vector3(3.2, 1.5, -0.2)],
        [PLACES.LAKE.PATH]: [new THREE.Vector3(-1.1, 1.5, -4.65), new THREE.Vector3(-4.6, 1.5, -3.9)],
    },
    [PLACES.HOUSE]: {
        [PLACES.BENCH]: [new THREE.Vector3(3.6, 1.5, 1.1), new THREE.Vector3(6, 1.5, 2.4), new THREE.Vector3(0.5, 1.5, 6.35)],
        [PLACES.PATH]: [new THREE.Vector3(4, 1.5, -0.5), new THREE.Vector3(4.4, 1.5, -1.25), new THREE.Vector3(-1.1, 1.5, -4.65)],
        [PLACES.LAKE.HOUSE]: [new THREE.Vector3(3.1, 1.5, 0.05), new THREE.Vector3(6.75, 1.5, 1.35)],
    },
    [PLACES.LAKE.ENTRANCE]: {
        [PLACES.BENCH]: [new THREE.Vector3(-7.75, 1.5, -0.3), new THREE.Vector3(-6.2, 1.5, 2.45), new THREE.Vector3(0.1, 1.5, 7.95)],
        [PLACES.PATH]: [new THREE.Vector3(-5, 1.5, -3.35), new THREE.Vector3(-1.5, 1.5, -4.15)],
        [PLACES.HOUSE]: [new THREE.Vector3(-4.65, 1.5, -3.05), new THREE.Vector3(-3.85, 1.5, -5.4), new THREE.Vector3(2.85, 1.5, 0.45)],
    },
    [PLACES.LAKE.BENCH]: {
        [PLACES.BENCH]: [new THREE.Vector3(0.45, 1.5, 6.75), new THREE.Vector3(-0.3, 1.5, 7.95)],
        [PLACES.PATH]: [new THREE.Vector3(-3.85, 1.5, 7.55), new THREE.Vector3(-6.6, 1.5, 4.4), new THREE.Vector3(-1.9, 1.5, -3.45)],
        [PLACES.HOUSE]: [new THREE.Vector3(6.75, 1.5, 7.15), new THREE.Vector3(4.4, 1.5, -0.3)],
    },
    [PLACES.LAKE.PATH]: {
        [PLACES.BENCH]: [new THREE.Vector3(-5.4, 1.5, -2.65), new THREE.Vector3(-7.75, 1.5, -1.5), new THREE.Vector3(0, 1.5, 7.95)],
        [PLACES.PATH]: [new THREE.Vector3(-3.45, 1.5, -4.65), new THREE.Vector3(-2, 1.5, -4.65)],
        [PLACES.HOUSE]: [new THREE.Vector3(1.65, 1.5, -10.15), new THREE.Vector3(2.05, 1.5, 0.1)],
    },
    [PLACES.LAKE.HOUSE]: {
        [PLACES.BENCH]: [new THREE.Vector3(3.6, 1.5, 6.75), new THREE.Vector3(0, 1.5, 5.95)],
        [PLACES.PATH]: [new THREE.Vector3(7.15, 1.5, -3.45), new THREE.Vector3(-0.7, 1.5, -4.25)],
        [PLACES.HOUSE]: [new THREE.Vector3(5.2, 1.5, 1.25), new THREE.Vector3(3.6, 1.5, 0.85)],
    },
};

function clonePositions(positions: Positions): Positions {
    const result: Positions = {};
    for (const start in positions) {
        result[start] = {};
        for (const end in positions[start]) {
            result[start][end] = positions[start][end].map(v => v.clone().add(new THREE.Vector3(0, 0, 0)));
        }
    }
    return result;
}

export const TRAVELLING_LOOKAT: Positions = clonePositions(TRAVELLING);
export const CONTROL_POINTS_LOOKAT: Positions = clonePositions(CONTROL_POINTS);
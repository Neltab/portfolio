import { PLACES } from "../shared/positions";

export const UI_POSITIONS = {
    LEFT: 1,
    RIGHT: 2,
    BOTH: 3,
};

const LAKE_TRANSLATIONS = {
    title: "The Lake",
    description: "",
    position: UI_POSITIONS.BOTH,
};

export const fr = {
    [PLACES.ENTRANCE]: {
        title: "The Entrance",
        description: "",
        position: UI_POSITIONS.RIGHT,
    },
    [PLACES.BENCH]: {
        title: "The Bench",
        description: "",
        position: UI_POSITIONS.LEFT,
    },
    [PLACES.PATH]: {
        title: "The Path",
        description: "",
        position: UI_POSITIONS.BOTH,
    },
    [PLACES.HOUSE]: {
        title: "The House",
        description: "",
        position: UI_POSITIONS.RIGHT,
    },
    [PLACES.LAKE.ENTRANCE]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.BENCH]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.PATH]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.HOUSE]: LAKE_TRANSLATIONS,
};
import { PLACES } from "../shared/positions";

const LAKE_TRANSLATIONS = {
    title: "The Lake",
    leftDescription: "",
    rightDescription: "",
};

export default {
    [PLACES.ENTRANCE]: {
        title: "The Entrance",
        leftDescription: "",
        rightDescription: "",
        
    },
    [PLACES.BENCH]: {
        title: "The Bench",
        leftDescription: "",
        rightDescription: "",
        
    },
    [PLACES.PATH]: {
        title: "The Path",
        leftDescription: "",
        rightDescription: "",
        
    },
    [PLACES.HOUSE]: {
        title: "The House",
        leftDescription: "",
        rightDescription: "",
        
    },
    [PLACES.LAKE.ENTRANCE]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.BENCH]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.PATH]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.HOUSE]: LAKE_TRANSLATIONS,
};
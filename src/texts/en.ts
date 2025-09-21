import { PLACES, UI_POSITIONS} from "../shared/positions";

const LAKE_TRANSLATIONS = {
    title: "The Lake",
    description: "",
    position: UI_POSITIONS.BOTH,
};

export default {
    [PLACES.ENTRANCE]: {
        title: "The Entrance",
        description: `
            <p>Welcome to my humble garden, were you can learn more about a young developper as you wander aroung.</p>
            <p>Have a sit on the bench and discover my hobbies,</p>
            <p>Follow the path across the river and heading to my future,</p>
            <p>Take a tour in the house and through an exposition of my projects,</p>
            <p>Or dive into your reflection in the lake and into my past experiences.</p>
        `,
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
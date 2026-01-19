import { PLACES } from "../shared/positions";

const LAKE_TRANSLATIONS = {
    title: "The Lake",
    leftDescription: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    `,
    rightDescription: ``,
};

export default {
    [PLACES.ENTRANCE]: {
        title: "The Entrance",
        leftDescription: `
            <p>Welcome to my humble garden, were you can learn more about a young developper as you wander aroung.</p>
            <p>Have a sit on the bench and discover my hobbies,</p>
            <p>Follow the path across the river and heading to my future,</p>
            <p>Take a tour in the house and through an exposition of my projects,</p>
            <p>Or dive into your reflection in the lake and into my past experiences.</p>
        `,
        rightDescription: ``,
    },
    [PLACES.BENCH]: {
        title: "The Bench",
        leftDescription: ``,
        rightDescription: `           
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        `,
    },
    [PLACES.PATH]: {
        title: "The Path",
        leftDescription: `
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        `,
        rightDescription: `
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        `,
    },
    [PLACES.HOUSE]: {
        title: "The House",
        leftDescription: `
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        `,
        rightDescription: ``,
    },
    [PLACES.LAKE.ENTRANCE]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.BENCH]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.PATH]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.HOUSE]: LAKE_TRANSLATIONS,
};
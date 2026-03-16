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

export const OBJECTS: { [key: string]: { title: string, leftDescription: string, rightDescription: string } } = {
    violin: {
        title: "The Violin",
        leftDescription: `
            <p>The violin was always a dream instrument for me.</p>
            <p>I played the piano when I was younger, but it lacked the freedom violins would give.</p>
            <p>I finally tried it for the first time in early september of 2025 and kept playing it daily since.</p>
        `,
        rightDescription: ``,
    },
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
        rightDescription: `
            <p>This website is a work in progress, I'm still working on it so expect a few bugs and some missing textures.</p>
        `,
    },
    [PLACES.BENCH]: {
        title: "The Bench",
        leftDescription: ``,
        rightDescription: ``,
    },
    [PLACES.PATH]: {
        title: "The Path",
        leftDescription: `
            <p>Here lies a yet to be explored future.</p>
            <p>The path is misty, filled with uncertainty. Thorny bushes pave some of the way.</p>
            <p>But the journey will morph the thorns into roses and mist into sunshine.</p>
            <p>For your explorer thrives in the unknown.</p>
        `,
        rightDescription: ``,
    },
    [PLACES.HOUSE]: {
        title: "The Museum",
        leftDescription: ``,
        rightDescription: `            
            <p>The museum is still in renovation.</p>
            <p>Past projects can be found in the imaginary place that is <a href="https://github.com/Neltab">GitHub</a>.</p>
        `,
    },
    [PLACES.LAKE.ENTRANCE]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.BENCH]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.PATH]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.HOUSE]: LAKE_TRANSLATIONS,
};
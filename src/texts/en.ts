import { PLACES } from "../shared/positions";

const LAKE_TRANSLATIONS = {
    title: "The Lake",
    leftDescription: `
        <p>Here lies my past experiences.</p>
        <h4>Kiliogene.</h4>
        <p>Salesforce developer, making custom UI components to fill the precise needs of our clients.</p>
        <p>I was tasked with connecting multiple of their systems and external processes to Salesforce through custom APEX code.</p>
        <p>I also provided consulting services to help them improve their workflows and processes, such as introducing a custom CI/CD pipeline or providing gold standard design practices to improve code quality.</p>
    `,
    rightDescription: `
        <h4>Galadrim.</h4>
        <p>I was a full stack web and mobile developer, working directly with the clients to build their websites and applications.</p>
        <p>I would architecture, develop, test and deploy their projects with great care, communicating with them regularly to ensure we were on the right track.</p>
    `,
};

export const OBJECTS: { [key: string]: { title: string, leftDescription: string, rightDescription: string } } = {
    Violin: {
        title: "The Violin",
        leftDescription: ``,
        rightDescription: `            
            <p>The violin was always a dream instrument for me.</p>
            <p>I played the piano when I was younger, but it lacked the freedom violins would give.</p>
            <p>I finally tried it for the first time in early september of 2025 and kept playing it daily since.</p>
        `,
    },
    "Space Station": {
        title: "The Outer Wilds",
        leftDescription: `
            <p>Space is to me the pinnacle of exploration.</p>
            <p>Hostile yet peaceful, empty yet filled with wonders, pristine and untouchable.</p>
            <p>Its mysteries unfold to the unknowing eye on Earth, some lenses away to reveal its true beauty.</p>
            <p>And despite all the desire to explore it, we can only relax in the grass and observe its colorful starry dome</p>
        `,
        rightDescription: ``,
    }
};

export const DESTINATION_NAMES: { [key: string]: string } = {
    bench: "Bench",
    path: "Path",
    museum: "Museum",
    lake: "Lake",
};

export default {
    [PLACES.ENTRANCE]: {
        title: "The Entrance",
        leftDescription: `
            <p>Welcome to my humble garden, were you can learn more about a young developper as you wander aroung.</p>
            <p>Take a tour in the <span class="museum">Museum</span> and through an exposition of my projects,</p>
            <p>Dive into your reflection in the <span class="lake">Lake</span> and into my past experiences.</p>
            <p>Have a sit on the <span class="bench">Bench</span> and discover my hobbies,</p>
            <p>Or follow the <span class="path">Path</span> across the river and heading to my future,</p>   
        `,
        rightDescription: `
            <p>This website is a work in progress, I'm still working on it so expect a few bugs and some missing textures.</p>
            <p>⠀</p>
            <p>Vous pouvez retrouver la version française <a href="/" class="museum">ici</a>.</p>
            <p>⠀</p>
            <p>You can find the source code of this website <a href="https://github.com/Neltab/portfolio" target="_blank" class="museum">here</a>.</p>
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
    [PLACES.MUSEUM]: {
        title: "The Museum",
        leftDescription: ``,
        rightDescription: `            
            <p>The museum is still in renovation.</p>
            <p>Past projects can be found in the <a href="https://archive.aurelienboissiere.fr" target=”_blank” class="museum">Archive</a> or directly on <a href="https://github.com/Neltab" target=”_blank” class="museum">GitHub</a>.</p>
        `,
    },
    [PLACES.LAKE.ENTRANCE]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.BENCH]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.PATH]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.MUSEUM]: LAKE_TRANSLATIONS,
};
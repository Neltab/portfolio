import { PLACES } from "../shared/positions";

const LAKE_TRANSLATIONS = {
    title: "Le Lac",
    leftDescription: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    `,
    rightDescription: ``,
};

export const OBJECTS: { [key: string]: { title: string, leftDescription: string, rightDescription: string } } = {
    violin: {
        title: "Le Violon",
        leftDescription: `
            <p>Le violon a toujours été un instrument de rêve pour moi.</p>
            <p>Je jouais du piano quand j'étais plus jeune, mais il manquait la liberté que le violon pouvait offrir.</p>
            <p>J'ai finalement essayé pour la première fois début septembre 2025 et j'en joue quotidiennement depuis.</p>
        `,
        rightDescription: ``,
    },
};

export default {
    [PLACES.ENTRANCE]: {
        title: "L'Entrée",
        leftDescription: `
            <p>Bienvenue dans mon humble jardin, où vous pouvez en apprendre davantage sur un jeune développeur en vous promenant.</p>
            <p>Asseyez-vous sur le banc et découvrez mes loisirs,</p>
            <p>Suivez le chemin à travers la rivière en direction de mon avenir,</p>
            <p>Faites un tour dans la maison et à travers une exposition de mes projets,</p>
            <p>Ou plongez dans votre reflet dans le lac et dans mes expériences passées.</p>
        `,
        rightDescription: `
            <p>Ce site est en cours de développement, j'y travaille encore donc attendez-vous à quelques bugs et textures manquantes.</p>
        `,
    },
    [PLACES.BENCH]: {
        title: "Le Banc",
        leftDescription: ``,
        rightDescription: ``,
    },
    [PLACES.PATH]: {
        title: "Le Chemin",
        leftDescription: `
            <p>Ici repose un avenir encore à explorer.</p>
            <p>Le chemin est brumeux, empli d'incertitude. Des buissons épineux bordent une partie du trajet.</p>
            <p>Mais le voyage transformera les épines en roses et la brume en soleil.</p>
            <p>Car votre explorateur s'épanouit dans l'inconnu.</p>
        `,
        rightDescription: ``,
    },
    [PLACES.HOUSE]: {
        title: "Le Musée",
        leftDescription: ``,
        rightDescription: `
            <p>Le musée est encore en rénovation.</p>
            <p>Les projets passés se trouvent dans le lieu imaginaire qu'est <a href="https://github.com/Neltab">GitHub</a>.</p>
        `,
    },
    [PLACES.LAKE.ENTRANCE]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.BENCH]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.PATH]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.HOUSE]: LAKE_TRANSLATIONS,
};

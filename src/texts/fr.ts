import { PLACES } from "../shared/positions";

const LAKE_TRANSLATIONS = {
    title: "Le Lac",
    leftDescription: `
        <p>Ici reposent mes expériences passées.</p>
        <h4>Kiliogene.</h4>
        <p>Développeur Salesforce, j'ai créé des composants Web sur mesure pour répondre aux besoins précis de nos clients.</p>
        <p>J'avais pour mission de connecter plusieurs de leurs systèmes et processus externes à Salesforce via du code APEX personnalisé.</p>
        <p>Je fournissais également des services de conseil pour les aider à améliorer leurs workflows et processus, comme l'introduction d'une pipeline CI/CD ou la mise en place de bonnes pratiques de conception pour améliorer la qualité du code.</p>
    `,
    rightDescription: `
        <h4>Galadrim.</h4>
        <p>J'étais développeur full stack web et mobile, travaillant directement avec les clients pour construire leurs sites web et applications.</p>
        <p>J'architecturais, développais, testais et déployais leurs projets avec grand soin, communiquant régulièrement avec eux pour m'assurer que nous étions sur la bonne route.</p>
    `,
};

export const OBJECTS: { [key: string]: { title: string, leftDescription: string, rightDescription: string } } = {
    violin: {
        title: "Le Violon",
        leftDescription: ``,
        rightDescription: `
            <p>Le violon a toujours été un instrument de rêve pour moi.</p>
            <p>Je jouais du piano quand j'étais plus jeune, mais il manquait une certaine liberté que le violon pouvait combler.</p>
            <p>J'ai finalement essayé pour la première fois début septembre 2025 et j'en joue quotidiennement depuis.</p>
        `,
    },
    iss: {
        title: "Les Contrées Sauvages",
        leftDescription: `
            <p>L'espace est pour moi le sommet de l'exploration.</p>
            <p>Hostile et pourtant paisible, vide et pourtant empli de merveilles, vierge et intouchable.</p>
            <p>Ses mystères se dévoilent à l'œil ignorant sur Terre, à quelques lentilles de révéler sa vraie beauté.</p>
            <p>Et malgré tout le désir de l'explorer, on ne peut que s'allonger dans l'herbe et observer son dôme étoilé et coloré.</p>
        `,
        rightDescription: ``,
    }
};

export const DESTINATION_NAMES: { [key: string]: string } = {
    bench: "Banc",
    path: "Chemin",
    house: "Maison",
    lake: "Lac",
};

export default {
    [PLACES.ENTRANCE]: {
        title: "L'Entrée",
        leftDescription: `
            <p>Bienvenue dans mon humble jardin, où vous pouvez en apprendre davantage sur un jeune développeur au détour d'une promenade.</p>
            <p>Faites un tour dans à <span class="house">la Maison</span> et à travers une exposition de mes projets,</p>
            <p>Plongez dans votre reflet au <span class="lake">Lac</span> et dans mes expériences passées.</p>
            <p>Asseyez-vous sur <span class="bench">le Banc</span> et découvrez mes loisirs,</p>
            <p>Ou suivez <span class="path">le Chemin</span> à travers la rivière en direction de mon avenir.</p>
        `,
        rightDescription: `
            <p>Ce site est en cours de développement, je travaille activement dessus, vous pouvez vous attendre à quelques bugs et textures manquantes.</p>
            <p>⠀</p>
            <p>You can find the english version <a href="/en" class="house">here</a>.</p>
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
            <p>Le chemin est brumeux, empli d'incertitude. Des buissons épineux pavent une partie du trajet.</p>
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
            <p>Les projets passés se trouvent aux <a href="https://archive.aurelienboissiere.fr" target="_blank" class="house">Archives</a> ou directement sur <a href="https://github.com/Neltab" target="_blank" class="house">GitHub</a>.</p>
        `,
    },
    [PLACES.LAKE.ENTRANCE]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.BENCH]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.PATH]: LAKE_TRANSLATIONS,
    [PLACES.LAKE.HOUSE]: LAKE_TRANSLATIONS,
};

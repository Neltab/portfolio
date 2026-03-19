// src/ui/hud.ts
import eventBus from "../shared/eventBus";
import travelling from "../navigation/travelling";
import { DESTINATIONS } from "../navigation/positions";
import { updateLoop } from "../engine/timer";
import en, { OBJECTS as EN_OBJECTS, DESTINATION_NAMES as EN_NAMES } from "../content/en";
import fr, { OBJECTS as FR_OBJECTS, DESTINATION_NAMES as FR_NAMES } from "../content/fr";

const SPAN_CLASSES = ["bench", "path", "museum", "lake"];

const isEnglish = window.location.pathname.startsWith("/en");
const texts = isEnglish ? en : fr;
const objects = isEnglish ? EN_OBJECTS : FR_OBJECTS;
const destinationNames = isEnglish ? EN_NAMES : FR_NAMES;

class Hud {
    uiTitle: HTMLElement | null;
    uiDescriptionLeft: HTMLElement | null;
    uiDescriptionRight: HTMLElement | null;
    uiNavigationMenu: HTMLElement | null;
    savedUIState: { title: string; left: string; right: string; nav: string; hiddenElements: string[] } | null = null;

    constructor() {
        this.uiTitle = document.getElementById("title");
        this.uiDescriptionLeft = document.getElementById("description-left");
        this.uiDescriptionRight = document.getElementById("description-right");
        this.uiNavigationMenu = document.getElementById("navigation-menu");

        eventBus.on("travelStart", () => {
            this.savedUIState = null;
            this.uiTitle?.closest(".hud")?.classList.remove("object-hover");
            this.hideUI();
        });

        eventBus.on("placeChanged", ({ place }) => {
            this.updateUI(place);
            this.showUI();
        });

        eventBus.on("objectHovered", ({ objectKey }) => {
            this.showObjectUI(objectKey);
        });

        eventBus.on("objectUnhovered", () => {
            this.hideObjectUI();
        });

        // Initial render
        this.updateUI(travelling.currentPlace);
        this.showUI();
    }

    hideUI() {
        this.uiTitle?.classList.add("hidden");
        this.uiDescriptionLeft?.classList.add("hidden");
        this.uiDescriptionRight?.classList.add("hidden");
        this.uiNavigationMenu?.classList.add("hidden");
    }

    showUI() {
        this.uiTitle?.classList.remove("hidden");
        if (this.uiDescriptionLeft && this.uiDescriptionLeft.innerHTML) {
            this.uiDescriptionLeft?.classList.remove("hidden");
        }
        if (this.uiDescriptionRight && this.uiDescriptionRight.innerHTML) {
            this.uiDescriptionRight?.classList.remove("hidden");
        }
        this.uiNavigationMenu?.classList.remove("hidden");
    }

    showObjectUI(objectKey: string) {
        if (!this.uiTitle || !this.uiDescriptionLeft || !this.uiDescriptionRight || !this.uiNavigationMenu) {
            return;
        }
        const objectTexts = objects[objectKey];
        if (!objectTexts) return;

        if (!this.savedUIState) {
            const hiddenElements: string[] = [];
            if (this.uiTitle.classList.contains("hidden")) hiddenElements.push("title");
            if (this.uiDescriptionLeft.classList.contains("hidden")) hiddenElements.push("left");
            if (this.uiDescriptionRight.classList.contains("hidden")) hiddenElements.push("right");
            if (this.uiNavigationMenu.classList.contains("hidden")) hiddenElements.push("nav");
            this.savedUIState = {
                title: this.uiTitle.innerHTML,
                left: this.uiDescriptionLeft.innerHTML,
                right: this.uiDescriptionRight.innerHTML,
                nav: this.uiNavigationMenu.innerHTML,
                hiddenElements,
            };
        }

        this.hideUI();
        this.uiTitle.closest(".hud")?.classList.add("object-hover");
        this.uiTitle.innerHTML = objectTexts.title;
        this.uiDescriptionLeft.innerHTML = objectTexts.leftDescription;
        this.uiDescriptionRight.innerHTML = objectTexts.rightDescription;
        this.uiNavigationMenu.innerHTML = "";
        this.showUI();
    }

    hideObjectUI() {
        if (!this.savedUIState || !this.uiTitle || !this.uiDescriptionLeft || !this.uiDescriptionRight || !this.uiNavigationMenu) {
            return;
        }

        const hiddenElements = this.savedUIState.hiddenElements;
        this.savedUIState = null;

        this.uiTitle.closest(".hud")?.classList.remove("object-hover");
        this.hideUI();
        this.updateUI(travelling.currentPlace);

        if (!hiddenElements.includes("title")) this.uiTitle.classList.remove("hidden");
        if (!hiddenElements.includes("left") && this.uiDescriptionLeft.innerHTML) this.uiDescriptionLeft.classList.remove("hidden");
        if (!hiddenElements.includes("right") && this.uiDescriptionRight.innerHTML) this.uiDescriptionRight.classList.remove("hidden");
        if (!hiddenElements.includes("nav")) this.uiNavigationMenu.classList.remove("hidden");
    }

    bindSpanClickHandlers(currentPlace: number) {
        const containers = [this.uiDescriptionLeft, this.uiDescriptionRight];
        for (const container of containers) {
            if (!container) continue;
            for (const className of SPAN_CLASSES) {
                const spans = container.querySelectorAll(`span.${className}`);
                const destination = DESTINATIONS[currentPlace].find(d => d.icon === className);
                if (!destination) continue;
                spans.forEach(span => {
                    (span as HTMLElement).style.cursor = "pointer";
                    (span as HTMLElement).onclick = () => updateLoop.push(travelling.travelTo(destination.position));
                });
            }
        }
    }

    updateUI(currentPlace: number) {
        if (!this.uiTitle || !this.uiDescriptionLeft || !this.uiDescriptionRight || !this.uiNavigationMenu) {
            return;
        }
        this.uiTitle.innerHTML = texts[currentPlace].title;
        this.uiDescriptionLeft.innerHTML = texts[currentPlace].leftDescription;
        this.uiDescriptionRight.innerHTML = texts[currentPlace].rightDescription;
        this.bindSpanClickHandlers(currentPlace);
        this.uiNavigationMenu.innerHTML = "";
        for (const destination of DESTINATIONS[currentPlace]) {
            const destinationContainer = document.createElement("div");
            destinationContainer.classList.add("destination");
            const destinationIcon = document.createElement("div");
            destinationIcon.classList.add("icon");
            destinationIcon.style.maskImage = `url(/icons/${destination.icon}.png)`;
            destinationIcon.style.webkitMaskImage = `url(/icons/${destination.icon}.png)`;
            destinationIcon.style.backgroundColor = destination.color;
            destinationContainer.appendChild(destinationIcon);
            const destinationText = document.createElement("p");
            destinationText.classList.add(destination.name.toLowerCase());
            destinationText.innerHTML = destinationNames[destination.icon] || destination.name;
            destinationContainer.appendChild(destinationText);
            destinationContainer.onclick = () => updateLoop.push(travelling.travelTo(destination.position));
            this.uiNavigationMenu?.appendChild(destinationContainer);
        }
    }
}

export default function initHud() {
    return new Hud();
}

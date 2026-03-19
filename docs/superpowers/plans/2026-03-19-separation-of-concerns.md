# Separation of Concerns Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the portfolio codebase to separate navigation logic, DOM manipulation, and content into distinct layers connected by a typed event bus.

**Architecture:** Files are reorganized from a flat/technical layout into responsibility-based folders (scene/, navigation/, ui/, content/, engine/, debug/, shared/). The `Travelling` class is split: pure navigation logic stays in `navigation/travelling.ts`, all DOM manipulation moves to `ui/hud.ts`, and raycasting moves to `ui/hover.ts`. Communication between layers uses a lightweight typed event bus.

**Tech Stack:** TypeScript, Three.js, Vite

**Verification:** After each task, run `npx tsc --noEmit` to check for type errors, then `npx vite build` at the end to verify the build.

---

### Task 1: Create the Event Bus

**Files:**
- Create: `src/shared/eventBus.ts`

- [ ] **Step 1: Create the typed event emitter**

```ts
// src/shared/eventBus.ts

type EventMap = {
  travelStart: { from: number; to: number };
  travelEnd: { place: number };
  placeChanged: { place: number };
  objectHovered: { objectKey: string };
  objectUnhovered: {};
};

type EventCallback<T> = (data: T) => void;

class EventEmitter<T extends Record<string, unknown>> {
  private listeners: { [K in keyof T]?: EventCallback<T[K]>[] } = {};

  on<K extends keyof T>(event: K, callback: EventCallback<T[K]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  off<K extends keyof T>(event: K, callback: EventCallback<T[K]>) {
    const cbs = this.listeners[event];
    if (!cbs) return;
    this.listeners[event] = cbs.filter(cb => cb !== callback) as typeof cbs;
  }

  emit<K extends keyof T>(event: K, data: T[K]) {
    const cbs = this.listeners[event];
    if (!cbs) return;
    for (const cb of cbs) {
      cb(data);
    }
  }
}

const eventBus = new EventEmitter<EventMap>();
export default eventBus;
export type { EventMap };
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/shared/eventBus.ts
git commit -m "feat: add typed event bus for cross-layer communication"
```

---

### Task 2: Move files to new folder structure (no logic changes)

Pure file moves — update only import paths, no logic changes. This is the largest task but the simplest conceptually.

**Files moved:**
- `src/scene.ts` → `src/scene/scene.ts`
- `src/camera.ts` → `src/scene/camera.ts`
- `src/renderer.ts` → `src/scene/renderer.ts`
- `src/lights.ts` → `src/scene/lights.ts`
- `src/meshes/*` → `src/scene/meshes/*`
- `src/utils/pointCloud.ts` → `src/scene/meshes/pointCloud.ts`
- `src/shared/bezierCurve.ts` → `src/navigation/bezierCurve.ts`
- `src/shared/positions.ts` → `src/navigation/positions.ts`
- `src/shared/travelling.ts` → `src/navigation/travelling.ts`
- `src/texts/en.ts` → `src/content/en.ts`
- `src/texts/fr.ts` → `src/content/fr.ts`
- `src/timer.ts` → `src/engine/timer.ts`
- `src/helpers/updateLoop.ts` → `src/engine/updateLoop.ts`
- `src/canvas.ts` → `src/engine/canvas.ts`
- `src/utils/resize.ts` → `src/engine/resize.ts`
- `src/utils/fullscreen.ts` → `src/engine/fullscreen.ts`
- `src/utils/stats.ts` → `src/debug/stats.ts`
- `src/controls.ts` → `src/debug/controls.ts`
- `src/lilgui.ts` → `src/debug/lilgui.ts`
- `src/helpers/axesHelper.ts` → `src/debug/axesHelper.ts`
- `src/helpers/shadowCameraHelpers.ts` → `src/debug/shadowCameraHelpers.ts`
- `src/helpers/lightHelpers.ts` → `src/debug/lightHelpers.ts`
- `src/debug/curveDebug.ts` stays (already in debug/)
- `src/loadingManager.ts` → `src/engine/loadingManager.ts`
- `src/shared/shaders.ts` stays

**Files updated (imports only):**
- `src/main.ts` — all import paths
- `src/navigation/travelling.ts` — import paths for positions, timer, camera, bezierCurve, texts
- `src/scene/meshes/garden.ts` — import paths for pointCloud, timer
- `src/scene/meshes/lake.ts` — import paths for pointCloud, timer
- `src/scene/meshes/bench.ts` — import path for pointCloud
- `src/scene/meshes/violin.ts` — import path for pointCloud
- `src/scene/meshes/iss.ts` — import path for pointCloud
- `src/scene/renderer.ts` — import path for canvas
- `src/scene/camera.ts` — import path for positions
- `src/engine/timer.ts` — import paths for resize, renderer, camera, scene, stats, updateLoop
- `src/debug/curveDebug.ts` — import paths for scene, travelling, positions, lilgui, axesHelper, controls
- `src/debug/shadowCameraHelpers.ts` — import path for lights
- `src/debug/lightHelpers.ts` — import path for lights
- `src/debug/controls.ts` — import paths for camera, canvas

- [ ] **Step 1: Create new directories**

```bash
mkdir -p src/scene/meshes src/navigation src/ui src/content src/engine
```

Note: `src/debug/` and `src/shared/` already exist.

- [ ] **Step 2: Move scene files**

```bash
mv src/scene.ts src/scene/scene.ts
mv src/camera.ts src/scene/camera.ts
mv src/renderer.ts src/scene/renderer.ts
mv src/lights.ts src/scene/lights.ts
mv src/meshes/* src/scene/meshes/
mv src/utils/pointCloud.ts src/scene/meshes/pointCloud.ts
```

- [ ] **Step 3: Move navigation files**

```bash
mv src/shared/bezierCurve.ts src/navigation/bezierCurve.ts
mv src/shared/positions.ts src/navigation/positions.ts
mv src/shared/travelling.ts src/navigation/travelling.ts
```

- [ ] **Step 4: Move content files**

```bash
mv src/texts/en.ts src/content/en.ts
mv src/texts/fr.ts src/content/fr.ts
```

- [ ] **Step 5: Move engine files**

```bash
mv src/timer.ts src/engine/timer.ts
mv src/helpers/updateLoop.ts src/engine/updateLoop.ts
mv src/canvas.ts src/engine/canvas.ts
mv src/utils/resize.ts src/engine/resize.ts
mv src/utils/fullscreen.ts src/engine/fullscreen.ts
mv src/loadingManager.ts src/engine/loadingManager.ts
```

- [ ] **Step 6: Move debug files**

```bash
mv src/utils/stats.ts src/debug/stats.ts
mv src/controls.ts src/debug/controls.ts
mv src/lilgui.ts src/debug/lilgui.ts
mv src/helpers/axesHelper.ts src/debug/axesHelper.ts
mv src/helpers/shadowCameraHelpers.ts src/debug/shadowCameraHelpers.ts
mv src/helpers/lightHelpers.ts src/debug/lightHelpers.ts
```

- [ ] **Step 7: Clean up empty directories**

```bash
rmdir src/meshes src/texts src/utils src/helpers
```

- [ ] **Step 8: Update ALL import paths across every file**

Update every file that imports from moved modules. Here's the complete list of changes needed:

**`src/main.ts`:**
- `"./scene"` → `"./scene/scene"`
- `"./camera"` → `"./scene/camera"`
- `"./meshes/garden"` → `"./scene/meshes/garden"`
- `"./meshes/violin"` → `"./scene/meshes/violin"`
- `"./meshes/bench"` → `"./scene/meshes/bench"`
- `"./meshes/lake"` → `"./scene/meshes/lake"`
- `"./meshes/iss"` → `"./scene/meshes/iss"`
- `"./lights"` → `"./scene/lights"`
- `"./timer"` → `"./engine/timer"`
- `"./shared/positions"` → `"./navigation/positions"`
- `"./shared/travelling"` → `"./navigation/travelling"`
- `"./debug/curveDebug"` stays as-is

**`src/navigation/travelling.ts`:**
- `"../shared/positions"` → `"./positions"`  (two import lines)
- `"../timer"` → `"../engine/timer"`
- `"../camera"` → `"../scene/camera"`
- `"../helpers/updateLoop"` → `"../engine/updateLoop"`
- `"./bezierCurve"` stays (already relative within navigation/)
- `"../texts/en"` → `"../content/en"`
- `"../texts/fr"` → `"../content/fr"`

**`src/scene/camera.ts`:**
- `"./shared/positions"` → `"../navigation/positions"`

**`src/scene/renderer.ts`:**
- `"./canvas"` → `"../engine/canvas"`

**`src/scene/meshes/garden.ts`:**
- `"../utils/pointCloud"` → `"./pointCloud"`
- `"../timer"` → `"../../engine/timer"`

**`src/scene/meshes/lake.ts`:**
- `"../utils/pointCloud"` → `"./pointCloud"`
- `"../timer"` → `"../../engine/timer"`

**`src/scene/meshes/bench.ts`:**
- `"../utils/pointCloud"` → `"./pointCloud"`

**`src/scene/meshes/violin.ts`:**
- `"../utils/pointCloud"` → `"./pointCloud"`

**`src/scene/meshes/iss.ts`:**
- `"../utils/pointCloud"` → `"./pointCloud"`

**`src/scene/meshes/pointCloud.ts`:**
- `"../shared/shaders"` → `"../../shared/shaders"`

**`src/engine/timer.ts`:**
- `"./utils/resize"` → `"./resize"`
- `"./renderer"` → `"../scene/renderer"`
- `"./camera"` → `"../scene/camera"`
- `"./scene"` → `"../scene/scene"`
- `"./utils/stats"` → `"../debug/stats"`
- `"./helpers/updateLoop"` → `"./updateLoop"`

**`src/debug/curveDebug.ts`:**
- `"../scene"` → `"../scene/scene"`
- `"../shared/travelling"` → `"../navigation/travelling"`
- `"../shared/positions"` → `"../navigation/positions"`
- `"../lilgui"` → `"./lilgui"`
- `"../helpers/axesHelper"` → `"./axesHelper"`
- `"../controls"` → `"./controls"`

**`src/debug/controls.ts`:**
- `"./camera"` → `"../scene/camera"`
- `"./canvas"` → `"../engine/canvas"`

**`src/debug/shadowCameraHelpers.ts`:**
- `"../lights"` → `"../scene/lights"`

**`src/debug/lightHelpers.ts`:**
- `"../lights"` → `"../scene/lights"`

- [ ] **Step 9: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "refactor: reorganize files into responsibility-based folders"
```

---

### Task 3: Extract UI HUD from Travelling

Split `navigation/travelling.ts` — move all DOM manipulation into `ui/hud.ts`. The travelling class emits events, hud subscribes.

**Files:**
- Create: `src/ui/hud.ts`
- Modify: `src/navigation/travelling.ts`

- [ ] **Step 1: Create `src/ui/hud.ts`**

Extract all DOM logic from `Travelling` into a standalone module:

```ts
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
```

- [ ] **Step 2: Strip DOM logic from `src/navigation/travelling.ts`**

Rewrite to contain only navigation logic + event emission:

```ts
// src/navigation/travelling.ts
import { PLACES, TRAVELLING, CONTROL_POINTS, TRAVELLING_LOOKAT, CONTROL_POINTS_LOOKAT } from "./positions";
import * as THREE from "three";
import timer, { updateLoop } from "../engine/timer";
import camera from "../scene/camera";
import { CurrentUpdate } from "../engine/updateLoop";
import BezierCurve from "./bezierCurve";
import eventBus from "../shared/eventBus";

type Curves = {
    [start: number]: {
        [end: number]: BezierCurve
    }
};

class Travelling {
    currentPlace: number;
    curves: Curves;
    lookAtCurves: Curves;
    isTravelling: boolean;

    constructor(currentPlace: number) {
        this.currentPlace = currentPlace;
        this.curves = this.convertToTravelingCurves(TRAVELLING, CONTROL_POINTS);
        this.lookAtCurves = this.convertToTravelingCurves(TRAVELLING_LOOKAT, CONTROL_POINTS_LOOKAT);
        this.isTravelling = false;
    }

    travelTo(place: number) {
        if (!this.isTravelling && (!this.curves[this.currentPlace] || !this.curves[this.currentPlace][place])) return () => {};
        const baseDuration = 5;
        const referenceLength = 11;

        const curve = this.curves[this.currentPlace][place];
        const lookAtCurve = this.lookAtCurves[this.currentPlace][place];
        this.isTravelling = true;
        eventBus.emit("travelStart", { from: this.currentPlace, to: place });
        const duration = baseDuration * Math.sqrt(curve.length / referenceLength);
        const travelFunction = this.travelAlongCurve(curve, lookAtCurve, timer.getElapsed(), duration);
        this.currentPlace = place;
        return travelFunction;
    }

    travelAlongCurve = (curve: BezierCurve, lookAtCurve: BezierCurve, startTime: number, duration: number) => (elapsedTime: number, update: CurrentUpdate) => {
        const time = elapsedTime - startTime;
        if (time > duration) {
            this.isTravelling = false;
            const finalPos = curve.getPointAt(1);
            const finalLook = lookAtCurve.getPointAt(0.99);
            camera.position.set(finalPos.x, finalPos.y, finalPos.z);
            camera.lookAt(finalLook);
            eventBus.emit("travelEnd", { place: this.currentPlace });
            eventBus.emit("placeChanged", { place: this.currentPlace });
            update.remove();
            return;
        }
        const t1 = Math.min(time / duration, 1);
        const t2 = Math.min(t1 + 0.01, 1);
        const pos = curve.getPointAt(t1);
        const look = lookAtCurve.getPointAt(t2);
        camera.position.set(pos.x, pos.y, pos.z);
        camera.lookAt(look);
    }

    convertToTravelingCurves = (positions: typeof TRAVELLING, controlPoints: typeof CONTROL_POINTS) => {
        const curves = {} as Curves;
        for (const start in positions) {
            curves[start] = {};
            for (const end in positions[start]) {
                curves[start][end] = new BezierCurve(positions[start][end], controlPoints[start][end]);
            }
        }
        return curves;
    }

    getCurves() {
        const group = new THREE.Group();
        for (const start in this.curves) {
            for (const end in this.curves[start]) {
                const curve = this.curves[start][end];
                group.add(curve.curve);
            }
        }
        return group;
    }
}

const travelling = new Travelling(PLACES.ENTRANCE);

export default travelling;
```

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/ui/hud.ts src/navigation/travelling.ts
git commit -m "refactor: extract DOM manipulation from Travelling into Hud"
```

---

### Task 4: Extract Hover/Raycasting from main.ts

Move raycasting logic out of `main.ts` into `ui/hover.ts`, emitting events instead of manipulating the DOM.

**Files:**
- Create: `src/ui/hover.ts`
- Modify: `src/main.ts`

- [ ] **Step 1: Create `src/ui/hover.ts`**

```ts
// src/ui/hover.ts
import * as THREE from "three";
import camera from "../scene/camera";
import eventBus from "../shared/eventBus";

type HoverWhitelist = Map<THREE.Object3D, string>;

export default function initHover(whitelistedObjects: HoverWhitelist) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const objectList = [...whitelistedObjects.keys()];

    let currentHoveredKey: string | null = null;

    function findWhitelistedMatch(hitObject: THREE.Object3D): THREE.Object3D | undefined {
        return objectList.find(obj => hitObject === obj || hitObject.parent === obj || obj.getObjectById(hitObject.id));
    }

    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(objectList, true);

        if (intersects.length > 0) {
            const matched = findWhitelistedMatch(intersects[0].object);
            const objectKey = matched ? whitelistedObjects.get(matched) : undefined;

            if (objectKey && objectKey !== currentHoveredKey) {
                currentHoveredKey = objectKey;
                eventBus.emit("objectHovered", { objectKey });
            }
        } else {
            if (currentHoveredKey !== null) {
                currentHoveredKey = null;
                eventBus.emit("objectUnhovered", {});
            }
        }
    });
}
```

- [ ] **Step 2: Rewrite `src/main.ts` as thin wiring**

```ts
// src/main.ts
import scene from "./scene/scene";
import camera from "./scene/camera";
import * as THREE from "three";
import garden from "./scene/meshes/garden";
import violin from "./scene/meshes/violin";
import bench from "./scene/meshes/bench";
import lake from "./scene/meshes/lake";
import iss from "./scene/meshes/iss";
import { ambientLight, hemisphereLight } from "./scene/lights";
import timer, { tick } from "./engine/timer";
import { BENCH_POSITION, BENCH_ROTATION, VIOLIN_POSITION, VIOLIN_ROTATION, ISS_POSITION, ISS_ROTATION } from "./navigation/positions";
import { debugCurves } from "./debug/curveDebug";
import initHover from "./ui/hover";
import initHud from "./ui/hud";

async function main() {
    // Meshes
    scene.add(garden);

    iss.position.set(ISS_POSITION.x, ISS_POSITION.y, ISS_POSITION.z);
    iss.rotation.set(ISS_ROTATION.x, ISS_ROTATION.y, ISS_ROTATION.z, ISS_ROTATION.order);
    scene.add(iss);

    violin.position.set(VIOLIN_POSITION.x, VIOLIN_POSITION.y, VIOLIN_POSITION.z);
    violin.rotation.set(VIOLIN_ROTATION.x, VIOLIN_ROTATION.y, VIOLIN_ROTATION.z, VIOLIN_ROTATION.order);
    scene.add(violin);

    bench.position.set(BENCH_POSITION.x, BENCH_POSITION.y, BENCH_POSITION.z);
    bench.rotation.set(BENCH_ROTATION.x, BENCH_ROTATION.y, BENCH_ROTATION.z, BENCH_ROTATION.order);
    scene.add(bench);

    scene.add(lake);

    // Lights
    scene.add(ambientLight);
    scene.add(hemisphereLight);

    if (import.meta.env.DEV) {
        debugCurves();
    }

    tick();
    garden.material.uniforms.loadedTime.value = timer.getElapsed();

    // UI
    const hoverWhitelist = new Map<THREE.Object3D, string>([
        [violin, "Violin"],
        [iss, "Space Station"],
    ]);

    initHover(hoverWhitelist);
    initHud();
}

main();
```

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/ui/hover.ts src/main.ts
git commit -m "refactor: extract raycasting into hover module, simplify main.ts"
```

---

### Task 5: Final verification

- [ ] **Step 1: Full type check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 2: Build**

Run: `npx vite build`
Expected: Build succeeds

- [ ] **Step 3: Manual smoke test**

Run: `npx vite dev`
Verify:
- Garden renders with point cloud particles
- Navigation buttons appear and work (click to travel between places)
- Hover over violin/ISS shows object description
- Moving mouse away restores previous UI state
- Text content is correct (FR by default, EN on /en)

- [ ] **Step 4: Commit any fixes if needed**

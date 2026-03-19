# Separation of Concerns Restructuring

## Goal

Restructure the portfolio codebase to separate concerns. The current code tangles navigation logic, DOM manipulation, and content management — particularly in `travelling.ts` (which does all three) and `main.ts` (which mixes scene setup with raycasting/hover interaction).

## Folder Structure

```
src/
  scene/              # 3D world setup — Three.js objects only
    scene.ts
    camera.ts
    renderer.ts
    lights.ts
    meshes/
      garden.ts
      bench.ts
      violin.ts
      lake.ts
      iss.ts
      pointCloud.ts   # moved from utils/
  navigation/         # travelling between places — no DOM
    travelling.ts
    bezierCurve.ts
    positions.ts      # places, camera positions, curve data
  ui/                 # all DOM manipulation
    hud.ts            # title, descriptions, nav menu updates
    hover.ts          # raycasting + event emission
  content/            # pure data — what to display, not how
    en.ts
    fr.ts
  engine/             # render loop infrastructure
    timer.ts
    updateLoop.ts
    canvas.ts
    resize.ts
    fullscreen.ts     # moved from utils/
  debug/              # dev-only tools
    curveDebug.ts
    stats.ts          # moved from utils/
    shadowCameraHelpers.ts
    lightHelpers.ts
    axesHelper.ts
    controls.ts       # moved from root
    lilgui.ts         # moved from root
  shared/             # truly shared utilities
    eventBus.ts       # new — typed event emitter
    shaders.ts
  main.ts             # thin wiring module
```

## Event System

A lightweight typed event emitter in `shared/eventBus.ts`. Single shared instance. No external library.

```ts
type EventMap = {
  travelStart: { from: number; to: number };
  travelEnd: { place: number };
  placeChanged: { place: number };
  objectHovered: { objectKey: string };
  objectUnhovered: {};
};
```

Simple `EventEmitter<EventMap>` class with `on()`, `off()`, `emit()`. Exported as a singleton default.

## Navigation Layer

### `navigation/travelling.ts`
The current `Travelling` class stripped of all DOM references:
- Owns `currentPlace`, `isTravelling`, curve computation, `travelTo()`, `travelAlongCurve()`
- Emits events via eventBus:
  - `travelStart` when travel begins (with `from` and `to` place)
  - `travelEnd` + `placeChanged` when travel animation completes
- `showObjectUI()` / `hideObjectUI()` removed entirely (responsibility moves to UI layer)
- `updateUI()`, `hideUI()`, `showUI()`, `bindSpanClickHandlers()` removed entirely
- All DOM element references (`uiTitle`, `uiDescriptionLeft`, etc.) removed

### `navigation/positions.ts`
Unchanged — pure data (places, camera positions, curve points, destinations).

### `navigation/bezierCurve.ts`
Unchanged — pure math.

## UI Layer

### `ui/hud.ts`
All DOM manipulation extracted from `Travelling`:
- Grabs DOM elements (`title`, `description-left`, `description-right`, `navigation-menu`)
- Subscribes to events:
  - `travelStart` → hides all HUD elements
  - `placeChanged` → updates title, descriptions, navigation menu, shows HUD
  - `objectHovered` → saves current UI state, swaps in object texts
  - `objectUnhovered` → restores saved UI state
- Owns the navigation menu rendering (destination buttons with icons)
- Owns `bindSpanClickHandlers()` — calls `travelling.travelTo()` directly (acceptable dependency: UI triggering an action)
- Navigation menu button `onclick` calls `travelling.travelTo()` directly

### `ui/hover.ts`
Raycasting logic extracted from `main.ts`:
- Sets up raycaster, mouse vector
- Receives the whitelisted objects map at initialization
- Listens to `mousemove`, performs intersection tests
- Emits `objectHovered` / `objectUnhovered` via eventBus
- No DOM manipulation itself

## Data Flow

```
mousemove → hover.ts raycasts → emits objectHovered → hud.ts updates DOM

button click → hud.ts calls travelling.travelTo()
             → travelling emits travelStart → hud.ts hides UI
             → animation completes
             → travelling emits travelEnd
             → travelling emits placeChanged → hud.ts shows new content
```

## Scene Layer

No logic changes, just relocated:
- `scene.ts`, `camera.ts`, `renderer.ts`, `lights.ts` move to `scene/`
- `meshes/` becomes `scene/meshes/`
- `pointCloud.ts` moves from `utils/` to `scene/meshes/` (only used by garden)

## Engine Layer

Render loop infrastructure, relocated:
- `timer.ts` and `updateLoop.ts` move from root/helpers
- `canvas.ts` and `resize.ts` move from root/utils
- `fullscreen.ts` moves from utils

## Debug Layer

Stays mostly as-is, absorbs:
- `helpers/shadowCameraHelpers.ts`, `helpers/lightHelpers.ts`, `helpers/axesHelper.ts`
- `controls.ts` and `lilgui.ts` from root

## main.ts

Becomes a thin wiring module (~30 lines):
- Imports scene objects, adds meshes and lights to scene
- Initializes hover (passing whitelisted objects map)
- Initializes hud
- Starts the tick loop
- No business logic

## Singleton Pattern

The existing singleton pattern (global `camera`, `scene`, `renderer`) is kept as-is. A single-canvas Three.js app genuinely has one of each — replacing with DI would add complexity for no benefit.

## What Does NOT Change

- Content files (`en.ts`, `fr.ts`) — pure data, just relocated
- Mesh files — just relocated under `scene/meshes/`
- `positions.ts` data — just relocated under `navigation/`
- `bezierCurve.ts` — just relocated
- The render loop logic in `timer.ts`
- The `UpdateLoop` linked list implementation

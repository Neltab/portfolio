import GUI from "lil-gui";

let bezierFolder: GUI | null = null;

if (import.meta.env.DEV) {
    const gui = new GUI({
        title: "ThreeJS Starter Bun",
    });
    bezierFolder = gui.addFolder("Bezier");
}

export {
    bezierFolder,
};

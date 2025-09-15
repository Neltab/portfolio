import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { vertexShader, fragmentShader } from "../shared/shaders";
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const loadPointCloud = (url: string, pointSize: number[] = [0.05], pointPerEdge: number[] = [4]) => {
    return new Promise<THREE.Group>((resolve, reject) => {
        const group = new THREE.Group();
        const loader = new GLTFLoader();
        const draco = new DRACOLoader();
        draco.setDecoderConfig({ type: 'js' });
        draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
        loader.setDRACOLoader( draco );

        loader.load(url, (gltf) => {
            console.log(url, gltf.scene);
            let index = 0;
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    console.log("mesh", child);
                    group.add(generateParticles(child as THREE.Mesh, pointSize[index], pointPerEdge[index]));
                    index++;
                }
            });
            resolve(group);
        });
    });
}

function generateParticles(mesh: THREE.Mesh, pointSize: number, pointPerEdge: number) {
    const geometry = mesh.geometry;

    // Extract the texture from the material
    const texture = mesh.material.map;
    // Create shader material
    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            pointSize: { value: pointSize },
            map: { value: texture }, // Use the extracted texture
        },
        vertexShader,
        fragmentShader,
        transparent: false,
    });

    const { allPoints, allUvs } = generatePointsForAllTrianglesIndexed(geometry, pointPerEdge);

    const triangleGeometry = new THREE.BufferGeometry();
    triangleGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(allPoints), 3));
    triangleGeometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(allUvs), 2));
    triangleGeometry.setAttribute("initialPosition", triangleGeometry.attributes.position.clone());
    const seeds = new Float32Array(triangleGeometry.attributes.position.count);
    const directionChangeSpeed = new Float32Array(triangleGeometry.attributes.position.count);
    const turbulence = new Float32Array(triangleGeometry.attributes.position.count);
    for (let i = 0; i < seeds.length; i++) {
        seeds[i] = Math.random();
        directionChangeSpeed[i] = Math.random() * 0.2;
        turbulence[i] = Math.random() * 0.15;
    }
    triangleGeometry.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));
    triangleGeometry.setAttribute("directionChangeSpeed", new THREE.BufferAttribute(directionChangeSpeed, 1));
    triangleGeometry.setAttribute("turbulence", new THREE.BufferAttribute(turbulence, 1));
    console.log("triangleGeometry", triangleGeometry);
    // const particles = new THREE.Points(geometry, shaderMaterial);
    return new THREE.Points(triangleGeometry, shaderMaterial);
}

function generatePointsForTriangle(
    ax, ay, az, bx, by, bz, cx, cy, cz,  // Positions
    au, av, bu, bv, cu, cv,              // UVs
    n, pointNumber, uvNumber                                 // Number of points per edge
) {
    const points = new Array(pointNumber);
    const uvs = new Array(uvNumber);
    let pointIndex = 0;
    let uvIndex = 0;
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n - i - 1; j++) {
            const k = n - i - j;
            const u = i / n;
            const v = j / n;
            const w = k / n;
            // Interpolate position
            const pointX = u * ax + v * bx + w * cx;
            const pointY = u * ay + v * by + w * cy;
            const pointZ = u * az + v * bz + w * cz;
            // points.push(pointX, pointY, pointZ);
            points[pointIndex++] = pointX;
            points[pointIndex++] = pointY;
            points[pointIndex++] = pointZ;

            // Interpolate UV
            const uvX = u * au + v * bu + w * cu;
            const uvY = u * av + v * bv + w * cv;
            // uvs.push(uvX, uvY);
            uvs[uvIndex++] = uvX;
            uvs[uvIndex++] = uvY;
        }
    }
    return { points, uvs };
}

function generatePointsForAllTrianglesIndexed(geometry, n) {
    // Get the index and position attributes
    const index = geometry.index;
    const positionAttribute = geometry.attributes.position;
    const uvAttribute = geometry.attributes.uv;

    if (!index || !positionAttribute || !uvAttribute) {
        throw new Error("Geometry is missing index, position, or UV attributes.");
    }

    const totalIterations = index.array.length / 3;
    const totalSubIterations = getTotalIterations(n);
    const pointNumber = totalSubIterations * 3;
    const uvNumber = totalSubIterations * 2;

    const totalPointNumber = totalIterations * pointNumber;
    const totalUvNumber = totalIterations * uvNumber;

    const allPoints = new Array(totalPointNumber);
    const allUvs = new Array(totalUvNumber);
    let pointIndex = 0;
    let uvIndex = 0;

    // Loop through all triangles
    for (let triangleIndex = 0; triangleIndex < index.array.length; triangleIndex += 3) {
        // Get the vertex indices for this triangle
        const i1 = index.array[triangleIndex];
        const i2 = index.array[triangleIndex + 1];
        const i3 = index.array[triangleIndex + 2];

        // Extract positions for the triangle
        const ax = positionAttribute.getX(i1);
        const ay = positionAttribute.getY(i1);
        const az = positionAttribute.getZ(i1);

        const bx = positionAttribute.getX(i2);
        const by = positionAttribute.getY(i2);
        const bz = positionAttribute.getZ(i2);

        const cx = positionAttribute.getX(i3);
        const cy = positionAttribute.getY(i3);
        const cz = positionAttribute.getZ(i3);

        // Extract UVs for the triangle
        const au = uvAttribute.getX(i1);
        const av = uvAttribute.getY(i1);

        const bu = uvAttribute.getX(i2);
        const bv = uvAttribute.getY(i2);

        const cu = uvAttribute.getX(i3);
        const cv = uvAttribute.getY(i3);

        // Generate points and UVs for this triangle
        const { points, uvs: generatedUvs } = generatePointsForTriangle(
            ax, ay, az, bx, by, bz, cx, cy, cz,
            au, av, bu, bv, cu, cv,
            n, pointNumber, uvNumber
        );

        // allPoints.push(ax, ay, az, bx, by, bz, cx, cy, cz);
        for (let i = 0; i < points.length; i++) {
            allPoints[pointIndex++] = points[i];
        }
        for (let i = 0; i < generatedUvs.length; i++) {
            allUvs[uvIndex++] = generatedUvs[i];
        }
    }

    return { allPoints, allUvs };
}

function getTotalIterations(n) {
    return (n-1) * (n - 2) / 2;
}

export default loadPointCloud;
import * as THREE from 'three';

class BezierCurve {
    points: THREE.Vector3[];
    controlPoints: THREE.Vector3[];
    curves: THREE.CubicBezierCurve3[] = [];
    length: number = 0;
    lengths: number[] = [0];

    constructor(points: THREE.Vector3[], controlPoints: THREE.Vector3[]) {
        this.controlPoints = controlPoints;
        this.points = points;
        this.computeCurves();
        this.length = this.getLength();
        this.computeLengths();
    }

    computeCurves() {
        this.curves = [];
        for (let i = 0; i < this.points.length - 1; i++) {
            if (i === 0) {
                const p0 = this.points[i];
                const p1 = this.points[i + 1];
                const c0 = this.controlPoints[i];
                const c1 = this.controlPoints[i + 1];
                this.curves.push(new THREE.CubicBezierCurve3(p0, c0, c1, p1));
                continue;
            }

            const p0 = this.points[i];
            const p1 = this.points[i + 1];
            const cMinus1 = this.controlPoints[i];
            const c0 = p0.clone().multiplyScalar(2).sub(cMinus1);
            const c1 = this.controlPoints[i + 1];
            this.curves.push(new THREE.CubicBezierCurve3(p0, c0, c1, p1));
        }
    }

    getPoint(t: number) {
        if (t >= 1) {
            return this.curves[this.curves.length - 1].getPoint(1);
        }
        const curveIndex = this.lengths.findIndex((length => t < length)) - 1;
        const min = this.lengths[curveIndex];
        const max = this.lengths[curveIndex + 1];
        const mappedT = (t - min) / (max - min);
        return this.curves[curveIndex].getPoint(mappedT);
    }

    getPointAt(t: number) {
        if (t >= 1) {
            return this.curves[this.curves.length - 1].getPointAt(1);
        }
        const curveIndex = this.lengths.findIndex((length => t < length)) - 1;
        const min = this.lengths[curveIndex];
        const max = this.lengths[curveIndex + 1];
        const mappedT = (t - min) / (max - min);
        return this.curves[curveIndex].getPointAt(mappedT);
    }

    getLength() {
        let length = 0;
        for (let i = 0; i < this.curves.length; i++) {
            length += this.curves[i].getLength();
        }
        return length;
    }

    computeLengths() {
        this.lengths = [0];
        let totalLength = 0;
        for (let i = 0; i < this.curves.length; i++) {
            const length = this.curves[i].getLength() / this.length;
            totalLength += length;
            this.lengths.push(totalLength);
        }
    }

    getTangentAt(t: number) {
        const clampedT = Math.max(0, Math.min(t, 1));
        if (clampedT >= 1) {
            return this.curves[this.curves.length - 1].getTangentAt(1);
        }
        const curveIndex = this.lengths.findIndex((length => clampedT < length)) - 1;
        const min = this.lengths[curveIndex];
        const max = this.lengths[curveIndex + 1];
        const mappedT = (clampedT - min) / (max - min);
        return this.curves[curveIndex].getTangentAt(mappedT);
    }

    get curve() {
        this.computeCurves();
        const material = new THREE.LineBasicMaterial({color: 0x00ff00});
        return this.curves.reduce((acc, curve) => {
            const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(100));
            const line = new THREE.Line(geometry, material);
            acc.add(line);
            return acc;
        }, new THREE.Group());
    }
}

export default BezierCurve;
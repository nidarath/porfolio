import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../components/matcha-cat-scene.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 } }).outputText;
const model = {};
new Function("exports", compiled)(model);
const scene = model.createMatchaCat();

const subtract = (a, b) => a.map((value, axis) => value - b[axis]);
const dot = (a, b) => a.reduce((sum, value, axis) => sum + value * b[axis], 0);
const cross = (a, b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];

// Intersect a front-to-back ray with the actual head, independently of its decals.
function headIntersections(x, y) {
  const origin = [x, y, 5];
  const direction = [0, 0, -1];
  const intersections = [];
  for (const { vertices: [a, b, c] } of scene.headFaces) {
    const edge1 = subtract(b, a);
    const edge2 = subtract(c, a);
    const h = cross(direction, edge2);
    const determinant = dot(edge1, h);
    if (Math.abs(determinant) < 1e-9) continue;
    const inverse = 1 / determinant;
    const s = subtract(origin, a);
    const u = inverse * dot(s, h);
    if (u < -1e-7 || u > 1 + 1e-7) continue;
    const q = cross(s, edge1);
    const v = inverse * dot(direction, q);
    if (v < -1e-7 || u + v > 1 + 1e-7) continue;
    intersections.push(5 - inverse * dot(edge2, q));
  }
  assert.ok(intersections.length >= 2, `Head must contain (${x}, ${y}).`);
  return { front: Math.max(...intersections), back: Math.min(...intersections) };
}

test("ear roots are closed and buried within the head", () => {
  const ears = scene.faces.filter(face => face.vertices.every(point => point[1] === 1.87 || point[1] === 3));
  assert.equal(ears.length, 12);
  const edges = new Map();
  const roots = new Map();
  for (const { vertices } of ears) {
    vertices.forEach((point, index) => {
      const key = [JSON.stringify(point), JSON.stringify(vertices[(index + 1) % 3])].sort().join("|");
      edges.set(key, (edges.get(key) || 0) + 1);
      if (point[1] === 1.87) roots.set(JSON.stringify(point), point);
    });
  }
  assert.equal(roots.size, 8);
  for (const count of edges.values()) assert.equal(count, 2, "Every ear edge must have a matching face.");
  for (const [x, y, z] of roots.values()) {
    const head = headIntersections(x, y);
    assert.ok(z > head.back + 0.002 && z < head.front - 0.002, "An ear root must intersect the head, not float above it.");
  }
});

test("eyes, cheeks, and expression vertices follow the faceted head", () => {
  const details = scene.faces.filter(face => face.unlit && face.vertices.every(point => point[1] > 1.1));
  assert.ok(details.length > 500);
  for (const { vertices } of details) {
    for (const [x, y, z] of vertices) {
      const clearance = z - headIntersections(x, y).front;
      assert.ok(clearance > 0.003 && clearance < 0.015, "A facial detail must stay visible without floating off the mesh.");
    }
  }
});

test("facial triangle interiors do not cut through the head", () => {
  const details = scene.faces.filter(face => face.unlit && face.vertices.every(point => point[1] > 1.1));
  for (const { vertices: [a, b, c] } of details) {
    for (const weights of [[1/3, 1/3, 1/3], [0.5, 0.5, 0], [0, 0.5, 0.5], [0.5, 0, 0.5]]) {
      const [x, y, z] = a.map((value, axis) => value*weights[0] + b[axis]*weights[1] + c[axis]*weights[2]);
      const clearance = z - headIntersections(x, y).front;
      assert.ok(clearance > 0.001 && clearance < 0.012, `Facial surface clearance must be safe; got ${clearance}.`);
    }
  }
});

type Vec3 = [number, number, number];
type Color = [number, number, number];
// 1/2 are the open left/right eyes; 3/4 are their squint expressions.
type EyeMaterial = 0 | 1 | 2 | 3 | 4;
type Face = { vertices: [Vec3, Vec3, Vec3]; normal: Vec3; color: Color; unlit: boolean; eye: EyeMaterial };
export type MatchaCatEye = "left" | "right";
type Scene = { faces: Face[]; headFaces: Face[]; eyeY: number; eyes: Record<MatchaCatEye, Vec3>; liquid: { center: Vec3; radius: number; vertices: Vec3[] } };
export type MatchaCatScene = Scene;
type FaceOptions = { center?: Vec3; unlit?: boolean; eye?: EyeMaterial };

const FUR: Color = [237, 235, 230];
const BODY: Color = [225, 225, 219];
const INK: Color = [53, 62, 61];
const CUP: Color = [116, 133, 137];
const WOOD: Color = [182, 133, 108];
const EYE_Y = 1.62;

function face(scene: Scene, a: Vec3, b: Vec3, c: Vec3, color: Color, options: FaceOptions = {}) {
  const u = b.map((value, i) => value - a[i]);
  const v = c.map((value, i) => value - a[i]);
  const normal: Vec3 = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  const length = Math.hypot(...normal);
  if (length < 0.000001) return;
  const center = options.center;
  const direction = center && normal.reduce((sum, value, axis) => sum + value * ((a[axis] + b[axis] + c[axis]) / 3 - center[axis]), 0) < 0 ? -1 : 1;
  scene.faces.push({ vertices: [a, b, c], normal: normal.map(value => value / length * direction) as Vec3, color, unlit: Boolean(options.unlit), eye: options.eye ?? 0 });
}

function ellipsoid(scene: Scene, center: Vec3, radius: Vec3, color: Color, sides = 10, rings = 6, tilt = 0) {
  const vertices: Vec3[][] = [];
  for (let row = 0; row <= rings; row++) {
    const latitude = row / rings * Math.PI;
    vertices[row] = [];
    for (let column = 0; column <= sides; column++) {
      const angle = column / sides * Math.PI * 2 + Math.PI / sides;
      const x = Math.sin(latitude) * Math.cos(angle) * radius[0];
      const y = Math.cos(latitude) * radius[1];
      const z = Math.sin(latitude) * Math.sin(angle) * radius[2];
      vertices[row].push([center[0] + x, center[1] + y * Math.cos(tilt) - z * Math.sin(tilt), center[2] + y * Math.sin(tilt) + z * Math.cos(tilt)]);
    }
  }
  for (let row = 0; row < rings; row++) {
    for (let column = 0; column < sides; column++) {
      const a = vertices[row][column];
      const b = vertices[row + 1][column];
      const c = vertices[row][column + 1];
      const d = vertices[row + 1][column + 1];
      face(scene, a, b, c, color, { center });
      face(scene, c, b, d, color, { center });
    }
  }
}

function cylinder(scene: Scene, center: Vec3, bottomRadius: number, topRadius: number, height: number, color: Color, sides = 12, depthScale = 1, top = true) {
  const lower: Vec3[] = [];
  const upper: Vec3[] = [];
  for (let index = 0; index < sides; index++) {
    const angle = index / sides * Math.PI * 2;
    lower.push([center[0] + Math.cos(angle) * bottomRadius, center[1] - height / 2, center[2] + Math.sin(angle) * bottomRadius * depthScale]);
    upper.push([center[0] + Math.cos(angle) * topRadius, center[1] + height / 2, center[2] + Math.sin(angle) * topRadius * depthScale]);
  }
  for (let index = 0; index < sides; index++) {
    const next = (index + 1) % sides;
    face(scene, lower[index], upper[index], lower[next], color, { center });
    face(scene, lower[next], upper[index], upper[next], color, { center });
    if (top) face(scene, [center[0], center[1] + height / 2, center[2]], upper[index], upper[next], color, { center });
    face(scene, [center[0], center[1] - height / 2, center[2]], lower[next], lower[index], color, { center });
  }
}

function tube(scene: Scene, start: Vec3, end: Vec3, radius: number, color: Color, unlit = false, sides = 7) {
  const direction = end.map((value, index) => value - start[index]);
  const length = Math.hypot(...direction) || 1;
  const d = direction.map(value => value / length);
  const reference: Vec3 = Math.abs(d[1]) > 0.9 ? [1, 0, 0] : [0, 1, 0];
  const u = [d[1] * reference[2] - d[2] * reference[1], d[2] * reference[0] - d[0] * reference[2], d[0] * reference[1] - d[1] * reference[0]];
  const uLength = Math.hypot(...u) || 1;
  u.forEach((value, index) => { u[index] = value / uLength; });
  const v = [d[1] * u[2] - d[2] * u[1], d[2] * u[0] - d[0] * u[2], d[0] * u[1] - d[1] * u[0]];
  const ring = (point: Vec3, index: number): Vec3 => point.map((value, axis) => value + radius * (u[axis] * Math.cos(index / sides * Math.PI * 2) + v[axis] * Math.sin(index / sides * Math.PI * 2))) as Vec3;
  const center = start.map((value, axis) => (value + end[axis]) / 2) as Vec3;
  for (let index = 0; index < sides; index++) {
    const a = ring(start, index);
    const b = ring(end, index);
    const c = ring(start, index + 1);
    const d = ring(end, index + 1);
    face(scene, a, b, c, color, { center, unlit });
    face(scene, c, b, d, color, { center, unlit });
  }
}

function frontOfHead(scene: Scene, x: number, y: number) {
  let closest = -Infinity;
  for (const { vertices: [a, b, c] } of scene.headFaces) {
    const area = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
    if (Math.abs(area) < 0.000001) continue;
    const wa = ((b[0] - x) * (c[1] - y) - (b[1] - y) * (c[0] - x)) / area;
    const wb = ((c[0] - x) * (a[1] - y) - (c[1] - y) * (a[0] - x)) / area;
    const wc = 1 - wa - wb;
    if (Math.min(wa, wb, wc) < -0.00001) continue;
    closest = Math.max(closest, wa * a[2] + wb * b[2] + wc * c[2]);
  }
  if (closest === -Infinity) throw new Error("Facial detail lies outside the cat's head.");
  return closest;
}

const FACE_LIFT = 0.008;

function facePatch(scene: Scene, x: number, y: number, width: number, height: number, color: Color, eye: EyeMaterial = 0, rings = 4, sides = 24) {
  const point = (ring: number, column: number): Vec3 => {
    const angle = column / sides * Math.PI * 2;
    const px = x + Math.cos(angle) * width * ring / rings;
    const py = y + Math.sin(angle) * height * ring / rings;
    return [px, py, frontOfHead(scene, px, py) + FACE_LIFT];
  };
  for (let ring = 0; ring < rings; ring++) {
    for (let column = 0; column < sides; column++) {
      const a = point(ring, column);
      const b = point(ring + 1, column);
      const c = point(ring, column + 1);
      const d = point(ring + 1, column + 1);
      face(scene, a, b, c, color, { unlit: true, eye });
      face(scene, c, b, d, color, { unlit: true, eye });
    }
  }
}

function expressionCurve(scene: Scene, controls: [number, number][], radius: number, eye: EyeMaterial = 0) {
  const points: [number, number][] = [];
  for (let index = 0; index <= 28; index++) {
    const t = index / 28;
    const u = 1 - t;
    const x = u ** 3 * controls[0][0] + 3 * u * u * t * controls[1][0] + 3 * u * t * t * controls[2][0] + t ** 3 * controls[3][0];
    const y = u ** 3 * controls[0][1] + 3 * u * u * t * controls[1][1] + 3 * u * t * t * controls[2][1] + t ** 3 * controls[3][1];
    points.push([x, y]);
  }
  const edges = points.map(([x, y], index) => {
    const before = points[Math.max(0, index - 1)];
    const after = points[Math.min(points.length - 1, index + 1)];
    const dx = after[0] - before[0];
    const dy = after[1] - before[1];
    const length = Math.hypot(dx, dy) || 1;
    return [-1, 1].map(side => {
      const px = x - dy / length * radius * side;
      const py = y + dx / length * radius * side;
      return [px, py, frontOfHead(scene, px, py) + FACE_LIFT] as Vec3;
    });
  });
  for (let index = 0; index < edges.length - 1; index++) {
    face(scene, edges[index][0], edges[index][1], edges[index + 1][0], INK, { unlit: true, eye });
    face(scene, edges[index + 1][0], edges[index][1], edges[index + 1][1], INK, { unlit: true, eye });
  }
  for (const [x, y] of [points[0], points[points.length - 1]]) facePatch(scene, x, y, radius, radius, INK, eye, 1, 12);
}

function squintEye(scene: Scene, x: number, direction: number, material: EyeMaterial) {
  const corner: [number, number] = [x + direction * 0.048, EYE_Y];
  for (const side of [-1, 1]) {
    const end: [number, number] = [x - direction * 0.048, EYE_Y + side * 0.057];
    const along = (t: number): [number, number] => [end[0] + (corner[0] - end[0]) * t, end[1] + (corner[1] - end[1]) * t];
    expressionCurve(scene, [end, along(1 / 3), along(2 / 3), corner], 0.014, material);
  }
}

function matchaSurface(): Scene["liquid"] {
  const radius = 0.187;
  const vertices: Vec3[] = [];
  const rings = 10;
  const sides = 72;
  const point = (ring: number, column: number): Vec3 => {
    // Follow the cup's twelve-sided opening exactly, including between corners.
    const edge = column / sides * 12;
    const start = Math.floor(edge);
    const along = edge - start;
    const a = start / 12 * Math.PI * 2;
    const b = (start + 1) / 12 * Math.PI * 2;
    return [
      (Math.cos(a) * (1 - along) + Math.cos(b) * along) * radius * ring / rings,
      0,
      (Math.sin(a) * (1 - along) + Math.sin(b) * along) * radius * ring / rings,
    ];
  };
  for (let ring = 0; ring < rings; ring++) {
    for (let column = 0; column < sides; column++) {
      if (ring) vertices.push(point(ring, column), point(ring + 1, column), point(ring, column + 1));
      vertices.push(point(ring, column + 1), point(ring + 1, column), point(ring + 1, column + 1));
    }
  }
  return { center: [0, 0.978, 0.75], radius, vertices };
}

export function createMatchaCat(): Scene {
  const scene: Scene = { faces: [], headFaces: [], eyeY: EYE_Y, eyes: { left: [-0.44, EYE_Y, 0], right: [0.44, EYE_Y, 0] }, liquid: matchaSurface() };

  // A little curled tail sits behind the body and shows as the model turns.
  const tail: Vec3[] = [[0.34, 0.32, -0.23], [0.66, 0.27, -0.29], [0.84, 0.39, -0.32], [0.88, 0.59, -0.30], [0.79, 0.70, -0.28]];
  tail.slice(1).forEach((point, index) => tube(scene, tail[index], point, 0.092, BODY));
  ellipsoid(scene, tail[tail.length - 1], [0.092, 0.092, 0.092], FUR, 7, 4);

  ellipsoid(scene, [-0.22, 0.12, 0.08], [0.21, 0.31, 0.26], BODY, 8, 5);
  ellipsoid(scene, [0.22, 0.12, 0.08], [0.21, 0.31, 0.26], BODY, 8, 5);
  ellipsoid(scene, [0, 0.78, -0.01], [0.51, 0.61, 0.36], BODY, 10, 7);
  ellipsoid(scene, [-0.43, 0.81, 0.29], [0.17, 0.37, 0.18], FUR, 8, 6, -0.66);
  ellipsoid(scene, [0.43, 0.81, 0.29], [0.17, 0.37, 0.18], FUR, 8, 6, -0.66);

  for (const side of [-1, 1]) {
    const x = side * 0.53;
    // Bury the closed roots inside the head, rather than balancing them on top.
    const baseY = 1.87;
    const base: Vec3[] = [[x - 0.22, baseY, -0.14], [x + 0.22, baseY, -0.14], [x + 0.23, baseY, 0.21], [x - 0.23, baseY, 0.21]];
    const tip: Vec3 = [x + side * 0.055, 3.00, -0.015];
    const center: Vec3 = [x, 2.32, 0];
    base.forEach((point, index) => face(scene, point, base[(index + 1) % 4], tip, FUR, { center }));
    face(scene, base[0], base[2], base[1], FUR, { center });
    face(scene, base[0], base[3], base[2], FUR, { center });
    const inset = (y: number, across: number): Vec3 => {
      const t = (y - baseY) / (tip[1] - baseY);
      return [x + side * 0.055 * t + across * 0.23 * (1 - t), y, 0.21 + (tip[2] - 0.21) * t + 0.004];
    };
    face(scene, inset(2.15, -0.68), inset(2.15, 0.68), inset(2.76, 0), [220, 204, 197], { center });
  }
  const headStart = scene.faces.length;
  ellipsoid(scene, [0, 1.68, 0.04], [0.92, 0.71, 0.60], FUR, 12, 8);
  scene.headFaces = scene.faces.slice(headStart);

  // The saucer is an actual shallow octagonal mesh, with a beveled edge.
  cylinder(scene, [0, 0.47, 0.69], 0.53, 0.58, 0.075, [148, 105, 85], 8, 0.65);
  cylinder(scene, [0, 0.515, 0.69], 0.58, 0.53, 0.025, WOOD, 8, 0.65);
  ellipsoid(scene, [-0.44, 0.57, 0.62], [0.15, 0.16, 0.16], FUR, 8, 5);
  ellipsoid(scene, [0.44, 0.57, 0.62], [0.15, 0.16, 0.16], FUR, 8, 5);

  cylinder(scene, [0, 0.76, 0.75], 0.185, 0.22, 0.46, CUP, 12, 1, false);
  const outerRadius = 0.222;
  const innerRadius = 0.187;
  for (let index = 0; index < 12; index++) {
    const point = (radius: number, angle: number): Vec3 => [Math.cos(angle) * radius, 0.994, 0.75 + Math.sin(angle) * radius];
    const a = index / 12 * Math.PI * 2;
    const b = (index + 1) / 12 * Math.PI * 2;
    face(scene, point(outerRadius, a), point(innerRadius, a), point(outerRadius, b), [152, 165, 164], { center: [0, 0.76, 0.75] });
    face(scene, point(outerRadius, b), point(innerRadius, a), point(innerRadius, b), [152, 165, 164], { center: [0, 0.76, 0.75] });
    // A recessed inner wall gives the liquid a visible edge beneath the rim.
    const lower = (angle: number): Vec3 => [Math.cos(angle) * innerRadius, 0.965, 0.75 + Math.sin(angle) * innerRadius];
    face(scene, point(innerRadius, a), lower(a), point(innerRadius, b), [104, 124, 124], { unlit: true });
    face(scene, point(innerRadius, b), lower(a), lower(b), [104, 124, 124], { unlit: true });
  }

  for (const point of Object.values(scene.eyes)) point[2] = frontOfHead(scene, point[0], point[1]) + FACE_LIFT;
  facePatch(scene, -0.44, EYE_Y, 0.068, 0.081, INK, 1);
  facePatch(scene, 0.44, EYE_Y, 0.068, 0.081, INK, 2);
  squintEye(scene, -0.44, 1, 3);
  squintEye(scene, 0.44, -1, 4);
  facePatch(scene, -0.63, 1.47, 0.075, 0.032, [220, 192, 184]);
  facePatch(scene, 0.63, 1.47, 0.075, 0.032, [220, 192, 184]);
  expressionCurve(scene, [[-0.18, 1.36], [-0.23, 1.17], [-0.01, 1.17], [-0.005, 1.34]], 0.019);
  expressionCurve(scene, [[-0.005, 1.34], [-0.01, 1.17], [0.20, 1.17], [0.19, 1.37]], 0.019);
  expressionCurve(scene, [[-0.66, 1.88], [-0.59, 1.87], [-0.52, 1.91], [-0.47, 1.96]], 0.012);
  expressionCurve(scene, [[0.47, 1.96], [0.52, 1.91], [0.59, 1.87], [0.65, 1.88]], 0.012);
  return scene;
}


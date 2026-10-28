import type { MatchaCatScene } from "@/components/matcha-cat-scene";

type Rotation = { yaw: number; pitch: number; time: number; squint?: { left: boolean; right: boolean } };

// Match the GPU projection so the invisible eye buttons follow the 3D face.
export function projectMatchaCatPoint(point: readonly number[], rotation: Rotation) {
  const cosY = Math.cos(rotation.yaw);
  const sinY = Math.sin(rotation.yaw);
  const cosX = Math.cos(rotation.pitch);
  const sinX = Math.sin(rotation.pitch);
  const y = point[1] + Math.sin(rotation.time * 1.15) * 0.023 - 1.45;
  const x = point[0] * cosY + point[2] * sinY;
  const z = point[2] * cosY - point[0] * sinY;
  const distance = 5.4 - (y * sinX + z * cosX);
  return { x: (x * 2.9 / distance + 1) / 2, y: (1.02 - (y * cosX - z * sinX) * 2.9 / distance) / 2 };
}

const TRANSFORM = `
uniform vec4 uTurn;
vec3 turn(vec3 point) {
  vec3 spun = vec3(point.x*uTurn.x + point.z*uTurn.y, point.y, point.z*uTurn.x - point.x*uTurn.y);
  return vec3(spun.x, spun.y*uTurn.z - spun.z*uTurn.w, spun.y*uTurn.w + spun.z*uTurn.z);
}
vec4 project(vec3 point) {
  float distance = 5.4 - point.z;
  return vec4(point.x*2.9, point.y*2.9 - 0.02*distance, (13.0/11.0)*distance - 24.0/11.0, distance);
}`;

const MODEL_VERTEX = `
attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec3 aColor;
attribute float aEye;
attribute float aUnlit;
uniform float uBob;
varying vec3 vColor;
varying float vEye;
varying float vFaceY;
${TRANSFORM}
void main() {
  vec3 point = aPosition;
  point.y += uBob - 1.45;
  gl_Position = project(turn(point));
  vec3 normal = turn(aNormal);
  float diffuse = max(0.0, dot(normal, vec3(-0.43, 0.65, 0.63)));
  float shade = mix(0.68 + diffuse*0.34, 1.0, aUnlit);
  vColor = min(vec3(1.0), aColor*shade);
  vEye = aEye;
  vFaceY = aPosition.y;
}`;

const MODEL_FRAGMENT = `
precision highp float;
uniform float uBlink;
uniform float uEyeY;
uniform vec2 uSquint;
varying vec3 vColor;
varying float vEye;
varying float vFaceY;
void main() {
  if (vEye > 0.5) {
    bool leftEye = vEye < 1.5 || (vEye > 2.5 && vEye < 3.5);
    bool squintShape = vEye > 2.5;
    bool poked = (leftEye ? uSquint.x : uSquint.y) > 0.5;
    if (squintShape != poked) discard;
    // Poked eyes hold their chevron while the other eye can blink normally.
    if (!squintShape && abs(vFaceY - uEyeY) > 0.081*uBlink) discard;
  }
  gl_FragColor = vec4(vColor, 1.0);
}`;

const LIQUID_SURFACE = `
uniform float uTime;
float liquidHeight(vec2 p) {
  float radius = length(p);
  float calmEdge = 1.0 - smoothstep(0.70, 0.94, radius);
  float waves = sin(radius*22.0 - uTime*1.8)*0.0014
              + sin(p.x*14.0 + p.y*9.0 + uTime*1.3)*0.0012;
  return waves*calmEdge + 0.0045*pow(min(radius, 1.0), 10.0);
}`;

const LIQUID_VERTEX = `
attribute vec3 aPosition;
uniform vec3 uCenter;
uniform float uRadius;
uniform float uBob;
varying vec2 vSurface;
varying vec3 vPoint;
${TRANSFORM}
${LIQUID_SURFACE}
void main() {
  vSurface = aPosition.xz/uRadius;
  vec3 point = uCenter + aPosition;
  point.y += liquidHeight(vSurface) + uBob - 1.45;
  vPoint = turn(point);
  gl_Position = project(vPoint);
}`;

const LIQUID_FRAGMENT = `
precision highp float;
uniform float uRadius;
varying vec2 vSurface;
varying vec3 vPoint;
${TRANSFORM}
${LIQUID_SURFACE}
float ellipse(vec2 p, vec2 center, vec2 size) {
  vec2 q = (p - center)/size;
  return exp(-dot(q, q)*2.0);
}
float bubble(vec2 p, vec2 center, float radius) {
  return 1.0 - smoothstep(0.006, 0.017, abs(length(p - center) - radius));
}
void main() {
  vec2 p = vSurface;
  float radius = length(p);
  // Smooth normals let tiny ripples catch light without faceting the drink.
  float stepSize = 0.012;
  float dx = liquidHeight(p + vec2(stepSize, 0.0)) - liquidHeight(p - vec2(stepSize, 0.0));
  float dz = liquidHeight(p + vec2(0.0, stepSize)) - liquidHeight(p - vec2(0.0, stepSize));
  vec3 localNormal = normalize(vec3(-dx/(2.0*stepSize*uRadius), 1.0, -dz/(2.0*stepSize*uRadius)));
  vec3 normal = turn(localNormal);
  vec3 view = normalize(vec3(0.0, 0.0, 5.4) - vPoint);
  float fresnel = pow(1.0 - max(dot(normal, view), 0.0), 3.0);
  float light = max(dot(normal, normalize(vec3(-0.43, 0.65, 0.63))), 0.0);

  vec3 color = mix(vec3(0.57, 0.66, 0.28), vec3(0.43, 0.53, 0.19), smoothstep(0.55, 1.0, radius)*0.65);
  color *= 0.91 + light*0.14;
  // A soft window reflection bends with the water and shifts as the cat turns.
  vec2 reflection = p + localNormal.xz*1.5 + vec2(uTurn.y*0.22, uTurn.w*0.12);
  float sheen = ellipse(reflection, vec2(-0.24, -0.27), vec2(0.72, 0.23))*0.23;
  float glint = ellipse(reflection, vec2(-0.30, -0.30), vec2(0.45, 0.055))*0.42;
  float rimLight = smoothstep(0.83, 0.95, radius)*(1.0 - smoothstep(0.97, 1.0, radius));
  rimLight *= max(dot(normalize(p + vec2(0.0001)), normalize(vec2(-0.55, -0.83))), 0.0)*0.22;
  color = mix(color, vec3(0.93, 0.96, 0.78), (sheen + glint + rimLight)*(0.65 + fresnel*0.55));

  float foam = bubble(p, vec2(0.48, -0.38), 0.035)
             + bubble(p, vec2(0.61, -0.22), 0.022)
             + bubble(p, vec2(0.38, -0.49), 0.017);
  color = mix(color, vec3(0.81, 0.86, 0.55), min(foam*0.45, 0.45));
  gl_FragColor = vec4(color, 1.0);
}`;

const SHADOW_VERTEX = `
attribute vec3 aPosition;
attribute vec2 aUv;
varying vec2 vUv;
${TRANSFORM}
void main() {
  vec3 point = aPosition;
  point.y -= 1.45;
  gl_Position = project(turn(point));
  vUv = aUv;
}`;

const SHADOW_FRAGMENT = `
precision mediump float;
varying vec2 vUv;
void main() {
  float fade = 1.0 - smoothstep(0.0, 1.0, length(vUv));
  float alpha = fade*fade*0.15;
  gl_FragColor = vec4(vec3(0.227, 0.302, 0.298)*alpha, alpha);
}`;

function program(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string, attributes: string[]) {
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) throw new Error("Unable to create the cat shader.");
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(message || "Unable to compile the cat shader.");
    }
    return shader;
  };
  const vertex = compile(gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
  const result = gl.createProgram();
  if (!result) throw new Error("Unable to create the cat renderer.");
  gl.attachShader(result, vertex);
  gl.attachShader(result, fragment);
  attributes.forEach((name, index) => gl.bindAttribLocation(result, index, name));
  gl.linkProgram(result);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(result, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(result);
    gl.deleteProgram(result);
    throw new Error(message || "Unable to link the cat renderer.");
  }
  return result;
}

export function createMatchaCatRenderer(gl: WebGLRenderingContext, scene: MatchaCatScene) {
  const programs: WebGLProgram[] = [];
  const buffers: WebGLBuffer[] = [];
  const dispose = () => {
    buffers.forEach(buffer => gl.deleteBuffer(buffer));
    programs.forEach(value => gl.deleteProgram(value));
  };
  const buffer = (values: Float32Array) => {
    const result = gl.createBuffer();
    if (!result) throw new Error("Unable to allocate the cat mesh.");
    buffers.push(result);
    gl.bindBuffer(gl.ARRAY_BUFFER, result);
    gl.bufferData(gl.ARRAY_BUFFER, values, gl.STATIC_DRAW);
    return result;
  };

  try {
    const model = program(gl, MODEL_VERTEX, MODEL_FRAGMENT, ["aPosition", "aNormal", "aColor", "aEye", "aUnlit"]);
    programs.push(model);
    const shadow = program(gl, SHADOW_VERTEX, SHADOW_FRAGMENT, ["aPosition", "aUv"]);
    programs.push(shadow);
    const liquid = program(gl, LIQUID_VERTEX, LIQUID_FRAGMENT, ["aPosition"]);
    programs.push(liquid);
    const vertices = new Float32Array(scene.faces.length*3*11);
    let offset = 0;
    scene.faces.forEach((face, index) => {
      const variation = face.unlit ? 1 : 0.992 + ((index*17)%7)*0.002;
      for (const point of face.vertices) {
        vertices.set([...point, ...face.normal, ...face.color.map(channel => channel/255*variation), Number(face.eye), Number(face.unlit)], offset);
        offset += 11;
      }
    });
    const mesh = buffer(vertices);
    const liquidMesh = buffer(new Float32Array(scene.liquid.vertices.flat()));
    const shadowMesh = buffer(new Float32Array([
      -0.85,-0.195,-0.50,-1,-1,  0.85,-0.195,-0.50,1,-1,  0.85,-0.195,0.50,1,1,
      -0.85,-0.195,-0.50,-1,-1,  0.85,-0.195,0.50,1,1,  -0.85,-0.195,0.50,-1,1,
    ]));
    const modelTurn = gl.getUniformLocation(model, "uTurn");
    const shadowTurn = gl.getUniformLocation(shadow, "uTurn");
    const bob = gl.getUniformLocation(model, "uBob");
    const blink = gl.getUniformLocation(model, "uBlink");
    const eyeY = gl.getUniformLocation(model, "uEyeY");
    const squint = gl.getUniformLocation(model, "uSquint");
    const liquidTurn = gl.getUniformLocation(liquid, "uTurn");
    const liquidBob = gl.getUniformLocation(liquid, "uBob");
    const liquidTime = gl.getUniformLocation(liquid, "uTime");
    const liquidCenter = gl.getUniformLocation(liquid, "uCenter");
    const liquidRadius = gl.getUniformLocation(liquid, "uRadius");

    return {
      draw(rotation: Rotation) {
        const cosY = Math.cos(rotation.yaw);
        const sinY = Math.sin(rotation.yaw);
        const cosX = Math.cos(rotation.pitch);
        const sinX = Math.sin(rotation.pitch);
        const cycle = rotation.time%6.4;
        const openness = cycle > 5.9 && cycle < 6.14 ? 1 - Math.sin((cycle - 5.9)/0.24*Math.PI)*0.92 : 1;
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.clearColor(0, 0, 0, 0);
        gl.clearDepth(1);
        gl.depthMask(true);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        gl.useProgram(shadow);
        gl.uniform4f(shadowTurn, cosY, sinY, cosX, sinX);
        gl.bindBuffer(gl.ARRAY_BUFFER, shadowMesh);
        for (let attribute = 0; attribute < 5; attribute++) gl.disableVertexAttribArray(attribute);
        gl.enableVertexAttribArray(0);
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 20, 0);
        gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 20, 12);
        gl.depthMask(false);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        gl.depthMask(true);
        gl.useProgram(model);
        gl.uniform4f(modelTurn, cosY, sinY, cosX, sinX);
        gl.uniform1f(bob, Math.sin(rotation.time*1.15)*0.023);
        gl.uniform1f(blink, openness);
        gl.uniform1f(eyeY, scene.eyeY);
        gl.uniform2f(squint, Number(rotation.squint?.left ?? false), Number(rotation.squint?.right ?? false));
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh);
        const sizes = [3, 3, 3, 1, 1];
        const offsets = [0, 12, 24, 36, 40];
        sizes.forEach((size, attribute) => {
          gl.enableVertexAttribArray(attribute);
          gl.vertexAttribPointer(attribute, size, gl.FLOAT, false, 44, offsets[attribute]);
        });
        gl.drawArrays(gl.TRIANGLES, 0, scene.faces.length*3);

        gl.useProgram(liquid);
        gl.uniform4f(liquidTurn, cosY, sinY, cosX, sinX);
        gl.uniform1f(liquidBob, Math.sin(rotation.time*1.15)*0.023);
        gl.uniform1f(liquidTime, rotation.time);
        gl.uniform3fv(liquidCenter, scene.liquid.center);
        gl.uniform1f(liquidRadius, scene.liquid.radius);
        gl.bindBuffer(gl.ARRAY_BUFFER, liquidMesh);
        for (let attribute = 1; attribute < 5; attribute++) gl.disableVertexAttribArray(attribute);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 12, 0);
        gl.drawArrays(gl.TRIANGLES, 0, scene.liquid.vertices.length);
      },
      dispose,
    };
  } catch (error) {
    dispose();
    throw error;
  }
}

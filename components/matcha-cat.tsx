"use client";

import { useEffect, useRef, useState } from "react";
import { createMatchaCat, type MatchaCatEye } from "@/components/matcha-cat-scene";
import { createMatchaCatRenderer, projectMatchaCatPoint } from "@/components/matcha-cat-renderer";

export default function MatchaCat() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leftEyeRef = useRef<HTMLButtonElement>(null);
  const rightEyeRef = useRef<HTMLButtonElement>(null);
  const pokeRef = useRef<(eye: MatchaCatEye) => void>(() => {});
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("webgl", { alpha: true, antialias: true, depth: true, premultipliedAlpha: true });
    const hero = canvas?.closest("section");
    if (!canvas || !hero) return;
    function showFallback() {
      const fallbackFrame = requestAnimationFrame(() => setFallback(true));
      return () => cancelAnimationFrame(fallbackFrame);
    }
    if (!context) return showFallback();

    const scene = createMatchaCat();
    let renderer: ReturnType<typeof createMatchaCatRenderer>;
    try { renderer = createMatchaCatRenderer(context, scene); }
    catch { return showFallback(); }
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionPreference.matches;
    let size = 0;
    let frame = 0;
    let previousFrame = 0;
    let time = 0;
    let inView = true;
    let contextLost = false;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    const pokedUntil = { left: 0, right: 0 };
    const eyeButtons = { left: leftEyeRef, right: rightEyeRef };

    pokeRef.current = eye => {
      pokedUntil[eye] = performance.now() + 900;
      wake();
    };

    function wake() {
      if (!frame && inView && !document.hidden && !contextLost) {
        previousFrame = 0;
        frame = requestAnimationFrame(draw);
      }
    }
    function draw(timestamp: number) {
      frame = 0;
      if (!inView || document.hidden || contextLost) return;
      const elapsed = previousFrame ? timestamp - previousFrame : 1000 / 30;
      if (elapsed < 1000 / 30 - 1) { frame = requestAnimationFrame(draw); return; }
      previousFrame = timestamp;
      const delta = Math.min(elapsed / 1000, 0.05);
      if (!reducedMotion) time += delta;
      const smoothing = 1 - Math.exp(-delta * 4.5);
      pointerX += (targetX - pointerX) * smoothing;
      pointerY += (targetY - pointerY) * smoothing;
      const squint = { left: timestamp < pokedUntil.left, right: timestamp < pokedUntil.right };
      const pose = {
        yaw: -0.14 + pointerX * 0.27 + Math.sin(time * 0.42) * 0.035,
        pitch: 0.18 + pointerY * 0.08,
        time,
        squint,
      };
      renderer.draw(pose);
      for (const eye of ["left", "right"] as const) {
        const button = eyeButtons[eye].current;
        if (!button) continue;
        const point = projectMatchaCatPoint(scene.eyes[eye], pose);
        button.style.left = `${point.x * 100}%`;
        button.style.top = `${point.y * 100}%`;
        button.style.visibility = "visible";
        button.dataset.expression = squint[eye] ? "squint" : "open";
      }
      if (!reducedMotion || squint.left || squint.right || Math.abs(targetX - pointerX) + Math.abs(targetY - pointerY) > 0.001) frame = requestAnimationFrame(draw);
    }
    function resize() {
      size = canvas!.getBoundingClientRect().width;
      if (!size) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(size * dpr);
      canvas!.height = Math.round(size * dpr);
      wake();
    }
    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      const rect = hero!.getBoundingClientRect();
      const amount = reducedMotion ? 0.3 : 1;
      targetX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2)) * amount;
      targetY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2)) * amount;
      wake();
    }
    function onPointerLeave() { targetX = targetY = 0; wake(); }
    function onMotionPreferenceChange(event: MediaQueryListEvent) {
      reducedMotion = event.matches;
      targetX = targetY = 0;
      if (reducedMotion) time = 0;
      wake();
    }
    function onVisibilityChange() {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else wake();
    }
    function onContextLost(event: Event) {
      event.preventDefault();
      contextLost = true;
      cancelAnimationFrame(frame);
      frame = 0;
      setFallback(true);
    }
    function onContextRestored() {
      try {
        renderer.dispose();
        renderer = createMatchaCatRenderer(context!, scene);
        contextLost = false;
        setFallback(false);
        resize();
        wake();
      } catch { setFallback(true); }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) wake();
      else { cancelAnimationFrame(frame); frame = 0; }
    });
    intersectionObserver.observe(canvas);
    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerleave", onPointerLeave);
    motionPreference.addEventListener("change", onMotionPreferenceChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);
    resize();
    return () => {
      pokeRef.current = () => {};
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      motionPreference.removeEventListener("change", onMotionPreferenceChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[500px] select-none">
      <canvas ref={canvasRef} role="img" aria-label="A low-poly white cat holding a cup of matcha on a wooden tray, gently turning toward your cursor." className={`${fallback ? "hidden" : "block"} aspect-square w-full`}>
        A faceted, three-dimensional white cat with pointy ears and a little smile, holding a cup of green matcha.
      </canvas>
      {!fallback && (["left", "right"] as const).map(eye => (
        <button
          key={eye}
          ref={eye === "left" ? leftEyeRef : rightEyeRef}
          type="button"
          aria-label={`Poke ${eye} eye`}
          onClick={() => pokeRef.current(eye)}
          className="absolute z-10 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#94BECE]"
          style={{ visibility: "hidden" }}
        />
      ))}
      {fallback && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/matcha-cat-fallback.png" alt="A low-poly white cat holding a cup of matcha on a wooden tray." className="block aspect-square w-full object-contain" />
      )}
    </div>
  );
}
